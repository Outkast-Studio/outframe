import PreviewComponent from 'components/PreviewComponent'
import { readToken } from 'lib/sanity.api'
import {
  getAllWork,
  getClient,
  getSettings,
  getHomepageSettings,
} from 'lib/sanity.client'
import {
  Post,
  Settings,
  Work,
  allWorkQuery,
  HomepageSettings,
  homepageQuery,
} from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { draftMode } from 'next/headers'
import { QueryParams, SanityDocument } from 'next-sanity'
import type { SharedPageProps } from 'pages/_app'
import { useLiveQuery } from 'next-sanity/preview'
import IndexPage from 'components/IndexPage'
import { Layout } from 'components/layouts/Layout'
interface PageProps extends SharedPageProps {
  work: Work[]
  params: QueryParams
  homepageSettings: HomepageSettings
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  const [data] = useLiveQuery<Work[]>(props.work, allWorkQuery)
  const [homepageSettings] = useLiveQuery<HomepageSettings>(
    props.homepageSettings,
    homepageQuery,
  )
  const { work, draftMode } = props

  //Need to grab settings here.

  //Presentation laye when stable.
  // if (draftMode) {
  //   return (
  //     <PreviewComponent
  //       document={work}
  //       params={props.params}
  //       documentType="index"
  //       query={allWorkQuery}
  //     />
  //   )
  // }

  return (
    <Layout>
      <IndexPage work={data} homepageSettings={homepageSettings} />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const work = await getAllWork(client)
  const homepageSettings = await getHomepageSettings(client)
  return {
    props: {
      work,
      homepageSettings,
      params,
      draftMode,
      token: draftMode ? readToken : '',
    },
  }
}
