import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { urlForImage } from 'lib/sanity.image'
import { clsx } from 'clsx'
import PixelatedImage from './PixelDelay'
import { useThemeStore } from 'stores/themeStore'

const ImageRotator = ({ images, duration = 3000 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const [paused, setPaused] = useState(true)
  const [playPixel, setPlayPixel] = useState(false)

  useEffect(() => {
    if (paused) return
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, duration)

    return () => clearInterval(interval)
  }, [images.length, duration, paused])

  const handleMouseEnter = () => {
    setIsVisible(true)
  }
  const handleMouseLeave = () => {
    setIsVisible(false)
  }
  const introVisible = useThemeStore((state) => state.introVisible)
  useEffect(() => {
    if (introVisible) return
    setTimeout(() => {
      setPaused(false)
    }, 1500)
    setTimeout(() => {
      setPlayPixel(true)
    }, 200)
  }, [introVisible])

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

      <PixelatedImage
        src={urlForImage(images[0]).url()}
        src10={urlForImage(images[0]).width(100).url()}
        play={playPixel}
        classNames={clsx('relative z-[10]', !paused && 'opacity-0')}
      />

      <AnimatePresence>
        {images.map((image, index) => (
          <motion.div
            key={'hero-image-' + index}
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
