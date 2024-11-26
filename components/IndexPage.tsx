import { HomepageSettings, Work, GlobalSettings } from 'lib/sanity.queries'
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
import Footer from './FooterNew'
import Intro from './Landing/Intro'
import Overlay from './Landing/Overlay'
import { useThemeStore } from 'stores/themeStore'
import { useRouter } from 'next/router'
import Cursor from './UI/Cursor'
import { useSearchParams } from 'next/navigation'
import Background from './UI/Background'

export default function Post({
  work,
  homepageSettings,
  globalSettings,
}: {
  work: Work[]
  homepageSettings: HomepageSettings
  globalSettings: GlobalSettings
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
        {homepageSettings.popup.isActive && (
          <Overlay settings={homepageSettings.popup} />
        )}

        <Cursor />
        <Intro />
        <Hero
          images={homepageSettings.heroCarousel}
          testimonial={homepageSettings.heroTestimonial}
          title={homepageSettings.heroTitle}
          paragraph={homepageSettings.heroParagraph}
        />
        <LogoCloud images={homepageSettings.logoCloud} />
        <OurStudio data={homepageSettings.aboutSectionContent} />
        <CaseStudies caseStudies={homepageSettings.caseStudies} />
        <Benefits />
        <Testimoninals testimonials={homepageSettings.testimonials} />
        <Process />
        <Services />
        <Pricing settings={homepageSettings} />
        <Footer settings={globalSettings} />
      </main>
    </div>
  )
}
