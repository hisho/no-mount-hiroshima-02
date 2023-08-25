import type { AppProps } from 'next/app'

import '@/src/pages/app.css'
import { Layout } from '@/src/pages/layout'
import { cn } from '@/src/util/cn/cn'
import { NextPage } from 'next'
import Head from 'next/head'
import { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement, pageProps: P) => ReactNode
}

type AppPropsWithLayout<P = {}> = AppProps<P> & {
  Component: NextPageWithLayout<P>
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <>
      <Head>
        <title>title</title>
        <meta content="noindex" name="robots" />
        <link
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>📝</text></svg>"
          rel="icon"
        />
      </Head>
      <div className={cn('leading-none text-white')}>
        <Layout>{getLayout(<Component {...pageProps} />, pageProps)}</Layout>
      </div>
    </>
  )
}
