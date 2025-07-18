use tauri::{AppHandle};
use tauri_plugin_dialog::DialogExt;
use std::{process::Command, time::{SystemTime, UNIX_EPOCH}, fs, env, path::PathBuf};

#[tauri::command]
/// Returns true to signal that this is a desktop environment
pub fn is_desktop() -> bool {
  true
}

#[tauri::command]
/// Prompts for a folder, caches the icon in LOCALAPPDATA, updates desktop.ini, and sets attributes.
pub async fn pick_folder_and_save_icon(
    data: Vec<u8>,
    app: AppHandle,
) -> Result<(), String> {
    // Let the user pick a folder
    let picked = app
        .dialog()
        .file()
        .blocking_pick_folder()
        .ok_or_else(|| "No folder selected".to_string())?;

    let folder_path = picked
        .into_path()
        .map_err(|e| format!("Failed to interpret path: {}", e))?;

    // Generate a filename based on current UNIX time
    let ts = SystemTime::now()
        .duration_since(UNIX_EPOCH)
        .map_err(|e| format!("SystemTime error: {}", e))?
        .as_secs();
    let icon_filename = format!("{}.ico", ts);

    // Prepare LOCALAPPDATA/FlaredFolders/icons
    let local_dir: PathBuf = env::var_os("LOCALAPPDATA")
        .map(PathBuf::from)
        .ok_or_else(|| "Couldn't find LOCALAPPDATA environment variable".to_string())?;
    let base_dir = local_dir.join("FlaredFolders");
    let icons_dir = base_dir.join("icons");
    fs::create_dir_all(&icons_dir)
        .map_err(|e| format!("Error creating directory: {}", e))?;

    // Create or overwrite README.txt
    let readme_path = base_dir.join("README.txt");
    let readme_contents = "Hello!\n\nThis is where your icons are cahced when created, they need to stay here in order to work, so please do not mess with them unless you know what you're doing";
    fs::write(&readme_path, readme_contents)
        .map_err(|e| format!("Error writing README.txt: {}", e))?;

    // Save the new icon file
    let new_icon_path = icons_dir.join(&icon_filename);
    fs::write(&new_icon_path, data)
        .map_err(|e| format!("Error writing icon file: {}", e))?;

    // Update or create desktop.ini in the picked folder
    let desktop_ini_path = folder_path.join("desktop.ini");
    if desktop_ini_path.exists() {
        // Read existing contents
        let contents = fs::read_to_string(&desktop_ini_path)
            .map_err(|e| format!("Error reading desktop.ini: {}", e))?;
        let mut lines: Vec<String> = contents.lines().map(String::from).collect();

        // If there was a prior IconResource pointing into our icons_dir, remove that file
        for line in &lines {
            if line.starts_with("IconResource=") {
                if let Some(old_path) = line.strip_prefix("IconResource=").and_then(|s| s.split(',').next()) {
                    let old = PathBuf::from(old_path);
                    if old.starts_with(&icons_dir) {
                        let _ = fs::remove_file(&old);
                    }
                }
            }
        }

        // Ensure [.ShellClassInfo] header exists
        if !lines.iter().any(|l| l.trim() == "[.ShellClassInfo]") {
            lines.insert(0, "[.ShellClassInfo]".to_string());
        }

        // Update or add IconResource line to point to new icon
        let mut found = false;
        for line in lines.iter_mut() {
            if line.starts_with("IconResource=") {
                *line = format!("IconResource={},0", new_icon_path.to_string_lossy());
                found = true;
            }
        }
        if !found {
            let pos = lines.iter().position(|l| l.trim() == "[.ShellClassInfo]").unwrap() + 1;
            lines.insert(pos, format!("IconResource={},0", new_icon_path.to_string_lossy()));
        }

        let new_contents = lines.join("\r\n");
        fs::write(&desktop_ini_path, new_contents)
            .map_err(|e| format!("Error writing desktop.ini: {}", e))?;
    } else {
        // Create fresh desktop.ini with header and new icon entry
        let file_contents = format!(
            "[.ShellClassInfo]\r\nIconResource={},0",
            new_icon_path.to_string_lossy()
        );
        fs::write(&desktop_ini_path, file_contents)
            .map_err(|e| format!("Error writing desktop.ini: {}", e))?;
    }

    // Mark the folder as system
    let folder_str = folder_path.to_string_lossy();
    let status_sys = Command::new("cmd")
        .args(&["/C", "attrib", "+s", &folder_str])
        .status()
        .map_err(|e| format!("Failed to set system attribute: {}", e))?;
    if !status_sys.success() {
        return Err(format!("attrib +s failed: {}", status_sys.code().unwrap_or(-1)));
    }

    // Hide the desktop.ini file as a protected OS file
    let ini_str = desktop_ini_path.to_string_lossy();
    let status_hide = Command::new("cmd")
        .args(&["/C", "attrib", "+s", "+h", &ini_str])
        .status()
        .map_err(|e| format!("Failed to set protective attributes: {}", e))?;
    if !status_hide.success() {
        return Err(format!("attrib +s +h failed: {}", status_hide.code().unwrap_or(-1)));
    }

    Ok(())
}
