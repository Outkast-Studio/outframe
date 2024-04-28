import { CustomHead } from './CustomHead'
import { clsx } from 'clsx'
import { ReactLenis } from '@studio-freight/react-lenis'
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
    <div className={clsx('')}>
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
