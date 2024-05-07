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

const Header = () => {
  const menuOpen = useThemeStore((state) => state.menuOpen)
  const setMenuOpen = useThemeStore((state) => state.setMenuOpen)
  const lenis = useLenis()
  const router = useRouter()
  const introVisible = useThemeStore((state) => state.introVisible)
  const { width } = useWindowSize()
  const [isRecentWork, setIsRecentWork] = useState(false)
  const searchParams = useSearchParams()
  const prev = searchParams.get('recent-work')

  const menuItems = [
    {
      title: (
        <FlickerText
          title="Case Studies"
          animationDelay={width > 1024 ? 1 : 0}
          play={router.pathname == '/' ? !introVisible : true}
          hover={true}
        />
      ),
      // title: 'Case Studies',
      link: '#case-studies',
      isHomePage: true,
      width: 101,
    },
    // {
    //   // title: useScrambleText({ title: 'About', animationDelay: 4200 }),
    //   title: (
    //     <FlickerText
    //       title="About"
    //       animationDelay={width > 1024 ? 1 : 0}
    //       play={router.pathname == '/' ? !introVisible : true}
    //       hover={true}
    //     />
    //   ),
    //   link: '#about',
    //   isHomePage: true,
    //   width: 45,
    // },
    {
      // title: useScrambleText({ title: 'Services', animationDelay: 4500 }),
      title: (
        <FlickerText
          title="Services"
          animationDelay={width > 1024 ? 1 : 0}
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
          animationDelay={width > 1024 ? 1 : 0}
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
          animationDelay={width > 1024 ? 1 : 0}
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
          animationDelay={width > 1024 ? 1 : 0}
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
    { name: 'Twitter', url: 'https://twitter.com/creativetim' },
    { name: 'LinkedIn', url: 'https://www.facebook.com/creativetim' },
    { name: 'Dribbble', url: 'https://dribbble.com/creativetim' },
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
    console.log(router)
    if (router.pathname === '/recent-work') {
      setIsRecentWork(true)
    } else {
      setIsRecentWork(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.pathname, width])

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

  return (
    <>
      {' '}
      <div className={clsx('md:h-[40px]')}></div>
      <header
        className={clsx(
          'flex px-gutter mix-blend-difference pt-[24px] pb-[16px] justify-between sticky top-0 left-0 w-full items-center z-[100]',
          'md:mt-[0px] pb-[20px]',
          'xl:grid grid-cols-12 xl:gap-x-columnGap',
        )}
      >
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
                'xl:col-start-9 xl:col-end-13',
              )}
            >
              <ul
                className={clsx(
                  'flex gap-x-[32px] uppercase text-[12px] leading-[14.4px] font-monoRegular text-[#998F8C]',
                  'lg:text-[14px] lg:leading-[16.8px]',
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
        <button
          className={clsx('flex items-center gap-x-[8px]', 'md:hidden')}
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
              'inline-block text-[14px] leading-[16.8px] font-monoMedium uppercase',
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
        </button>
      </header>
      <AnimatePresence mode={'wait'}>
        {isRecentWork && (
          <>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={closeButtonVariants}
              key={'recent-work-title'}
              className={clsx(
                'hidden text-secondaryText font-monoMedium text-[14px] leading-[19.6px] self-center justify-self-center h-fit absolute left-[50%] top-[72px] translate-x-[-50%] z-[101]',
                'lg:block ',
              )}
            >
              <FlickerText
                title="RECENT WORK"
                animationDelay={1.5}
                play={isRecentWork}
              />
            </motion.div>
            <Link href={prev ? prev : '/'} scroll={false}>
              <motion.button
                initial="initial"
                animate="animate"
                exit="exit"
                variants={closeButtonVariants}
                key={'close-button'}
                className={clsx(
                  'font-monoMedium text-[14px] leading-[17px] hidden col-span-4 gap-x-[8px] items-center border-[1px] border-[#D9D5D3] text absolute right-[64px] top-[57px] text-mainText px-[20px] py-[15px] rounded-[4px] z-[101] transition-colors duration-[0.3s]',
                  'lg:flex lg:col-start-8 lg:col-end-13 justify-self-end hover:border-mainText',
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
