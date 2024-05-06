import { clsx } from 'clsx'
import { Work } from 'lib/sanity.queries'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import { ModuleFactory } from './UI/ModuleFactory'
import Footer from './Footer'
import Link from 'next/link'
import Background from './UI/Background'

export default function Post({ work }: { work: Work }) {
  return (
    <>
      <main className={clsx('px-gutter text-mainText relative z-[2]')}>
        <Link
          href={'/'}
          className={clsx(
            'flex mt-[16px] items-center gap-x-[12px] py-[12px] px-[18px] border-dividers rounded-[4px] border-[1px] font-monoMedium w-fit',
            'lg:mt-[175px]',
          )}
        >
          <Image
            src={'/icons/arrow.svg'}
            width={12}
            height={12}
            alt={'arrow'}
          />
          <span>Back</span>
        </Link>
        <div
          className={clsx(
            'mt-[135px]',
            'lg:flex lg:mt-[32px] lg:gap-x-[32px]',
            'xl:grid-cols-12 xl:grid xl:gap-x-[0px]',
          )}
        >
          <div className={clsx('xl:col-span-6')}>
            <h1
              className={clsx(
                'font-monoMedium uppercase text-[36px] leading-[43.2px] mb-[15px]',
                'lg:text-[44px] lg:leading-[58.34px]  lg:tracking-[-0.4px] lg:mb-[32px]',
              )}
            >
              {work.title && work.title}
            </h1>
            <div
              className={clsx(
                'flex gap-x-[8px] gap-y-[12px] flex-wrap',
                'lg:flex-row-reverse lg:justify-start lg:items-start lg:flex-nowrap lg:w-fit',
              )}
            >
              {work.roles &&
                work.roles.length > 0 &&
                work.roles.map((role, index) => (
                  <div
                    key={`role-${role}`}
                    className={clsx(
                      'py-[4px] px-[10px] font-semiMono uppercase text text-[12px] leading-[14.4px] tracking-[-0.2px] bg-[#EBE7E3] rounded-full whitespace-nowrap',
                    )}
                  >
                    {role}
                  </div>
                ))}
              <div
                className={clsx(
                  'flex gap-x-[8px] flex-row-reverse',
                  'lg:flex-row',
                )}
              >
                <div
                  className={clsx(
                    'py-[4px] px-[10px] font-semiMono uppercase text text-[12px] leading-[14.4px] tracking-[-0.2px] bg-accent  rounded-full text-background',
                  )}
                >
                  {work.type && work.type}
                </div>
                <div
                  className={clsx(
                    'py-[4px] px-[10px] font-semiMono uppercase text text-[12px] leading-[14.4px] tracking-[-0.2px] bg-accent  rounded-full text-background',
                    'lg:mr-[10px]',
                  )}
                >
                  {work.year && work.year}
                </div>
              </div>
            </div>
          </div>
          <p
            className={clsx(
              'mt-[53px] text-secondaryText text-[16px] leading-[24px] font-sansRegular',
              'lg:mt-[0px]',

              'xl:col-start-8 lg:col-end-13 xl:max-w-[560px]',
            )}
          >
            {work.subtitle && work.subtitle}
          </p>
        </div>
        {work.thumbnailImage && (
          <Image
            src={urlForImage(work.thumbnailImage).url()}
            width={2440}
            height={1080}
            alt={String(work.thumbnailImage.alt)}
            className={clsx('mt-[32px]', 'lg:mt-[148px]')}
          />
        )}
        <section className={clsx('mt-[64px]', 'lg:mt-[127px]', 'xl:px-[64px]')}>
          {work.modules &&
            work.modules.map((module, index) => (
              <ModuleFactory key={index} module={module} />
            ))}
        </section>
        <section
          className={clsx(
            'mt-[40px] border-t-[1px] border-dividers pt-[20px]',
            'lg:grid lg:grid-cols-12  lg:pt-[40px]',
          )}
        >
          <h6
            className={clsx(
              'text-[18px] leading-[21.6px] tracking-[-0.2px] font-monoMedium uppercase mb-[32px]',
              'lg:col-span-5 lg:normal-case lg:text-[24px] lg:leading-[33.6px] ',
            )}
          >
            Next project
          </h6>
          {work.nextProject && (
            <Link
              href={work.nextProject.slug.current}
              className={clsx('lg:col-span-6 lg:col-start-7')}
            >
              <Image
                src={urlForImage(work.nextProject.thumbnailImage).url()}
                width={2440}
                height={1080}
                alt={String(work.nextProject.thumbnailImage.alt)}
              />
              <div className={clsx('lg:flex lg:pt-[16px] lg:justify-between')}>
                <h6
                  className={clsx(
                    'text-[18px] font-sansMedium leading-[27px] my-[16px]',
                    'lg:my-[0px] lg:text-[20px] lg:leading-[28px] lg:max-w-[464px]',
                  )}
                >
                  {work.nextProject.title}
                </h6>
                <div
                  className={clsx(
                    'flex font-sansRegular text-[14px] leading-[16.8px] text-secondaryText',
                    'lg:text-[16px] lg:leading-[24px] lg:flex-col lg:items-end',
                  )}
                >
                  <span className="whitespace-nowrap">
                    {work.nextProject.caseStudyType} →{' '}
                  </span>
                  <span className="whitespace-nowrap">
                    {' '}
                    {work.nextProject.linkTitle}
                  </span>
                </div>
              </div>
            </Link>
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
