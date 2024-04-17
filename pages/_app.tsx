import '../styles/global.css'
import { AppProps } from 'next/app'
import { lazy, Suspense } from 'react'
import { useRouter } from 'next/router'
import Header from 'components/Header'
export interface SharedPageProps {
  draftMode: boolean
  token: string
}

export interface Seo {
  title: string
  description: string
  image: string
  keywords: string
}

const PreviewProvider = lazy(() => import('components/PreviewProvider'))
// const VisualEditing = lazy(() => import('components/VisualEditing'))

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  const router = useRouter()

  return (
    <>
      {router.pathname !== '/studio' && <Header />}
      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        <Component {...pageProps} />
      )}
      {/* Presentation Layer logic */}
      {/* {draftMode && (
        <Suspense>
          <VisualEditing />
        </Suspense>
      )} */}
    </>
  )
}
