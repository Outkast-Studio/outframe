import React from 'react'
import { clsx } from 'clsx'
import Image from 'next/image'
import SectionHeading from 'components/UI/SectionHeading'

const OurStudio = () => {
  return (
    <section className={clsx('mt-[118px] px-gutter geist text-mainText')}>
      <h6
        className={clsx(
          'w-full pt-[20px] border-t-[1px] border-t-dividers monoMedium tracking-[-0.2px] uppercase text-[20px] leading-[24px]',
          'md:pt-[40px]',
          'xl:text-[24px] xl:leading-[33.6px]',
        )}
      >
        <SectionHeading text={'Our Studio'} />
      </h6>
      <div
        className={clsx(
          'flex',
          ' md:mt-[28px] items-start',
          'lg:grid lg:grid-cols-12 lg:gap-x-columnGap lg:mt-[22px]',
        )}
      >
        <Image
          src={'/images/AvatarNew.png'}
          alt={'Portrait of the founder of Outframe, Vytas'}
          width={960}
          height={960}
          className={clsx(
            'hidden',
            'md:block object-cover w-[50%]',
            'lg:w-full lg:col-span-4 lg:max-w-[700px]',
            'xl:col-span-4',
          )}
        />
        <div
          className={clsx(
            'md:w-full',
            'lg:col-start-5 lg:col-end-13',
            'xl:col-start-6',
          )}
        >
          <div
            className={clsx(
              'flex items-center justify-between mt-[45px]',
              'md:mt-[0px]',
            )}
          >
            <div
              className={clsx(
                'flex flex-col gap-y-[32px] min-w-[100px]',
                'md:flex-row md:gap-x-[64px] md:pb-[32px]  md:border-b-[1px] md:border-b-dividers md:w-full',
                'lg:gap-x-[128px]',
              )}
            >
              <div
                className={clsx(
                  'pt-[12px] border-t-[1px] border-t-dividers',
                  'md:border-t-[0px]',
                )}
              >
                <h6
                  className={clsx(
                    'monoMedium text-[18px] leading-[21.6px] tracking-[-0.2px] ',
                    'md:text-[40px] md:leading-[52px] md:trakcing-[-0.4px] md:mono',
                    'lg:text-[44px] lg:leading-[57.2px]',
                  )}
                >
                  50+
                </h6>
                <span
                  className={clsx(
                    'text-[16px] leading-[24px] text-secondaryText text-sansRegular',
                  )}
                >
                  SaaS Projects
                </span>
              </div>
              <div
                className={clsx(
                  'pt-[12px] border-t-[1px] border-t-dividers',
                  'md:border-t-[0px]',
                )}
              >
                <h6
                  className={clsx(
                    'monoMedium text-[18px] leading-[21.6px] tracking-[-0.2px] ',
                    'md:text-[40px] md:leading-[52px] md:trakcing-[-0.4px]  md:mono',
                    'lg:text-[44px] lg:leading-[57.2px]',
                  )}
                >
                  $500M+
                </h6>
                <span
                  className={clsx(
                    'text-[16px] leading-[24px] text-secondaryText',
                  )}
                >
                  Raised
                </span>
              </div>
            </div>
            <Image
              src={'/images/vytas.png'}
              alt={'Portrait of the founder of Outframe, Vytas'}
              width={960}
              height={960}
              className={clsx('w-[calc(100%-132px)]', 'md:hidden')}
            />
          </div>
          <p
            className={clsx(
              'mt-[32px] text-[16px] leading-[24px]',
              'lg:max-w-[718px] lg:text-[16px] lg:leading-[24px] lg:tracking-[-0.1px]',
            )}
          >
            Hi there, I&apos;m Vytas, creator of Outframe.
            <br />
            <br /> I started this studio to tackle a widespread issue in the B2B
            sector: poor design and a shortage of specialised designers. <br />
            <br /> Its purpose is to deliver affordable, beautiful and
            incredibly intuitive product designs. <br />
            <br /> With over eight years of experience, I&apos;ve helped more
            than 50 companies use design to achieve product-market fit and fuel
            their growth. While I have a few talented designers working with me,
            I handle most of the work myself, ensuring quality and exceptional
            craftsmanship for all. <br />
            <br /> Having experienced the startup rollercoaster multiple times,
            I bring more than just attractive design to the table. I also offer
            practical advice on growth tactics, product strategy, and vision.
          </p>
          <div className={clsx('flex gap-x-[12px] mt-[20px]', 'md:mt-[32px]')}>
            <Image
              src={'/images/vytasPortrait.jpeg'}
              alt={'Portrait of the founder of Outframe, Vytas'}
              width={28}
              height={28}
              className={clsx('rounde-[2px]')}
            />
            <div
              className={clsx(
                'text-[14px] leading-[16.8px] flex gap-x-[6px] items-center',
              )}
            >
              <h6 className={clsx('text-mainText')}>Vytas Butke</h6>
              <h6 className={clsx('text-tertiaryText')}>Founder, Outframe</h6>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurStudio
