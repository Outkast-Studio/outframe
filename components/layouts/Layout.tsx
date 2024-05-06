import { CustomHead } from './CustomHead'
import { clsx } from 'clsx'
import { ReactLenis } from '@studio-freight/react-lenis'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Background from '../UI/Background'

export function Layout({
  children,
  seo = {
    title: '',
    description: '',
    image: '',
    keywords: [],
  },
}) {
  const variants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  }
  const router = useRouter()

  return (
    <ReactLenis
      root
      options={{
        duration: 0.6,
      }}
    >
      <motion.div
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={clsx('')}
      >
        <Background />
        <CustomHead {...seo} />
        {children}
      </motion.div>
    </ReactLenis>
  )
}
