# Signbank Next

The latest iteration of Auslan Signbank, built with NextJS.

## Deployment

This repo builds production Docker images that can be deployed on most cloud services, the run command will need to pass the container a set of environment variables, to be documented, which will configure Signbank for your branding/language/URL.

In addition to this configuration you will also need to provide a MongoDB database which matches the schema that Signbank expects. This schema will be documented by the time that Signbank is ready to go live.

<!-- TODO: flesh out this documentation, and add multiple .md topic specific documents in a /docs folder -->

## Testing

Signbank Next's testing stack is Cypress (End-to-End testing framework), `axe` (accessibility testing) and BrowserStack (cross-browser testing) for testing.
