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
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { Observer } from 'gsap/dist/Observer'
import { useTheme } from 'styled-components'

gsap.registerPlugin(ScrollTrigger, Observer)
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
  const setIsHoveringBlog = useThemeStore((state) => state.setIsHoveringBlog)
  useEffect(() => {
    if (router.pathname !== '/' && introVisible) {
      useThemeStore.getState().setIntroVisible(false)
    }
    setIsHoveringBlog(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname])
  const isHoveringBlog = useThemeStore((state) => state.isHoveringBlog)
  const isHoveringHeroImage = useThemeStore(
    (state) => state.isHoveringHeroImage,
  )
  const isHoveringCaseStudy = useThemeStore(
    (state) => state.isHoveringCaseStudy,
  )

  return (
    <div
      className={clsx(
        'bg-background relative min-h-[100vh] ',
        !router.pathname.includes('/blog/') && 'overflow-hidden',
      )}
    >
      {router.pathname !== '/studio' && <Header />}
      {draftMode ? (
        <PreviewProvider token={token}>
          <Component {...pageProps} />
        </PreviewProvider>
      ) : (
        <div className={clsx('relative z-[1]')}>
          <AnimatePresence
            mode="wait"
            onExitComplete={() => window.scrollTo(0, 0)}
          >
            <Component {...pageProps} key={router.pathname} />
          </AnimatePresence>
        </div>
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
