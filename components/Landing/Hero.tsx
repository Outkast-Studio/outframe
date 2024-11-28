import React, { useState, useRef, useEffect } from 'react'
import { clsx } from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { ImageAsset } from 'sanity'
import { urlForImage } from 'lib/sanity.image'
import { Testimonial } from 'lib/sanity.queries'
import { motion } from 'framer-motion'
import { useThemeStore } from 'stores/themeStore'
import { useLenis } from '@studio-freight/react-lenis'
import HeroImage from 'components/UI/HeroImage'
import Button from 'components/UI/Button'
import homepageSettings from 'schemas/homepageSettings'
import { useWindowSize } from 'hooks/useWindowSize'
import type { PortableTextBlock } from '@portabletext/types'
import { PortableText } from '@portabletext/react'
import { myPortableTextComponents } from 'pages/_app'
import { getCalApi } from '@calcom/embed-react'
type Props = {
  images: ImageAsset[]
  testimonial: Testimonial
  title: string
  paragraph: PortableTextBlock
}

const Hero = ({ images, testimonial, title, paragraph }: Props) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const trackingDivRef = useRef<HTMLDivElement>(null)
  const testimonialText = (testimonial && testimonial.content) || ''
  const testimonialName = (testimonial && testimonial.name) || ''
  const role = (testimonial && testimonial.role) || ''
  const introVisible = useThemeStore((state) => state.introVisible)
  const setIsHoveringHeroImage = useThemeStore(
    (state) => state.setIsHoveringHeroImage,
  )
  useEffect(() => {
    ;(async function () {
      const cal = await getCalApi()
      cal('ui', {
        theme: 'dark',
        styles: {
          branding: { brandColor: '#000000' },
        },
      })
    })()
  }, [])
  const { width } = useWindowSize()
  const lenis = useLenis()
  const h1Variants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  }

  const fadeInVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  }

  const h1ChildrenVariants = {
    initial: {
      y: '4.4vw',
    },
    animate: {
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 0.61, 0.36, 1],
      },
    },
  }

  const h1ChildrenVariantsMobile = {
    initial: {
      y: 60,
    },
    animate: {
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 0.61, 0.36, 1],
      },
    },
  }
  const imageVariants = {
    initial: {
      clipPath: 'inset(100% 0 0 0)',
    },
    animate: {
      clipPath: 'inset(0 0 0 0)',
      opacity: 1,
      transition: {
        duration: 0.65,
        delay: 0.65,
        ease: [0.34, 0, 0.36, 1],
      },
    },
  }

  const handleMouseMove = (event) => {
    const rect = trackingDivRef.current.getBoundingClientRect()
    setPosition({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    })
  }

  const handleMouseEnter = () => {
    setIsHoveringHeroImage(true)
  }

  const handleMouseLeave = () => {
    setIsHoveringHeroImage(false)
  }

  return (
    <section
      className={clsx(
        'pt-[151px] px-gutter geist',
        'lg:pt-[24vh]',
        'xl:pt-[24vh]',
      )}
    >
      <div
        className={clsx(
          'md:flex gap-x-[56px]',
          'xl:grid xl:grid-cols-12 xl:gap-x-columnGap',
        )}
      >
        <div className={clsx('col-span-7')}>
          <motion.h1
            variants={h1Variants}
            initial="initial"
            animate={introVisible ? 'initial' : 'animate'}
            className={clsx(
              'text-[24px] leading-[36px] tracking-[-0.32px]',
              'lg:text-[32px] lg:leading-[48px] geist portableHero text-secondaryText lg:tracking-[-0.64px] ',
            )}
          >
            <PortableText
              value={paragraph}
              components={myPortableTextComponents}
            />
          </motion.h1>

          <div
            className={clsx(
              'flex mt-[32px] gap-x-[16px]',
              'md:mt-[19px]',
              'lg:mt-[40px]',
            )}
          >
            <div data-cal-link="outframe/intro" tabIndex={0}>
              <Button
                isHero
                text={'Request free audit'}
                // cb={() =>
                //   lenis.scrollTo('#pricing', {
                //     duration: 1.2,
                //     offset: -69,
                //     easing: (x) => {
                //       return x < 0.5
                //         ? 4 * x * x * x
                //         : 1 - Math.pow(-2 * x + 2, 3) / 2
                //     },
                //   })
                // }
                accent
              />
            </div>

            <Button
              isHeroSub
              isHero
              text={'Case Studies'}
              cb={() =>
                lenis.scrollTo('#case-studies', {
                  duration: 1.2,
                  offset: -69,
                  easing: (x) => {
                    return x < 0.5
                      ? 4 * x * x * x
                      : 1 - Math.pow(-2 * x + 2, 3) / 2
                  },
                })
              }
            />
          </div>
        </div>
        {/* <motion.div
          variants={fadeInVariants}
          initial="initial"
          animate={introVisible ? 'initial' : 'animate'}
          className={clsx(
            'md:w-full',
            'xl:col-start-9 col-end-13 lg:max-w-[560px] ',
          )}
        >
          <div
            className={clsx(
              'geist text-[16px] leading-[28.5px] text-secondaryText mt-[28px] heroText',
              'md:mt-[0px]',
              'lg:text-[19px] lg:leading-[28.5px] lg:tracking-[-0.1px] lg:mt-[7px]',
            )}
          >
            <PortableText
              value={paragraph}
              components={myPortableTextComponents}
            />
          </div>
          <div
            className={clsx(
              'flex mt-[28px] gap-x-[16px]',
              'md:mt-[19px]',
              'lg:mt-[32px]',
            )}
          >
            <div data-cal-link="outframe/intro" tabIndex={0}>
              <Button
                isHero
                text={'Request Free Audit'}
                // cb={() =>
                //   lenis.scrollTo('#pricing', {
                //     duration: 1.2,
                //     offset: -69,
                //     easing: (x) => {
                //       return x < 0.5
                //         ? 4 * x * x * x
                //         : 1 - Math.pow(-2 * x + 2, 3) / 2
                //     },
                //   })
                // }
                accent
              />
            </div>

            <Button
              isHeroSub
              isHero
              text={'See Case Studies'}
              cb={() =>
                lenis.scrollTo('#case-studies', {
                  duration: 1.2,
                  offset: -69,
                  easing: (x) => {
                    return x < 0.5
                      ? 4 * x * x * x
                      : 1 - Math.pow(-2 * x + 2, 3) / 2
                  },
                })
              }
            />
          </div>
        </motion.div> */}
      </div>
      <div
        className={clsx(
          'lg:flex gap-x-[56px] md:mt-[102px] items-end justify-between w-full',
          'xl:grid xl:grid-cols-12 xl:gap-x-columnGap xl:mt-[134px]',
        )}
      >
        <motion.div
          ref={trackingDivRef}
          // variants={imageVariants}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          initial="initial"
          animate={introVisible ? 'initial' : 'animate'}
          className={clsx(
            'mt-[64px] w-full relative',
            'md:mt-[0px] md:w-[100%] h-[100%]',
            'lg:w-[120%]',
            'xl:col-span-7 xl:w-full',
          )}
        >
          <Link href={'/recent-work'} scroll={false}>
            {images && images.length > 0 && <HeroImage images={images} />}
          </Link>
          {/* This is the Image component */}
        </motion.div>
        <motion.div
          variants={fadeInVariants}
          initial="initial"
          animate={introVisible ? 'initial' : 'animate'}
          className={clsx(
            'mt-[76px] flex flex-col gap-y-[16px] w-full',
            'lg:mt-[0px] lg:w-full lg:max-w-[560px]',
            'xl:col-start-9 xl:col-end-[13]',
          )}
        >
          <div
            className={clsx(
              'text-[16px] leading-[24px] text-center text-secondaryText',
              'lg:text-left lg:text-[16px] lg:leading-[24px]',
            )}
          >
            {testimonialText !== '' && <PortableText value={testimonialText} />}
          </div>
          <div
            className={clsx(
              'flex justify-center items-center gap-x-[12px]',
              'lg:justify-start lg:mb-[9px]',
            )}
          >
            {testimonial && testimonial.image && testimonial.image.asset && (
              <Image
                src={urlForImage(testimonial.image.asset).url()}
                height={28}
                width={28}
                alt={String(testimonial.image.alt)}
                className={clsx('rounded-[2px]')}
              />
            )}
            <div
              className={clsx(
                'flex gap-x-[6px] text-[14px] leading-[16.8px] text-mainText',
                'lg:text-[16px] lg:leading-[24px]',
              )}
            >
              <span className={clsx('bg-background relative z-[2]')}>
                {testimonialName}
              </span>
              <span className={clsx('text-tertiaryText relative z-[1]')}>
                {role}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
