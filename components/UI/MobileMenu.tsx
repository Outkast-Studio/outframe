import React from 'react'
import { clsx } from 'clsx'
import Link from 'next/link'
import Image from 'next/image'
import { useThemeStore } from 'stores/themeStore'
import { useRouter } from 'next/router'

const MobileMenu = ({ menuItems, socials, handleHomepageLink }) => {
  const menuOpen = useThemeStore((state) => state.menuOpen)
  const setMenuOpen = useThemeStore((state) => state.setMenuOpen)
  const router = useRouter()

  return (
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
                  scroll={false}
                  href={item.link}
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
              <li key={item.name}>
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
  )
}

export default MobileMenu
