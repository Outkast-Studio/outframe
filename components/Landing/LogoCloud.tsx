import React, { useRef, useEffect } from 'react'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import { clsx } from 'clsx'
import { motion, useAnimationControls } from 'framer-motion'
import { useWindowSize } from 'hooks/useWindowSize'
import { horizontalLoop } from 'utils'

const LogoCloud = ({ images }) => {
  const { width } = useWindowSize()
  const ref = useRef(null)
  const controls = useAnimationControls()
  const tlRef = useRef(null)
  const marqueeWidth = 100 // Width of the marquee content in viewport width units (vw)

  // useEffect(() => {
  //   const marquee = ref.current
  //   setTimeout(() => {
  //     tlRef.current = horizontalLoop(marquee.children, {
  //       draggable: false,
  //       repeat: -1,
  //       speed: 0.4,
  //       paused: false,
  //     })
  //   }, 1800)
  // }, [])

  return (
    <section
      className={clsx(
        'mt-[88px] flex flex-wrap px-gutter gap-x-[24px] gap-y-[65px] items-center justify-center',
        'md:gap-x-[30px]',
        'lg:mt-[98px] lg:py-[22.5px] lg:flex-nowrap lg:gap-x-[96px]',
        'xl:mt-[130px] xl:py-[36px] xl:justify-between xl:w-full',
      )}
    >
      <motion.div
        ref={ref}
        animate={controls}
        className={clsx(
          'flex flex-wrap gap-x-[30px] gap-y-[64px] lg:flex-nowrap lg:gap-x-[96px] items-center justify-center',
          'xl:justify-between xl:w-full',
        )}
      >
        {images.map((image, index) => (
          <Image
            src={urlForImage(image.asset).format('png').url()}
            alt={image.alt}
            width={image.dimensions.width}
            height={image.dimensions.height}
            key={index}
            style={{
              width:
                width > 1024
                  ? image.dimensions.width
                  : image.dimensions.width * 0.75,
              height:
                width > 1024
                  ? image.dimensions.height
                  : image.dimensions.height * 0.75,
            }}
          />
        ))}
      </motion.div>
    </section>
  )
}

export default LogoCloud
