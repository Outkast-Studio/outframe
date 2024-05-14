import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import FlickerText from './FlickerText'
import { clsx } from 'clsx'

type Props = { text: string; hover?: boolean }

const SectionHeading = ({ text, hover }: Props) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.05,
  })

  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    if (inView) {
      setIsInView(true)
    }
  }, [inView])

  return (
    <div ref={ref} className={clsx('mono')}>
      <FlickerText
        title={text}
        animationDelay={0.5}
        play={isInView}
        hover={hover}
      />
    </div>
  )
}

export default SectionHeading
