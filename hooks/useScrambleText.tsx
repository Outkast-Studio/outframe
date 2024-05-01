import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

type Props = {
  title: string
  animationDelay: number
  delay?: number // Optional delay before starting
  paused?: boolean
  cb?: () => void
}

const ScrambleText = ({
  title,
  animationDelay,
  paused,
  delay = 0,
  cb = () => {},
}: Props) => {
  // Initialize letters with non-breaking spaces
  const [letters, setLetters] = useState(title.split(''))
  useEffect(() => {
    if (paused) return
  }, [paused])
  return (
    <span>
      {letters.map((letter, index) => (
        <span key={index}>{letter}</span>
      ))}
    </span>
  )
}

export default ScrambleText
