import { SanityDocument } from 'next-sanity'
import { Work } from 'lib/sanity.queries'
import Link from 'next/link'

export default function Post({ work }: { work: Work[] }) {
  console.log(work)
  return (
    <main className="container mx-auto prose prose-lg p-4">
      {work.map((workItem) => (
        //@ts-ignore
        <Link href={`/work/${workItem.slug.current}`} key={workItem._id}>
          {workItem.title}
        </Link>
      ))}
    </main>
  )
}
