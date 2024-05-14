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
  const [nextImageIndex, setNextImageIndex] = useState(1)

  useEffect(() => {
    // const interval = setInterval(() => {
    //   setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    //   setNextImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    // }, 4000)
    // return () => clearInterval(interval)
  }, [])

  return (
    <div style={{ position: 'relative' }}>
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          {images[currentImageIndex] && images[currentImageIndex].asset && (
            <Image
              src={urlForImage(images[currentImageIndex]).url()}
              alt={String(images[currentImageIndex].alt)}
              width={1200}
              height={1200}
              className={clsx('object-cover')}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default HeroImage
