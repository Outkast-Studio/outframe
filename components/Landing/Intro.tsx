//@ts-nocheck

import React, { useEffect } from 'react'
import lottieData from 'public/lottieNo.json'
import dynamic from 'next/dynamic'
import clsx from 'clsx'
import { useLenis } from '@studio-freight/react-lenis'
import { useThemeStore } from 'stores/themeStore'

const Intro = () => {
  const Lottie = dynamic(() => import('react-lottie'), { ssr: false })
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottieData,
    controls: false,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  const setIntroVisible = useThemeStore((state) => state.setIntroVisible)
  const introVisible = useThemeStore((state) => state.introVisible)
  const lenis = useLenis()

  useEffect(() => {
    const introHasRun = sessionStorage.getItem('introHasRun')

    if (lenis) {
      // // lenis.stop()
      setTimeout(() => {
        setIntroVisible(false)
        if (introHasRun) return
        lenis.scrollTo(0, {
          immediate: true,
          force: true,
        })
        lenis.start()
        sessionStorage.setItem('introHasRun', 'true')
      }, '3900')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (!lenis) return
    if (introVisible) {
      lenis.stop()
    } else {
      lenis.start()
    }
  }, [introVisible, lenis])

  return introVisible ? (
    <div
      className={clsx(
        'fixed top-0 left-0 bg-background w-screen h-screen flex items-center justify-center z-[999] pointer-events-none',
      )}
    >
      <Lottie options={defaultOptions} height={400} width={400} />
    </div>
  ) : (
    <></>
  )
}

export default Intro
