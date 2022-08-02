export type Definition = {
  text: string
  published: boolean
  partOfSpeech: string
}

export type Keyword = {
  text: string
}

export type Video = {
  version: number
  url: string
}

export type OldDictionaryEntry = {
  _id: string
  id: number
  idGloss: string
  annotationIdGloss: string
  aslGloss: string // TODO: move stuff about asl and bsl (and SE) into a nested section, so that at least the top-level is SL-agnostic
  isAslLoan: boolean
  blend: string
  bslGloss: string
  isBslLoan: boolean
  compound: string
  published: boolean // TODO: update this to a more detailed publishing system hopefully
  proposedNewSign: boolean
  morphology: string
  signedEnglishGloss: string
  sense: number
  signNumber: string
  stemSignNumber: string
  definitions: Definition[]
  keywords: Keyword[]
  videos: Video[]
  relations: {
    // TODO: this does not reflect how it is actually stored in the database, just how it's returned by the getById endpoint
    entry: DictionaryEntry
    role: string
  }[]
  // NOTE: the actual DB model looks like:
  // relations: {
  //   sign: string (an ID gloss)
  //   role: string
  // }[]
  language: {
    code: string
    region: string // TODO: would like to rename this to something more general (perhaps 'dialect'/'variety')
    traditional: boolean
  }
  phonology: {
    initialDominantHandshape: string
    finalDominantHandshape: string
    initialSubordinateHandshape: string
    finalSubordinateHandshape: string
    initialPrimaryLocation: string
    initialSecondaryLocation: string
    finalSecondaryLocation: string
  }
}
