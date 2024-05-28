import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  useCdn,
} from 'lib/sanity.api'
import {
  indexQuery,
  type Post,
  postAndMoreStoriesQuery,
  postBySlugQuery,
  postSlugsQuery,
  workBySlugQuery,
  allWorkQuery,
  workSlugsQuery,
  type Settings,
  homepageQuery,
  settingsQuery,
  allPostQuery,
  globalSettingsQuery,
  recentWorkQuery,
  recentWorkSettingsQuery,
} from 'lib/sanity.queries'
import { createClient, type SanityClient } from 'next-sanity'

export function getClient(preview?: { token: string }): SanityClient {
  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn,
    perspective: 'published',
    encodeSourceMap: preview?.token ? true : false,
    studioUrl,
  })
  if (preview) {
    if (!preview.token) {
      throw new Error('You must provide a token to preview drafts')
    }
    return client.withConfig({
      token: preview.token,
      useCdn: false,
      ignoreBrowserTokenWarning: true,
      perspective: 'previewDrafts',
    })
  }
  return client
}

export const getSanityImageConfig = () => getClient()

export async function getSettings(client: SanityClient): Promise<Settings> {
  return (await client.fetch(settingsQuery)) || {}
}

export async function getAllPosts(client: SanityClient): Promise<Post[]> {
  return (await client.fetch(indexQuery)) || []
}

export async function getAllPostsSlugs(): Promise<Pick<Post, 'slug'>[]> {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(postSlugsQuery)) || []
  //@ts-ignore
  return slugs.map((slug) => ({ slug }))
}

export async function getPostBySlug(
  client: SanityClient,
  slug: string,
): Promise<Post> {
  return (await client.fetch(postBySlugQuery, { slug })) || ({} as any)
}

export async function getPostAndMoreStories(
  client: SanityClient,
  slug: string,
): Promise<{ post: Post; morePosts: Post[] }> {
  return await client.fetch(postAndMoreStoriesQuery, { slug })
}

export async function getWorkBySlug(client: SanityClient, slug: string) {
  return (await client.fetch(workBySlugQuery, { slug })) || ({} as any)
}

export async function getAllWork(client: SanityClient) {
  return (await client.fetch(allWorkQuery)) || []
}

export async function getAllBlogPosts(client: SanityClient) {
  return (await client.fetch(allPostQuery)) || []
}

export async function getAllWorkSlugs() {
  const client = getClient()
  const slugs = (await client.fetch<string[]>(workSlugsQuery)) || []
  return slugs.map((slug) => ({ slug }))
}

export async function getHomepageSettings(client: SanityClient) {
  return (await client.fetch(homepageQuery)) || {}
}

export async function getAllRecentWork(client: SanityClient) {
  return (await client.fetch(recentWorkSettingsQuery)) || []
}

export async function getGlobalSettings(client: SanityClient) {
  return (await client.fetch(globalSettingsQuery)) || {}
}
