import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

type Props = {
  title: string
  animationDelay: number
  delay?: number // Optional delay before starting
  paused?: boolean
  cb?: () => void
}

const useScrambleText = ({
  title,
  animationDelay,
  paused,
  delay = 0,
  cb = () => {},
}: Props) => {
  // Initialize letters with non-breaking spaces
  const [letters, setLetters] = useState(title.split(''))
  const possibleLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const router = useRouter()

  useEffect(() => {
    if (paused) return

    const staggerDelay = 15 // Delay between each letter starting to scramble
    const scrambleDuration = 350 // Duration for which each letter scrambles before settling

    const timer = setTimeout(() => {
      const start = Date.now()
      const interval = setInterval(() => {
        setLetters((currentLetters) => {
          const timeElapsed = Date.now() - start
          let randomLetter =
            possibleLetters[Math.floor(Math.random() * possibleLetters.length)]
          const newLetters = title.split('').map((finalLetter, index) => {
            const reverseIndex = title.length - 1 - index
            const scrambleStartTime =
              animationDelay +
              Math.floor(Math.random() * title.split('').length) * staggerDelay
            const scrambleEndTime = scrambleStartTime + scrambleDuration

            if (timeElapsed >= scrambleEndTime) {
              return finalLetter
            } else if (timeElapsed >= scrambleStartTime) {
              return '\u00A0'
            } else {
              // Keep the letter as a non-breaking space
              return '\u00A0'
            }
          })

          if (newLetters.join('') === title) {
            clearInterval(interval)
            cb()
          }
          return newLetters
        })
      }, 15)
      return () => clearInterval(interval)
    }, delay) // Use the delay parameter here

    // Cleanup
    return () => {
      clearTimeout(timer)
    }
  }, [title, animationDelay, router.asPath, paused, delay]) // Include delay in the dependencies array

  return letters
}

export default useScrambleText
