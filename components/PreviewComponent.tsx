import { QueryParams, SanityDocument } from 'next-sanity'
import { useLiveQuery } from 'next-sanity/preview'
import Work from './Work'
import IndexPage from './IndexPage'

export default function PreviewComponent({
  document,
  params,
  query,
  documentType,
}: {
  document: any
  params: QueryParams
  query: string
  documentType: string
}) {
  const [data] = useLiveQuery<SanityDocument>(document, query, params)

  //This should be updated for every new page.
  switch (documentType) {
    case 'work':
      return <Work work={data} />
    case 'index':
      return <IndexPage work={data} />
    default:
      return <></>
  }
}
