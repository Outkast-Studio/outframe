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

type Props = {
  images: ImageAsset[]
  testimonial: Testimonial
}

const Hero = ({ images, testimonial }: Props) => {
  console.log(images)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const trackingDivRef = useRef<HTMLDivElement>(null)
  const testimonialText = testimonial.content
  const testimonialName = testimonial.name
  const role = testimonial.role
  const introVisible = useThemeStore((state) => state.introVisible)
  const setIsHoveringHeroImage = useThemeStore(
    (state) => state.setIsHoveringHeroImage,
  )

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
    <section className={clsx('pt-[183px] px-gutter geist', 'lg:pt-[180px]')}>
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
            'text-[36px] leading-[43.2px] uppercase tracking-[-0.2px] monoMedium',
            'md:w-[120%]',
            'lg:text-[45px] lg:leading-[54px] l',
            'xl:text-[76px] xl:leading-[91.2px] xl:col-span-6 xl:w-full xl:tracking-[-0.4px]',
          )}
        >
          <span
            className={clsx('overflow-y-hidden inline-block', ' lg:h-[70px]')}
          >
            <motion.span
              variants={h1ChildrenVariants}
              className={clsx('inline-block')}
            >
              SR.&nbsp;
            </motion.span>
          </span>
          <span className={clsx('overflow-hidden inline-block', 'lg:h-[70px]')}>
            <motion.span
              variants={h1ChildrenVariants}
              className={clsx('inline-block')}
            >
              Product&nbsp;
            </motion.span>
          </span>
          <span
            className={clsx(
              'overflow-hidden inline-block h-[70px]',
              'lg:h-[70px]',
            )}
          >
            <motion.span
              variants={h1ChildrenVariants}
              className={clsx('inline-block')}
            >
              Design&nbsp;
            </motion.span>
          </span>
          <span
            className={clsx('overflow-hidden inline-block ', 'lg:h-[70px]')}
          >
            <motion.span
              variants={h1ChildrenVariants}
              className={clsx('inline-block')}
            >
              Partner&nbsp;
            </motion.span>
          </span>
          <span className={clsx('overflow-hidden inline-block', 'lg:h-[70px]')}>
            <motion.span
              variants={h1ChildrenVariants}
              className={clsx('inline-block')}
            >
              On&nbsp;
            </motion.span>
          </span>
          <span
            className={clsx('overflow-hidden inline-block ', 'lg:h-[70px]')}
          >
            <motion.span
              variants={h1ChildrenVariants}
              className={clsx('inline-block')}
            >
              Demand.
            </motion.span>
          </span>
        </motion.h1>
        <motion.div
          variants={fadeInVariants}
          initial="initial"
          animate={introVisible ? 'initial' : 'animate'}
          className={clsx('md:w-full', 'xl:col-start-8 col-end-[11]')}
        >
          <p
            className={clsx(
              'geist text-[16px] leading-[24px] text-secondaryText mt-[28px]',
              'md:mt-[0px]',
            )}
          >
            <span className={clsx('text-mainText')}>
              This is Outframe Studio.
            </span>{' '}
            We create impactful, scalable and future-proof design plans. Start
            with a free trial or a comprehensive UX/UI audit. Elevate your
            product’s UX.
          </p>
          <div className={clsx('flex mt-[28px] gap-x-[16px]', 'md:mt-[19px]')}>
            <Button
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
            <Button text={'Book a call'} cb={() => {}} />
          </div>
        </motion.div>
      </div>
      <div
        className={clsx(
          'lg:flex gap-x-[56px] md:mt-[102px] items-end ',
          'xl:grid xl:grid-cols-12 xl:gap-x-columnGap xl:mt-[108px]',
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
            'md:mt-[0px] md:w-[120%] h-[100%]',
            'xl:col-span-6 xl:w-[100%]',
          )}
        >
          <Link href={'/recent-work'}>
            <HeroImage images={images} />
          </Link>
          {/* This is the Image component */}
        </motion.div>
        <motion.div
          variants={fadeInVariants}
          initial="initial"
          animate={introVisible ? 'initial' : 'animate'}
          className={clsx(
            'mt-[76px] flex flex-col gap-y-[16px] w-full',
            'md:mt-[0px]',
            'xl:col-start-8 xl:col-end-[11]',
          )}
        >
          <div
            className={clsx(
              'text-[16px] leading-[24px] text-center text-secondaryText',
              'md:text-left md:text-[14px] md:leading-[21px]',
            )}
          >
            <PortableText value={testimonialText} />
          </div>
          <div
            className={clsx(
              'flex justify-center items-center gap-x-[12px]',
              'md:justify-start md:mb-[9px]',
            )}
          >
            <Image
              src={urlForImage(testimonial.image.asset).url()}
              height={28}
              width={28}
              alt={String(testimonial.image.alt)}
              className={clsx('rounded-[2px]')}
            />
            <div
              className={clsx(
                'flex gap-x-[6px] text-[14px] leading-[16.8px] text-mainText',
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
