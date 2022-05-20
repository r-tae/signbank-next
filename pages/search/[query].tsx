import { useDictionarySearch } from '@/lib/dictionary/hooks'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { SearchResult } from 'components/search'

const SearchResults: NextPage = () => {
  const { query, isReady: _isReady } = useRouter()
  const { query: searchQuery } = query

  const { data, error } = useDictionarySearch(searchQuery as string)

  if (error) return <div>{error.message}</div>
  if (!data) return <div>loading...</div>

  return (
    <main className="w-full max-w-6xl overflow-visible px-16 xl:px-0">
      <div className="flex w-full flex-col gap-4">
        {data.map((result) => (
          <SearchResult key={JSON.stringify(result._id)} data={result} />
        ))}
      </div>
    </main>
  )
}

export default SearchResults
