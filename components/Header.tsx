import React, { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import Logo from 'components/UI/Logo'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { useThemeStore } from 'stores/themeStore'
import { useLenis } from '@studio-freight/react-lenis'
import FlickerText from 'components/UI/FlickerText'
import { useWindowSize } from 'hooks/useWindowSize'

const Header = () => {
  const menuOpen = useThemeStore((state) => state.menuOpen)
  const setMenuOpen = useThemeStore((state) => state.setMenuOpen)
  const lenis = useLenis()
  const router = useRouter()
  const introVisible = useThemeStore((state) => state.introVisible)
  const { width } = useWindowSize()

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
    {
      // title: useScrambleText({ title: 'About', animationDelay: 4200 }),
      title: (
        <FlickerText
          title="About"
          animationDelay={width > 1024 ? 1 : 0}
          play={router.pathname == '/' ? !introVisible : true}
          hover={true}
        />
      ),
      link: '#about',
      isHomePage: true,
      width: 45,
    },
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
        duration: 1,
        ease: [0.62, 0.05, 0.01, 0.99],
      },
    },
    animate: {
      y: -17,
      transition: {
        duration: 1,
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

  return (
    <>
      <header
        className={clsx(
          'flex px-gutter mix-blend-difference pt-[24px] pb-[16px] justify-between sticky top-0 left-0 w-full items-center z-[100]',
          'md:mt-[40px] pb-[20px]',
          'xl:grid grid-cols-12 xl:gap-x-columnGap ',
        )}
      >
        <Link href="/">
          <Logo />
        </Link>
        <nav
          className={clsx('hidden', 'md:block', 'xl:col-start-8 xl:col-end-13')}
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
                        router.pathname !== '/' ? { scroll: item.link } : {},
                    }}
                    className={clsx('uppercase')}
                    onClick={() => handleHomepageLink(item.link)}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <Link href={item.link}>{item.title}</Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <button
          className={clsx('flex items-center gap-x-[8px]', 'md:hidden')}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span
            className={clsx('w-[16px] flex flex-col items-end gap-y-[4px]')}
          >
            <span className={clsx('block w-full h-[2px] bg-[#fff]')}></span>
            <span className={clsx('block w-[12px] h-[2px] bg-[#fff]')}></span>
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
      {menuOpen && (
        <div
          className={clsx(
            'fixed h-[calc(100svh)] px-gutter w-full bg-background top-[0px] pt-[129px] flex flex-col justify-between z-[99]',
          )}
        >
          <nav>
            <ul className={clsx('flex flex-col gap-y-[32px]')}>
              {menuItems.map((item, index) => (
                <li
                  key={index}
                  className={clsx(
                    'text-[18px] leading-[21.6px] tracking-[-0.2px] font-monoMedium text-mainText uppercase overflow-hidden',
                  )}
                >
                  {!item.isHomePage ? (
                    <Link
                      href={{
                        pathname: '/',
                        query:
                          router.pathname !== '/' ? { scroll: item.link } : {},
                      }}
                      className={clsx('uppercase')}
                      onClick={() => {
                        setMenuOpen(false)
                      }}
                    >
                      {item.title}
                    </Link>
                  ) : (
                    <button
                      onClick={() => {
                        setMenuOpen(false)
                        setTimeout(() => {
                          handleHomepageLink(item.link)
                        }, 500)
                      }}
                      className={clsx(
                        'uppercase',
                        router.pathname.toLowerCase() === item.link &&
                          'text-accent',
                      )}
                    >
                      {item.title}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <div className={clsx('flex gap-x-[16px] mb-[32px]')}>
              <button
                className={clsx(
                  'rounded-[4px] bg-accent text-background monoMedium px-[18px] py-[12px] text-[14px] leading-[16.8px] tracking-[-0.2px]',
                )}
              >
                View plans
              </button>
              <button
                className={clsx(
                  'rounded-[4px] bg-background text-mainText monoMedium px-[18px] py-[12px] text-[14px] leading-[16.8px] tracking-[-0.2px] border-[1px] border-dividers',
                )}
              >
                Book a Call
              </button>
            </div>
            <nav>
              <ul
                className={clsx(
                  'flex justify-between pb-[24px] pt-[21px] border-t-[1px] border-t-dividers',
                )}
              >
                {socials.map((item, index) => (
                  <li>
                    <a
                      href={item.url}
                      rel="norefferer"
                      target="_blank"
                      className={clsx(
                        'flex gap-x-[4px] items-center text-[14px] leading-[16.8px] text-tertiaryText',
                      )}
                    >
                      <span>{item.name}</span>
                      <Image
                        src={'icons/footerSocialIcon.svg'}
                        alt={'arrow icon'}
                        width={12}
                        height={12}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

export default Header
