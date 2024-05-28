import { readToken } from 'lib/sanity.api'
import {
  getAllWork,
  getClient,
  getSettings,
  getHomepageSettings,
  getGlobalSettings,
} from 'lib/sanity.client'
import {
  Post,
  Settings,
  Work,
  allWorkQuery,
  HomepageSettings,
  homepageQuery,
  GlobalSettings,
} from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import { draftMode } from 'next/headers'
import { QueryParams, SanityDocument } from 'next-sanity'
import type { Seo, SharedPageProps } from 'pages/_app'
import { useLiveQuery } from 'next-sanity/preview'
import IndexPage from 'components/IndexPage'
import { Layout } from 'components/layouts/Layout'
interface PageProps extends SharedPageProps {
  work: Work[]
  params: QueryParams
  homepageSettings: HomepageSettings
  seo: Seo
  globalSettings: GlobalSettings
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

  console.log(props.globalSettings)
  return (
    <Layout seo={props.seo}>
      <IndexPage
        work={data}
        homepageSettings={homepageSettings}
        globalSettings={props.globalSettings}
      />
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
  const { draftMode = false, params = {} } = ctx
  const client = getClient(draftMode ? { token: readToken } : undefined)
  const work = await getAllWork(client)
  const homepageSettings = await getHomepageSettings(client)
  const globalSettings = await getGlobalSettings(client)
  const seo = {
    title: 'Outframe – Product Design Studio',
    description:
      'Outframe is a European digital product design studio with a focus on B2B SaaS design. Save time and money by working with senior design partners who will deliver more, for less.',
    image: '',
    keywords: [],
  }

  return {
    props: {
      work,
      globalSettings,
      homepageSettings,
      params,
      draftMode,
      seo,
      token: draftMode ? readToken : '',
    },
  }
}
