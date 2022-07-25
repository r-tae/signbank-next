import * as React from 'react'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { SWRConfig } from 'swr'

import { BaseLayout } from '@/components/layout'
import { fetcher } from '@/lib/fetch'

import '@/styles/globals.css'

function SignbankNext({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </SWRConfig>
  )
}

export default appWithTranslation(SignbankNext)
