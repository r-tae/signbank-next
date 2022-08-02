package models

type Relation struct {
	Sign  IdGloss       `json:"sign" bson:"sign"`
	Entry *EntryPreview `json:"entry,omitempty" bson:"entry,omitempty`
	Role  string        `json:"role" bson:"role"`
}
