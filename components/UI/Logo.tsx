import React, { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import { useScroll, motion, useMotionValueEvent } from 'framer-motion'
import { useThemeStore } from 'stores/themeStore'
import { useRouter } from 'next/router'

const Logo = () => {
  const { scrollY } = useScroll()
  const [hideLogoText, setHideLogoText] = useState(true)
  const introVisible = useThemeStore((state) => state.introVisible)
  const [atTop, setAtTop] = useState(true)

  const router = useRouter()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest > 100 && hideLogoText === false) {
      setHideLogoText(true)
      setAtTop(false)
    }
    if (latest <= 100 && hideLogoText === true) {
      setHideLogoText(false)
      setAtTop(true)
    }
  })

  const fadeInVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        duration: 0.3,
      },
    },
  }

  useEffect(() => {
    if (introVisible === false) {
      setTimeout(() => {
        setHideLogoText(false)
      }, 900)
    }
    if (router.pathname !== '/') {
      setHideLogoText(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [introVisible])
  return (
    <motion.div
      variants={fadeInVariants}
      initial="initial"
      animate={introVisible && router.pathname == '/' ? 'initial' : 'animate'}
      onMouseOver={() => {
        if (!atTop) {
          setHideLogoText(false)
        }
      }}
      onMouseOut={() => {
        if (!atTop) {
          setHideLogoText(true)
        }
      }}
      className={clsx(
        'min-w-[180px] col-span-5 flex overflow-hidden items-center ',
        'lg:min-w-[200px]',
      )}
    >
      <svg
        width="28"
        height="29"
        viewBox="0 0 28 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx(
          'flex-shrink-0 bg-[#000000] relative z-[10] w-[24px]',
          'transition-transform duration-[0.5s] ease-in-out-expo',
          hideLogoText && '!rotate-[-270deg]',
          'lg:w-[28px]',
        )}
      >
        <path
          d="M26.7501 17.4683L25.7465 16.4647C24.8698 15.588 24.8698 14.1646 25.7465 13.2879L27.3396 11.6948C27.9739 11.0606 28.1753 10.1073 27.8377 9.27537C27.8358 9.27164 27.834 9.26604 27.8321 9.26045C27.0803 7.40622 25.9779 5.74412 24.5527 4.32081C23.1294 2.89749 21.4673 1.79502 19.613 1.04326C19.6093 1.04139 19.6037 1.03953 19.5981 1.03766C18.7661 0.701885 17.8129 0.901485 17.1787 1.53573L15.5856 3.1288C14.7088 4.00555 13.2855 4.00555 12.4088 3.1288L10.8157 1.53573C10.1852 0.90335 9.23195 0.701885 8.39998 1.03953C8.39438 1.04139 8.39065 1.04326 8.38505 1.04512C6.53082 1.79689 4.86873 2.89935 3.44541 4.32267C2.0221 5.74599 0.91963 7.40808 0.167865 9.26231C0.166 9.26604 0.164134 9.27164 0.162269 9.27724C-0.173507 10.1092 0.0260928 11.0624 0.660337 11.6967L2.25341 13.2898C3.13016 14.1665 3.13016 15.5898 2.25341 16.4666L1.24981 17.4702L0.660337 18.0596C0.0260928 18.6939 -0.175373 19.6471 0.162269 20.4791C0.164134 20.4828 0.166 20.4884 0.167865 20.494C0.91963 22.3483 2.0221 24.0103 3.44728 25.4337C4.8706 26.857 6.53269 27.9613 8.38692 28.7112C8.39065 28.7131 8.39625 28.7149 8.40184 28.7168C9.23382 29.0526 10.1871 28.853 10.8213 28.2187L11.4108 27.6293L12.4144 26.6257C13.2911 25.7489 14.7144 25.7489 15.5912 26.6257L16.5948 27.6293L17.1843 28.2187C17.8185 28.853 18.7717 29.0545 19.6037 28.7168C19.6093 28.7149 19.613 28.7131 19.6186 28.7112C21.4729 27.9594 23.135 26.857 24.5583 25.4337C25.9816 24.0103 27.0859 22.3483 27.8377 20.494C27.8395 20.4884 27.8414 20.4847 27.8433 20.4791C28.1791 19.6471 27.9795 18.6939 27.3452 18.0596L26.7557 17.4702L26.7501 17.4683ZM23.1741 14.95C23.1704 15.5395 22.9335 16.1047 22.5156 16.5207L15.6434 23.3929C15.2274 23.8107 14.6622 24.0458 14.0727 24.0514C14.0485 24.0514 14.0242 24.0514 14 24.0514C13.9757 24.0514 13.9515 24.0514 13.9272 24.0514C13.3378 24.0477 12.7744 23.8107 12.3565 23.3929L5.48432 16.5207C5.06833 16.1047 4.83142 15.5395 4.82583 14.95C4.82583 14.9257 4.82583 14.9015 4.82583 14.8772C4.82583 14.853 4.82583 14.8287 4.82583 14.8045C4.82956 14.215 5.06647 13.6517 5.48432 13.2338L12.3565 6.36158C12.7725 5.94559 13.3378 5.70868 13.9272 5.70308C13.9515 5.70308 13.9757 5.70308 14 5.70308C14.0242 5.70308 14.0485 5.70308 14.0727 5.70308C14.6622 5.70682 15.2256 5.94372 15.6434 6.36158L22.5156 13.2338C22.9316 13.6517 23.1685 14.215 23.1741 14.8045C23.1741 14.8287 23.1741 14.853 23.1741 14.8772C23.1741 14.9015 23.1741 14.9257 23.1741 14.95Z"
          fill="#F7F7F7"
        />
      </svg>

      <motion.svg
        width="101"
        height="18"
        viewBox="0 0 101 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={clsx(
          'translate-x-[5px] transition-transform duration-[0.35s] ease-out-expo w-[85px]',
          hideLogoText && '!translate-x-[-105px]',
          'lg:w-[101px]',
        )}
      >
        <path
          d="M33.8335 7.33103V12.7482C33.8335 14.3581 34.3372 15.0968 35.7997 15.0968C36.932 15.0968 37.9337 14.8375 37.9337 14.8375V16.7701C37.292 16.8988 36.4581 16.9883 35.3893 16.9883C32.1453 16.9883 31.567 14.8823 31.567 12.3005V7.33103H28.8379V5.2716H31.567V1.99219H33.8335V5.2716H37.9337V7.33103H33.8335Z"
          fill="#F7F7F7"
        />
        <path
          d="M27.7046 5.27148V16.8017H25.4381V15.1433C24.774 16.1656 23.6808 16.9882 21.905 16.9882C20.9797 16.9882 20.1683 16.7476 19.4911 16.326C18.051 15.4324 17.2246 13.7163 17.2246 11.7482V5.27148H19.4911V11.1886C19.4911 14.5501 21.0655 14.9083 22.4646 14.9083C24.6341 14.9083 25.4381 13.1995 25.4381 11.3751V5.27148H27.7046Z"
          fill="#F7F7F7"
        />
        <path
          d="M56.031 5.33844V7.47248C50.9216 6.8942 50.8153 9.05623 50.8153 11.2798V16.8015H48.5488V5.2918H50.8153V6.82518C51.7872 5.594 52.8318 5.23584 54.576 5.23584C55.6859 5.23584 56.031 5.33844 56.031 5.33844Z"
          fill="#F7F7F7"
        />
        <path
          d="M43.769 4.94909V5.27181H47.3282V7.33123H43.769V16.802H41.5025V7.33123H38.7715V5.27181H41.5043C41.5211 2.74789 42.133 0.708984 45.3247 0.708984C46.1157 0.708984 46.7779 0.757485 47.3282 0.833968V2.74603C46.929 2.67514 46.3507 2.59866 45.7351 2.59866C44.2726 2.59866 43.769 3.33923 43.769 4.94909Z"
          fill="#F7F7F7"
        />
        <path
          d="M65.3918 5.66506V7.25067C64.5001 6.15753 63.1869 5.47852 61.5807 5.47852C60.3981 5.47852 59.3758 5.846 58.5625 6.47838C57.2212 7.51369 56.4434 9.25786 56.4434 11.2333C56.4434 13.2088 57.2212 14.953 58.5625 15.9883C59.3758 16.6207 60.3981 16.9882 61.5807 16.9882C63.1869 16.9882 64.5001 16.3092 65.3918 15.216V16.8016H67.6583V5.66506H65.3918ZM61.8512 14.7832C59.6426 14.7832 58.3797 13.1939 58.3797 11.2333C58.3797 9.27279 59.7134 7.68345 61.8512 7.68345C63.767 7.68345 65.3209 9.27279 65.3209 11.2333C65.3209 13.1939 63.767 14.7832 61.8512 14.7832Z"
          fill="#F7F7F7"
        />
        <path
          d="M100.483 11.1253C100.483 9.62365 100.002 8.25257 99.1345 7.21726C98.1365 6.01779 96.6255 5.26416 94.7601 5.26416C93.4412 5.26416 92.3033 5.63911 91.3948 6.28268C89.9006 7.33664 89.0332 9.11439 89.0332 11.1253C89.0332 13.1362 89.9006 14.9159 91.3948 15.9698C92.3033 16.6134 93.4412 16.9883 94.7601 16.9883C96.6255 16.9883 98.1365 16.2347 99.1345 15.0352C99.5355 14.554 99.8545 14.0037 100.082 13.3993H97.7858C97.1329 14.4346 96.0453 15.1136 94.8141 15.1136C92.7454 15.1136 91.475 13.6791 91.2344 11.795H100.448C100.472 11.5768 100.483 11.3529 100.483 11.1253ZM91.3202 10.0135C91.7064 8.3533 92.973 7.14077 94.8141 7.14077C96.4613 7.14077 97.8511 8.3533 98.2876 10.0135H91.3202Z"
          fill="#F7F7F7"
        />
        <path
          d="M9.28625 0.708984H7.72303C3.96607 0.708984 0.917969 3.75522 0.917969 7.51405V10.2413C0.917969 13.9983 3.96607 17.0464 7.72303 17.0464H9.28625C13.0432 17.0464 16.0913 13.9983 16.0913 10.2413V7.51405C16.0913 3.75522 13.0432 0.708984 9.28625 0.708984ZM13.3044 12.075C13.3044 13.3454 12.2747 14.3732 11.0043 14.3732H6.00497C4.73462 14.3732 3.70491 13.3454 3.70491 12.075V5.68034C3.70491 4.40998 4.73462 3.38027 6.00497 3.38027H11.0043C12.2747 3.38027 13.3044 4.40998 13.3044 5.68034V12.075Z"
          fill="#F7F7F7"
        />
        <path
          d="M87.4492 10.4034V16.8801H85.1827V10.963C85.1827 7.60153 83.6102 7.24337 82.2092 7.24337C81.6086 7.24337 81.1702 7.37395 80.8493 7.60526C80.5919 7.78621 80.411 8.03244 80.2841 8.32345V8.32718C79.9987 8.98194 79.9838 9.86616 79.9838 10.7765V16.8801H77.7173V10.963C77.7173 7.60153 76.1429 7.24337 74.7438 7.24337C72.5725 7.24337 72.5165 8.95396 72.5165 10.7765V16.8801H70.25V5.34996H72.5165V6.82178C72.7403 6.25656 73.5276 5.16342 75.3034 5.16342C76.2287 5.16342 77.0401 5.40406 77.7173 5.82565C78.3534 6.21925 78.8682 6.77515 79.2469 7.4411C80.4483 4.94703 82.8901 5.16342 82.8901 5.16342C84.485 5.16342 87.4492 5.77715 87.4492 10.4034Z"
          fill="#F7F7F7"
        />
      </motion.svg>
    </motion.div>
  )
}

export default Logo
