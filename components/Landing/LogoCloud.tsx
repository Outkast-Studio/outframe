import React, { useRef } from 'react'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { useWindowSize } from 'hooks/useWindowSize'

const LogoCloud = ({ images }) => {
  const { width } = useWindowSize()
  const ref = useRef(null)
  const marqueeVariants = {
    animate: {
      x: [0, ref.current?.offsetWidth * 2 * -1],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 45,
          ease: 'linear',
        },
      },
    },
  }

  return (
    <section
      className={clsx(
        'mt-[88px] flex flex-wrap px-gutter gap-x-[24px] gap-y-[65px] items-center justify-center',
        'md:gap-x-[30px]',
        'lg:mt-[98px] lg:py-[22.5px] lg:flex-nowrap lg:gap-x-[96px]',
        'xl:mt-[130px] xl:py-[36px] xl:justify-between',
      )}
    >
      <motion.div
        ref={ref}
        variants={marqueeVariants}
        animate="animate"
        className={'flex lg:flex-nowrap lg:gap-x-[96px] items-center'}
      >
        {[...images, ...images].map((image, index) => (
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
