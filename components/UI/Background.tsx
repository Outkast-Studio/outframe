import React from 'react'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useThemeStore } from 'stores/themeStore'

const Background = () => {
  const [repeatCount, setRepeatCount] = useState(1)
  // const setDocumentHeight = useThemeStore((state) => state.setDocumentHeight)
  const router = useRouter()
  useEffect(() => {
    const handleResize = () => {
      const documentHeight = document.documentElement.scrollHeight
      const windowHeight = window.innerHeight * 1 // 1.2 is the component height
      let newRepeatCount = Math.ceil(documentHeight / windowHeight) - 2
      if (router.pathname === '/') {
        newRepeatCount = newRepeatCount - 1
      }
      if (newRepeatCount === 0) newRepeatCount = 1
      setRepeatCount(newRepeatCount)
    }

    //Formula
    // window height * 1.2 (component height is 1.2 window height).

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={clsx('overflow-x-hidden')}>
      {Array.from({ length: repeatCount }).map((_, index) => (
        <BackgroundComponent key={index} index={index} />
      ))}
    </div>
  )
}

export default Background

function ScrollingText({ coords, title }) {
  const isNumber = (str: string): boolean => {
    return !isNaN(Number(str))
  }

  return (
    <div
      className={clsx(
        'text-[#cbcaca] font-sansRegular flex gap-x-[6px] text-[10px]',
      )}
    >
      <span>•</span>
      <div className={clsx('flex gap-x-[4px]')}>
        <p className={clsx('flex')}>
          {coords.split('').map((char, index) =>
            isNumber(char) ? (
              <RotatingNumber key={index} index={index} char={char} />
            ) : (
              <span key={index} className={clsx('text-[#cbcaca]')}>
                {char}
              </span>
            ),
          )}
        </p>
        <p>{title}</p>
      </div>
    </div>
  )
}

function RotatingNumber({ index, char }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  useEffect(() => {
    const interval = setInterval(
      () => {
        setCurrentIndex((currentIndex) => (currentIndex + 1) % Number(char))
      },
      Math.random() * 1000 + 6000,
    )
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <span className={clsx('h-[10px] overflow-hidden mt-[2.5px]')}>
      <motion.span
        initial={{ y: 0 }}
        animate={{ y: -10 * currentIndex }}
        transition={{
          duration: 1,
          ease: 'linear',
        }}
        className={clsx('flex flex-col gap-y-[0px] leading-none')}
      >
        <span>{char}</span>
        {Array.from({ length: 9 - Number(char) }, (_, i) => (
          <span
            key={index + i + 1}
            className={clsx('text-[#cbcaca] leading-none')}
          >
            {Number(char) + i + 1}
          </span>
        ))}
      </motion.span>
    </span>
  )
}

function BackgroundComponent({ index }: { index: number }) {
  const introVisible = useThemeStore((state) => state.introVisible)

  const background = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  }

  return (
    <>
      <motion.div
        variants={background}
        initial="initial"
        animate={introVisible ? 'initial' : 'animate'}
        style={{ top: index * 120 + 'vh' }}
        className={clsx('absolute z-[1] w-full h-[100vh]  top-0 left-0')}
      >
        <div className={clsx('relative h-full w-full text-[10px]')}>
          <div className={clsx('absolute top-[17%] right-[5.5%]')}>
            <ScrollingText coords="44º •" title="" />
          </div>
          <div className={clsx('absolute top-[10%] left-[25.5%]')}>
            <ScrollingText coords="3°19′N 262°31′S" title="Toronto, Canada" />
          </div>
          <div className={clsx('absolute top-[40%] right-[22.5%]')}>
            <ScrollingText
              coords="2°59′S 104°45′E S"
              title="Palembang, Indonesia"
            />
          </div>
          <motion.svg
            initial={{ rotate: 0 }}
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 120,
              ease: 'linear',
            }}
            width="50vw"
            height="50vw"
            viewBox="0 0 155 155"
            className={clsx('absolute top-[-25%] left-[-25%]')}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M154 77.5C154 35.2502 119.75 1 77.5 1C35.2502 1 1 35.2502 1 77.5C1 119.75 35.2502 154 77.5 154C119.75 154 154 119.75 154 77.5Z"
              stroke="#EAEAEA"
              stroke-linecap="round"
              stroke-dasharray="1 2 4 1"
              stroke-width="0.3"
            />
          </motion.svg>
          <motion.svg
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 120,
              ease: 'linear',
            }}
            width="60vw"
            height="60vw"
            viewBox="0 0 155 155"
            className={clsx('absolute top-[-50%] right-[-30%]')}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M154 77.5C154 35.2502 119.75 1 77.5 1C35.2502 1 1 35.2502 1 77.5C1 119.75 35.2502 154 77.5 154C119.75 154 154 119.75 154 77.5Z"
              stroke="#EAEAEA"
              stroke-linecap="round"
              stroke-dasharray="1 2 4 1"
              stroke-width="0.2"
            />
          </motion.svg>
          <div>
            <motion.svg
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 60,
                ease: 'linear',
              }}
              width="25vw"
              height="25vw"
              viewBox="0 0 155 155"
              className={clsx('absolute top-[-25%] left-[45%]')}
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M154 77.5C154 35.2502 119.75 1 77.5 1C35.2502 1 1 35.2502 1 77.5C1 119.75 35.2502 154 77.5 154C119.75 154 154 119.75 154 77.5Z"
                stroke="#EAEAEA"
                stroke-linecap="round"
                stroke-dasharray="1 2 4 1"
                stroke-width="0.3"
              />
            </motion.svg>
            <div
              className={clsx(
                'w-[1px] h-[200vh] bg-[#EAEAEA] absolute top-[0] left-[41%] rotate-[-40deg] origin-top',
              )}
            ></div>
          </div>
          <div
            className={clsx(
              'w-[1px] h-[200vh] bg-[#EAEAEA] absolute top-[200px] right-[0px] rotate-[75deg] origin-top',
            )}
          ></div>
        </div>
      </motion.div>
    </>
  )
}
