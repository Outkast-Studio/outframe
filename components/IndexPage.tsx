import { HomepageSettings, Work } from 'lib/sanity.queries'
import Link from 'next/link'
import { useLenis } from '@studio-freight/react-lenis'
import { useEffect } from 'react'
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
import { useRouter } from 'next/router'
import Cursor from './UI/Cursor'
import { useSearchParams } from 'next/navigation'
import Background from './UI/Background'

export default function Post({
  work,
  homepageSettings,
}: {
  work: Work[]
  homepageSettings: HomepageSettings
}) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const scroll = searchParams.get('scroll')

  const lenis = useLenis()
  const setIsHoveringHeroImage = useThemeStore(
    (state) => state.setIsHoveringHeroImage,
  )
  useEffect(() => {
    setIsHoveringHeroImage(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (scroll && lenis) {
      lenis.scrollTo(scroll, {
        duration: 1.2,
        offset: -69,
        easing: (x) => {
          return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
        },
      })
      router.push('/', undefined, { shallow: true })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis])

  return (
    <div className={clsx('overflow-x-hidden w-full')}>
      <main className={clsx('relative z-[2] overflow-x-hidden')}>
        <Cursor />
        <Intro />
        <Hero
          images={homepageSettings.heroCarousel}
          testimonial={homepageSettings.heroTestimonial}
        />
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
    </div>
  )
}
