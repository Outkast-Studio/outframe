import React, { useState, useEffect, use } from 'react'
import { clsx } from 'clsx'
import Image from 'next/image'
import { useThemeStore } from 'stores/themeStore'
import FlickerText from './FlickerText'
const Cursor = () => {
  const isHoveringCaseStudy = useThemeStore(
    (state) => state.isHoveringCaseStudy,
  )
  const isHoveringHeroImage = useThemeStore(
    (state) => state.isHoveringHeroImage,
  )

  const isHoveringBlog = useThemeStore((state) => state.isHoveringBlog)

  const [isVisible, setIsVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (event) => {
      setPosition({
        x: event.clientX,
        y: event.clientY,
      })
    }

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <>
      <div
        className={clsx(
          'message text-white mono ease-[cubic-bezier(0.34, 0, 0.36, 1)] whitespace-nowrap z-[5] hidden origin-center mix-blend-exclusion',
          'lg:flex lg:gap-x-[4px]  lg:px-[16px] lg:py-[10px] lg:rounded-[2px]',
          isHoveringCaseStudy && 'isHovering',
        )}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          userSelect: 'none',
          top: position.y + 15,
          left: position.x + 15,
          scale: 0,
          transition: 'scale 0.35s',
        }}
      >
        <span className={clsx('relative z-[2] arrowTransition uppercase')}>
          {/* Open */}
          <FlickerText
            title="Open"
            animationDelay={0}
            play={isHoveringCaseStudy}
          />
        </span>

        <Image
          src={'/icons/recentWorkArrowWhite.svg'}
          width={12}
          height={12}
          alt={'arrow'}
          className={clsx('relative z-[1]  arrowTransition')}
        />
      </div>
      <div
        className={clsx(
          'message text-white mono ease-[cubic-bezier(0.34, 0, 0.36, 1)] whitespace-nowrap z-[5] hidden origin-center mix-blend-exclusion',
          'lg:flex lg:gap-x-[4px]  lg:px-[16px] lg:py-[10px] lg:rounded-[2px]',
          isHoveringHeroImage && 'isHovering',
        )}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          userSelect: 'none',
          top: position.y + 15,
          left: position.x + 15,
          scale: 0,
          transition: 'scale 0.35s',
        }}
      >
        <span className={clsx('relative z-[2] arrowTransition uppercase')}>
          {/* Recent Work */}
          <FlickerText
            title="Recent work"
            animationDelay={0}
            play={isHoveringHeroImage}
          />
        </span>
        <Image
          src={'/icons/recentWorkArrowWhite.svg'}
          width={12}
          height={12}
          alt={'arrow'}
          className={clsx('relative z-[1]  arrowTransition')}
        />
      </div>
      <div
        className={clsx(
          'message mono text-white ease-[cubic-bezier(0.34, 0, 0.36, 1)] whitespace-nowrap z-[5] hidden origin-center mix-blend-exclusion',
          'lg:flex lg:gap-x-[4px]  lg:px-[16px] lg:py-[10px] lg:rounded-[2px]',
          isHoveringBlog && 'isHovering',
        )}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          userSelect: 'none',
          top: position.y + 15,
          left: position.x + 15,
          scale: 0,
          transition: 'scale 0.35s',
        }}
      >
        <span className={clsx('relative z-[2] arrowTransition uppercase')}>
          {/* Read */}
          <FlickerText title="Read" animationDelay={0} play={isHoveringBlog} />
        </span>
        <Image
          src={'/icons/recentWorkArrowWhite.svg'}
          width={12}
          height={12}
          alt={'arrow'}
          className={clsx('relative z-[1] arrowTransition')}
        />
      </div>
    </>
  )
}

export default Cursor
