<p align="center"><img src="/public/images/meta/favicon/favicon.ico" /></p>
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
  `16x16 → 512x512` (Native scaling for all platforms)

### Exports For Each Size

> Sizes greater than 64x64 not shown due to sizing

| Size    | Windows 11 Box                                                        | Windows 11                                                        | Windows 11 Folder Only                                                   | Windows 10                                                        | Windows 10 Folder Only                                                   | Icon Only                                                        |
| ------- | --------------------------------------------------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------- |
| `64x64` | <img src="/.github/images/formats/win11-box/64.png" align="center" /> | <img src="/.github/images/formats/win11/64.png" align="center" /> | <img src="/.github/images/formats/win11-folder/64.png" align="center" /> | <img src="/.github/images/formats/win10/64.png" align="center" /> | <img src="/.github/images/formats/win10-folder/64.png" align="center" /> | <img src="/.github/images/formats/icon/64.png" align="center" /> |
| `48x48` | <img src="/.github/images/formats/win11-box/48.png" align="center" /> | <img src="/.github/images/formats/win11/48.png" align="center" /> | <img src="/.github/images/formats/win11-folder/48.png" align="center" /> | <img src="/.github/images/formats/win10/48.png" align="center" /> | <img src="/.github/images/formats/win10-folder/48.png" align="center" /> | <img src="/.github/images/formats/icon/48.png" align="center" /> |
| `32x32` | <img src="/.github/images/formats/win11-box/32.png" align="center" /> | <img src="/.github/images/formats/win11/32.png" align="center" /> | <img src="/.github/images/formats/win11-folder/32.png" align="center" /> | <img src="/.github/images/formats/win10/32.png" align="center" /> | <img src="/.github/images/formats/win10-folder/32.png" align="center" /> | <img src="/.github/images/formats/icon/32.png" align="center" /> |
| `24x24` | <img src="/.github/images/formats/win11-box/24.png" align="center" /> | <img src="/.github/images/formats/win11/24.png" align="center" /> | <img src="/.github/images/formats/win11-folder/24.png" align="center" /> | <img src="/.github/images/formats/win10/24.png" align="center" /> | <img src="/.github/images/formats/win10-folder/24.png" align="center" /> | <img src="/.github/images/formats/icon/24.png" align="center" /> |
| `16x16` | <img src="/.github/images/formats/win11-box/16.png" align="center" /> | <img src="/.github/images/formats/win11/16.png" align="center" /> | <img src="/.github/images/formats/win11-folder/16.png" align="center" /> | <img src="/.github/images/formats/win10/16.png" align="center" /> | <img src="/.github/images/formats/win10-folder/16.png" align="center" /> | <img src="/.github/images/formats/icon/16.png" align="center" /> |

### Export Formats

| Format | Support                                |
| ------ | -------------------------------------- |
| `.ico` | Native Windows Use                     |
| `.png` | Specific sized icon                    |
| `.zip` | Package containing all sizes as `.png` |

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
