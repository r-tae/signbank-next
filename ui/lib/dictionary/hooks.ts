// TODO: this file will require refactoring, project is switching to use a separate API instead of a NextJS backend

import { useRouter } from 'next/router'
import useSWR, { SWRResponse } from 'swr'

import { DictionaryEntry } from '@/types/api/entry'

export function useDictionarySearch(
  query: string
): SWRResponse<{ data: DictionaryEntry[] }, any> {
  const { isReady } = useRouter()
  return useSWR(
    isReady ? `/api/entries/?s=${query}` : null,
    {
      refreshInterval: 0,
    }
  )
}

export function useDictionaryEntry(
  idGloss: string
): SWRResponse<{ data: DictionaryEntry }, any> {
  const { isReady } = useRouter()
  return useSWR(
    isReady ? `/api/entries/${idGloss}` : null,
    {
      refreshInterval: 0,
    }
  )
}
