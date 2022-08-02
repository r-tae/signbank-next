package models

type Definition struct {
	Text         string `json:"text" bson:"text"`
	Published    bool   `json:"published,omitempty" bson:"published,omitempty"`
	Role         string `json:"role,omitempty" bson:"role,omitempty"`
}
