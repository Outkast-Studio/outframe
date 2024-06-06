import React, { useState, useRef } from 'react'
import { clsx } from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { ImageAsset } from 'sanity'
import { urlForImage } from 'lib/sanity.image'
import { PortableText } from '@portabletext/react'
import { Testimonial } from 'lib/sanity.queries'
import { motion } from 'framer-motion'
import { useThemeStore } from 'stores/themeStore'
import { useLenis } from '@studio-freight/react-lenis'
import HeroImage from 'components/UI/HeroImage'
import Button from 'components/UI/Button'
import homepageSettings from 'schemas/homepageSettings'
import { useWindowSize } from 'hooks/useWindowSize'

type Props = {
  images: ImageAsset[]
  testimonial: Testimonial
  title: string
}

const Hero = ({ images, testimonial, title }: Props) => {
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
  const { width } = useWindowSize()
  const lenis = useLenis()
  const h1Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.35,
      },
    },
  }

  const fadeInVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 1,
        duration: 0.2,
      },
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
        'pt-[183px] px-gutter geist',
        'lg:pt-[35vh]',
        'xl:pt-[40vh]',
      )}
    >
      <div
        className={clsx(
          'md:flex gap-x-[56px]',
          'xl:grid xl:grid-cols-12 xl:gap-x-columnGap',
        )}
      >
        <motion.h1
          variants={h1Variants}
          initial="initial"
          animate={introVisible ? 'initial' : 'animate'}
          className={clsx(
            'text-[36px] leading-[43.2px] uppercase tracking-[-0.2px] monoMedium text-mainText',
            'md:w-[120%]',
            'lg:text-[3.4vw] lg:leading-[3.4vw]',
            'xl:text-[4.4vw] xl:leading-[5vw] xl:col-span-7 xl:w-full xl:tracking-[-4px] ',
          )}
        >
          {title}
          {/* {title.split(' ').map((word, index) => (
            <span
              key={'hero-title' + index}
              className={clsx(
                'overflow-y-hidden inline-block h-[33px]',
                'lg:h-[3.4vw]',
                ' xl:h-[4.4vw]',
              )}
            >
              <motion.span
                variants={h1ChildrenVariantsMobile}
                className={clsx('inline-block', 'lg:hidden')}
              >
                {word}&nbsp;
              </motion.span>
              <motion.span
                variants={h1ChildrenVariants}
                className={clsx('hidden', 'lg:inline-block')}
              >
                {word}&nbsp;
              </motion.span>
            </span>
          ))} */}
        </motion.h1>
        <motion.div
          variants={fadeInVariants}
          initial="initial"
          animate={introVisible ? 'initial' : 'animate'}
          className={clsx(
            'md:w-full',
            'xl:col-start-9 col-end-13 lg:max-w-[560px] ',
          )}
        >
          <p
            className={clsx(
              'geist text-[16px] leading-[28.5px] text-secondaryText mt-[28px]',
              'md:mt-[0px]',
              'lg:text-[19px] lg:leading-[28.5px] lg:tracking-[-0.1px]',
            )}
          >
            <span className={clsx('text-mainText')}>Outframe</span> is an
            independent studio practice of Vytas Bu, and the perfect design
            partner for startups and B2B companies. Part of your team, all
            without the overheads of an agency.
          </p>
          <div
            className={clsx(
              'flex mt-[28px] gap-x-[16px]',
              'md:mt-[19px]',
              'lg:mt-[32px]',
            )}
          >
            <Button
              isHero
              text={'View plans'}
              cb={() =>
                lenis.scrollTo('#pricing', {
                  duration: 1.2,
                  offset: -69,
                  easing: (x) => {
                    return x < 0.5
                      ? 4 * x * x * x
                      : 1 - Math.pow(-2 * x + 2, 3) / 2
                  },
                })
              }
              accent
            />
            <a
              href={'https://cal.com/outframe/intro'}
              target="_blank"
              rel={'noreferrer'}
            >
              <Button text={'Book a call'} cb={() => {}} />
            </a>
          </div>
        </motion.div>
      </div>
      <div
        className={clsx(
          'lg:flex gap-x-[56px] md:mt-[102px] items-end justify-between w-full',
          'xl:grid xl:grid-cols-12 xl:gap-x-columnGap xl:mt-[81px]',
        )}
      >
        <motion.div
          ref={trackingDivRef}
          variants={imageVariants}
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
