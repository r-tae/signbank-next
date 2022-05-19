const browserstack = require('browserstack-local')
// Creates an instance of Local
const bs_local = new browserstack.Local()

// You can also set an environment variable - "BROWSERSTACK_ACCESS_KEY".
const bs_local_args = { key: '6eqsT33joK2i1xKyf29s' }

// Starts the Local instance with the required arguments.
bs_local.start(bs_local_args, function () {
  console.log('Started BrowserStackLocal')

  // Checks if BrowserStack local instance is running.
  console.log('BrowserStackLocal running:', bs_local.isRunning())

  const username = process.env.BROWSERSTACK_USERNAME
  const accessKey = process.env.BROWSERSTACK_ACCESS_KEY
  driver = new webdriver.Builder()
    .usingServer(
      'http://' +
        username +
        ':' +
        accessKey +
        '@hub-cloud.browserstack.com/wd/hub'
    )
    .withCapabilities(capabilities)
    .build()

  bs_local.stop(function () {
    console.log('Stopped BrowserStackLocal')
  })
})
