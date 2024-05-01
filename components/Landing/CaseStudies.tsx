import React, { useState, useRef, useEffect } from 'react'
import { clsx } from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import { ImageAsset, PortableTextBlock } from 'sanity'
import { urlForImage } from 'lib/sanity.image'
import { Work } from 'lib/sanity.queries'
import { PortableText } from '@portabletext/react'
import { myPortableTextComponents } from 'pages/_app'
import { motion } from 'framer-motion'
import { useThemeStore } from 'stores/themeStore'

const CaseStudies = ({ caseStudies }: { caseStudies: any[] }) => {
  return (
    <section
      id={'case-studies'}
      className={clsx(
        'mx-gutter border-t-[1px] pt-[20px] border-dividers mt-[144px]',
        'md:pt-[0px]',
        'lg:mt-[97px]',
      )}
    >
      <div
        className={clsx(
          'flex justify-between monoMedium text-[20px] leading-[24px] uppercase tracking-[-0.2px] font-medium',
          'lg:justify-start gap-x-[12px] md:hidden',
        )}
      >
        <h2 className={clsx('')}>Case Studies</h2>
        <span className={clsx('hidden text-tertiaryText', 'lg:block')}>/</span>
        <Link
          href="/recent-work"
          className={clsx(
            'flex gap-x-[12px] items-center justify-between',
            'lg:items-end lg:gap-x-[6px]',
          )}
        >
          <span className={clsx('text-tertiaryText')}>Recent work</span>
          <Image
            src={'/icons/recentWorkArrow.svg'}
            height={11}
            width={10}
            alt={'arrow'}
            className={clsx('lg:pb-[4px]')}
          />
        </Link>
      </div>
      <div
        className={clsx(
          'flex flex-col gap-y-[76px] mt-[70px]',
          'md:grid md:grid-cols-2 md:gap-x-[85px] md:mt-[43px] md:gap-y-[0px]',
          'xl:gap-x-[228px] xl:mt-[40px]',
        )}
      >
        <div
          className={clsx(
            'justify-between monoMedium hidden text-[20px] leading-[24px] uppercase tracking-[-0.2px] font-medium',
            'md:justify-start gap-x-[12px] md:flex md:h-fit',
          )}
        >
          <h2 className={clsx('')}>Case Studies</h2>
          <span className={clsx('hidden text-tertiaryText', 'md:block')}>
            /
          </span>
          <Link
            href="/recent-work"
            className={clsx(
              'flex gap-x-[12px] items-center justify-between',
              'lg:items-end lg:gap-x-[6px]',
            )}
          >
            <span className={clsx('text-tertiaryText')}>Recent work</span>
            <Image
              src={'/icons/recentWorkArrow.svg'}
              height={11}
              width={10}
              alt={'arrow'}
              className={clsx('lg:pb-[4px]')}
            />
          </Link>
        </div>
        {caseStudies &&
          caseStudies.length > 0 &&
          caseStudies.map((work: Testimonial | Work, index) => {
            return work._type === 'caseStudy' ? (
              <CaseStudyCard
                key={(work as Work).slug.current}
                title={(work as Work).title}
                thumbnail={(work as Work).thumbnailImage}
                slug={(work as Work).slug.current}
                linkTitle={(work as Work).linkTitle}
                caseStudyType={(work as Work).caseStudyType}
                index={index}
              />
            ) : (
              <TestimonialCard
                key={(work as Testimonial).name}
                name={(work as Testimonial).name}
                role={(work as Testimonial).role}
                content={(work as Testimonial).content}
                image={(work as Testimonial).image}
                _type="testimonial"
                index={index}
              />
            )
          })}
      </div>
    </section>
  )
}

export default CaseStudies

type Card = {
  title: string
  thumbnail: ImageAsset
  slug: string
  linkTitle: string
  caseStudyType: string
  index: number
}

