import { NextSeo } from 'next-seo'
import NextHead from 'next/head'
import { urlForImage } from 'lib/sanity.image'

//SETUP GUIDE:
//Replace **Business with the correct detials.
//Ensure NODE_ENV is set to development during the build.
//Switch to production on Go live.

//Use Favicon.io to generate all required favicon files
export function CustomHead({
  title = 'Outframe – Product Design Studio',
  description,
  image,
  keywords,
  twitter = { handle: '@VytasBu' },
}) {
  //Replace with the default OG image
  const defaultTitle = 'Outframe – Product Design Studio'
  const defaultOGImage =
    'https://cdn.sanity.io/images/5m5oz66p/production/ad69848f7ee3e62e9beabc506fca27344688b867-2400x1260.png'
  const defaultDescription =
    'Outframe is a European digital product design studio with a focus on B2B SaaS design. Save time and money by working with senior design partners who will deliver more, for less.'

  return (
    <>
      <NextHead>
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="robots"
          content={
            process.env.NODE_ENV !== 'development'
              ? 'index,follow'
              : 'noindex,nofollow'
          }
        />
        <meta
          name="googlebot"
          content={
            process.env.NODE_ENV !== 'development'
              ? 'index,follow'
              : 'noindex,nofollow'
          }
        />

        <meta
          name="keywords"
          content={keywords && keywords.length ? keywords.join(',') : keywords}
        />
        <meta name="author" content="Outframe" />
        <meta name="referrer" content="no-referrer" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="geo.region" content="US" />
        <meta name="twitter:creator" content="@VytasBu" />
        <meta name="theme-color" content="#F7F7F7" />
        <meta name="twitter:title" content={title ? title : defaultTitle} />
        <meta name="twitter:description" content={description || ''} />
        <meta name="twitter:image" content={image ? image : defaultOGImage} />

        {/* START FAVICON */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon/favicon-16x16.png"
        />
        <link rel="manifest" href="/favicon/site.webmanifest" />
        <link rel="icon" href="/favicon/favicon-32x32.png" />
        {/* END FAVICON */}

        <title>{title ? title : defaultTitle}</title>
      </NextHead>
      <NextSeo
        title={title ? title : defaultTitle}
        description={description ? description : defaultDescription}
        openGraph={{
          title: title ? title : defaultTitle,
          description: description ? description : defaultDescription,
          type: 'website',
          locale: 'en_US',
          images: [
            {
              url: image ? image : defaultOGImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ],
          defaultImageWidth: 1200,
          defaultImageHeight: 630,
          site_name: '',
        }}
        twitter={{
          handle: twitter.handle,
          cardType: 'summary_large_image',
          site: 'https://outframe.co/',
        }}
      />
    </>
  )
}
