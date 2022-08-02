package config

import (
	"context"
	"fmt"
	"sort"
	"sync"

	"github.com/r-tae/signbank-api/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type documentKey struct {
	ID primitive.ObjectID `bson:"_id"`
}

type namespace struct {
	Db   string `bson:"db"`
	Coll string `bson:"coll"`
}

type changeID struct {
	Data string `bson:"_data"`
}

type changeEvent struct {
	ID                changeID            `bson:"_id"`
	OperationType     string              `bson:"operationType"`
	ClusterTime       primitive.Timestamp `bson:"clusterTime"`
	FullDocument      models.Entry        `bson:"fullDocument"`
	DocumentKey       documentKey         `bson:"documentKey"`
	Ns                namespace           `bson:"ns"`
	UpdateDescription bson.M              `bson:"updateDescription"`
}

// PERF: this takes some minutes if triggered on a whole dictionary, it's not hugely long but it would be better to get it down a bit
func iterateChangeStream(routineCtx context.Context, waitGroup sync.WaitGroup, stream *mongo.ChangeStream, collection *mongo.Collection) {
	defer stream.Close(routineCtx)
	defer waitGroup.Done()
	for stream.Next(routineCtx) {
		var event changeEvent
		if err := stream.Decode(&event); err != nil {
			panic(err)
		}

		var relatedIdGlosses []models.IdGloss
		var relatedEntries []models.Entry
		for _, relation := range event.FullDocument.Relations {
			relatedIdGlosses = append(relatedIdGlosses, relation.Sign)
		}
		cursor, err := collection.Find(
			context.TODO(),
			bson.D{
				{"idGloss", bson.D{{"$in", relatedIdGlosses}}},
			},
		)
		defer cursor.Close(routineCtx)

		if err != nil {
			panic(err)
		}

		for cursor.Next(routineCtx) {
			var entry models.Entry
			cursor.Decode(&entry)
			relatedEntries = append(relatedEntries, entry)
		}

		for _, entry := range relatedEntries {
			videos := entry.Videos[:]
			sort.Slice(videos, func(i, j int) bool {
				return videos[i].Version < videos[j].Version
			})

			if len(videos) == 0 {
				break
			}
			for index, relation := range event.FullDocument.Relations {
				if relation.Sign == entry.IdGloss {
					event.FullDocument.Relations[index] = models.Relation{
						Sign: relation.Sign,
						Role: relation.Role,
						Entry: &models.EntryPreview{
							VideoUrl: videos[0].Url,
						},
					}
				}
			}
		}

		_, err = collection.UpdateOne(
			context.TODO(),
			bson.D{{"idGloss", event.FullDocument.IdGloss}},
			bson.D{{"$set", bson.D{{"relations", event.FullDocument.Relations}}}},
		)
		if err != nil {
			panic(err)
		}
		fmt.Printf("ChangeStream event triggered\n")
	}
}

func setupWatch() {
	database := MI.Client.Database("dictionary")
	entriesCollection := database.Collection("dictionary")

	var waitGroup sync.WaitGroup

	relationsStage := bson.D{
		{"$match", bson.D{
			{"$and", bson.A{
				bson.D{
					{"operationType", bson.D{
						{"$in", bson.A{"insert", "update", "replace"}},
					}},
				},
				bson.D{
					{"fullDocument.relations.0", bson.D{
						{"$exists", true},
					}},
				},
			},
			}},
		},
	}

	opts := options.ChangeStream().SetFullDocument(options.UpdateLookup)
	entriesStream, err := entriesCollection.Watch(
		context.TODO(),
		mongo.Pipeline{relationsStage},
		opts,
	)
	if err != nil {
		panic(err)
	}
	waitGroup.Add(1)
	// unused arg is `cancelFn'
	routineCtx, _ := context.WithCancel(context.Background())
	// NOTE: next line started with `go '
	iterateChangeStream(routineCtx, waitGroup, entriesStream, entriesCollection)

	waitGroup.Wait()
}
