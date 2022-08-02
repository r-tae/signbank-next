import { FC, useState } from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

type props = {}

export const Search: FC<props> = () => {
  const { t } = useTranslation(['common'])
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == 'Enter') {
      router.push(`/search/${query}`)
    }
  }

  return (
    <div className="my-5 flex h-16 w-1/2 border-8 border-yellow-400 bg-white text-lg">
      <input
        aria-label="Search bar"
        className="h-full w-full p-2"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        type="text"
        value={query}
        placeholder={t('search-placeholder')}
      />
      <Link href={`/search/${query}`}>
        <a className="h-full self-center">
          <SearchIcon className="h-full w-fit bg-yellow-400 pl-2 text-white" />
        </a>
      </Link>
    </div>
  )
}
