import { HomepageSettings, Work } from 'lib/sanity.queries'
import Link from 'next/link'
import { clsx } from 'clsx'
import Hero from 'components/Landing/Hero'
import CaseStudies from './Landing/CaseStudies'
import LogoCloud from 'components/Landing/LogoCloud'
import OurStudio from './Landing/OurStudio'
import Benefits from './Landing/Benefits'
import Testimonial from 'schemas/testimonial'
import Testimoninals from './Landing/Testimonials'
import Process from './Landing/Process'
import Services from './Landing/Services'
import Pricing from './Landing/Pricing'
import Footer from './Footer'
import Intro from './Landing/Intro'
import { useThemeStore } from 'stores/themeStore'

export default function Post({
  work,
  homepageSettings,
}: {
  work: Work[]
  homepageSettings: HomepageSettings
}) {
  const introVisible = useThemeStore((state) => state.introVisible)
  return (
    <main className={clsx('bg-background')}>
      {introVisible ? (
        <Intro />
      ) : (
        <Hero
          images={homepageSettings.heroCarousel}
          testimonial={homepageSettings.heroTestimonial}
        />
      )}

      <LogoCloud images={homepageSettings.logoCloud} />
      <CaseStudies caseStudies={homepageSettings.caseStudies} />
      <OurStudio />
      <Benefits />
      <Testimoninals testimonials={homepageSettings.testimonials} />
      <Process />
      <Services />
      <Pricing settings={homepageSettings} />
      <Footer />
    </main>
  )
}
