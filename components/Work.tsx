import { SanityDocument } from 'next-sanity'
import { Work } from 'lib/sanity.queries'

export default function Post({ work }: { work: Work }) {
  return (
    <main className="container mx-auto prose prose-lg p-4">
      {work.title && <h1>{work.title}</h1>}
    </main>
  )
}
