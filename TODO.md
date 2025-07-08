# TODO

> Stuff I gotta do, or you can too if you want (prob not, there's no contributors rn lmao)

## Bugs

- Primary color fetching bugs out from green to blue saturated colors
- Custom icon centering is messed up (possibly forgot to reimplement during folder-render refactor, time to dig through the archives)

## 2.2.1 Launch

- Finish up home page (create WIP notice for download)
- Move credits, and product hunt to home page exclusively
- Autopick folder style based on detected OS
- Modify OS detection to detect specific Windows version (10 or 11)
- Fix bug with `folder-only` small style not correctly applying the right blending
- Make home mobile responsive and remove the download and online editor button (replace with the source code button maybe)

## 2.3 Launch

- Create updater for desktop client
- Create function for applying flairs
- Allow args --path and --ico for applying flair, and also for opening an ico to apply
- Success popup for applying or saving
- Settings popup
  - Theme
  - Language
  - Credits
  - Source
  - Check for update
- Modify folder style control panel to only feature small folder config and `icon-only` option
- Icon picker for Lucide and SimpleIcons based on the emoji picker

## 2.3.1

- Redo panel toggle to show a comparison to the default folder for each size option
- Allow desktop version to apply .ICO files by opening them with the icon (doesn't have to be a FF one)
