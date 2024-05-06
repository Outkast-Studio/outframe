import '../styles/global.css'
import { AppProps } from 'next/app'
import { lazy, Suspense, useEffect } from 'react'
import { useRouter } from 'next/router'
import Header from 'components/Header'
import { clsx } from 'clsx'
import { ImageAsset } from 'sanity'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import { AnimatePresence } from 'framer-motion'
import { useThemeStore } from 'stores/themeStore'
export interface SharedPageProps {
  draftMode: boolean
  token: string
}
//0.22, 0.61, 0.36, 1 ----------- Ease Out, CONTENT COMING IN USES THIS.
//0.34, 0, 0.36, 1 -------- EASE IN OUT,
export interface Seo {
  title: string
  description: string
  image: string
  keywords: string[]
}

export const myPortableTextComponents = {
  types: {
    image: ({ value }) => (
      <Image
        src={urlForImage(value).quality(80).width(2440).url()}
        alt={String(value.alt)}
        width={2440}
        height={2440}
        className={clsx('my-[22px] ')}
      />
    ),
  },
}

const PreviewProvider = lazy(() => import('components/PreviewProvider'))
// const VisualEditing = lazy(() => import('components/VisualEditing'))

export default function App({
  Component,
  pageProps,
}: AppProps<SharedPageProps>) {
  const { draftMode, token } = pageProps
  const router = useRouter()
  const introVisible = useThemeStore((state) => state.introVisible)
  useEffect(() => {
    if (router.pathname !== '/' && introVisible) {
      useThemeStore.getState().setIntroVisible(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])

  return (
    <div className={clsx('bg-background  relative')}>
      {router.pathname !== '/studio' && <Header />}
      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        <AnimatePresence mode="wait">
          <Component {...pageProps} key={router.pathname} />
        </AnimatePresence>
      )}
      {/* Presentation Layer logic */}
      {/* {draftMode && (
        <Suspense>
          <VisualEditing />
        </Suspense>
      )} */}
    </div>
  )
}
