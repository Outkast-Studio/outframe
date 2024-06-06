import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { urlForImage } from 'lib/sanity.image'
import { clsx } from 'clsx'

const ImageRotator = ({ images, duration = 3000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, duration)

    return () => clearInterval(interval)
  }, [images.length, duration])

  const handleMouseEnter = () => {
    setIsVisible(true)
  }

  const handleMouseLeave = () => {
    setIsVisible(false)
  }

  return (
    <div
      className="relative w-full h-fit hover:cursor-none"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className={clsx(
          'absolute z-[2] bg-black opacity-[0] w-full h-full transition-opacity duration-[0.3s]',
          isVisible && '!opacity-[0.15]',
        )}
      ></div>

      <Image
        src={urlForImage(images[0]).url()}
        width={1920}
        height={1920}
        className="opacity-0 rounded-[4px]"
        alt={`Image 1`}
      />
      <AnimatePresence mode="wait">
        {images.map((image, index) => (
          <motion.div
            key={image}
            initial={{ opacity: 0 }}
            animate={
              index == currentImageIndex ? { opacity: 1 } : { opacity: 0 }
            }
            transition={{ duration: 0.5 }}
            className="absolute w-full h-full top-0"
          >
            <Image
              src={urlForImage(image).url()}
              alt={`Image ${index + 1}`}
              width={1920}
              height={1920}
              objectFit="cover"
              priority={index === currentImageIndex}
              className={clsx('rounded-[4px]')}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export default ImageRotator
