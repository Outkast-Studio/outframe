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
  const setIsHoveringCaseStudy = useThemeStore(
    (state) => state.setIsHoveringCaseStudy,
  )

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

  useEffect(() => {
    setIsHoveringCaseStudy(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div
        className={clsx(
          'message text-white mono ease-[cubic-bezier(0.34, 0, 0.36, 1)] whitespace-nowrap z-[5] hidden origin-center mix-blend-exclusion',
          'lg:flex lg:gap-x-[4px]  lg:px-[16px] lg:py-[10px] lg:rounded-[2px] text-[24px]',
          isHoveringCaseStudy && 'isHovering ',
        )}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          userSelect: 'none',
          top: position.y - 25,
          left: position.x - 35,
          scale: 0,
          transition: 'scale 0.35s',
        }}
      >
        {/* <span className={clsx('relative z-[2] arrowTransition uppercase')}>
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
        /> */}
        <div className={clsx('bg-[#fff] p-[10px] rounded-[2.22px]')}>
          <Image
            src={'/icons/arrow-right.svg'}
            width={20}
            height={20}
            alt={'plusIcon'}
          />
        </div>
      </div>
      <div
        className={clsx(
          'message text-white mono ease-[cubic-bezier(0.34, 0, 0.36, 1)] whitespace-nowrap z-[5] hidden origin-center mix-blend-exclusion',
          'lg:flex lg:gap-x-[4px]  lg:px-[16px] lg:py-[10px] lg:rounded-[2px] text-[24px]',
          isHoveringHeroImage && 'isHovering',
        )}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          userSelect: 'none',
          top: position.y - 25,
          left: position.x - 35,
          scale: 0,
          transition: 'scale 0.35s',
        }}
      >
        <div className={clsx('bg-[#fff] p-[10px] rounded-[2.22px]')}>
          <Image
            src={'/icons/plus-large.svg'}
            width={20}
            height={20}
            alt={'plusIcon'}
          />
        </div>
      </div>
      <div
        className={clsx(
          'message mono text-white ease-[cubic-bezier(0.34, 0, 0.36, 1)] whitespace-nowrap z-[5] hidden origin-center mix-blend-exclusion',
          'lg:flex lg:gap-x-[4px]  lg:px-[16px] lg:py-[10px] lg:rounded-[2px] text-[24px]',
          isHoveringBlog && 'isHovering',
        )}
        style={{
          position: 'fixed',
          pointerEvents: 'none',
          userSelect: 'none',
          top: position.y - 25,
          left: position.x - 35,
          scale: 0,
          transition: 'scale 0.35s',
        }}
      >
        <div className={clsx('bg-[#fff] p-[10px] rounded-[2.22px]')}>
          <Image
            src={'/icons/arrow-right.svg'}
            width={20}
            height={20}
            alt={'plusIcon'}
          />
        </div>
      </div>
    </>
  )
}

export default Cursor
