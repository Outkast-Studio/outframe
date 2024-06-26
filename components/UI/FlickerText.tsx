import React, { useState, useEffect } from 'react'
import { clsx } from 'clsx'

type Props = {
  title: string
  animationDelay: number
  play: boolean
  hover?: boolean
}

const FlickerText = ({ title, animationDelay, play, hover }: Props) => {
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
    } else {
      setVisible(false)
    }
  }, [play])

  return (
    <span className={clsx('hoverParent')}>
      {letters.map((letter, index) => (
        <span
          key={index}
          style={{
            transitionDelay: `${animationDelay + letter.delay * 0.07}s`,
            animationDelay: `${letter.delay * 0.07}s`,
          }}
          className={clsx(
            'animateFlicker opacity-0',
            visible && 'opacity-100',
            hover && 'hoverInteraction',
          )}
        >
          {letter.letter}
        </span>
      ))}
    </span>
  )
}

export default FlickerText
