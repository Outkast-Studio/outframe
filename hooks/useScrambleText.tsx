import { useEffect, useState } from 'react'
// Include a CSS file with the animation keyframes

const ScrambleText = ({
  title,
  animationDelay,
  paused,
  delay = 0,
  cb = () => {},
}) => {
  const [letters, setLetters] = useState(title.split(''))

  useEffect(() => {
    if (paused) return

    // Trigger the function after the specified delay
    const timer = setTimeout(() => {
      setLetters(title.split(''))
      cb() // Callback function if needed
    }, delay * 1000) // delay is in seconds, convert to milliseconds

    return () => clearTimeout(timer) // Clean up timer if component unmounts
  }, [paused, delay])

  const getRandomDelay = (index) => {
    return Math.random() * index + animationDelay + 's'
  }

  return (
    <span>
      {letters.map((letter, index) => (
        <span
          key={index}
          className="letter"
          style={{ animationDelay: getRandomDelay(index) }}
        >
          {letter}
        </span>
      ))}
    </span>
  )
}

export default ScrambleText
