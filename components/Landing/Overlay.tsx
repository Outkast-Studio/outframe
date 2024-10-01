import { useState, useEffect } from 'react'
import { clsx } from 'clsx'
import Image from 'next/image'
import Button from 'components/UI/Button'
import { motion, AnimatePresence } from 'framer-motion'
import { PopupType } from 'lib/sanity.queries'
import { urlForImage } from 'lib/sanity.image'

const Overlay = ({ settings }: { settings: PopupType }) => {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('seenPopup')
    const lastSeenTitle = localStorage.getItem('lastSeenPopupTitle')

    if (!hasSeenPopup || lastSeenTitle !== settings.title) {
      const timer = setTimeout(() => {
        setIsVisible(true)
        localStorage.setItem('seenPopup', 'true')
        localStorage.setItem('lastSeenPopupTitle', settings.title)
      }, settings.timer * 1000)
      return () => clearTimeout(timer)
    }
  }, [settings.timer, settings.title])

  const variants = {
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
      <AnimatePresence>
        {isVisible && (
          <motion.div
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            className={clsx(
              'bg-black/40 w-screen h-screen fixed z-[9999] cursor-pointer',
            )}
            onClick={() => setIsVisible(false)}
          >
            <div
              className={clsx(
                'w-full h-full flex items-center justify-center ',
              )}
            >
              <article
                className={clsx(
                  'max-w-[540px] bg-[#f7f7f7] rounded-[8px] p-[8px] relative w-[calc(100%-16px)] cursor-default',
                )}
              >
                <button
                  className={clsx('absolute top-[12px] right-[12px]')}
                  onClick={() => setIsVisible(false)}
                >
                  <Image
                    src={'/icons/buttonCross.svg'}
                    alt={'Close Icon'}
                    width={39}
                    height={35}
                  />
                </button>
                <Image
                  src={urlForImage(settings.image).url()}
                  alt={'vytas'}
                  width={524}
                  height={300}
                  className={clsx('object-cover')}
                />
                <div className={clsx('pt-[16px] px-[8px]')}>
                  <h6
                    className={clsx(
                      'text-mainText font-medium text-[24px] leading-[31.2px] tracking-[-0.32px]',
                    )}
                  >
                    {settings.title}
                  </h6>
                  <p
                    className={clsx(
                      'text-secondaryText geist text-[16px] leading-[24px] tracking-[-0.16px] mt-[12px]',
                    )}
                  >
                    {settings.description}
                  </p>
                  <a href={settings.link} target={'_blank'} rel={'noreferrer'}>
                    <Button
                      cb={() => setIsVisible(false)}
                      text={settings.cta}
                      accent={true}
                      className={'mt-[19px] mb-[16px]'}
                    />
                  </a>
                </div>
              </article>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Overlay
