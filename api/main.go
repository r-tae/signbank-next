package main

import (
  "context"
	"log"
	"os"
  "go.opentelemetry.io/otel/sdk/resource"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/gofiber/fiber/v2/middleware/logger"
	"github.com/joho/godotenv"
	"github.com/r-tae/signbank-api/config"
	"github.com/r-tae/signbank-api/routes"

	"github.com/gofiber/contrib/otelfiber"
	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/attribute"
	"go.opentelemetry.io/otel/exporters/jaeger"
	"go.opentelemetry.io/otel/propagation"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
	semconv "go.opentelemetry.io/otel/semconv/v1.4.0"
)

var tracer = otel.Tracer("fiber-server")

func setupRoutes(app *fiber.App) {
	app.Get("/", func(c *fiber.Ctx) error {
		return c.Status(fiber.StatusOK).JSON(fiber.Map{
			"success": true,
			"message": "You are at the root endpoint 😉",
		})
	})

	api := app.Group("/api")

	routes.EntriesRoute(api.Group("/entries"))
}

func initTracer() *sdktrace.TracerProvider {
  exporter, err := jaeger.New(jaeger.WithCollectorEndpoint(jaeger.WithEndpoint(os.Getenv("JAEGER_COLLECTOR_ENDPOINT"))))
  if err != nil {
    log.Fatal(err)
  }
  tp := sdktrace.NewTracerProvider(
		sdktrace.WithSampler(sdktrace.AlwaysSample()),
		sdktrace.WithBatcher(exporter),
		sdktrace.WithResource(
			resource.NewWithAttributes(
				semconv.SchemaURL,
				semconv.ServiceNameKey.String(os.Getenv("JAEGER_SERVICE_NAME")),
        attribute.String("environment", os.Getenv("APP_ENV")),
			)),
	)
  otel.SetTracerProvider(tp)
  otel.SetTextMapPropagator(propagation.NewCompositeTextMapPropagator(propagation.TraceContext{}, propagation.Baggage{}))
  return tp
}

func main() {
	if os.Getenv("APP_ENV") != "production" {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

  tp := initTracer()
  defer func() {
    if err := tp.Shutdown(context.Background()); err != nil {
      log.Printf("Error shutting down tracer provider: %v", err)
    }
  }()

	app := fiber.New()

  app.Use(otelfiber.Middleware("signbank-api"))
	app.Use(cors.New())
	app.Use(logger.New())

	config.ConnectDB()

	setupRoutes(app)

	port := os.Getenv("PORT")
	err := app.Listen(":" + port)

	if err != nil {
		log.Fatal("Error app failed to start")
		panic(err)
	}
}
