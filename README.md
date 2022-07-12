# Signbank Next

The latest iteration of Auslan Signbank, built with NextJS.

## Deployment

This repo builds production Docker images that can be deployed on most cloud services, the run command will need to pass the container a set of environment variables, to be documented, which will configure Signbank for your branding/language/URL.

In addition to this configuration you will also need to provide a MongoDB database which matches the schema that Signbank expects. This schema will be documented by the time that Signbank is ready to go live.

<!-- TODO: flesh out this documentation, and add multiple .md topic specific documents in a /docs folder -->

#### Configuration for deployment will need:

- next-i18next.config.js

```js
module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'de', 'fi'],
  },
}
```

- `public/`
  - Localisation file/s
  - Logo etc

### Localisation file

> This feature is a WIP and is not yet functional

Signbank Next can be deployed in multiple languages, the Docker image requires a `lang/` folder in the config directory. During startup, it searches this folder for <locale>.json files (e.g. `fi.json`), these files are commonly generated by translation management systems (TMSes). See the localisation documentation (`docs/localisation.md`) for further instructions.

## Testing

Signbank Next's testing stack is Cypress (End-to-End testing framework), `axe` (accessibility testing) and BrowserStack (cross-browser testing) for testing.
