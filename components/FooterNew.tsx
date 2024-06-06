import { clsx } from 'clsx'
import Image from 'next/image'
import Button from './UI/Button'
import { GlobalSettings } from 'lib/sanity.queries'

const FooterNew = ({ settings }: { settings: GlobalSettings }) => {
  const socials = [
    { name: 'Twitter', url: 'https://twitter.com/VytasBu' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/vytasbu/' },
    { name: 'Dribbble', url: 'https://dribbble.com/outframe' },
  ]
  return (
    <>
      <div
        className={clsx(
          'pt-[72px] border-t-dividers border-t-[1px] mx-gutter mt-[83px]',
          'lg:flex lg:justify-between lg:items-center lg:pt-[63px]',
        )}
      >
        <footer className={clsx('', 'lg:w-full')}>
          <h2
            className={clsx(
              'text-[30px] leading-[36px] monoMedium uppercase text-mainText tracking-[-0.2px] max-w-[560px]',
              'lg:text-[58px] lg:leading-[76.91px] lg:max-w-[846px] lg:tracking-[-4px]',
            )}
          >
            {settings.footerTitle}
          </h2>
          <p
            className={clsx(
              'text-[16px] leading-[24px] tracking-[-0.1px] geist text-secondaryText mt-[32px] max-w-[560px]',
              'lg:text-[19px] lg:leading-[28.56px]',
            )}
          >
            Reduce churn and grow your business with us as a design partner. Not
            sure where to start? Book a call with us and we’ll answer all of
            your questions.
          </p>
          <div className={clsx('flex gap-x-[16px] mt-[32px] ')}>
            <a
              href={'https://cal.com/outframe/intro'}
              target="_blank"
              rel={'noreferrer'}
            >
              <Button
                text={'Book a Call'}
                cb={() => {}}
                accent
                className={clsx(
                  'text-[14px] leading-[16.8px] whitespace-nowrap tracking-[-0.2px] bg-[#000] border- monoMedium text-[#F7F7F7] px-[18px] py-[12px] rounded-[4px] h-fit !border-[#3B3633]',
                  'lg:text-[14px] lg:leading-[14.4px]',
                  'xl:text-[14px] xl:leading-[16.8px]',
                )}
              />
            </a>
            <a href={'mailto:vytas@outframe.co'}>
              <Button
                text={'Contact Us'}
                cb={() => {}}
                className={clsx(
                  'text-[14px] leading-[16.8px] whitespace-nowrap tracking-[-0.2px] bg-[#000] border- monoMedium text-[#F7F7F7] px-[18px] py-[12px] rounded-[4px] h-fit !border-dividers',
                  'lg:text-[14px] lg:leading-[14.4px]',
                  'xl:text-[14px] xl:leading-[16.8px]',
                )}
              />
            </a>
          </div>
        </footer>
        <Image
          src={'/images/FooterImage.png'}
          alt={'Outframe Logo'}
          width={1920}
          height={1920}
          className={clsx(
            'mt-[24px]',
            'lg:w-[50%] lg:h-auto object-contain lg:mt-[0px]',
            'xl:w-full',
          )}
        />
      </div>
      <div
        className={clsx(
          'lg:flex items-center lg:pl-[64px] lg:gap-x-[75px] lg:pb-[79px]',
        )}
      >
        <span
          className={clsx(
            'text-[16px] leading-[24px] hidden geist text-tertiaryText tracking-[-0.1px]',
            'lg:block',
          )}
        >
          © 2024 Outframe Tech Ltd.
        </span>
        <span
          className={clsx(
            'text-[16px] leading-[24px] hidden geist text-tertiaryText tracking-[-0.1px]',
            'lg:block',
          )}
        >
          Worldwide → Cyprus
        </span>
        <nav
          className={clsx(
            'flex mt-[24px]  justify-between mx-gutter border-t-dividers border-t-[1px] pt-[11.5px] pb-[35px]',
            'lg:border-t-[0px] lg:w-fit gap-x-[24px] lg:mx-0 lg:pb-0 lg:mt-0 lg:pt-0',
          )}
        >
          {socials.map((social, index) => (
            <a
              key={index}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className={clsx(
                'text-[14px] leading-[16.8px] opacity-[0.6] text-mainText geist flex gap-x-[4px] items-center transition-opacity duration-200',
                'hover:opacity-100',
                'lg:text-[16px] lg:leading-[24px]',
              )}
            >
              <span>{social.name}</span>
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 7.25V1.5H5.25" stroke="#292626" />
                <path d="M3 9.5L11 1.5" stroke="#292626" />
                <path d="M11.5 11.5H0.5" stroke="#292626" />
              </svg>
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}

export default FooterNew
