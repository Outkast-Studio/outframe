import { useEffect, useState } from 'react'

const useScrollTop = () => {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.scrollY || document.documentElement.scrollTop
      const windowHeight =
        window.innerHeight || document.documentElement.clientHeight
      const scrollThreshold = windowHeight * 0.2 // 50vh

      if (scrollPosition >= scrollThreshold) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return scrolled
}

export default useScrollTop
