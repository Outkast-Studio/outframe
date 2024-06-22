import React, { useEffect, useState, useRef } from 'react'
import { clsx } from 'clsx'
import Logo from 'components/UI/Logo'
import Link from 'next/link'
import { AnimatePresence, animate, motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useThemeStore } from 'stores/themeStore'
import { useLenis } from '@studio-freight/react-lenis'
import FlickerText from 'components/UI/FlickerText'
import { useWindowSize } from 'hooks/useWindowSize'
import MobileMenu from './UI/MobileMenu'
import { useSearchParams } from 'next/navigation'
import useScrollTop from 'hooks/useScrollTop'

const Header = () => {
  const menuOpen = useThemeStore((state) => state.menuOpen)
  const setMenuOpen = useThemeStore((state) => state.setMenuOpen)
  const lenis = useLenis()
  const router = useRouter()
  const introVisible = useThemeStore((state) => state.introVisible)
  const { width } = useWindowSize()
  const [isRecentWork, setIsRecentWork] = useState(false)
  const [mounted, setMounted] = useState(false)
  const searchParams = useSearchParams()
  const prev = searchParams.get('recent-work')
  const scrollTop = useScrollTop()
  const ref = useRef(null)
  const menuItems = [
    {
      title: (
        <FlickerText
          title="Case Studies"
          animationDelay={0}
          play={router.pathname == '/' ? !introVisible : true}
          hover={true}
        />
      ),
      // title: 'Case Studies',
      link: '#case-studies',
      isHomePage: true,
      width: 101,
    },

    {
      // title: useScrambleText({ title: 'Services', animationDelay: 4500 }),
      title: (
        <FlickerText
          title="Services"
          animationDelay={0}
          play={router.pathname == '/' ? !introVisible : true}
          hover={true}
        />
      ),
      link: '#services',
      isHomePage: true,
      width: 67.6,
    },
    {
      // title: useScrambleText({ title: 'Pricing', animationDelay: 4800 }),
      title: (
        <FlickerText
          title="Pricing"
          animationDelay={0}
          play={router.pathname == '/' ? !introVisible : true}
          hover={true}
        />
      ),
      link: '#pricing',
      isHomePage: true,
      width: 57.8,
    },
    {
      // title: useScrambleText({ title: 'Recent Work', animationDelay: 5100 }),
      title: (
        <FlickerText
          title="Recent Work"
          animationDelay={0}
          play={router.pathname == '/' ? !introVisible : true}
          hover={true}
        />
      ),
      link: '/recent-work',
      isHomePage: false,
      width: 96.24,
    },
    {
      // title: useScrambleText({ title: 'Blog', animationDelay: 5400 }),
      title: (
        <FlickerText
          title="Blog"
          animationDelay={0}
          play={router.pathname == '/' ? !introVisible : true}
          hover={true}
        />
      ),
      link: '/blog',
      isHomePage: false,
      width: 35.46,
    },
  ]

  const socials = [
    { name: 'Twitter', url: 'https://twitter.com/VytasBu' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vytasbu/' },
    { name: 'Dribbble', url: 'https://dribbble.com/outframe' },
  ]

  const menuButtonVariants = {
    initial: {
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.62, 0.05, 0.01, 0.99],
      },
    },
    animate: {
      y: -16,
      transition: {
        duration: 0.35,
        ease: [0.62, 0.05, 0.01, 0.99],
      },
    },
  }

  useEffect(() => {
    if (!lenis) return
    if (menuOpen) {
      lenis.stop()
    } else {
      lenis.start()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuOpen])

  function handleHomepageLink(link: string) {
    lenis.scrollTo(link, {
      duration: 1.2,
      offset: -69,
      force: true,
      easing: (x) => {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
      },
    })
  }

  const navRef = useRef(null)
  useEffect(() => {
    if (router.pathname === '/recent-work') {
      setIsRecentWork(true)
    } else {
      setIsRecentWork(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, width])

  useEffect(() => {
    setTimeout(() => {
      setMounted(true)
    }, 5000)
  }, [])
  const navMenuVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
      exit: {
        opacity: 0,
        transition: {
          duration: 0.3,
        },
      },
    },
  }

  const closeButtonVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  useEffect(() => {
    if (!introVisible) {
      setTimeout(() => {
        ref.current.style.position = 'fixed'
      }, 1000)
    }
  }, [introVisible])

  return (
    <>
      <header
        ref={ref}
        className={clsx(
          'flex px-gutter mix-blend-difference absolute pt-[12px] pb-[16px] justify-between top-[12px] left-0 w-full items-center z-[100] header will-change-[mix-blend-mode] ',
          'md:mt-[0px] pb-[20px]',
          'lg:top-[40px] lg:pt-[24px]',
          'xl:grid grid-cols-12 xl:gap-x-columnGap',
        )}
      >
        {' '}
        <Link href="/" scroll={false}>
          <Logo />
        </Link>
        <AnimatePresence mode={'wait'}>
          {!isRecentWork && (
            <motion.nav
              ref={navRef}
              initial="initial"
              animate={'animate'}
              exit={'exit'}
              key={'nav-bar'}
              variants={navMenuVariants}
              className={clsx(
                'hidden',
                'md:block',
                'xl:col-start-9 xl:col-end-13  ',
              )}
            >
              <ul
                className={clsx(
                  'flex gap-x-[32px] uppercase text-[14px] leading-[14.4px] monoMedium transition-colors duration-300',
                  'lg:text-[14px] lg:leading-[16.8px]',
                  scrollTop ? 'text-[#fff]' : 'text-[#9ea2a3]',
                )}
              >
                {menuItems.map((item, index) => (
                  <li key={index} className={clsx('')}>
                    {item.isHomePage ? (
                      <Link
                        href={{
                          pathname: '/',
                          query:
                            router.pathname !== '/'
                              ? { scroll: item.link }
                              : {},
                        }}
                        scroll={false}
                        className={clsx('uppercase')}
                        onClick={() => handleHomepageLink(item.link)}
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <Link
                        href={`${item.link}?recent-work=${router.asPath}`}
                        scroll={false}
                      >
                        {item.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
        <motion.button
          variants={closeButtonVariants}
          initial="initial"
          animate={introVisible ? 'initial' : 'animate'}
          className={clsx(
            'flex items-center gap-x-[8px] relative',
            'md:hidden',
          )}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={clsx('w-[16px] flex flex-col items-end gap-y-[4px]')}
          >
            <span
              className={clsx(
                'block w-full h-[2px] bg-[#fff] topLine transition-transform duration-300 ease-in-out',
                menuOpen && 'open',
              )}
            ></span>
            <span
              className={clsx(
                'block w-[12px] h-[2px] bg-[#fff] bottomLine transition-all duration-300 ease-in-out',
                menuOpen && 'open',
              )}
            ></span>
          </span>
          <span
            className={clsx(
              'inline-block text-[14px] leading-[16.8px] monoMedium uppercase',
              'h-[15px] overflow-hidden',
            )}
          >
            <motion.span
              initial="initial"
              animate={menuOpen ? 'animate' : 'initial'}
              variants={menuButtonVariants}
              className={clsx(
                'flex flex-col gap-x-[8px] items-end text-[#fff]',
              )}
            >
              <span>MENU</span>
              <span>Close</span>
            </motion.span>
          </span>
        </motion.button>
      </header>
      <AnimatePresence mode={'wait'}>
        {isRecentWork && (
          <>
            <motion.h6
              initial="initial"
              animate="animate"
              exit="exit"
              variants={closeButtonVariants}
              key={'recent-work-title'}
              className={clsx(
                'hidden text-secondaryText monoMedium text-[14px] leading-[19.6px] self-center justify-self-center h-fit absolute left-[50%] top-[72px] translate-x-[-50%] z-[101]',
                'lg:block ',
              )}
            >
              RECENT WORK
              {/* <FlickerText
                title="
                animationDelay={1.5}
                play={isRecentWork}
              /> */}
            </motion.h6>
            <Link href={prev ? prev : '/'} scroll={false}>
              <motion.button
                initial="initial"
                animate="animate"
                exit="exit"
                variants={closeButtonVariants}
                key={'close-button'}
                className={clsx(
                  'monoMedium text-[14px] leading-[17px] hidden col-span-4 gap-x-[8px] items-center border-[1px] border-[#D9D5D3] text absolute right-[64px] top-[57px] text-mainText px-[20px] py-[15px] rounded-[4px] z-[101] transition-colors duration-[0.3s]',
                  'lg:flex lg:col-start-8 lg:col-end-13 justify-self-end hover:border-mainText lg:h-[42px]',
                )}
              >
                <Image
                  src={'/icons/closeRecent.svg'}
                  alt={'close icon'}
                  width={11}
                  height={11}
                />
                <span>Close</span>
              </motion.button>
            </Link>
          </>
        )}
      </AnimatePresence>
      <AnimatePresence mode={'wait'}>
        {menuOpen && (
          <MobileMenu
            socials={socials}
            menuItems={menuItems}
            handleHomepageLink={handleHomepageLink}
          />
        )}
      </AnimatePresence>
    </>
  )
}

export default Header
