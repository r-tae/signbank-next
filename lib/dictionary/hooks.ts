import { fetcher } from '@/lib/fetch'
import useSWR, { SWRResponse } from 'swr'

type DictionaryEntry = {
  idGloss: string
  annotationIdGloss: string
  dominantHandshape: {
    initial: string
    final: string
  }
  subordinateHandshape: {
    initial: string
    final: string
  }
  keywords: { text: string; primary: boolean }[]
  definitions: {
    text: string
    partOfSpeech: string
  }[]
}

export function useDictionaryEntry(
  idGloss: string | string[]
): SWRResponse<{ dictionaryEntry: DictionaryEntry }, any> {
  return useSWR(`/api/dictionary/${idGloss}`, { refreshInterval: 0 })
}
