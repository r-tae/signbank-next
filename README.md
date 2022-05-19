# Signbank Next

The latest iteration of Auslan Signbank, built with NextJS.

## Connecting to a database

If your MongoDB connection string includes `tls=true`, then Signbank will either look for a CA certificate at:

```sh
certs/ca-certificate.crt
```

or for a `CA_CERT` environment variable

## Testing

Signbank Next's testing stack is Cypress (End-to-End testing framework), `axe` (accessibility testing) and BrowserStack (cross-browser testing) for testing.

You will need:
