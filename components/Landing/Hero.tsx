import React from 'react'
import { clsx } from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { ImageAsset } from 'sanity'
import { urlForImage } from 'lib/sanity.image'

type Props = {
  images: ImageAsset[]
}

const Hero = ({ images }: Props) => {
  console.log(images)
  const testimonialText =
    'They are accomplished, efficient and creative designers. Not only that, but their process extends to the overall business strategy, making helpful suggestions on the feature set and product roadmap.'
  const testimonialName = 'Marc Harris'
  const position = 'CTO, Howsy'

  return (
    <section className={clsx('pt-[183px] px-gutter geist', 'lg:pt-[180px]')}>
      <div
        className={clsx(
          'md:flex gap-x-[56px]',
          'xl:grid xl:grid-cols-12 xl:gap-x-columnGap',
        )}
      >
        <h1
          className={clsx(
            'text-[36px] leading-[43.2px] uppercase tracking-[-0.2px] monoMedium',
            'md:w-[120%]',
            'lg:text-[45px] lg:leading-[54px] l',
            'xl:text-[76px] xl:leading-[91.2px] xl:col-span-6 xl:w-full xl:tracking-[-0.4px]',
          )}
        >
          Product Design Partner, On Demand
        </h1>
        <div className={clsx('md:w-full', 'xl:col-start-8 col-end-[11]')}>
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
            <button
              className={clsx(
                'rounded-[4px] bg-accent text-background monoMedium px-[18px] py-[12px] text-[14px] leading-[16.8px] tracking-[-0.2px]',
              )}
            >
              View plans
            </button>
            <button
              className={clsx(
                'rounded-[4px] bg-background text-mainText monoMedium px-[18px] py-[12px] text-[14px] leading-[16.8px] tracking-[-0.2px] border-[1px] border-dividers',
              )}
            >
              Book a Call
            </button>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          'md:flex gap-x-[56px] md:mt-[102px] items-end',
          'xl:grid xl:grid-cols-12 xl:gap-x-columnGap xl:mt-[108px]',
        )}
      >
        <div
          className={clsx(
            'mt-[64px] w-full',
            'md:mt-[0px] md:w-[120%]',
            'xl:col-span-6 xl:w-[100%]',
          )}
        >
          {/* <div
            className={clsx(
              'h-[229px] bg-dividers',
              'md:h-[381px]',
              'xl:h-[550px]',
            )}
          ></div> */}
          <Image
            src={urlForImage(images[0].asset).url()}
            alt={String(images[0].alt)}
            width={2440}
            height={1080}
            className={clsx('object-cover')}
          />
          {/* This is the Image component */}
        </div>
        <div
          className={clsx(
            'mt-[76px] flex flex-col gap-y-[16px] w-full',
            'md:mt-[0px]',
            'xl:col-start-8 xl:col-end-[11]',
          )}
        >
          <p
            className={clsx(
              'text-[16px] leading-[24px] text-center text-secondaryText',
              'md:text-left md:text-[14px] md:leading-[21px]',
            )}
          >
            "{testimonialText}"
          </p>
          <div
            className={clsx(
              'flex justify-center items-center gap-x-[12px]',
              'md:justify-start md:mb-[9px]',
            )}
          >
            {/* <Image src={'#'} height={28} width={28} alt={'#'} /> */}
            <div
              className={clsx(
                'flex gap-x-[6px] text-[14px] leading-[16.8px] text-mainText',
              )}
            >
              <span>{testimonialName}</span>
              <span className={clsx('text-tertiaryText')}>{position}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
