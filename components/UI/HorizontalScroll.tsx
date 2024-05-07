import React, { useEffect, useRef } from 'react'
import { RecentWork } from 'lib/sanity.queries'
import clsx from 'clsx'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import { useLenis } from '@studio-freight/react-lenis'
import { gsap } from 'gsap'
import { horizontalLoop } from 'utils'
import { Observer } from 'gsap/dist/Observer'

const HorizontalScroll = ({ recentWork }: { recentWork: RecentWork[] }) => {
  const sliderRef = useRef(null)
  const container = useRef(null)
  const tlRef = useRef(null)
  const slowRef = useRef(null)

  console.log(recentWork)
  useEffect(() => {
    const ctx = gsap.context(() => {
      const slider = sliderRef.current
      tlRef.current = horizontalLoop(slider.children, {
        repeat: -1,
      })
    })

    slowRef.current = gsap.to(tlRef.current, {
      timeScale: 0.5,
      duration: 0.7,
    })
    Observer.create({
      target: container.current,
      type: 'touch, wheel',
      wheelSpeed: -0.2,
      onChange: (self) => {
        tlRef.current.timeScale(
          Math.abs(self.deltaX) > Math.abs(self.deltaY)
            ? -self.deltaX
            : -self.deltaY,
        )
        slowRef.current.invalidate().restart()
      },
    })

    return () => ctx.revert()
  })

  ///Step one is to be able to horizontal scroll.
  //

  return (
    <div
      ref={container}
      className={clsx(
        'container h-[calc(100vh-113px)] items-center justify-center hidden',
        'lg:flex',
      )}
    >
      <section ref={sliderRef} className={clsx('flex')}>
        {recentWork.length > 0 &&
          [...recentWork, ...recentWork].map((work, index) => (
            <article
              key={work.title + index}
              className={clsx('flex-shrink-0 item px-[4vh]')}
              style={{
                width: `${work.columns * 25}vh`,
                alignSelf:
                  work.alignment === 'top'
                    ? 'start'
                    : work.alignment === 'center'
                      ? 'center'
                      : 'end',
              }}
            >
              <div className={clsx('relative')}>
                <div className="absolute bg-dividers w-full h-full top-0 left-0 z-[1]"></div>
                <Image
                  src={urlForImage(work.image).url()}
                  alt={String(work.image.alt)}
                  width={1920}
                  height={1920}
                  className={clsx(
                    'relative z-[2] opacity-0 transition-opacity duration-300 w-full object-cover',
                  )}
                  onLoadingComplete={(image) =>
                    image.classList.remove('opacity-0')
                  }
                />
              </div>
              <div
                className={clsx(
                  'flex mt-[8px] items-start justify-between gap-x-[16px]',
                )}
              >
                <h6
                  className={clsx(
                    'text-[16px] leading-[24px] text-secondaryText font-sansRegular',
                  )}
                >
                  {work.title}
                </h6>
                <span
                  className={clsx(
                    'text-accent font-monoRegular text-[14px] leading-[25.2px] tracking-[-0.2px]',
                  )}
                >
                  {work.year}
                </span>
              </div>
            </article>
          ))}
      </section>
    </div>
  )
}

export default HorizontalScroll
