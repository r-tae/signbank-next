// TODO: this file will require refactoring, project is switching to use a separate API instead of a NextJS backend

import { useRouter } from 'next/router'
import useSWR, { SWRResponse } from 'swr'

import { DictionaryEntry } from '@/types/api/entry'

const fetcher = (url: string) => fetch(url).then(res => res.json())

export function useDictionarySearch(
  query: string
): SWRResponse<{ data: DictionaryEntry[] }, any> {
  const { isReady } = useRouter()
  const { data, error, isValidating, mutate } = useSWR(
    isReady ? `/api/entries/?s=${query}` : null,
    fetcher,
    {
      refreshInterval: 0,
    }
  )

  return { data: data?.data, error, isValidating, mutate }
}

export function useDictionaryEntry(
  idGloss: string
): SWRResponse<DictionaryEntry, any> {
  const { isReady } = useRouter()
  const { data, error, isValidating, mutate } = useSWR(
    isReady ? `/api/entries/${idGloss}` : null,
    fetcher,
    {
      refreshInterval: 0,
    }
  )


  return { data: data?.data, error, isValidating, mutate }
}
