package routes

import (
	"github.com/gofiber/fiber/v2"
	"github.com/r-tae/signbank-api/controllers"
)

func EntriesRoute(route fiber.Router) {
	route.Get("/", controllers.GetAllEntries)
	route.Get("/:id", controllers.GetEntry)
	route.Post("/", controllers.AddEntry)
	route.Put("/:id", controllers.UpdateEntry)
	route.Delete("/:id", controllers.DeleteEntry)
}
