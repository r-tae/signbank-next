package controllers

import (
	"context"
	"log"
	"math"
	"strconv"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/r-tae/signbank-api/config"
	"github.com/r-tae/signbank-api/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func GetAllEntries(c *fiber.Ctx) error {
	entryCollection := config.MI.DB.Collection("dictionary")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	var entries []models.Entry

	filter := bson.M{}
	findOptions := options.Find()

	// NOTE: basic search only searches exact matches on keywords for now
	if s := c.Query("s"); s != "" {
		filter = bson.M{
			"keywords.text": bson.M{
				"$regex": primitive.Regex{
					Pattern: "^" + s + "$",
					Options: "i",
				},
			},
		}
	}

	page, _ := strconv.Atoi(c.Query("page", "1"))
	limitVal, _ := strconv.Atoi(c.Query("limit", "10"))
	var limit int64 = int64(limitVal)

	total, _ := entryCollection.CountDocuments(ctx, filter)

	findOptions.SetSkip((int64(page) - 1) * limit)
	findOptions.SetLimit(limit)

	cursor, err := entryCollection.Find(ctx, filter, findOptions)
	defer cursor.Close(ctx)

	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"success": false,
			"message": "Entries Not found",
			"error":   err,
		})
	}

	for cursor.Next(ctx) {
		var entry models.Entry
		cursor.Decode(&entry)
		entries = append(entries, entry)
	}

	last := math.Ceil(float64(total / limit))
	if last < 1 && total > 0 {
		last = 1
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data":      entries,
		"total":     total,
		"page":      page,
		"last_page": last,
		"limit":     limit,
	})
}

func GetEntry(c *fiber.Ctx) error {
	entryCollection := config.MI.DB.Collection("dictionary")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	var entry models.Entry
	//objId, err := primitive.ObjectIDFromHex(c.Params("id"))
	findResult := entryCollection.FindOne(ctx, bson.M{"idGloss": c.Params("id")})
	if err := findResult.Err(); err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"success": false,
			"message": "Entry Not found",
			"error":   err,
		})
	}

	err := findResult.Decode(&entry)
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"success": false,
			"message": "Entry Not found",
			"error":   err,
		})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{
		"data":    entry,
		"success": true,
	})
}

func AddEntry(c *fiber.Ctx) error {
	entryCollection := config.MI.DB.Collection("dictionary")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	entry := new(models.Entry)

	if err := c.BodyParser(entry); err != nil {
		log.Println(err)
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "Failed to parse body",
			"error":   err,
		})
	}

	result, err := entryCollection.InsertOne(ctx, entry)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "Entry failed to insert",
			"error":   err,
		})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"data":    result,
		"success": true,
		"message": "Entry inserted successfully",
	})

}

func UpdateEntry(c *fiber.Ctx) error {
	entryCollection := config.MI.DB.Collection("dictionary")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	entry := new(models.Entry)

	if err := c.BodyParser(entry); err != nil {
		log.Println(err)
		return c.Status(400).JSON(fiber.Map{
			"success": false,
			"message": "Failed to parse body",
			"error":   err,
		})
	}

	objId, err := primitive.ObjectIDFromHex(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"success": false,
			"message": "Entry not found",
			"error":   err,
		})
	}

	update := bson.M{
		"$set": entry,
	}
	_, err = entryCollection.UpdateOne(ctx, bson.M{"_id": objId}, update)
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "Entry failed to update",
			"error":   err.Error(),
		})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"success": true,
		"message": "Entry updated successfully",
	})
}

func DeleteEntry(c *fiber.Ctx) error {
	entryCollection := config.MI.DB.Collection("dictionary")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)

	objId, err := primitive.ObjectIDFromHex(c.Params("id"))
	if err != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{
			"success": false,
			"message": "Entry not found",
			"error":   err,
		})
	}
	_, err = entryCollection.DeleteOne(ctx, bson.M{"_id": objId})
	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"success": false,
			"message": "Entry failed to delete",
			"error":   err,
		})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{
		"success": true,
		"message": "Entry deleted successfully",
	})
}
