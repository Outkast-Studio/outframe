import { CustomHead } from './CustomHead'
import { clsx } from 'clsx'
export function Layout({
  children,
  seo = {
    title: '',
    description: '',
    image: '',
    keywords: '',
  },
}) {
  return (
    <div className={clsx('')}>
      <CustomHead {...seo} />
      {children}
    </div>
  )
}
