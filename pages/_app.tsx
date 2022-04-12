import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from 'components/layout'
import { SWRConfig } from 'swr'
import { fetcher } from '@/lib/fetch'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        refreshInterval: 0,
        fetcher,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  )
}

export default MyApp
