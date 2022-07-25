import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import { SearchResult } from '@/components/search'
import { useDictionarySearch } from '@/lib/dictionary/hooks'

const SearchResults: NextPage = () => {
  const { t } = useTranslation(['common'])
  const { query, isReady: _isReady } = useRouter()
  const { query: searchQuery } = query

  const { data, error } = useDictionarySearch(searchQuery as string)

  // TODO: clean up loading/errors
  if (error) return <div>{error.message}</div>
  if (!data) return <div>{t('page-loading')}</div>

  return (
    <main className="w-full max-w-6xl overflow-visible px-16 xl:px-0">
      <div className="flex w-full flex-col gap-4">
        {data.data.map((result) => (
          <SearchResult key={JSON.stringify(result.idGloss)} data={result} />
        ))}
      </div>
    </main>
  )
}

export const getServerSideProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['common'])),
  },
})

export default SearchResults
