import React from 'react'
import NextImage from 'next/image'
import { useRef, useState, useEffect, useCallback } from 'react'
import { useInView } from 'react-intersection-observer'
import { clsx } from 'clsx'
const PixelatedImage = ({ src, src10 }) => {
  const [dimension, setDimension] = useState({ width: 0, height: 0 })
  const [showImage, setShowImage] = useState(false)
  const canvas = useRef(null)
  const { ref, inView } = useInView({
    threshold: 0.75,
    triggerOnce: true,
  })

  const drawImage = (image) => {
    if (canvas.current === null) return
    const ctx = canvas.current.getContext('2d', { willReadFrequently: true })
    ctx.drawImage(image, 0, 0, dimension.width, dimension.height)
  }

  const animate = (image, size = 20) => {
    if (canvas.current === null) return
    drawImage(image)
    if (size < 3) {
      setTimeout(() => {
        setShowImage(true)
      }, 150)
      return
    }
    const w = dimension.width
    const h = dimension.height
    const ctx = canvas.current.getContext('2d', { willReadFrequently: true })
    const pixelArr = ctx.getImageData(0, 0, w, h).data
    for (let y = 0; y < h; y += size) {
      for (let x = 0; x < w; x += size) {
        let pos = (x + y * w) * 4
        ctx.fillStyle =
          'rgba(' +
          pixelArr[pos] +
          ',' +
          pixelArr[pos + 1] +
          ',' +
          pixelArr[pos + 2] +
          ',' +
          pixelArr[pos + 3] +
          ')'

        ctx.fillRect(x, y, size, size)
      }
    }

    setTimeout(() => {
      animate(image, size / 2)
    }, 100)
  }

  useEffect(() => {
    //Render the image when the component is inView and the small image is loaded
    if (inView && canvas.current && dimension.width > 0) {
      //@ts-ignore
      const image = new Image()
      image.onload = () => {
        setTimeout(() => {
          animate(image)
        }, 500)
      }
      image.crossOrigin = 'anonymous'
      image.src = src
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, dimension, src])

  return (
    <div className={'relative w-full'}>
      <NextImage
        ref={ref}
        src={src10}
        width={30}
        height={30}
        onLoadingComplete={(e) => {
          setDimension({ width: e.width, height: e.height })
        }}
        priority={true}
        alt="image"
        className={clsx(
          'pixelImage w-full h-full object-cover',
          showImage ? 'opacity-0' : 'opacity-100',
        )}
      />

      <canvas
        ref={canvas}
        width={dimension.width}
        height={dimension.height}
        className={clsx(
          'absolute w-full h-full top-0 left-0 z-[1]',
          showImage ? 'opacity-0' : 'opacity-100',
        )}
      ></canvas>
      <NextImage
        ref={ref}
        src={src}
        width={dimension.width}
        height={dimension.height}
        priority={true}
        alt="image"
        className={clsx(
          'absolute top-0 left-0 z-[2] h-full w-full ',
          showImage ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  )
}

export default PixelatedImage
