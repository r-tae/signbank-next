import { fetcher } from '@/lib/fetch'
import { useRouter } from 'next/router'
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
  region: string
}

export function useDictionarySearch(
  query: string
): SWRResponse<{ dictionaryEntry: DictionaryEntry }, any> {
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
