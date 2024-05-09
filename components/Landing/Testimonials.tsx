import { clsx } from 'clsx'
import { Testimonial } from 'lib/sanity.queries'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { myPortableTextComponents } from 'pages/_app'
import { urlForImage } from 'lib/sanity.image'
import SectionHeading from 'components/UI/SectionHeading'

type Props = {
  testimonials: Testimonial[]
}

const Testimoninals = ({ testimonials }: Props) => {
  return (
    <section
      className={clsx(
        'mt-[128px] mx-gutter geist text-mainText border-t-[1px] border-t-dividers',
        'md:flex',
        'lg:grid lg:grid-cols-12 lg:gap-x-columnGap',
      )}
    >
      <h6
        className={clsx(
          'w-full pt-[20px] monoMedium tracking-[-0.2px] uppercase text-[20px] leading-[24px]',
          'md:pt-[40px]',
          'lg:col-span-4',
          'xl:text-[24px] xl:leading-[33.6px]',
        )}
      >
        <SectionHeading text={'Testimonials'} />
      </h6>
      <div
        className={clsx(
          'flex flex-col gap-y-[64px] mt-[64px]',
          'md:w-full md:mt-[40px]',
          'lg:col-start-5 lg:col-end-13 lg:flex-row lg:flex-wrap lg:justify-between lg:gap-y-[32px]',
          'xl:col-start-6',
        )}
      >
        {testimonials.slice(0, 4).map((testimonial, index) => (
          <TestimonialCard
            key={index}
            index={index}
            testimonial={testimonial}
          />
        ))}
      </div>
    </section>
  )
}

export default Testimoninals

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial
  index: number
}) {
  if (
    !testimonial ||
    !testimonial.content ||
    !testimonial.image.asset ||
    !testimonial.name ||
    !testimonial.role
  ) {
    return <></>
  }
  return (
    <article
      className={clsx(
        'geist',
        'lg:w-[calc(50%-16px)] lg:flex lg:justify-between lg:flex-col',
      )}
    >
      <div
        className={clsx(
          'text-secondaryText text-[16px] leading-[24px]',
          'lg:h-fit',
        )}
      >
        <PortableText
          value={testimonial.content}
          components={myPortableTextComponents}
        />
      </div>
      <div
        className={clsx(
          'flex gap-x-[12px] mt-[16px]',
          'md:mt-[32px]',
          index < 2 && 'lg:pb-[60px] lg:border-b-[1px] lg:border-b-dividers',
          'lg:items-center',
        )}
      >
        <Image
          src={urlForImage(testimonial.image).url()}
          alt={String(testimonial.image.alt)}
          width={36}
          height={36}
          className={clsx('rounded-[2px]')}
        />
        <div
          className={clsx(
            'text-[14px] leading-[16.8px] flex gap-x-[6px] items-center',
            'lg:flex-col lg:items-start',
          )}
        >
          <h6 className={clsx('text-mainText')}>{testimonial.name}</h6>
          <h6 className={clsx('text-tertiaryText')}>{testimonial.role}</h6>
        </div>
      </div>
    </article>
  )
}
