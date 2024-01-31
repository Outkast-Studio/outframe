import { readToken } from 'lib/sanity.api'
import {
  getAllPostsSlugs,
  getClient,
  getWorkBySlug,
  getSettings,
} from 'lib/sanity.client'
import { Post, Settings, Work, workBySlugQuery } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'
import WorkPage from 'components/Work'
import { QueryParams } from 'next-sanity'
import PreviewComponent from 'components/PreviewComponent'
import { useLiveQuery } from 'next-sanity/preview'

interface PageProps extends SharedPageProps {
  work: Work
  settings?: Settings
  params: QueryParams
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const [data] = useLiveQuery<Work>(props.work, workBySlugQuery, props.params)

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
  return <WorkPage work={data} />
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
      params,
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
