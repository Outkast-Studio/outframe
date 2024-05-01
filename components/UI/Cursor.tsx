import React, { useState, useEffect, use } from 'react'
import { clsx } from 'clsx'
import Image from 'next/image'
import { useThemeStore } from 'stores/themeStore'

const Cursor = () => {
  const isHoveringCaseStudy = useThemeStore(
    (state) => state.isHoveringCaseStudy,
  )
  const isHoveringHeroImage = useThemeStore(
    (state) => state.isHoveringHeroImage,
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

  return (
    <>
      <div
        className={clsx(
          'message text-white ease-[cubic-bezier(0.34, 0, 0.36, 1)] whitespace-nowrap z-[5] hidden origin-center',
          'lg:flex lg:gap-x-[4px] bg-accent lg:px-[16px] lg:py-[10px] lg:rounded-[2px]',
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
        <span
          className={clsx(
            'bg-accent translate-x-[10px] relative z-[2] arrowTransition',
            isHoveringCaseStudy && 'showArrow !translate-x-0',
          )}
        >
          Open
        </span>
        <Image
          src={'/icons/recentWorkArrowWhite.svg'}
          width={12}
          height={12}
          alt={'arrow'}
          className={clsx(
            'relative z-[1] translate-x-[-10px] arrowTransition',
            isHoveringCaseStudy && 'showArrow !translate-x-0',
          )}
        />
      </div>
      <div
        className={clsx(
          'message text-white ease-[cubic-bezier(0.34, 0, 0.36, 1)] whitespace-nowrap z-[5] hidden origin-center',
          'lg:flex lg:gap-x-[4px] bg-accent lg:px-[16px] lg:py-[10px] lg:rounded-[2px]',
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
        <span
          className={clsx(
            'bg-accent translate-x-[10px] relative z-[2] arrowTransition',
            isHoveringHeroImage && 'showArrow !translate-x-0',
          )}
        >
          Recent Work
        </span>
        <Image
          src={'/icons/recentWorkArrowWhite.svg'}
          width={12}
          height={12}
          alt={'arrow'}
          className={clsx(
            'relative z-[1] translate-x-[-10px] arrowTransition',
            isHoveringHeroImage && 'showArrow !translate-x-0',
          )}
        />
      </div>
    </>
  )
}

export default Cursor
