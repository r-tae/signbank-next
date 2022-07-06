import { fetcher } from '@/lib/fetch'
import { useRouter } from 'next/router'
import useSWR, { SWRResponse } from 'swr'

// TODO: move into a specific '/types' folder
type Definition = {
  text: string
  published: boolean
  partOfSpeech: string
}

type DictionaryEntry = {
  id: number
  idGloss: string
  annotationIdGloss: string
  aslGloss: string // TODO: move stuff about asl and bsl into a nested section, so that at least the top-level is SL-agnostic
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
  relation: {
    sign: string
    role: number // TODO: switch to UUID for this
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

export function useDictionarySearch(
  query: string
): SWRResponse<DictionaryEntry[], any> {
  const { isReady } = useRouter()
  return useSWR(isReady ? `/api/dictionary/search/${query}` : null, {
    refreshInterval: 0,
  })
}

export function useDictionaryEntry(
  idGloss: string
): SWRResponse<{ dictionaryEntry: DictionaryEntry }, any> {
  const { isReady } = useRouter()
  return useSWR(isReady ? `/api/dictionary/${idGloss}` : null, {
    refreshInterval: 0,
  })
}
