import { CustomHead } from './CustomHead'
import { clsx } from 'clsx'
import { ReactLenis } from '@studio-freight/react-lenis'
import Image from 'next/image'
export function Layout({
  children,
  seo = {
    title: '',
    description: '',
    image: '',
    keywords: [],
  },
}) {
  return (
    <ReactLenis
      root
      options={{
        duration: 0.6,
      }}
    >
      <CustomHead {...seo} />
      {children}
    </ReactLenis>
  )
}
