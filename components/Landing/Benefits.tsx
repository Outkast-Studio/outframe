import { clsx } from 'clsx'
import SectionHeading from 'components/UI/SectionHeading'
import Image from 'next/image'
const Benefits = () => {
  const benefits = [
    {
      name: 'Easier than in-house',
      description:
        'Just recruiting a product designer will take you months and cost you at least $20,000.',
      image: '/icons/easier.svg',
    },
    {
      name: 'Cheaper than agencies',
      description:
        'At least 50% cheaper than most agencies or talent marketplaces with huge markups.',
      image: '/icons/cheap.svg',
    },
    {
      name: 'Safer than freelance',
      description:
        'Freelancers come and go, but we’re always here for you, rain or shine.',
      image: '/icons/saferThanFreelancer.svg',
    },
    {
      name: 'Faster than others',
      description:
        'Subscribe, hop on a kick-off call and receive your first designs in just a few days.',
      image: '/icons/faster.svg',
    },
    {
      name: 'Better UX/UI skills',
      description:
        'You work directly with a vetted sr. UX/UI designer who can design a top-notch interface.',
      image: '/icons/better.svg',
    },
    {
      name: 'Part of your team',
      description:
        'We work closely with our clients as an extension of their team.',
      image: '/icons/part.svg',
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
        <SectionHeading text={'Benefits'} />
      </h6>
      <div
        className={clsx(
          'flex flex-col gap-y-[40px] mt-[64px]',
          'md:w-full md:mt-[40px]',
          'lg:col-start-5 lg:col-end-13 lg:flex-row lg:flex-wrap lg:justify-between lg:gap-y-[24px]',
          'xl:col-start-6',
        )}
      >
        {benefits.map((benefit, index) => (
          <article
            className={clsx('lg:w-[calc(50%-32px)]', 'ml:w-[30%]')}
            key={'benefit' + index}
          >
            <div
              className={clsx(
                'flex justify-between items-center mb-[16px]',
                'lg:mb-[48px] ',
              )}
            >
              <div
                className={clsx(
                  'flex gap-x-[8px] items-center',
                  'lg:gap-x-[12px] lg:mb-0',
                )}
              >
                <h6
                  className={clsx(
                    'text-accent mono text-[16px] leading-[24px]',
                  )}
                >
                  0{index + 1}
                </h6>
                <h6
                  className={clsx(
                    'leading-[27px] text-[18px] geistMedium',
                    'lg:text-[20px] lg:leading-[28px]',
                  )}
                >
                  {benefit.name}
                </h6>
              </div>
              {/* <div
                className={clsx(
                  'h-[10px] w-[10px] bg-dividers',
                  'lg:hidden',
                  'xl:block',
                )}
              ></div> */}
              <Image
                src={benefit.image}
                alt={benefit.name + ' icon'}
                width={24}
                height={24}
              />
            </div>
            <p
              className={clsx(
                'text-secondaryText text-[16px] leading-[24px]',
                'lg:h-[116px]',
                index < 3 && 'ml:border-b-[1px] ml:border-b-dividers',
              )}
            >
              {benefit.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Benefits
