export type IdGloss = string
export type SignNumber = `${number}`

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

export type DictionaryEntry = {
  _id: string
  id: number
  idGloss: IdGloss
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
  signNumber: SignNumber
  stemSignNumber: SignNumber
  definitions: Definition[]
  keywords: Keyword[]
  videos: Video[]
  relations: {
    sign: IdGloss
    role: string
  }[]
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
