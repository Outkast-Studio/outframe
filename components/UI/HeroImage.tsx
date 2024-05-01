import React, { useState, useEffect } from 'react'
import { ImageAsset } from 'sanity'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { urlForImage } from 'lib/sanity.image'
import { clsx } from 'clsx'
type Props = {
  images: ImageAsset[]
}
const HeroImage = ({ images }: Props) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [images])

  const nextImageIndex = (currentImageIndex + 1) % images.length

  return (
    <div style={{ position: 'relative' }}>
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{ position: 'absolute', width: '100%', height: '100%' }}
        >
          <Image
            src={urlForImage(images[currentImageIndex]).url()}
            alt={String(images[currentImageIndex].alt)}
            width={1200}
            height={1200}
            className={clsx('object-cover h-[600px]')}
          />
        </motion.div>

        <motion.div
          key={nextImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
          //   style={{ position: 'absolute', width: '100%', height: '100%' }}
        >
          <Image
            src={urlForImage(images[nextImageIndex]).url()}
            alt={String(images[nextImageIndex].alt)}
            width={1200}
            height={1200}
            className={clsx('object-cover h-[600px]')}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default HeroImage
