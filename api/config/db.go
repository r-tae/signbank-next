package config

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/mongo/readpref"

	"go.opentelemetry.io/otel"
	"go.opentelemetry.io/otel/sdk/resource"
	"go.opentelemetry.io/otel/exporters/jaeger"
	"go.opentelemetry.io/otel/propagation"
	sdktrace "go.opentelemetry.io/otel/sdk/trace"
	semconv "go.opentelemetry.io/otel/semconv/v1.4.0"

  "go.opentelemetry.io/contrib/instrumentation/go.mongodb.org/mongo-driver/mongo/otelmongo"
)

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
        semconv.ServiceNameKey.String("dictionary-api-mongo-driver"),
      ),
    ),
  )
  otel.SetTracerProvider(tp)
  otel.SetTextMapPropagator(propagation.NewCompositeTextMapPropagator(propagation.TraceContext{}, propagation.Baggage{}))
  return tp
}

type MongoInstance struct {
	Client *mongo.Client
	DB     *mongo.Database
}

var MI MongoInstance

func ConnectDB() {
	if os.Getenv("APP_ENV") != "production" {
		err := godotenv.Load()
		if err != nil {
			log.Fatal("Error loading .env file")
		}
	}

  opts := options.Client()
	if os.Getenv("JAEGER_COLLECTOR_ENDPOINT") {
		opts.Monitor = otelmongo.NewMonitor()
	}
  opts.ApplyURI(os.Getenv("MONGO_URI"))
	client, err := mongo.NewClient(opts)
	if err != nil {
		log.Fatal(err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Database connected!")

	MI = MongoInstance{
		Client: client,
		DB:     client.Database(os.Getenv("DB")),
	}

	go setupWatch()
}
