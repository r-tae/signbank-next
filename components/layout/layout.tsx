import React, { FC, useState } from 'react'
import { MenuIcon } from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

import Logo from 'components/logo'
import { Search } from 'components/search'

type props = {
  children: JSX.Element | JSX.Element[]
}

// TODO: create hamburger menu + submenus on dropdown
const FakeMenu = () => (
  <>
    {[
      { name: 'Home', path: '/' },
      { name: 'About Auslan', path: '/about' },
      { name: 'Research', path: '/research' },
      { name: 'Grammar', path: '/grammar' },
      { name: 'Vocabulary', path: '/vocabulary' },
    ].map(({ name, path }, index) => {
      const key = index + 1
      return (
        <li
          className="shrink-0 self-end decoration-2 underline-offset-4 hover:underline"
          key={key}
        >
          <Link href={path}>
            <a>{name}</a>
          </Link>
        </li>
      )
    })}
  </>
)

const SearchBar = () => {
  const { t } = useTranslation()
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.currentTarget.value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  const handleSearch = () => {
    if (query) router.push(`/search/${query}`)
  }

  return (
    <div className="border-1 text-md flex h-12 w-full self-end overflow-hidden rounded-sm border-cream bg-black text-black">
      <input
        type="text"
        className="w-full p-2"
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={t('search-placeholder')}
        value={query}
      />
      {/* TODO: prevent searching by click with no query */}
      <Link href={`/search/${query}`}>
        <a className="align-end flex h-full bg-white">
          <SearchIcon className="m-4 h-1/2 self-center text-black" />
        </a>
      </Link>
    </div>
  )
}

type HeaderContextType = {
  showSearchBar: boolean
  setShowSearchBar: (newValue: boolean) => void
}

export const HeaderContext = React.createContext<HeaderContextType>({
  showSearchBar: false,
  setShowSearchBar: () => {},
})

export const useHeaderContext = () => React.useContext(HeaderContext)

// TODO: wrap _app in headercontext.provider and then hide the search bar on the homepage so we don't have two
//       This will get complicated because we have cases:
//          - small screen, homepage: we want hamburger which opens up to show search bar,
//            like the current "mobile" site
//          - small screen, homepage: we want hamburger which opens up WITHOUT the search bar,
//            like the current "mobile" site
//          - md/lg screen, homepage: where we don't want to show the searchbar
//          - md/lg screen, NOT homepage: we want to show the searchbar

// TODO: switch to hamburger menu below md
// TODO: the login/register link should be anchored to the top of the screen, offset from the right by the extra
//       margin (10vw) plus a constant amount (`w-[calc(10vw + 3em)]` with `min-w-20-or-so`)
const Header = ({
  toggleMenu,
  menuOpen,
}: {
  toggleMenu: any
  menuOpen: boolean
}) => {
  const [showSearchBar, setShowSearchBar] = useState(true)

  return (
    <HeaderContext.Provider value={{ setShowSearchBar, showSearchBar }}>
      <div className="flex min-h-[90px] w-full flex-row justify-center bg-custom-green text-cream lg:min-h-[120px]">
        <div className="mt-7 flex w-3/4 max-w-6xl flex-row pb-8 lg:mt-0">
          <Link href="/" passHref>
            <Logo
              className="h-10 shrink-0 basis-[140px] lg:h-20 lg:basis-[290px]"
              imgClassName="relative lg:top-[0.45em]"
            />
          </Link>
          <ul className="flex flex-1 shrink items-stretch space-x-6">
            {showSearchBar ? (
              <div className="flex flex-row">
                <SearchBar />
                <a onClick={toggleMenu} className="self-end">
                  <MenuIcon className="h-14 self-end" />
                </a>
              </div>
            ) : (
              <FakeMenu />
            )}
          </ul>
        </div>
        <Link href="/login">
          <a className="relative right-[calc(5vw_-_3em)] top-3 h-fit lg:top-6">
            Login/Register
          </a>
        </Link>
      </div>
    </HeaderContext.Provider>
  )
}

export const Layout: FC<props> = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <Head>
        <title>Auslan Signbank</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="space-between relative flex min-h-screen w-full flex-col overflow-hidden bg-light-cream">
        <Header toggleMenu={toggleMenu} menuOpen={menuOpen} />
        {menuOpen && (
          <div className="flex flex w-full justify-center bg-custom-green text-cream">
            <div className="flex w-3/4 max-w-6xl bg-custom-green text-cream">
              this is the contents of the hamburger menu
            </div>
          </div>
        )}
        <div className="mt-8 mb-auto flex w-full justify-center">
          {children}
        </div>
        <footer className="bottom-0 mt-8 flex h-24 w-full items-center justify-center border-t">
          {/* TODO: add a sitemap or */}
          <a
            className="flex items-center justify-center gap-2"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Supported by{' '}
            <Image
              src="/monash.png"
              alt="Monash University Logo"
              width={110}
              height={45}
            />
          </a>
        </footer>
      </div>
    </>
  )
}
