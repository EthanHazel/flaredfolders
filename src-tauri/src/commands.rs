use tauri::{AppHandle};
use tauri_plugin_dialog::DialogExt;   
use dirs::picture_dir;

#[tauri::command]
pub fn is_desktop() -> bool {
  true
}

#[tauri::command]
pub async fn save_icon(name: String, data: Vec<u8>) -> Result<(), String> {
    let pictures_dir = picture_dir().ok_or("Couldn't find pictures directory".to_string())?;
    
    let target_dir = pictures_dir.join("FlaredFolders");
    if let Err(e) = std::fs::create_dir_all(&target_dir) {
        return Err(format!("Error creating directory: {}", e));
    }

    let file_path = target_dir.join(format!("{}.ico", name));

    if let Err(e) = std::fs::write(&file_path, data) {
        return Err(format!("Error writing file: {}", e));
    }

    Ok(())
}

#[tauri::command]
pub async fn pick_folder_and_save(app: AppHandle) -> Result<(), String> {
  let picked = app
    .dialog()
    .file()
    .blocking_pick_folder()
    .ok_or_else(|| "No folder selected".to_string())?;

  let folder_path = picked
    .into_path()
    .map_err(|e| format!("Failed to interpret path: {}", e))?;

  let file_path = folder_path.join("test.txt");

  std::fs::write(&file_path, "Hello world!")
    .map_err(|e| format!("Error writing file: {}", e))?;

  Ok(())
}