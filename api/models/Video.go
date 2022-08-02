package models

type Video struct {
	Version int    `json:"version" bson:"version"`
	Url     string `json:"url" bson:"url"`
}
