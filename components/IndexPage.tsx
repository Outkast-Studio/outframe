import { HomepageSettings, Work } from 'lib/sanity.queries'
import Link from 'next/link'
import { clsx } from 'clsx'
import Hero from 'components/Landing/Hero'
import CaseStudies from './Landing/CaseStudies'
import LogoCloud from 'components/Landing/LogoCloud'

export default function Post({
  work,
  homepageSettings,
}: {
  work: Work[]
  homepageSettings: HomepageSettings
}) {
  return (
    <main className={clsx('bg-background')}>
      <Hero images={homepageSettings.heroCarousel} />
      <LogoCloud images={homepageSettings.logoCloud} />
      <CaseStudies caseStudies={homepageSettings.caseStudies} />
    </main>
  )
}
