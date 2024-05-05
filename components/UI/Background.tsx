import React from 'react'
import { clsx } from 'clsx'
import { motion } from 'framer-motion'

const Background = () => {
  return (
    <>
      <div
        className={clsx(
          'absolute z-[1] w-full h-[120vh] bg-background top-0 left-0',
        )}
      >
        <div
          className={clsx('relative h-full w-full text-[10px] overflow-hidden')}
        >
          <div className={clsx('absolute top-[10%] left-[25.5%]')}>
            <ScrollingText coords="3°19′N 262°31′S" title="Toronto, Canada" />
          </div>
          <div className={clsx('absolute top-[40%] right-[25.5%]')}>
            <ScrollingText coords="3°19′N 262°31′S" title="Toronto, Canada" />
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
              stroke-width="0.2"
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
      </div>
    </>
  )
}

export default Background

function ScrollingText({ coords, title }) {
  return (
    <div className={clsx('text-[#cbcaca] font-sansRegular flex gap-x-[6px]')}>
      <span>•</span>
      <div className={clsx('flex gap-x-[4px]')}>
        <p>
          {coords.split('').map((char, index) => (
            <span key={index} className={clsx('text-[#cbcaca]')}>
              {char}
            </span>
          ))}
        </p>
        <p>{title}</p>
      </div>
    </div>
  )
}
