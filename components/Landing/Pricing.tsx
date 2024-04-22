import React from 'react'
import { clsx } from 'clsx'
import Image from 'next/image'

const Pricing = () => {
  const pricing = [
    {
      title: 'Flex',
      daysPerWeek: '1 day / week',
      description: 'Flexible plan for shorter projects, or just to start',
      price: '2,400',
    },
    {
      title: 'Part-time',
      daysPerWeek: '2 days / week',
      description: 'Flexible plan for shorter projects, or just to start',
      price: '4,800',
    },
    {
      title: 'Dedicated',
      daysPerWeek: '3 days / week',
      description: 'Flexible plan for shorter projects, or just to start',
      price: '7,200',
    },
  ]
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
          'w-full pt-[20px]  monoMedium tracking-[-0.2px] uppercase text-[20px] leading-[24px]',
          'md:pt-[40px]',
          'lg:col-span-4',
          'xl:text-[24px] xl:leading-[33.6px]',
        )}
      >
        PRICING
      </h6>
      <div className={clsx('lg:col-start-5 lg:col-end-13', 'xl:col-start-6')}>
        <div
          className={clsx(
            'hidden',
            'lg:flex lg:gap-x-[30px] items-end lg:mt-[40px] lg:justify-between',
          )}
        >
          <p
            className={clsx(
              'hidden text-[18px] leading-[25.2px] font-sansRegular',
              'lg:block xl:text-[20px] xl:leading-[30px] xl:max-w-[680px]',
            )}
          >
            Engage with us on short-term projects for immediate needs, or embark
            on a long-term collaboration and enjoy a 10% discount on our
            services.
          </p>
          <p
            className={clsx(
              'text-[14px] leading-[16.8px] text-accent whitespace-nowrap',
              'xl:text-[16px] xl:leading-[24px]',
            )}
          >
            All plans have a rate of $650/day.
          </p>
        </div>

        <div
          className={clsx(
            'flex flex-col gap-y-[20px] mt-[64px]',
            'md:mt-[40px]',
            'lg:flex-row lg:gap-x-[30px]',
          )}
        >
          {pricing.map((item, index) => (
            <PricingCard key={index} {...item} />
          ))}
        </div>
        <div
          className={clsx(
            'lg:flex lg:mt-[40px] justify-between lg:border-dividers lg:border lg:p-[32px]',
          )}
        >
          <div
            className={clsx(
              'p-[24px] mt-[20px] border-[1px] border-dividers',
              'lg:mt-[0px] lg:border-[0px] lg:p-0',
            )}
          >
            <h6
              className={clsx(
                'font-sansMedium text-[18px] leading-[27px] mb-[12px]',
                'lg:mb-[2px]',
                'xl:text-[20px] xl:leading-[28px]',
              )}
            >
              Not sure yet?
            </h6>
            <p
              className={clsx(
                'text-[16px] leading-[24px] font-sansRegular text-secondaryText',
                'lg:text-[14px] lg:leading-[16.8px]',
                'xl:text-[16px] xl:leading-[24px]',
              )}
            >
              Try us for 1 week for $650 or get a free UX/UI audit
            </p>
          </div>
          <button
            className={clsx(
              'border-dividers hidden border rounded-[4px] px-[18px] py-[12px] text-[14px] leading-[16.8px] font-monoMedium',
              'lg:block lg:h-fit',
            )}
          >
            Contact Us
          </button>
        </div>
        <div
          className={clsx(
            'p-[24px]  border-[1px] border-dividers border-t-[0px]',
            'lg:px-[32px] lg:py-[16px]',
          )}
        >
          <p
            className={clsx(
              'text-[16px] leading-[24px] font-sansRegular text-secondaryText',
              'lg:text-[14px] lg:leading-[16.8px]',
            )}
          >
            <span className={clsx('text-mainText')}>
              100% Happiness Guarantee.
            </span>{' '}
            If you’re not fully satisfied after the first month, we’ll give you
            a full refund.
          </p>
          <button
            className={clsx(
              'border-dividers border rounded-[4px] px-[18px] py-[12px] mt-[24px] text-[14px] leading-[16.8px] font-monoMedium',
              'lg:hidden',
            )}
          >
            Contact Us
          </button>
        </div>
      </div>
    </section>
  )
}

export default Pricing

function PricingCard({
  title,
  daysPerWeek,
  description,
  price,
}: {
  title: string
  daysPerWeek: string
  description: string
  price: string
}) {
  return (
    <article
      className={clsx('border-[1px] border-dividers pb-[24px]', 'lg:pb-[32px]')}
    >
      <div
        className={clsx(
          'flex justify-between items-center font-sansMedium  p-[24px]',
          'lg:p-[32px] lg:pb-0',
        )}
      >
        <div
          className={clsx(
            'flex gap-x-[12px] items-center',
            'lg:flex-col lg:gap-y-[46px] lg:items-start',
          )}
        >
          <h6
            className={clsx(
              'text-[18px] leading-[27px]',
              'lg:text-[18px] lg:leading-[27px]',
              'xl:text-[20px] xl:leading-[28px]',
            )}
          >
            {title}
          </h6>
          <h6
            className={clsx(
              'font-monoRegular text-[12px] leading-[14.4px] h-fit tracking-[-0.2px] px-[10px] py-[4px] bg-[#EBE7E3] rounded-full uppercase',
            )}
          >
            {daysPerWeek}
          </h6>
        </div>
        <h6 className={clsx('text-[18px] leading-[27px]', 'lg:hidden')}>
          ${price}/m
        </h6>
      </div>
      <Image
        src={'/icons/dashed.svg'}
        alt={'dashed line'}
        width={600}
        height={1}
        className={clsx('lg:hidden')}
      />
      <div
        className={clsx(
          'p-[24px] flex gap-x-[11px]',
          'lg:pt-[26px] lg:px-[32px] lg:pb-[38px]',
        )}
      >
        <p
          className={clsx(
            'text-secondaryText text-[16px] leading-[24px] font-sansRegular',
          )}
        >
          {description}
        </p>
        <button
          className={clsx(
            'text-[14px] whitespace-nowrap leading-[16.8px] tracking-[-0.2px] bg-accent font-monoRegular text-white px-[16px] py-[12px] rounded-[4px] h-fit',
            'lg:hidden ',
          )}
        >
          Book a Call
        </button>
      </div>
      <h6
        className={clsx(
          'hidden text-[28px] leading-[42px] tracking-[-0.4px] px-[32px] font-sansRegular mb-[24px]',
          'lg:block ',
          'xl:text-[32px] xl:leading-[48px]',
        )}
      >
        ${price}/m
      </h6>
      <Image
        src={'/icons/dashed.svg'}
        alt={'dashed line'}
        width={600}
        height={1}
        className={clsx('hidden', 'lg:block')}
      />
      <button
        className={clsx(
          'text-[12px] whitespace-nowrap hidden leading-[14.4px] tracking-[-0.2px] bg-accent font-monoMedium text-[#F7F7F7] px-[16px] py-[12px] rounded-[4px] h-fit mt-[32px] ml-[32px]',
          'lg:block ',
          'xl:text-[14px] xl:leading-[16.8px]',
        )}
      >
        Book a Call
      </button>
    </article>
  )
}
