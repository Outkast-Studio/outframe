import React from 'react'
import { clsx } from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import { ImageAsset, PortableTextBlock } from 'sanity'
import { urlForImage } from 'lib/sanity.image'
import { Work } from 'lib/sanity.queries'
import { PortableText } from '@portabletext/react'
import { myPortableTextComponents } from 'pages/_app'

const CaseStudies = ({
  caseStudies,
}: {
  caseStudies: (Work | Testimonial)[]
}) => {
  console.log(caseStudies)
  return (
    <section
      className={clsx(
        'mx-gutter border-t-[1px] pt-[20px] border-dividers mt-[144px]',
        'lg:mt-[97px] lg:pt-[40px]',
      )}
    >
      <div
        className={clsx(
          'flex justify-between monoMedium text-[20px] leading-[24px] uppercase tracking-[-0.2px] font-medium',
          'lg:justify-start gap-x-[12px]',
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
      <div className={clsx('flex flex-col gap-y-[76px] mt-[70px]')}>
        {caseStudies &&
          caseStudies.length > 0 &&
          caseStudies.map((work: Testimonial | Work) => {
            return work._type === 'caseStudy' ? (
              <CaseStudyCard
                key={(work as Work).slug.current}
                title={(work as Work).title}
                thumbnail={(work as Work).thumbnailImage}
                slug={(work as Work).slug.current}
                linkTitle={(work as Work).linkTitle}
                caseStudyType={(work as Work).caseStudyType}
              />
            ) : (
              <TestimonialCard
                key={(work as Testimonial).name}
                name={(work as Testimonial).name}
                role={(work as Testimonial).role}
                content={(work as Testimonial).content}
                image={(work as Testimonial).image}
                _type="testimonial"
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
}

function CaseStudyCard({
  title,
  thumbnail,
  slug,
  linkTitle,
  caseStudyType,
}: Card) {
  return (
    <Link href={`/case-studies/${slug}`}>
      <article className={clsx('geist')}>
        <Image
          src={urlForImage(thumbnail.asset).url()}
          alt={String(thumbnail.alt)}
          width={1920}
          height={1920}
        />
        <h3
          className={clsx(
            'mt-[16px] medium-body text-[18px] leading-[27px] text-mainText mb-[16px]',
          )}
        >
          {title}
        </h3>

        <h6
          className={clsx(
            'border-b-[1px] border-b-dividers  pb-[16px] text-[14px] bodyCopy text-secondaryText',
          )}
        >
          {caseStudyType} → {linkTitle}
        </h6>
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
}

function TestimonialCard({ name, role, content, image }: Testimonial) {
  return (
    <article>
      <div className={clsx('testimonial')}>
        <PortableText value={content} components={myPortableTextComponents} />
      </div>
      <div className={clsx('flex gap-x-[12px] mt-[16px]')}>
        <Image
          src={urlForImage(image.asset).url()}
          alt={String(image.alt)}
          width={28}
          height={28}
        />
        <div
          className={clsx(
            'text-[12px] leading-[14.4px] flex gap-x-[6px] items-center',
          )}
        >
          <h6 className={clsx('text-mainText')}>{name}</h6>
          <h6 className={clsx('text-secondaryText')}>{role}</h6>
        </div>
      </div>
    </article>
  )
}
