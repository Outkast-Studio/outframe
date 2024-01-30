import PostPage from 'components/PostPage'
import PreviewPostPage from 'components/PreviewPostPage'
import { readToken } from 'lib/sanity.api'
import {
  getAllPostsSlugs,
  getClient,
  getWorkBySlug,
  getSettings,
} from 'lib/sanity.client'
import { Post, Settings, Work } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  work: Work
  settings?: Settings
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const { settings, work, draftMode } = props
  console.log(work)
  return <div>{work.title}</div>
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  const [settings, work] = await Promise.all([
    getSettings(client),
    getWorkBySlug(client, params.slug),
  ])

  if (!work) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      work,

      settings,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllPostsSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/work/${slug}`) || [],
    fallback: 'blocking',
  }
}
