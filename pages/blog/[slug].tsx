import { readToken } from 'lib/sanity.api'
import {
  getAllPostsSlugs,
  getClient,
  getWorkBySlug,
  getPostBySlug,
} from 'lib/sanity.client'
import { Post, postBySlugQuery } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps, Seo } from 'pages/_app'
import { QueryParams } from 'next-sanity'
import PreviewComponent from 'components/PreviewComponent'
import { useLiveQuery } from 'next-sanity/preview'
import { Layout } from 'components/layouts/Layout'
import BlogPage from 'components/BlogPage'

interface PageProps extends SharedPageProps {
  post: Post
  params: QueryParams
  seo: Seo
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const [data] = useLiveQuery<Post>(props.post, postBySlugQuery, props.params)
  console.log(data)

  // if (draftMode) {
  //   return (
  //     <PreviewComponent
  //       document={work}
  //       params={props.params}
  //       documentType="work"
  //       query={workBySlugQuery}
  //     />
  //   )
  // }
  return (
    <Layout seo={props.seo}>
      <BlogPage post={data} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const post = await getPostBySlug(client, params.slug)

  const seo = {
    title: post?.title || '',
    description: post?.metaDescription || '',
    image: '',
    keywords: '',
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
