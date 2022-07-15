import * as React from 'react'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import { appWithTranslation } from 'next-i18next'
import { fetcher } from 'lib/fetch'
import '../styles/globals.css'
import { Layout } from 'components/layout'

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
