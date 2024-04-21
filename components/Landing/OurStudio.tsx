import React from 'react'
import { clsx } from 'clsx'
import Image from 'next/image'
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
        Our Studio
      </h6>
      <div
        className={clsx(
          'flex',
          ' md:mt-[28px] items-start',
          'lg:grid lg:grid-cols-12 lg:gap-x-columnGap lg:mt-[22px]',
        )}
      >
        <Image
          src={'/images/vytas.png'}
          alt={'Portrait of the founder of Outframe, Vytas'}
          width={960}
          height={960}
          className={clsx(
            'hidden',
            'md:block object-cover w-[50%]',
            'lg:w-full lg:col-span-4',
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
                    'md:text-[40px] md:leading-[52px] md:trakcing-[-0.4px]  md:font-monoRegular',
                    'lg:text-[44px] lg:leading-[57.2px]',
                  )}
                >
                  $1B+
                </h6>
                <span
                  className={clsx(
                    'text-[16px] leading-[24px] text-secondaryText',
                  )}
                >
                  Raised
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
                    'md:text-[40px] md:leading-[52px] md:trakcing-[-0.4px] md:font-monoRegular',
                    'lg:text-[44px] lg:leading-[57.2px]',
                  )}
                >
                  100+
                </h6>
                <span
                  className={clsx(
                    'text-[16px] leading-[24px] text-secondaryText',
                  )}
                >
                  SaaS Projects
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
              'lg:max-w-[644px] lg:text-[20px] lg:leading-[30px]',
            )}
          >
            Database backup and recovery are essential skills that every senior
            developer must master. <br />
            <br /> Firstly, backup frequency is an important consideration in
            database backup. Generally, the more critical the data, the higher
            the backup frequency should be. For critical data, daily backups are
            recommended, combined with incremental and differential backup
            strategies to minimize the impact on database performance.
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
