# Adding Translations

Flared Folders is created with i18n support in mind from the start. It is made as easy as it can be, so you should be able to translate the entire app within a day or two.

## Basic Prerequisites

You don't really need to know how Svelte or JS works to create a translation. You will just need a basic understanding of JSON, NodeJS and Git.

You won't need to do any programming related work other than running some commands in the terminal to spin up a dev server.

If you aren't sure how to do something, you can always ask in the community Discord server for help.

## Ground Rules

### No machine translations (Google Translate, AI, etc.)

Please don't create translations for languages that you yourself do not understand. The whole point of allowing for community translations is to make the language coherent and not filled with incorrect or machine-generated translations.

### Have a good understanding of the language you are translating

You should have a good understanding of the language you are translating. You don't need to be an expert on the language, but you should have a good understanding of the grammar and vocabulary.

### Don't write nonsense

This is probably obvious but just felt like mentioning it here anyways.

## Starting development

You want to fork the repo and clone it to your local machine. Once that's done you want to make sure you open the project up in your terminal and run the following command:

```bash
npm install
```

Once that's done you can run the following command to start the development server:

```bash
npm run prebuild
npm run dev
```

This will start the development server on your local machine. You can access the server by opening the URL that is output in your console (usually `http://localhost:5173`). Make sure you don't forget to run the prebuild, as it's required for the development server to work properly.

### Adding your new locale

Once you have a development server running, you can start by creating a new locale (language) for the project.

You can do this by going to the directory `src/locales` and creating your new locale file. The best way to do this is by duplicating the `en-US.json` file and renaming it to your new locale code (e.g. `es.json` for Spanish). You can find a list of locale codes [here](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).

The name of your language should automatically be imported from the file `src/lib/data/locale-names.json`. This file contains a mapping of tons of locale codes to their corresponding language names. If for some reason your locale name is wrong or missing, feel free to edit it inside the `locale-names.json` file.

### Previewing your changes

After creating the new file you should be able to set your language to the new one in the settings menu. Your changes should update in real time as you edit the file.

#### Debug Tools

Some text may be hard to find in the wild, as some are tucked away in modals that only show up under specific circumstances. An easy way to find these is to use the debug tools. You can enable these in the settings menu, and it will replace the changelog button with a new debug button.

There's a special option in the debug tools called "Force Open Modal", and this will let you open up any modal by their ID. Here's a list of the ones you can use.

- `changelog`
- `credits`
- `debug`
- `export-as`
- `file-too-big`
- `new-project`
- `settings`
- `unknown-filetype`
- `unknown-filetype-project`
- `welcome`

## Some Final Tips

Some text is currently unused in the codebase. This is because there are features planned to be added in future updates.

They're present in the locale files so that way they can be translated before the feature is added and avoid complications with updating translations.

## Creating a Pull Request

When you're ready to submit your changes, create a pull request on GitHub. You don't need to do anything fancy with the pull request name or description; a simple, descriptive title is enough.

If everything looks good, you should be able to merge your changes into the main branch!
