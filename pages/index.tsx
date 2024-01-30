import { getAllPosts, getClient, getSettings } from 'lib/sanity.client'
import { Post, Settings } from 'lib/sanity.queries'
import { GetStaticProps } from 'next'
import type { SharedPageProps } from 'pages/_app'

interface PageProps extends SharedPageProps {
  posts: Post[]
  settings: Settings
}

interface Query {
  [key: string]: string
}

export default function Page(props: PageProps) {
  return <></>
}

//Uncomment if you need SSG on home page

// export const getStaticProps: GetStaticProps<PageProps, Query> = async (ctx) => {
//   const { draftMode = false } = ctx
//   const client = getClient(draftMode ? { token: readToken } : undefined)

//   const [settings, posts = []] = await Promise.all([
//     getSettings(client),
//     getAllPosts(client),
//   ])

//   return {
//     props: {
//       posts,
//       settings,
//       draftMode,
//       token: draftMode ? readToken : '',
//     },
//   }
// }
