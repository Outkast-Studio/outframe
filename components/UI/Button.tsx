import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'

type Props = {
  cb?: () => void
  text: string
  accent?: boolean
  className?: string
  footer?: boolean
  isHero?: boolean
  isHeroSub?: boolean
}

const Button = ({
  text,
  cb,
  accent,
  className,
  footer,
  isHero,
  isHeroSub,
}: Props) => {
  return (
    <button
      onClick={() => {
        cb && cb()
      }}
      className={clsx(
        'rounded-[4px] monoMedium px-[18px] py-[12px] text-[14px] leading-[16.8px] tracking-[-0.2px] hoverButton flex items-center transition-colors duration-[0.35s] ease-in',
        accent
          ? 'bg-accent text-background hover:bg-[#EE4300]'
          : 'bg-background text-mainText border-[1px] border-dividers',
        footer && 'bg-black',
        className,
        // 'hover:opacity-90 transition-opacity duration-300 ease-in-out',
      )}
    >
      <span
        className={clsx(
          'relative z-[2] inline-block translate-x-[6px] hoverButtonText buttonTransiton',
          accent
            ? 'bg-accent hoverTextAccent'
            : 'bg-background hoverTextStandard',
          footer && 'bg-black text-[#F7F7F7]',
        )}
      >
        {text}
      </span>
      {isHeroSub && (
        <Image
          src={'/icons/downArrowOutframeDark.svg'}
          width={10}
          height={10}
          alt={'arrow'}
          className={clsx(
            'hidden',
            'lg:block relative z-[1] translate-x-[-10px] buttonTransiton hoverArrowButton',
          )}
        />
      )}
      {((accent && !isHero) || footer) && (
        <Image
          src={'/icons/recentWorkArrowWhite.svg'}
          width={12}
          height={12}
          alt={'arrow'}
          className={clsx(
            'hidden',
            'lg:block relative z-[1] translate-x-[-10px] buttonTransiton hoverArrowButton',
            isHero && 'hidden',
          )}
        />
      )}

      {isHero && accent && (
        <Image
          src={'/icons/recentWorkArrowWhite.svg'}
          width={10}
          height={10}
          alt={'arrow'}
          className={clsx(
            'hidden',
            'lg:block relative z-[1] translate-x-[-10px] buttonTransiton hoverArrowButton',
          )}
        />
      )}

      {!isHero && !accent && !footer && (
        <Image
          src={'/icons/recentWorkArrow.svg'}
          width={10}
          height={10}
          alt={'arrow'}
          className={clsx(
            'hidden',
            'lg:block relative z-[1] translate-x-[-10px] buttonTransiton hoverArrowButton',
          )}
        />
      )}
    </button>
  )
}

export default Button
