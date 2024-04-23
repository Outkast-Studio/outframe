import { readToken } from 'lib/sanity.api'
import { getAllBlogPosts, getClient } from 'lib/sanity.client'
import { Post, allPostQuery } from 'lib/sanity.queries'
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
interface PageProps extends SharedPageProps {
  posts: Post[]
  params: QueryParams
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const [data] = useLiveQuery<Post[]>(props.posts, allPostQuery)
  console.log(data)

  const formattedDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
  return (
    <Layout>
      <main className={clsx('px-gutter bg-background text-mainText')}>
        <div className={clsx('pt-[191px]', 'lg:grid lg:grid-cols-12  ')}>
          <h1
            className={clsx(
              ' uppercase text-[36px] leading-[43.2px] tracking-[-0.2px] font-monoMedium text-mainText',
              'lg:text-[76px] lg:leading-[91.2px] lg:col-span-4',
            )}
          >
            Blog
          </h1>
          <p
            className={clsx(
              'text-[16px] leading-[24px] text-secondaryText font-sansRegular mt-[32px]',
              'lg:mt-[0px] lg:text-[20px] lg:leading-[30px] lg:max-w-[560px] lg:col-start-8 lg:col-end-13',
            )}
          >
            A variety of subjects that explain the process behind the process of
            creating Design systems, how to incorporate tokens, pros and cons of
            X and many more. Feel free to reach out to us, we’d love to hear
            your opinion on any of the articles.
          </p>
        </div>
        <section
          className={clsx(
            'mt-[64px] flex flex-col gap-y-[88px]',
            'md:flex-row md:flex-wrap md:gap-[40px]',
            'lg:mt-[196px]',
            'xl:gap-[80px]',
          )}
        >
          {data.map((post) => (
            <Link
              href={`/blog/${post.slug.current}`}
              key={post._id}
              className={clsx(
                'md:w-[calc(50%-20px)]',
                'lg:w-[calc(33%-24px)]',
                'xl:w-[calc(33%-50px)]',
              )}
            >
              <article
                key={post._id}
                className={clsx(
                  'pb-[12px] border-b-[1px] border-b-dividers',
                  'lg:pb-[16px]',
                )}
              >
                <Image
                  src={urlForImage(post.coverImage).url()}
                  alt={String(post.coverImage.alt)}
                  width={1200}
                  height={1200}
                />
                <div
                  className={clsx(
                    'flex gap-x-[30px] leading-[27px] text-[18px] mt-[12px] font-sansMedium justify-between',
                    'lg:mt-[16px] lg:text-[20px] lg:leading-[26px]',
                  )}
                >
                  <h6 className={clsx('lg:max-w-[404px]')}>{post.title}</h6>
                  <span
                    className={clsx(
                      'whitespace-nowrap font-monoRegular text-accent text-[14px] leading-[25px] tracking-[-0.2px]',
                      'lg:text-[16px] leading-[24px]',
                    )}
                  >
                    {formattedDate(post.date)}
                  </span>
                </div>
                <p
                  className={clsx(
                    'text-secondaryText font-sansRegular text-[16px] leading-[24px] mt-[12px]',
                    'lg:mt-[16px] lg:text-[16px] leading-[26px]',
                  )}
                >
                  {post.cardSubtitle}
                </p>
              </article>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const posts = await getAllBlogPosts(client)

  return {
    props: {
      posts,
      params,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
