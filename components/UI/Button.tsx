import React from 'react'
import clsx from 'clsx'
import Image from 'next/image'

type Props = {
  cb: () => void
  text: string
  accent?: boolean
  className?: string
  footer?: boolean
}

const Button = ({ text, cb, accent, className, footer }: Props) => {
  return (
    <button
      onClick={() => {
        cb()
      }}
      className={clsx(
        'rounded-[4px] font-monoRegular px-[18px] py-[12px] text-[14px] leading-[16.8px] tracking-[-0.2px] hoverButton flex items-center',
        accent
          ? 'bg-accent text-background'
          : 'bg-background text-mainText border-[1px] border-dividers',
        footer && 'bg-black',
        className,
      )}
    >
      <span
        className={clsx(
          ' relative z-[2] inline-block translate-x-[6px] hoverButtonText buttonTransiton',
          accent ? 'bg-accent' : 'bg-background',
          footer && 'bg-black text-[#F7F7F7]',
        )}
      >
        {text}
      </span>

      {accent || footer ? (
        <Image
          src={'/icons/recentWorkArrowWhite.svg'}
          width={12}
          height={12}
          alt={'arrow'}
          className={clsx(
            'relative z-[1] translate-x-[-10px] buttonTransiton hoverArrowButton',
          )}
        />
      ) : (
        <Image
          src={'/icons/recentWorkArrow.svg'}
          width={10}
          height={10}
          alt={'arrow'}
          className={clsx(
            'relative z-[1] translate-x-[-10px] buttonTransiton hoverArrowButton',
          )}
        />
      )}
    </button>
  )
}

export default Button
