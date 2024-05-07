import React, { useEffect, useState } from 'react'
import Footer from './Footer'
import { clsx } from 'clsx'
import { Post } from 'lib/sanity.queries'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import { PortableText } from '@portabletext/react'
import { myPortableTextComponents } from 'pages/_app'
import * as Accordion from '@radix-ui/react-accordion'
import { useLenis } from '@studio-freight/react-lenis'
import { BlogCard } from '../pages/blog'
import Cursor from './UI/Cursor'

const BlogPage = ({ post }: { post: Post }) => {
  const formattedDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    })

  const toc = post.toc
  const lenis = useLenis()
  const [activeId, setActiveId] = useState('')

  function getIdFromText(text: string) {
    return text.toLowerCase().replace(/\s/g, '-')
  }
  useEffect(() => {
    let visibleSections = []

    const headings = Array.from(document.querySelectorAll('h2'))

    const callback = (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id
        if (entry.isIntersecting) {
          visibleSections.push({
            id,
            ratio: entry.intersectionRatio,
            boundingRect: entry.boundingClientRect,
          })
        } else {
          visibleSections = visibleSections.filter(
            (section) => section.id !== id,
          )
        }
      })

      if (visibleSections.length) {
        const closestSection = visibleSections.reduce((prev, current) => {
          // Calculate the distance of the center of each section from the viewport center
          const prevDistance = Math.abs(
            prev.boundingRect.top +
              prev.boundingRect.height / 2 -
              window.innerHeight / 2,
          )
          const currentDistance = Math.abs(
            current.boundingRect.top +
              current.boundingRect.height / 2 -
              window.innerHeight / 2,
          )
          return prevDistance < currentDistance ? prev : current
        })
        setActiveId(closestSection.id)
      }
    }

    const observer = new IntersectionObserver(callback, {
      rootMargin: '0px',
      threshold: 1.0,
    })

    headings.forEach((heading) => {
      const text = heading.textContent?.toLowerCase().replace(/\s/g, '-')
      const matchingToc = toc.find(
        (item) => item.text.toLowerCase() === heading.textContent.toLowerCase(),
      )
      if (matchingToc) {
        heading.id = text
      }
      observer.observe(heading)
    })
    return () => {
      headings.forEach((heading) => observer.unobserve(heading))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleScrollTo(id: string) {
    lenis.scrollTo(id, { offset: -200, duration: 1.5 })
  }

  return (
    <>
      <Cursor />
      <main
        className={clsx(
          'px-gutter mt-[191px] text-mainText relative z-[2]',
          'lg:flex lg:gap-x-[64px] xl:mt-[256px]',
        )}
      >
        <div className={clsx('hidden', 'lg:block w-full')}>
          {post.coverImage && (
            <Image
              src={urlForImage(post.coverImage).url()}
              alt={post.title}
              width={1200}
              height={1200}
            />
          )}
          {toc && toc.length > 0 && (
            <div
              className={clsx(
                'mt-[174px] w-fit pt-[24px] pr-[32px] border-t-dividers border-t-[1px] sticky top-[191px]',
              )}
            >
              <h6
                className={clsx(
                  'text-[24px] leading-[33.6px] font-monoMedium mb-[32px]',
                )}
              >
                Table of Content
              </h6>
              <ul className={clsx('flex flex-col gap-y-[16px]')}>
                {toc.map((toc, index) => (
                  <li
                    key={toc.text}
                    className={clsx(
                      'font-sansMedium text-[18px] leading-[27px] list-none text-secondaryText transition-colors duration-500',
                      activeId === getIdFromText(toc.text) && '!text-accent',
                    )}
                  >
                    <button
                      onClick={() =>
                        handleScrollTo('#' + getIdFromText(toc.text))
                      }
                    >
                      <span>— </span>
                      <span
                        className={clsx(
                          'bg-background translate-x-[-22px] inline-block transition-transform duration-500 ease-in-out',
                          activeId === getIdFromText(toc.text) &&
                            '!translate-x-[0px]',
                        )}
                      >
                        {toc.text}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className={clsx('w-full')}>
          <div
            className={clsx('flex flex-col gap-[32px]', 'lg:flex-col-reverse ')}
          >
            <h1
              className={clsx(
                'text-[36px] leading-[43.2px] font-monoMedium uppercase tracking-[-0.2px]',
                'lg:border-b-dividers  lg:border-b-[1px] lg:pb-[32px]',
                'xl:text-[76px] xl:leading-[91.2px] xl:tracking-[-0.4px]',
              )}
            >
              {post.title && post.title}
            </h1>
            <div
              className={clsx(
                'flex justify-between items-center pb-[32px] border-b-dividers border-b-[1px]',
                'lg:justify-start lg:gap-x-[35px] lg:border-b-[0px] lg:pb-[0px]',
              )}
            >
              <div className={clsx('flex gap-x-[12px] items-center')}>
                {post.author && (
                  <Image
                    src={urlForImage(post.author.picture).url()}
                    alt={post.author.name}
                    width={28}
                    height={28}
                    className={clsx(
                      'rounded-[2px] w-[22px] h-[22px]',
                      'lg:w-[28px] lg:h-[28px]',
                    )}
                  />
                )}

                <h6
                  className={clsx(
                    'text-[14px] font-sansRegular leading-[16.8px]',
                    'lg:text-[16px] lg:leading-[24px]',
                  )}
                >
                  {post.author && post.author.name && post.author.name}
                </h6>
              </div>
              <div className={clsx('flex gap-x-[8px] h-fit')}>
                <span
                  className={clsx(
                    'text-[12px] leading-[14.4px] tracking-[-0.2px] bg-[#EBE7E3] px-[10px] py-[4px] font-monoRegular rounded-full uppercase',
                  )}
                >
                  {formattedDate(post.date && post.date)}
                </span>
                <span
                  className={clsx(
                    'text-[12px] leading-[14.4px] tracking-[-0.2px] text-background px-[10px] py-[4px] font-monoRegular rounded-full uppercase bg-accent',
                  )}
                >
                  {post.readTime && post.readTime} min read
                </span>
              </div>
            </div>
          </div>
          <p
            className={clsx(
              'text-secondaryText mt-[16px]',
              'lg:text-[24px] lg:leading-[36px] lg:tracking-[-0.2px] lg:mt-[32px] lg:max-w-[75%]',
            )}
          >
            {post.subtitle && post.subtitle}
          </p>
          {post.coverImage && (
            <Image
              src={urlForImage(post.coverImage).url()}
              alt={post.title}
              width={1200}
              height={1200}
              className={clsx('mt-[48px] lg:hidden')}
            />
          )}
          <Accordion.Root
            orientation="vertical"
            type={'single'}
            collapsible
            className={clsx('lg:hidden')}
          >
            <Accordion.Item
              value={'Table of Content'}
              className="border-b-[1px] border-b-dividers"
            >
              <Accordion.Trigger
                className={clsx('mt-[32px] accordionButton w-full')}
              >
                <div
                  className={clsx(
                    'pb-[16px] pt-[16px] px-[16px] flex justify-between items-center w-full',
                    'md:pt-[24px] md:pb-[17px] md:px-0',
                    'lg:pb-[21px]',
                  )}
                >
                  <h6
                    className={clsx(
                      'text-[14px] leading-[16.8px] font-monoMedium text-mainText  teracking-[-0.2px]',
                    )}
                  >
                    Table of content
                  </h6>
                  <div className={clsx('w-[20px] h-[20px] relative')}>
                    <span
                      className={clsx(
                        'inline-block w-full h-[1px] bg-secondaryText absolute origin-center top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 ',
                      )}
                    ></span>
                    <span
                      className={clsx(
                        'inline-block w-full h-[1px] bg-secondaryText rotate-90 origin-center absolute top-[50%] left-[50%]  -translate-x-1/2 -translate-y-1/2 lowerLine',
                      )}
                    ></span>
                  </div>
                </div>
              </Accordion.Trigger>
              <Accordion.Content className={clsx('AccordionContent px-[16px]')}>
                <ul className={clsx('pb-[32px] flex flex-col gap-y-[16px]')}>
                  {toc &&
                    toc.length > 0 &&
                    toc.map((toc, index) => (
                      <li
                        key={toc.text}
                        className={clsx(
                          'font-sansMedium text-[16px] leading-[24px] list-none text-secondaryText transition-colors duration-500',
                        )}
                      >
                        <button
                          onClick={() =>
                            handleScrollTo('#' + getIdFromText(toc.text))
                          }
                        >
                          {toc.text}
                        </button>
                      </li>
                    ))}
                </ul>
              </Accordion.Content>
            </Accordion.Item>
          </Accordion.Root>
          <div
            className={clsx(
              'mt-[64px] portableText text-mainText',
              'lg:mt-[187px]',
            )}
          >
            <PortableText
              value={post.content}
              components={myPortableTextComponents}
            />
          </div>
        </div>
      </main>
      {post.suggestedArticles && post.suggestedArticles.length > 0 && (
        <div className={clsx('mt-[108px]', 'lg:mt-[140px]')}>
          <h6
            className={clsx(
              'text-[18px] leading-[21.6px] tracking-[-0.2px] font-monoMedium mb-[24px] px-gutter',
              'lg:mb-[32px] text-[24px] leading-[33.6px]',
            )}
          >
            Suggested Articles
          </h6>
          <div
            className={clsx(
              'flex flex-col gap-[88px] px-gutter',
              'lg:flex-row  lg:gap-x-[32px] lg:justify-between',
            )}
          >
            {post.suggestedArticles.map((post, index) => (
              <BlogCard
                key={String(post.title + index)}
                post={post}
                isIndividualBlog={true}
              />
            ))}
          </div>
        </div>
      )}
      <Footer />
    </>
  )
}

export default BlogPage
