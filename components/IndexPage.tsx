import { Work } from 'lib/sanity.queries'
import Link from 'next/link'
import { clsx } from 'clsx'
import Hero from 'components/Landing/Hero'

export default function Post({ work }: { work: Work[] }) {
  return (
    <main className={clsx('bg-background')}>
      <Hero />
    </main>
  )
}
