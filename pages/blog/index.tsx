import { readToken } from 'lib/sanity.api'
import {
  getAllBlogPosts,
  getClient,
  getGlobalSettings,
} from 'lib/sanity.client'
import { Post, allPostQuery, GlobalSettings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { QueryParams, SanityDocument } from 'next-sanity'
import type { SharedPageProps } from 'pages/_app'
import { useLiveQuery } from 'next-sanity/preview'
import { Layout } from 'components/layouts/Layout'
import { clsx } from 'clsx'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import Link from 'next/link'
import Footer from 'components/FooterNew'
import Cursor from 'components/UI/Cursor'
import { useThemeStore } from 'stores/themeStore'
import { useEffect } from 'react'

interface PageProps extends SharedPageProps {
  posts: Post[]
  params: QueryParams
  globalSettings: GlobalSettings
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const [data] = useLiveQuery<Post[]>(props.posts, allPostQuery)

  const seo = {
    title: 'Outframe | Blog',
    description: '',
    image: '',
    keywords: [],
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout seo={seo}>
      <Cursor />
      <main className={clsx('px-gutter  text-mainText relative z-[2]')}>
        <div
          className={clsx(
            'lg:grid lg:grid-cols-12',
            'pt-[183px]',
            'lg:pt-[35vh]',
            'xl:pt-[40vh]',
          )}
        >
          <h1
            className={clsx(
              ' uppercase text-[36px] leading-[43.2px] tracking-[-0.2px] monoMedium text-mainText',
              'lg:text-[76px] lg:leading-[91.2px] lg:col-span-4',
            )}
          >
            Blog
          </h1>
          <p
            className={clsx(
              'text-[16px] leading-[24px] text-secondaryText geist mt-[32px]',
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
            'lg:mt-[196px] lg:grid lg:grid-cols-3',
            'xl:gap-[80px]',
          )}
        >
          {data.map((post) => (
            <BlogCard post={post} key={post._id} />
          ))}
        </section>
      </main>
      <Footer settings={props.globalSettings} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const posts = await getAllBlogPosts(client)
  const globalSettings = await getGlobalSettings(client)

  return {
    props: {
      posts,
      globalSettings,
      params,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}

export function BlogCard({
  post,
  isIndividualBlog = false,
}: {
  post: Post
  isIndividualBlog?: boolean
}) {
  const formattedDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })

  const setIsHoveringBlog = useThemeStore((state) => state.setIsHoveringBlog)

  const handleMouseEnter = () => {
    setIsHoveringBlog(true)
  }

  const handleMouseLeave = () => {
    setIsHoveringBlog(false)
  }

  if (
    !post ||
    !post.title ||
    !post.slug ||
    !post.date ||
    !post.cardSubtitle ||
    !post.coverImage
  ) {
    return <></>
  }

  return (
    <Link
      scroll={true}
      onClick={() => setIsHoveringBlog(false)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      href={`/blog/${post.slug.current}`}
      key={post._id}
      className={clsx(
        'md:w-[calc(50%-20px)]',
        'lg:w-full lg:h-full lg:block',
        isIndividualBlog && 'md:w-full lg:w-[33%] xl:w-[33%]',
      )}
    >
      <article
        key={post._id}
        className={clsx(
          'pb-[12px] border-b-[1px] border-b-dividers h-full hover:cursor-none',
          'lg:pb-[0px]',
        )}
      >
        <Image
          src={urlForImage(post.coverImage).url()}
          alt={String(post.coverImage.alt)}
          width={1200}
          height={1200}
          className={clsx(
            'lg:h-[20vw]  opacity-0 transition-opacity duration-300',
          )}
          onLoadingComplete={(image) => image.classList.remove('opacity-0')}
        />
        <div>
          <div
            className={clsx(
              'flex gap-x-[30px] leading-[27px] text-[18px] mt-[12px] geistMedium justify-between',
              'lg:mt-[16px] lg:text-[20px] lg:leading-[26px]',
            )}
          >
            <h6 className={clsx('lg:max-w-[404px]')}>{post.title}</h6>
            <span
              className={clsx(
                'whitespace-nowrap mono text-accent text-[14px] leading-[25px] tracking-[-0.2px]',
                'lg:text-[16px] leading-[24px]',
              )}
            >
              {formattedDate(post.date)}
            </span>
          </div>
          <p
            className={clsx(
              'text-secondaryText geist text-[16px] leading-[24px] mt-[12px]',
              'lg:mt-[16px] lg:text-[16px] leading-[26px] lg:pb-[16px]',
            )}
          >
            {post.cardSubtitle}
          </p>
        </div>
      </article>
    </Link>
  )
}
