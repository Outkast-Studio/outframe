import React, { useState, useEffect } from 'react'
import { clsx } from 'clsx'

type Props = {
  title: string
  animationDelay: number
  play: boolean
}

const FlickerText = ({ title, animationDelay, play }: Props) => {
  const [visible, setVisible] = useState(false)

  function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  const letters = title.split('').map((letter, index) => ({
    letter,
    delay: randomIntFromInterval(1, 6),
  }))
  useEffect(() => {
    if (play) {
      setVisible(true)
    }
  }, [play])

  return (
    <span>
      {letters.map((letter, index) => (
        <span
          key={index}
          style={{
            transitionDelay: `${animationDelay + letter.delay * 0.07}s`,
          }}
          className={clsx('animateFlicker', visible && 'opacity-100')}
        >
          {letter.letter}
        </span>
      ))}
    </span>
  )
}

export default FlickerText
