import * as React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from 'components/layout'
import { SWRConfig } from 'swr'
import { fetcher } from '@/lib/fetch'
import { appWithTranslation } from 'next-i18next'

function SignbankNext({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SWRConfig>
  )
}

export default appWithTranslation(SignbankNext)
