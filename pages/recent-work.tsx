import { readToken } from 'lib/sanity.api'
import { getAllRecentWork, getClient } from 'lib/sanity.client'
import { RecentWorkSettings, recentWorkSettingsQuery } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { QueryParams, SanityDocument } from 'next-sanity'
import type { SharedPageProps } from 'pages/_app'
import { useLiveQuery } from 'next-sanity/preview'
import { Layout } from 'components/layouts/Layout'
import { clsx } from 'clsx'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import Link from 'next/link'
import Footer from 'components/Footer'
import HorizontalScroll from 'components/UI/HorizontalScroll'
import { useSearchParams } from 'next/navigation'

interface PageProps extends SharedPageProps {
  recentWork: RecentWorkSettings
  params: QueryParams
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const [data] = useLiveQuery<RecentWorkSettings>(
    props.recentWork,
    recentWorkSettingsQuery,
  )

  const seo = {
    title: 'Outframe | Recent Work',
    description: '',
    image: '',
    keywords: [],
  }

  return (
    <div className={clsx('')}>
      <Layout seo={seo}>
        <main
          className={clsx(
            'px-gutter bg-background text-mainText relative z-[2]',
          )}
        >
          <div
            className={clsx(
              'pt-[191px]',
              'lg:grid lg:grid-cols-12',
              'lg:hidden',
            )}
          >
            <h1
              className={clsx(
                ' uppercase text-[36px] leading-[43.2px] tracking-[-0.2px] font-monoMedium text-mainText',
                'lg:text-[76px] lg:leading-[91.2px] lg:col-span-4',
              )}
            >
              Recent
              <br /> Work
            </h1>
            <p
              className={clsx(
                'text-[16px] leading-[24px] text-secondaryText font-sansRegular mt-[32px]',
                'lg:mt-[0px] lg:text-[20px] lg:leading-[30px] lg:max-w-[560px] lg:col-start-8 lg:col-end-13',
              )}
            >
              <span className={clsx('text-mainText')}>Recent Work.</span> Here
              you will find some designs from our most recent projects, as well
              as visual experiments. Feel free to check our case studies for
              more in-depth work.
            </p>
          </div>
          <section
            className={clsx(
              'mt-[72px] flex flex-col gap-y-[65px]',
              'lg:hidden',
            )}
          >
            {data.recentWork.length > 0 &&
              data.recentWork.map((work, index) => {
                if (!work || !work.title || !work.year || !work.image) {
                  return <></>
                }
                return (
                  <article key={work.title + index}>
                    <Image
                      src={urlForImage(work.image).url()}
                      alt={String(work.image.alt)}
                      width={1200}
                      height={1200}
                    />
                    <div
                      className={clsx(
                        'flex mt-[8px] items-center justify-between',
                      )}
                    >
                      <h6
                        className={clsx(
                          'text-[16px] leading-[24px] text-secondaryText font-sansRegular',
                        )}
                      >
                        {work.title}
                      </h6>
                      <span
                        className={clsx(
                          'text-accent font-monoRegular text-[14px] leading-[25.2px] tracking-[-0.2px]',
                        )}
                      >
                        {work.year}
                      </span>
                    </div>
                  </article>
                )
              })}
          </section>
        </main>
        <div className={clsx('lg:hidden')}>
          <Footer />
        </div>
        <HorizontalScroll recentWork={data.recentWork} />
      </Layout>
    </div>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const recentWork = await getAllRecentWork(client)

  return {
    props: {
      recentWork,
      params,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
