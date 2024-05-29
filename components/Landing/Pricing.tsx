import React, { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import Image from 'next/image'
import { HomepageSettings } from 'lib/sanity.queries'
import SectionHeading from 'components/UI/SectionHeading'
import Button from '../UI/Button'

const Pricing = ({ settings }: { settings: HomepageSettings }) => {
  const [country, setCountry] = useState('US')
  const formatCurrency = (number: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(number)
  }

  useEffect(() => {
    async function fetchUserLocation() {
      try {
        const response = await fetch('/api/pricing')
        const data = await response.json()
        setCountry(data.country)
      } catch (error) {
        console.error(error)
      }
    }
    fetchUserLocation()
  }, [])

  const dayRate = {
    USD: settings.dayRate.USD,
    EUR: settings.dayRate.EUR,
    GBP: settings.dayRate.GBP,
  }

  const pricing = [
    {
      title: settings.flexPricing.title,
      daysPerWeek: '2 days / week',
      description: 'Best to design most projects in a reasonable timeframe.',
      USD: settings.flexPricing.USD,
      EUR: settings.flexPricing.EUR,
      GBP: settings.flexPricing.GBP,
    },
    {
      title: settings.partTimePricing.title,
      daysPerWeek: '3 days / week',
      description: 'Best for bigger projects or tighter deadlines.',
      USD: settings.partTimePricing.USD,
      EUR: settings.partTimePricing.EUR,
      GBP: settings.partTimePricing.GBP,
    },
    {
      title: settings.dedicatedPricing.title,
      daysPerWeek: 'More or fixed price',
      description:
        'Most suitable for big projects or if you prefer fixed price.',
      USD: settings.dedicatedPricing.USD,
      EUR: settings.dedicatedPricing.EUR,
      GBP: settings.dedicatedPricing.GBP,
    },
  ]
  return (
    <section
      id={'pricing'}
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
        <SectionHeading text={'Pricing'} />
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
              'hidden text-[18px] leading-[25.2px] geist',
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
            All plans have a rate of{' '}
            {country === 'US'
              ? dayRate.USD
              : country === 'Europe'
                ? dayRate.EUR
                : dayRate.GBP}
            /day.
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
            <PricingCard key={index} {...item} country={country} />
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
                'geistMedium text-[18px] leading-[27px] mb-[12px]',
                'lg:mb-[2px]',
                'xl:text-[20px] xl:leading-[28px]',
              )}
            >
              Not sure yet?
            </h6>
            <p
              className={clsx(
                'text-[16px] leading-[24px] geist text-secondaryText',
                'lg:text-[14px] lg:leading-[16.8px]',
                'xl:text-[16px] xl:leading-[24px]',
              )}
            >
              Try us for 1 week for $650 or get a free UX/UI audit
            </p>
          </div>
          {/* <button
            className={clsx(
              'border-dividers hidden border rounded-[4px] px-[18px] py-[12px] text-[14px] leading-[16.8px] monoMedium',
              'lg:block lg:h-fit',
            )}
          >
            Contact Us
          </button> */}
          <a
            href={'https://cal.com/outframe/intro'}
            target="_blank"
            rel={'noreferrer'}
          >
            <Button
              text={'Contact Us'}
              cb={() => {}}
              className={clsx(
                'border-dividers hidden border rounded-[4px] px-[18px] py-[12px] text-[14px] leading-[16.8px] monoMedium ',
                'lg:flex lg:h-fit',
              )}
            />
          </a>
        </div>
        <div
          className={clsx(
            'p-[24px]  border-[1px] border-dividers border-t-[0px]',
            'lg:px-[32px] lg:py-[16px]',
          )}
        >
          <p
            className={clsx(
              'text-[16px] leading-[24px] geist text-secondaryText',
              'lg:text-[14px] lg:leading-[16.8px]',
            )}
          >
            <span className={clsx('text-mainText')}>
              100% Happiness Guarantee.
            </span>{' '}
            If you’re not fully satisfied after the first month, we’ll give you
            a full refund.
          </p>
          <a
            href={'https://cal.com/outframe/intro'}
            target="_blank"
            rel={'noreferrer'}
            className={clsx(
              'border-dividers border rounded-[4px] px-[18px] py-[12px] mt-[24px] text-[14px] leading-[16.8px] monoMedium block w-fit',
              'lg:hidden',
            )}
          >
            Contact Us
          </a>
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
  USD,
  EUR,
  GBP,
  country,
}: {
  title: string
  daysPerWeek: string
  description: string
  USD: string
  EUR: string
  GBP: string
  country: string
}) {
  return (
    <article
      className={clsx(
        'border-[1px] border-dividers pb-[24px] bg-background',
        'lg:pb-[32px]',
      )}
    >
      <div
        className={clsx(
          'flex justify-between items-center geistMedium  p-[24px]',
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
              'mono text-[14px] leading-[14.4px] h-fit tracking-[-0.2px] px-[10px] pt-[4px] pb-[3px] bg-[#EBE7E3] rounded-full uppercase',
            )}
          >
            {daysPerWeek}
          </h6>
        </div>
        <h6 className={clsx('text-[18px] leading-[27px]', 'lg:hidden')}>
          {country === 'US' ? USD : country === 'Europe' ? EUR : GBP}
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
          'p-[24px] flex gap-x-[11px] justify-between',
          'lg:pt-[26px] lg:px-[32px] lg:pb-[38px]',
        )}
      >
        <p
          className={clsx(
            'text-secondaryText text-[16px] leading-[24px] geist',
            'xl:h-[48px]',
          )}
        >
          {description}
        </p>
        <a
          href={'https://cal.com/outframe/intro'}
          target="_blank"
          rel={'noreferrer'}
        >
          <button
            className={clsx(
              'text-[14px] whitespace-nowrap leading-[16.8px] tracking-[-0.2px] bg-accent mono text-white px-[16px] py-[12px] rounded-[4px] h-fit',
              'lg:hidden ',
            )}
          >
            Book a Call
          </button>
        </a>
      </div>
      <h6
        className={clsx(
          'hidden text-[28px] leading-[42px] tracking-[-0.4px] px-[32px] geist mb-[24px]',
          'lg:block ',
          'xl:text-[32px] xl:leading-[48px]',
        )}
      >
        {country === 'US' ? USD : country === 'Europe' ? EUR : GBP}
      </h6>
      <Image
        src={'/icons/dashed.svg'}
        alt={'dashed line'}
        width={600}
        height={1}
        className={clsx('hidden', 'lg:block')}
      />
      {/* <button
        className={clsx(
          'text-[14px] whitespace-nowrap hidden leading-[14.4px] tracking-[-0.2px] bg-accent monoMedium text-[#F7F7F7] px-[16px] py-[12px] rounded-[4px] h-fit mt-[32px] ml-[32px]',
          'lg:block ',
          'xl:text-[14px] xl:leading-[16.8px]',
        )}
      >
        Book a Call
      </button> */}

      <a
        href={'https://cal.com/outframe/intro'}
        target="_blank"
        rel={'noreferrer'}
      >
        <Button
          text={'Book a Call'}
          cb={() => {}}
          accent
          className={clsx(
            'text-[14px] whitespace-nowrap hidden leading-[14.4px] tracking-[-0.2px] bg-accent monoMedium text-[#F7F7F7] px-[16px] py-[12px] rounded-[4px] h-fit mt-[32px] ml-[32px]',
            'lg:flex',
            'xl:text-[14px] xl:leading-[16.8px]',
          )}
        />
      </a>
    </article>
  )
}
