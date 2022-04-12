import { FC } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import Logo from 'components/logo'
import Link from 'next/link'

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

// TODO: switch to hamburger menu below md
// TODO: the login/register link should be anchored to the top of the screen, offset from the right by the extra
//       margin (10vw) plus a constant amount (`w-[calc(10vw + 3em)]` with `min-w-20-or-so`)
const Header = () => (
  <div className="flex min-h-[90px] w-full flex-row justify-center bg-custom-green text-cream lg:min-h-[120px]">
    <div className="flex w-3/4 max-w-6xl flex-row pb-8">
      <Link href="/" passHref>
        <Logo
          className="h-10 shrink-0 basis-[140px] lg:h-20 lg:basis-[290px]"
          imgClassName="relative lg:top-[0.45em]"
        />
      </Link>
      <ul className="flex flex-1 shrink items-stretch space-x-6">
        <FakeMenu />
      </ul>
    </div>
    <Link href="/login">
      <a className="relative top-6 right-28">Login/Register</a>
    </Link>
  </div>
)

const Layout: FC<props> = ({ children }) => {
  return (
    <>
      <Head>
        <title>Auslan Signbank</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="space-between relative flex min-h-screen w-full flex-col overflow-hidden bg-light-cream">
        <Header />
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
            Powered by{' '}
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </a>
        </footer>
      </div>
    </>
  )
}

export default Layout
