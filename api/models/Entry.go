package models

import (
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type IdGloss string
type SignNumber int

type Language struct {
	Code        string `json:"code" bson:"code"`
	Region      string `json:"region" bson:"region"`
	Traditional bool   `json:"traditional" bson:"traditional"`
}

type Phonology struct {
	InitialDominantHandshape    string `json:"initialDominantHandshape" bson:"initialDominantHandshape"`
	FinalDominantHandshape      string `json:"finalDominantHandshape" bson:"finalDominantHandshape"`
	InitialSubordinateHandshape string `json:"initialSubordinateHandshape" bson:"initialSubordinateHandshape"`
	FinalSubordinateHandshape   string `json:"finalSubordinateHandshape" bson:"finalSubordinateHandshape"`
	InitialPrimaryLocation      int    `json:"initialPrimaryLocation" bson:"initialPrimaryLocation"`
	InitialSecondaryLocation    string `json:"initialSecondaryLocation" bson:"initialSecondaryLocation"`
	FinalSecondaryLocation      string `json:"finalSecondaryLocation" bson:"finalSecondaryLocation"`
}

type EntryPreview struct {
	VideoUrl string `json:"videoUrl" bson:"videoUrl"`
}

type Entry struct {
	// NOTE: `omitempty' is required here, otherwise it gets zero'd out when parsing API request bodies
	ID                 primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	LegacyID           int                `json:"id" bson:"id"`
	IdGloss            IdGloss            `json:"idGloss" bson:"idGloss"`
	AnnotationIdGloss  IdGloss            `json:"annotationIdGloss" bson:"annotationIdGloss"`
	AslGloss           string             `json:"aslGloss" bson:"aslGloss"`
	IsAslLoan          bool               `json:"isAslLoan" bson:"isAslLoan"`
	Blend              string             `json:"blend" bson:"blend"`
	BslGloss           string             `json:"bslGloss" bson:"bslGloss"`
	IsBslLoan          bool               `json:"isBslLoan" bson:"isBslLoan"`
	Compound           string             `json:"compound" bson:"compound"`
	Published          bool               `json:"published" bson:"published"`
	ProposedNewSign    bool               `json:"proposedNewSign" bson:"proposedNewSign"`
	Morphology         string             `json:"morphology" bson:"morphology"`
	SignedEnglishGloss string             `json:"signedEnglishGloss" bson:"signedEnglishGloss"`
	Sense              int                `json:"sense" bson:"sense"`
	SignNumber         SignNumber         `json:"signNumber" bson:"signNumber"`
	StemSignNumber     SignNumber         `json:"stemSignNumber" bson:"stemSignNumber"`
	Definitions        []Definition       `json:"definitions" bson:"definitions"`
	Keywords           []Keyword          `json:"keywords" bson:"keywords"`
	Videos             []Video            `json:"videos" bson:"videos"`
	Relations          []Relation         `json:"relations" bson:"relations"`
	Language           Language           `json:"language" bson:"language"`
	Phonology          Phonology          `json:"phonology" bson:"phonology"`
}
