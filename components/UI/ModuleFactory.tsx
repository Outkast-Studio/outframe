import React from 'react'
import { SingleImage, TwoColumnImage, TextBlock } from 'lib/sanity.queries'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import { clsx } from 'clsx'
import { PortableText } from '@portabletext/react'
import { myPortableTextComponents } from 'pages/_app'

export const SingleImageComponent = ({ image }) => {
  return (
    <div className={clsx('w-full mb-[64px]', 'lg:mb-[128px]')}>
      {image && (
        <Image
          src={urlForImage(image).url()}
          alt={image.alt}
          width={2440}
          height={1080}
        />
      )}
    </div>
  )
}

export const TwoColumnImageComponent = ({ leftImage, rightImage }) => {
  return (
    <div
      className={clsx(
        'flex flex-col gap-y-[20px] mb-[80px]',
        'lg:flex-row lg:gap-x-[32px] lg:mb-[128px]',
      )}
    >
      <div className={clsx('w-full', 'lg:h-full')}>
        {leftImage && (
          <Image
            src={urlForImage(leftImage).url()}
            alt={leftImage.alt}
            width={2440}
            height={1080}
            className={clsx('lg:h-full')}
          />
        )}
      </div>
      <div className={clsx('w-full', 'lg:h-full')}>
        {rightImage && (
          <Image
            src={urlForImage(rightImage).url()}
            alt={rightImage.alt}
            width={2440}
            height={1080}
            className={clsx('lg:h-full')}
          />
        )}
      </div>
    </div>
  )
}

export const TextBlockComponent = ({ textBlock }: { textBlock: TextBlock }) => {
  return (
    <div
      className={clsx(
        'w-full mb-[80px] pt-[20px] border-t-[1px] border-t-dividers text-mainText',
        'lg:pt-[40px] lg:grid lg:grid-cols-12 lg:mb-[156px]',
      )}
    >
      <h6
        className={clsx(
          'text-[18px] leading-[21.6px] tracking-[-0.2px] uppercase font-monoMedium mb-[32px]',
          'lg:text-[24px] lg:leading-[33.6px] lg:normal-case lg:col-span-5',
        )}
      >
        {textBlock && textBlock.title && textBlock.title}
      </h6>
      <div
        className={clsx(
          'text-secondaryText text-[16px] leading-[24px] font-sansRegular',
          'lg:text-[20px] lg:leading-[30px] lg:col-start-7 lg:col-span-6',
        )}
      >
        <PortableText
          value={textBlock.content}
          components={myPortableTextComponents}
        />
      </div>
    </div>
  )
}

function TestimonialBlock({ testimonialBlock }) {
  return (
    <article
      className={clsx(
        'mb-[88px] max-w-[560px] font-sansRegular',
        'lg:max-w-[731px] lg:flex lg:flex-col lg:items-center lg:justify-center lg:mx-auto lg:mb-[133px]',
      )}
    >
      <div
        className={clsx(
          'text-secondaryText  text-[16px] leading-[24px]',
          'lg:text-center lg:text-[24px] lg:leading-[36px] lg:tracking-[-0.2px]',
        )}
      >
        <PortableText
          value={testimonialBlock.content}
          components={myPortableTextComponents}
        />
      </div>
      <div className={clsx('flex gap-x-[12px] mt-[16px]')}>
        {testimonialBlock && testimonialBlock.image && (
          <Image
            src={urlForImage(testimonialBlock.image.asset).url()}
            alt={String(testimonialBlock.image.alt)}
            width={28}
            height={28}
            className="rounded-[2px] w-[22px] h-[22px] lg:w-[28px] lg:h-[28px]"
          />
        )}

        <div
          className={clsx(
            'text-[14px] leading-[16.8px] flex gap-x-[6px] items-center',
          )}
        >
          <h6 className={clsx('text-mainText')}>
            {testimonialBlock.name && testimonialBlock.name}
          </h6>
          <h6 className={clsx('text-secondaryText')}>
            {testimonialBlock.role && testimonialBlock.role}
          </h6>
        </div>
      </div>
    </article>
  )
}

export const ModuleFactory = ({ module }) => {
  switch (module._type) {
    case 'singleImage':
      return <SingleImageComponent image={module.image} />
    case 'twoColumnImage':
      return (
        <TwoColumnImageComponent
          leftImage={module.imageLeft}
          rightImage={module.imageRight}
        />
      )
    case 'textBlock':
      return <TextBlockComponent textBlock={module} />
    case 'testimonialBlock':
      return <TestimonialBlock testimonialBlock={module} />
    default:
      return null
  }
}
