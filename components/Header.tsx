import React from 'react'
import { clsx } from 'clsx'
import Logo from 'components/UI/Logo'
import Link from 'next/link'

const Header = () => {
  const menuItems = [
    {
      title: 'Case studies',
      link: '/case-studies',
      isHomePage: false,
    },
    {
      title: 'About',
      link: '#about',
      isHomePage: true,
    },
    {
      title: 'Services',
      link: '#services',
      isHomePage: true,
    },
    {
      title: 'Pricing',
      link: '#pricing',
      isHomePage: true,
    },
    {
      title: 'Recent Work',
      link: '/recent-work',
      isHomePage: false,
    },
    {
      title: 'Blog',
      link: '/blog',
      isHomePage: false,
    },
  ]
  return (
    <header
      className={clsx(
        'flex px-gutter bg-background pt-[24px] pb-[16px] justify-between sticky top-0 left-0 w-full items-center z-[100]',
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
            'flex gap-x-[32px] uppercase text-[12px] leading-[14.4px] monoMedium text-secondaryText',
            'lg:text-[14px] lg:leading-[16.8px]',
          )}
        >
          {menuItems.map((item, index) => (
            <li key={index} className={clsx('')}>
              {item.isHomePage ? (
                <a href={item.link}>{item.title}</a>
              ) : (
                <Link href={item.link}>{item.title}</Link>
              )}
            </li>
          ))}
        </ul>
      </nav>
      <button
        className={clsx(
          'w-[24px] flex flex-col items-end gap-y-[4px]',
          'md:hidden',
        )}
      >
        <span className={clsx('block w-full h-[2px] bg-mainText')}></span>
        <span className={clsx('block w-[20px] h-[2px] bg-mainText')}></span>
      </button>
    </header>
  )
}

export default Header
