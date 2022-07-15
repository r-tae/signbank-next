import { useRouter } from 'next/router'
import useSWR, { SWRResponse } from 'swr'
import { DictionaryEntry } from '@/types/entry'

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
