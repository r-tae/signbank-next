import * as React from 'react'
import type { AppProps } from 'next/app'
import { appWithTranslation } from 'next-i18next'
import { SWRConfig } from 'swr'
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

import { BaseLayout } from '@/components/layout'
import { fetcher } from '@/lib/fetch'

import '@/styles/globals.scss'

import { Theme } from "@mui/joy/styles/types"

import { GlobalStyles } from '@mui/system';

// TODO: override palette, we just need to sort all those colors out
// const palette = {
//   primary: {
//     '50': '#F6DFE5',
//     '100': '#F6DFE5',
//     '200': '#F6DFE5',
//     '300': '#F6DFE5',
//     '400': '#F6DFE5',
//     '500': '#F6DFE5',
//     '600': '#F6DFE5',
//     '700': '#F6DFE5',
//     '800': '#F6DFE5',
//     '900': '#F6DFE5',
//     plainColor: '#F6DFE5',
//     plainHoverBg: '#F6DFE5',
//     plainActiveBg: '#F6DFE5',
//   }
// }

const theme = extendTheme({
  fontFamily: {
    body: 'Lato, "sans"',
  },
  colorSchemes: {
    // light: { palette }
  }
})

function SignbankNext({ Component, pageProps }: AppProps) {
  return (
    <CssVarsProvider theme={theme}>
      <SWRConfig
        value={{
          fetcher,
        }}
      >
        <GlobalStyles
          styles={(theme: Theme) => ({
            body: {
              margin: 0,
              fontFamily: theme.vars.fontFamily.body,
            }
          })}
        />
        <BaseLayout
          page={<Component {...pageProps} />}
        />
        {/* <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout> */}
      </SWRConfig>
    </CssVarsProvider>
  )
}

export default appWithTranslation(SignbankNext)
