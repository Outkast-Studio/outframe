import React from 'react'
import Image from 'next/image'
import { urlForImage } from 'lib/sanity.image'
import { clsx } from 'clsx'
import { useWindowSize } from 'hooks/useWindowSize'

const LogoCloud = ({ images }) => {
  const { width } = useWindowSize()
  return (
    <section
      className={clsx(
        'mt-[88px] flex flex-wrap px-gutter gap-x-[24px] gap-y-[65px] items-center justify-center',
        'md:gap-x-[30px]',
        'lg:mt-[98px] lg:py-[22.5px]',
        'xl:mt-[130px] xl:py-[36px] xl:justify-between',
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
    </section>
  )
}

export default LogoCloud
