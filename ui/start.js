// code for this file comes from https://ross-hagan.com/blog/instrument-nextjs-opentelemetry
// TODO: I would like to set up both tracing and metrics, jaegar for tracing, prometheus for metrics

const process = require("process")
const opentelemetry = require("@opentelemetry/sdk-node")
const {
  getNodeAutoInstrumentations,
} = require("@opentelemetry/auto-instrumentations-node")
const { Resource } = require("@opentelemetry/resources")
const {
  SemanticResourceAttributes,
} = require("@opentelemetry/semantic-conventions")
const { OTLPTraceExporter } = require("@opentelemetry/exporter-trace-otlp-grpc")

// Run your custom nextjs server, we'll show more on this next
const { startServer } = require("./server")

const traceExporter = new OTLPTraceExporter({
  url: process.env.JAEGER_COLLECTOR_ENDPOINT,
})

// configure the SDK to export telemetry data to the console
// enable all auto-instrumentations from the meta package
const sdk = new opentelemetry.NodeSDK({
  resource: new Resource({
    [SemanticResourceAttributes.SERVICE_NAME]: process.env.JAEGER_UI_SERVICE_NAME,
  }),
  traceExporter,
  instrumentations: [
    getNodeAutoInstrumentations({
    
      // Each of the auto-instrumentations
      // can have config set here or you can
      // npm install each individually and not use the auto-instruments
      "@opentelemetry/instrumentation-http": {
        ignoreIncomingPaths: [
          // Pattern match to filter endpoints
          // that you really want to stop altogether
          "/ping",
          
          // You can filter conditionally
          // Next.js gets a little too chatty
          // if you trace all the incoming requests
          ...(process.env.NODE_ENV !== "production"
            ? [/^\/_next\/static.*/]
            : []),
        ],
        
        // This gives your request spans a more meaningful name
        // than `HTTP GET`
        requestHook: (span, request) => {
          span.setAttributes({
            name: `${request.method} ${request.url || request.path}`,
          })
        },
        
        // Re-assign the root span's attributes
        startIncomingSpanHook: (request) => {
          return {
            name: `${request.method} ${request.url || request.path}`,
            "request.path": request.url || request.path,
          }
        },
      }
    }),
  ],
})

// initialize the SDK and register with the OpenTelemetry API
// this enables the API to record telemetry
sdk
  .start()
  .then(() => console.log("Tracing initialized"))
  .then(() => startServer())
  .catch((error) =>
    console.log("Error initializing tracing and starting server", error)
  )

// gracefully shut down the SDK on process exit
process.on("SIGTERM", () => {
  sdk
    .shutdown()
    .then(() => console.log("Tracing terminated"))
    .catch((error) => console.log("Error terminating tracing", error))
    .finally(() => process.exit(0))
})
