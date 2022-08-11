import React, { FC, ReactNode, useState } from 'react'
import { SearchIcon } from '@heroicons/react/solid'
import getConfig from "next/config";
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
const { publicRuntimeConfig } = getConfig();
import styles from './base.module.scss'

import { Box, Container } from '@mui/system';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/joy/IconButton';
import Sheet from '@mui/joy/Sheet';
import JoyLink from '@mui/joy/Link';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { ModalUnstyled } from '@mui/base';
import clsx from 'clsx';


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
  const { t } = useTranslation(['common'])
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
  setShowSearchBar: () => { },
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
const ArchiveHeader = ({
  toggleMenu,
  menuOpen,
}: {
  toggleMenu: any
  menuOpen: boolean
}) => {
  const [showSearchBar, setShowSearchBar] = useState(true)

  return (
    <HeaderContext.Provider value={{ setShowSearchBar, showSearchBar }}>
      <div className={styles.header}>
        <div>
          <Link href="/" passHref>
            <Logo
              className={styles.logo}
              imgClassName={styles.logoImg}
            />
          </Link>
          {/* TODO: menu styling, actually make a half-functioning menu */}
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
        {/* <Link href="/login">
          <a className="relative right-[calc(5vw_-_3em)] top-3 h-fit lg:top-6">
            Login/Register
          </a>
        </Link> */}
      </div>
    </HeaderContext.Provider>
  )
}

const BackdropUnstyled = React.forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <Box
      sx={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'fixed',
        right: 0,
        bottom: 0,
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: '1000',
        "-webkit-tap-highlight-color": "transparent",
      }}
      className={clsx({ 'MuiBackdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
})

const Backdrop = (props: any) => {
  return (
    <BackdropUnstyled {...props}>
    </BackdropUnstyled>
  )

}


const HamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleOpenMenu = (e: any) => {
    setIsMenuOpen(true)
    e.stopPropagation()
  }
  const handleCloseMenu = (e: any) => {
    setIsMenuOpen(false)
    e.stopPropagation()
  }


  return (
    <>
      <JoyLink
        component="button"
        sx={{ position: 'fixed', fontSize: '2em', left: '0', marginLeft: 2 }}
        onClick={handleOpenMenu}
      >
        <MenuIcon sx={{ color: '#fff' }} />
      </JoyLink>
      <ModalUnstyled
        components={{ Backdrop }}
        open={isMenuOpen}
        onClose={handleCloseMenu}
      >
        <Sheet sx={{ position: 'absolute', top: '0', left: '0', width: '80vw', height: '100vh', zIndex: '1100' }}>
          testing
        </Sheet>
      </ModalUnstyled>
    </>
  )
}


const Header = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        backgroundColor: '#5B507A',
        display: 'flex',
        flexDirection: 'row',
        width: '100vw',
        height: '6rem',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: '900'
      }}
    >
      <HamburgerMenu />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Link href="/" passHref>
          <a
          // style={{ display: 'flex', flexShrink: 1, justifyContent: 'center' }}
          // className={`flex shrink-0 grow self-end ${className || ''}`}
          >
            <img
              style={{ width: '60vw' }}
              src="/logo.svg"
              alt="Auslan Signbank Logo"
            />
          </a>
          {/* <Logo
            className={styles.logo}
            imgClassName={styles.logoImg}
          /> */}
        </Link>
      </Box>
    </Box>
  )
}

interface BaseLayoutProps {
  page: ReactNode,
}
export function BaseLayout({ page }: BaseLayoutProps) {
  return (
    <div>
      {/* TODO: put header here */}
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{publicRuntimeConfig.SITE_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Container component="main" maxWidth="lg" sx={{ paddingTop: '7rem' }}>
        {page}
      </Container>
      {/* TODO: put footer here */}

      <Box
        component="footer"
        sx={{
          display: 'flex',
          bottom: 0,
          marginTop: "2rem",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "6rem",
          borderTop: "1px solid $gray-200",
        }}
      >
        <Box
          component="a"
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "0.5rem",
          }}
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
        </Box>
      </Box>

    </div >
  )
}

export function Archive_BaseLayout({ children }: props): JSX.Element {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <title>{publicRuntimeConfig.SITE_NAME}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.base}>
        <Header toggleMenu={toggleMenu} menuOpen={menuOpen} />
        {/* TODO: make a proper menu */}
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
        <footer className={styles.footer}>
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
