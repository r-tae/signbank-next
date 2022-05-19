import { useDictionarySearch } from '@/lib/dictionary/hooks'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const SearchResults: NextPage = () => {
  const { query, isReady: _isReady } = useRouter()
  const { query: searchQuery } = query

  const { data, error } = useDictionarySearch(searchQuery as string)

  if (error) return <div>{error.message}</div>
  if (!data) return <div>loading...</div>

  return (
    <main>
      {data.map((result) => (
        <div key={JSON.stringify(result._id)}>{result.idGloss}</div>
      ))}
    </main>
  )
}

export default SearchResults