function CaseStudyCard({
  title,
  thumbnail,
  slug,
  linkTitle,
  caseStudyType,
  index,
}: Card) {
  const [isVisible, setIsVisible] = useState(false)
  const setIsHoveringCaseStudy = useThemeStore(
    (state) => state.setIsHoveringCaseStudy,
  )

  const handleMouseEnter = () => {
    setIsHoveringCaseStudy(true)
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setIsHoveringCaseStudy(false)
    setIsVisible(false)
  }

  return (
    <Link
      href={`/case-studies/${slug}`}
      className={clsx(
        index == 3 &&
          'md:col-span-2 md:w-[calc(50%-42.5px)] md:justify-self-end md:mt-[162px] lg:w-[calc(50%-114px)] lg:mt-[153px]',
      )}
    >
      <article
        className={clsx(
          'font-sansRegular',
          index == 1 && 'md:mt-[-32px] lg:mt-[-256px]',
          index == 4 && 'md:mt-[-32px] lg:mt-[-256px]',
        )}
      >
        <div
          className={clsx('relative overflow-hidden')}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={clsx(
              'absolute z-[2] bg-black opacity-[0] w-full h-full transition-opacity duration-[0.3s]',
              isVisible && '!opacity-[0.15]',
            )}
          ></div>

          <Image
            src={urlForImage(thumbnail.asset).url()}
            alt={String(thumbnail.alt)}
            width={1920}
            height={1920}
            className={clsx(
              'ease-[cubic-bezier(0.34, 0, 0.36, 1)] scale-1 duration-[0.3s] transition-transform',
              isVisible && 'scale-[1.04]',
            )}
          />
        </div>
        <div
          className={clsx(
            'lg:flex lg:border-b-[1px] lg:border-b-dividers lg:mt-[16px] lg:pb-[16px] lg:gap-x-[33px] lg:justify-between',
          )}
        >
          <h3
            className={clsx(
              'mt-[16px] medium-body text-[18px] leading-[27px] text-mainText mb-[16px] font-sansMedium',
              'lg:my-0 lg:leading-[25.2px] lg:max-w-[464px]',
            )}
          >
            {title}
          </h3>

          <h6
            className={clsx(
              'border-b-[1px] border-b-dividers  pb-[16px] text-[14px] bodyCopy text-secondaryText',
              'lg:border-b-[0px] lg:pb-[0px] lg:text-[16px] lg:leading-[24px] lg:flex lg:flex-col lg:items-end',
            )}
          >
            <span className="whitespace-nowrap">{caseStudyType} → </span>
            <span className="whitespace-nowrap">{linkTitle}</span>
          </h6>
        </div>
      </article>
    </Link>
  )
}

type Testimonial = {
  name: string
  role: string
  content: PortableTextBlock
  image: ImageAsset
  _type: string
  index: number
}

function TestimonialCard({ name, role, content, image, index }: Testimonial) {
  return (
    <article
      className={clsx('self-end', 'md:max-w-[378px]', 'xl:max-w-[560px]')}
    >
      <div
        className={clsx(
          'testimonial text-[14px] leading-[21px] font-sansRegular text-secondaryText',
          'xl:text-[16px] xl:leading-[24px]',
        )}
      >
        <PortableText value={content} components={myPortableTextComponents} />
      </div>
      <div className={clsx('flex gap-x-[12px] mt-[16px]')}>
        <Image
          src={urlForImage(image.asset).url()}
          alt={String(image.alt)}
          width={28}
          height={28}
          className="rounded-[2px]"
        />
        <div
          className={clsx(
            'text-[12px] leading-[14.4px] flex gap-x-[6px] items-center',
            'xl:text-[14px] xl:leading-[16.8px]',
          )}
        >
          <h6 className={clsx('text-mainText')}>{name}</h6>
          <h6 className={clsx('text-secondaryText')}>{role}</h6>
        </div>
      </div>
    </article>
  )
}
