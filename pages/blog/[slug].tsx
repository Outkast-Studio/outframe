import { readToken } from 'lib/sanity.api'
import {
  getAllPostsSlugs,
  getClient,
  getWorkBySlug,
  getPostBySlug,
  getGlobalSettings,
} from 'lib/sanity.client'
import { Post, postBySlugQuery, GlobalSettings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps, Seo } from 'pages/_app'
import { QueryParams } from 'next-sanity'
import { useLiveQuery } from 'next-sanity/preview'
import { Layout } from 'components/layouts/Layout'
import BlogPage from 'components/BlogPage'
import { urlForImage } from 'lib/sanity.image'
import Footer from 'components/FooterNew'
interface PageProps extends SharedPageProps {
  post: Post
  params: QueryParams
  seo: Seo
  globalSettings: GlobalSettings
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const [data] = useLiveQuery<Post>(props.post, postBySlugQuery, props.params)
  return (
    <Layout seo={props.seo}>
      <BlogPage post={data} />
      <Footer settings={props.globalSettings} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const post = await getPostBySlug(client, params.slug)
  const globalSettings = await getGlobalSettings(client)
  const seo = {
    title: post.metaTitle ? post.metaTitle : `Outframe | ${post.title}`,
    description: post.metaDescription || '',
    image: post.postOGImage ? urlForImage(post.postOGImage).url() : '',
    keywords: post.metaKeywords || [],
  }

  if (!post) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      post,
      params,
      globalSettings,
      draftMode,
      seo,
      token: draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllPostsSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/blog/${slug}`) || [],
    fallback: 'blocking',
  }
}
