import React from 'react'
import { clsx } from 'clsx'
import Image from 'next/image'
import Button from './UI/Button'

const Footer = () => {
  const socials = [
    { name: 'Twitter', url: 'https://twitter.com/creativetim' },
    { name: 'LinkedIn', url: 'https://www.facebook.com/creativetim' },
    { name: 'Dribbble', url: 'https://dribbble.com/creativetim' },
  ]
  return (
    <footer
      className={clsx(
        'px-gutter mt-[111px] pb-[29px] relative overflow-hidden ',
        'lg:pb-[64px]',
      )}
    >
      <div
        className={clsx(
          'bg-[#000] py-[40px] px-[32px] rounded-[5px] relative overflow-hidden z-[2]',
          'lg:grid lg:grid-cols-12 lg:pt-[99px] lg:px-0 lg:gap-x-columnGap lg:pb-[32px]',
          'xl:pt-[163px] ',
        )}
      >
        <div
          className={clsx(
            'relative z-[2]',
            'lg:col-start-6 lg:col-end-13 lg:pr-[72px]',
          )}
        >
          <h6
            className={clsx(
              'monoMedium text-white text-[36px] leading-[43.2px] tracking-[-0.2px] uppercase mb-[32px]',
              'md:max-w-[542px]',
              'lg:text-[44px] lg:leading-[58.34px] lg:tracking-[-0.4px] lg:mb-[42px] lg:max-w-[600px]',
              'xl:text-[60px] xl:leading-[79.56px] xl:max-w-[800px]',
            )}
          >
            Let's Build an Amazing product, Together
          </h6>
          <p
            className={clsx(
              'text-[16px] font-sansRegular text-dividers leading-[24px] mb-[32px]',
              'md:max-w-[470px] lg:text-[18px] lg:leading-[25.2px] text-[#D4D2CD] lg:mb-[42px]',
              'xl:text-[20px] xl:leading-[30px] xl:max-w-[560px]',
            )}
          >
            Reduce churn and grow your business with us as a design partner. Not
            sure where to start? Book a call with us and we’ll answer all of
            your questions.
          </p>
          <div
            className={clsx(
              'flex gap-x-[16px] mb-[137px]',
              'lg:mb-[74px]',
              'xl:mb-[92px]',
            )}
          >
            {/* <button
              className={clsx(
                'text-[14px] leading-[16.8px] whitespace-nowrap tracking-[-0.2px] bg-accent font-monoMedium text-[#F7F7F7] px-[18px] py-[12px] rounded-[4px] h-fit',
                'lg:text-[12px] lg:leading-[14.4px]',
                'xl:text-[14px] xl:leading-[16.8px]',
              )}
            >
              Book a Call
            </button> */}
            <Button
              text={'Book a Call'}
              cb={() => {}}
              accent
              className={clsx(
                'text-[14px] leading-[16.8px] whitespace-nowrap tracking-[-0.2px] bg-[#000] border- font-monoMedium text-[#F7F7F7] px-[18px] py-[12px] rounded-[4px] h-fit !border-[#3B3633]',
                'lg:text-[12px] lg:leading-[14.4px]',
                'xl:text-[14px] xl:leading-[16.8px]',
              )}
            />
            {/* <button
              className={clsx(
                'text-[14px] leading-[16.8px] whitespace-nowrap tracking-[-0.2px] bg-none border- font-monoMedium text-[#F7F7F7] px-[18px] py-[12px] rounded-[4px] h-fit border-[#3B3633] border-[1px]',
                'lg:text-[12px] lg:leading-[14.4px]',
                'xl:text-[14px] xl:leading-[16.8px]',
              )}
            >
              Contact Us
            </button> */}
            <Button
              text={'Contact Us'}
              cb={() => {}}
              footer
              className={clsx(
                'text-[14px] leading-[16.8px] whitespace-nowrap tracking-[-0.2px] bg-[#000] border- font-monoMedium text-[#F7F7F7] px-[18px] py-[12px] rounded-[4px] h-fit !border-[#3B3633]',
                'lg:text-[12px] lg:leading-[14.4px]',
                'xl:text-[14px] xl:leading-[16.8px]',
              )}
            />
          </div>
          <div
            className={clsx(
              'flex justify-between pt-[21px] border-t-[#979590] border-t-[1px] border-opacity-[0.3] mb-[35px]',
              'lg:hidden',
            )}
          >
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className={clsx(
                  'text-[14px] leading-[16.8px] text-[#979590] font-sansRegular flex gap-x-[4px]',
                )}
              >
                <span>{social.name}</span>
                <Image
                  src={'/icons/footerSocialIcon.svg'}
                  alt={'arrow icon'}
                  width={12}
                  height={12}
                />
              </a>
            ))}
          </div>
          <span
            className={clsx(
              'text-[14px] leading-[16.8px] text-[#979590]',
              'lg:hidden',
            )}
          >
            © 2024 Outframe Tech Ltd.
          </span>
        </div>
        <div
          className={clsx(
            'absolute bottom-[-320px] right-[-480px] w-[650px] h-[650px]',
            'lg:right-[unset] lg:left-[-390px] lg:w-[745px] lg:h-[745px] lg:bottom-[unset] lg:top-[50px] lg:rotate-[270deg]',
            'xl:w-[1000px] xl:h-[1000px] xl:top-[75px]',
          )}
        >
          <Image
            src={'/images/outframeFooter.png'}
            alt={'outframe logo'}
            width={1000}
            height={1000}
          />
        </div>
        <div
          className={clsx(
            'hidden border-t-[#979590] border-t-[1px] border-opacity-[0.3] pt-[32px] font-sansRegula',
            'lg:col-span-12 lg:flex  justify-between relative z-[2] mx-[32px]',
            'xl:grid xl:grid-cols-12 xl:gap-x-columnGap',
          )}
        >
          <span
            className={clsx(
              'text-[14px] leading-[16.8px] text-[#979590]',
              'xl:col-span-5',
            )}
          >
            © 2024 Outframe Tech Ltd.
          </span>
          <span
            className={clsx(
              'text-[14px] leading-[16.8px] text-[#979590]',
              'xl:col-span-3',
            )}
          >
            Worldwide → Cyprus
          </span>
          <div
            className={clsx(
              'flex gap-x-[24px]',
              'xl:col-span-4 xl:justify-self-end',
            )}
          >
            {socials.map((social, index) => (
              <a
                key={index}
                href={social.url}
                className={clsx(
                  'text-[14px] leading-[16.8px] text-[#979590] font-sansRegular flex gap-x-[4px]',
                )}
              >
                <span>{social.name}</span>
                <Image
                  src={'/icons/footerSocialIcon.svg'}
                  alt={'arrow icon'}
                  width={12}
                  height={12}
                />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className={clsx('absolute bottom-[-400px] left-0 w-screen')}>
        <Image
          src={'/images/footerText.png'}
          alt={'footer wave'}
          width={1920}
          height={100}
          className="w-full"
        />
      </div>
    </footer>
  )
}

export default Footer
