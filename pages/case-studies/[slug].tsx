import { readToken } from 'lib/sanity.api'
import {
  getAllPostsSlugs,
  getClient,
  getWorkBySlug,
  getSettings,
} from 'lib/sanity.client'
import { Post, Settings, Work, workBySlugQuery } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps, Seo } from 'pages/_app'
import WorkPage from 'components/Work'
import { QueryParams } from 'next-sanity'
import { useLiveQuery } from 'next-sanity/preview'
import { Layout } from 'components/layouts/Layout'
import { urlForImage } from 'lib/sanity.image'
interface PageProps extends SharedPageProps {
  work: Work
  settings?: Settings
  params: QueryParams
  seo: Seo
}

interface Query {
  [key: string]: string
}

export default function ProjectSlugRoute(props: PageProps) {
  const [data] = useLiveQuery<Work>(props.work, workBySlugQuery, props.params)

  return (
    <Layout seo={props.seo}>
      <WorkPage work={data} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)

  //Settings can be used to get site settings. Things like naviagiton, social links.
  //Anything that's pulled from the CMS that needs to be on every page should use the settings
  //Function

  const [settings, work] = await Promise.all([
    getSettings(client),
    getWorkBySlug(client, params.slug),
  ])

  const seo = {
    title: work.metaTitle ? work.metaTitle : `Outframe | ${work.title}`,
    description: work.metaDescription || '',
    image: '',
    keywords: work.metaKeywords || [],
  }

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
      seo,
      token: draftMode ? readToken : '',
    },
  }
}

export const getStaticPaths = async () => {
  const slugs = await getAllPostsSlugs()

  return {
    paths: slugs?.map(({ slug }) => `/case-studies/${slug}`) || [],
    fallback: 'blocking',
  }
}
