import '../styles/global.css'
import { AppProps } from 'next/app'
import { lazy, Suspense } from 'react'
import { useRouter } from 'next/router'
import Header from 'components/Header'
import { clsx } from 'clsx'
import { ImageAsset } from 'sanity'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
export interface SharedPageProps {
  draftMode: boolean
  token: string
}

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
        className={clsx('my-[22px]')}
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

  return (
    <div className={clsx('bg-background')}>
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
    </div>
  )
}
