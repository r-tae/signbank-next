import * as React from 'react'
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { Layout } from 'components/layout'
import { SWRConfig } from 'swr'
import { fetcher } from '@/lib/fetch'
import { IntlProvider, FormattedMessage, FormattedNumber } from 'react-intl'
import dynamic from 'next/dynamic'

// TODO: setup loading of languages without needing to hardcode
import enLocaleMessages from 'lang/en.json'

function SignbankNext({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <IntlProvider
        locale={'en'}
        defaultLocale="en"
        messages={enLocaleMessages}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </IntlProvider>
    </SWRConfig>
  )
}

export default SignbankNext
