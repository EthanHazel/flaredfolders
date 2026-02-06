<p align="center"><img src="/public/images/meta/favicon/favicon.ico" style="width:128px;height:128px;"  /></p>
<h1 align="center">FlaredFolders</h1>
<h3 align="center">A Free, Open-Source Folder Customization Tool</h3>
<p align="center">Currently live at <b><a href="https://www.flaredfolders.com/">www.flaredfolders.com</b></a></p>

<p align="center">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000" />
  <img src="https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=fff" />
  <img src="https://img.shields.io/badge/Next.js-black?logo=next.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white" />
  <img src="/.github/images/sep.png" />
  <img src="https://img.shields.io/badge/License-GPLv3-blue.svg" />
  <img src="https://img.shields.io/github/languages/code-size/EthanHazel/flaredfolders" />
  <img src="https://img.shields.io/github/stars/EthanHazel%2Fflaredfolders" />
</p>

<p align="center"><img src="/.github/images/showcase.png" /></p>

## Features

### Supported Styles

- Windows 11
- Windows 10
- Icon Only

### Customization Options

- **Backgrounds**:
  - Gradient blends
  - Solid colors
  - Original folder color
- **Icon Libraries**:
  - Generic icons via [Lucide](https://lucide.dev)
  - Brand icons via [Simple Icons](https://simpleicons.org/)
  - Emojis
  - Custom upload
- **Resolution Support**:
  `16x16 → 256x256` (Native scaling for all platforms)

### Export Formats

| Format | Support                                |
| ------ | -------------------------------------- |
| `.ICO` | Native Windows Use                     |
| `.PNG` | Specific sized icon                    |
| `.ZIP` | Package containing all sizes as `.png` |

### Exports For Each Size

When exporting as an `.ico` it will render the design for each size. There are option for which style you would like your folder to be rendered in when at smaller sizes.

> Sizes greater than 64x64 not shown on table due to sizing.

| Size    | Win11Box                                                                     | Win11                                                                | Win11Folder                                                                        | Win10                                                                | Win10Folder                                                                        | Icon                                                               |
| ------- | ---------------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `64x64` | <p align="center">![win11-box](/.github/images/formats/win11-box/64.png)</p> | <p align="center">![win11](/.github/images/formats/win11/64.png)</p> | <p align="center">![win11-folder](/.github/images/formats/win11-folder/64.png)</p> | <p align="center">![win10](/.github/images/formats/win10/64.png)</p> | <p align="center">![win10-folder](/.github/images/formats/win10-folder/64.png)</p> | <p align="center">![icon](/.github/images/formats/icon/64.png)</p> |
| `48x48` | <p align="center">![win11-box](/.github/images/formats/win11-box/48.png)</p> | <p align="center">![win11](/.github/images/formats/win11/48.png)</p> | <p align="center">![win11-folder](/.github/images/formats/win11-folder/48.png)</p> | <p align="center">![win10](/.github/images/formats/win10/48.png)</p> | <p align="center">![win10-folder](/.github/images/formats/win10-folder/48.png)</p> | <p align="center">![icon](/.github/images/formats/icon/48.png)</p> |
| `32x32` | <p align="center">![win11-box](/.github/images/formats/win11-box/32.png)</p> | <p align="center">![win11](/.github/images/formats/win11/32.png)</p> | <p align="center">![win11-folder](/.github/images/formats/win11-folder/32.png)</p> | <p align="center">![win10](/.github/images/formats/win10/32.png)</p> | <p align="center">![win10-folder](/.github/images/formats/win10-folder/32.png)</p> | <p align="center">![icon](/.github/images/formats/icon/32.png)</p> |
| `24x24` | <p align="center">![win11-box](/.github/images/formats/win11-box/24.png)</p> | <p align="center">![win11](/.github/images/formats/win11/24.png)</p> | <p align="center">![win11-folder](/.github/images/formats/win11-folder/24.png)</p> | <p align="center">![win10](/.github/images/formats/win10/24.png)</p> | <p align="center">![win10-folder](/.github/images/formats/win10-folder/24.png)</p> | <p align="center">![icon](/.github/images/formats/icon/24.png)</p> |
| `16x16` | <p align="center">![win11-box](/.github/images/formats/win11-box/16.png)</p> | <p align="center">![win11](/.github/images/formats/win11/16.png)</p> | <p align="center">![win11-folder](/.github/images/formats/win11-folder/16.png)</p> | <p align="center">![win10](/.github/images/formats/win10/16.png)</p> | <p align="center">![win10-folder](/.github/images/formats/win10-folder/16.png)</p> | <p align="center">![icon](/.github/images/formats/icon/16.png)</p> |

<br />

## Applying `.ICO` files

### With QuickFlair

[**QuickFlair**](https://github.com/EthanHazel/quickflair) is a sister project designed for windows that makes it much easier to apply `.ico` files to any folder. It also comes preinstalled with basic colors that you can use quickly.

<a href="https://github.com/EthanHazel/quickflair/releases/">
    <img src="/.github/images/download-qf.png" />
</a>

### Without QuickFlair

Before proceeding make sure your `.ICO` file is saved somewhere that is safe. The folder will link itself to that file location and won't update when moved or deleted.

1. Right click your folder of choice
2. Click `Properties`
3. Go to the `Customize` tab
4. Click `Change Icon...`
5. Click the `Browse...` button
6. Navigate and select your `.ICO` file
7. Click `Ok` to both windows to save and close

<br />

## Quick Start

1. Clone the repository:

```bash
git clone https://github.com/EthanHazel/flaredfolders.git
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

<br />

## Community Translations

Help us make FlaredFolders more accessible. Here's how to contribute translations:

1. Navigate to `src/locales`
2. Duplicate `en.json`
3. Rename to your [locale code](https://www.localeplanet.com/icu/)
4. Translate all string values
5. Submit a PR

<br />

## Contributing

We welcome all contributions. To contribute, please do the following:

1. Fork the repository
2. Create your feature branch

- `git checkout -b feature/amazing-feature`

3. Commit your changes

- `git commit -m 'Add some amazing feature'`

4. Push to the branch

- `git push origin feature/amazing-feature`

5. Open a Pull Request

<br />

## License

This project is licensed under the **GNU General Public License v3.0** - see the LICENSE file for details.

<br />

## Acknowledgments

- Icon sets provided by [Lucide](https://lucide.dev) and [Simple Icons](https://simpleicons.org/)
- Built with [Next.js](https://nextjs.org/)
- Community-driven translations
- Folder visuals are derived from Microsoft's original assets
