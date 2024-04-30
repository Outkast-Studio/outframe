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
    <div className={"bg-[url('/images/bgLines.png')]"}>
      <Image
        src={'/images/bgLines.png'}
        layout="fill"
        objectFit="cover"
        alt={'bgImage'}
        className={clsx('fixed')}
      />
      <ReactLenis
        root
        options={{
          duration: 0.6,
        }}
      >
        <CustomHead {...seo} />
        {children}
      </ReactLenis>
    </div>
  )
}
