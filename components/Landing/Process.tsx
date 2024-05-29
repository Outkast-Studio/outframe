import React, { useRef, useEffect } from 'react'
import { clsx } from 'clsx'
import * as Accordion from '@radix-ui/react-accordion'
import { useWindowSize } from 'hooks/useWindowSize'
import { useThemeStore } from 'stores/themeStore'
import Image from 'next/image'
import FlickerText from 'components/UI/FlickerText'
import SectionHeading from 'components/UI/SectionHeading'
const Process = () => {
  const processItems = [
    {
      name: 'Discovery Call',
      description:
        'Book a free consultation call to explore potential collaboration. If there’s a fit, expect a quick pitch or UX/UI audit to demonstrate our capabilities.',
      image: '/icons/Discovery.svg',
    },
    {
      name: 'Choose Starting Package',
      description:
        'Based on your needs, options include starting with a full UX design followed by visual design, a small test project, or developing an overall visual identity. The right package will be recommended after our initial call.',
      image: '/icons/scope.svg',
    },
    {
      name: 'Audit & Research',
      description:
        'This optional step varies by the chosen scope. It may include a comprehensive audit of your existing platform and various user research to deeply understand customer challenges.',
      image: '/icons/audit.svg',
    },
    {
      name: 'UX Design',
      description:
        'The scope of UX design will depend on the selected package and the complexity of your solution. Options range from creating detailed user flows and wireframes to quick, low-fidelity wireframes as a precursor to visual design.',
      image: '/icons/ux.svg',
    },
    {
      name: 'Design System',
      description:
        'A comprehensive Design System is often needed for companies we work with. We are experts in Design Systems, and a system will be tailored to be as detailed or as simple as depending on the stage of your business.',
      image: '/icons/dsystem.svg',
    },
    {
      name: 'Visual Design',
      description:
        'This is where we focus on the final result: the visual design of your solution. We use work and insights from our previous steps to ensure the design is beautiful and helps your sales team close deals faster.',
      image: '/icons/visual.svg',
    },
    {
      name: 'Handoff',
      description:
        'Ensuring smooth transition, designs are prepared for easy handoff. Collaboration with the development team ensures that the designs are easy to implement and look as good in reality as they do in Figma.',
      image: '/icons/handoff.svg',
    },
  ]

  return (
    <section
      className={clsx(
        'mt-[128px] mx-gutter geist text-mainText border-t-[1px] border-t-dividers',
        'md:flex',
        'lg:grid lg:grid-cols-12 lg:gap-x-columnGap',
      )}
    >
      <h6
        className={clsx(
          'w-full pt-[20px] monoMedium tracking-[-0.2px] uppercase text-[20px] leading-[24px]',
          'md:pt-[40px]',
          'lg:col-span-4',
          'xl:text-[24px] xl:leading-[33.6px]',
        )}
      >
        <SectionHeading text={'Process'} />
      </h6>
      <Accordion.Root
        orientation="vertical"
        type={'single'}
        collapsible
        defaultValue="Discovery call"
        className={clsx(
          'mt-[64px]',
          'md:w-full md:mt-[40px]',
          'lg:col-start-5 lg:col-end-13 ml:hidden lg:overflow-x-hidden',
        )}
      >
        {processItems.map((processItem, index) => (
          <ProcessItem
            key={index}
            name={processItem.name}
            description={processItem.description}
            image={processItem.image}
            index={index}
          />
        ))}
      </Accordion.Root>

      <Accordion.Root
        orientation="horizontal"
        type={'single'}
        collapsible={false}
        defaultValue="Discovery Call"
        id="processAccordionDesktop"
        className={clsx(
          'mt-[64px]',
          'md:w-full md:mt-[40px] hidden',
          'lg:col-start-5 lg:col-end-13 ml:flex lg:justify-between',
          'xl:col-start-6',
        )}
      >
        {processItems.map((processItem, index) => (
          <ProcessDesktopItem
            key={index}
            name={processItem.name}
            description={processItem.description}
            image={processItem.image}
            index={index}
          />
        ))}
      </Accordion.Root>
    </section>
  )
}

export default Process

export function ProcessItem({
  name,
  description,
  image,
  index,
}: {
  name: string
  description: string
  image: string
  index: number
}) {
  return (
    <Accordion.Item
      value={name}
      className={clsx(
        'border-t-[1px] border-t-dividers accordionItem',
        // index == 0 && 'border-b-[1px] border-b-dividers',
      )}
    >
      <Accordion.Content className={clsx('AccordionContent')}>
        <div
          className={clsx(
            'w-full px-[24px] pt-[16px]  border-l-[1px] border-l-dividers border-r-[1px] border-r-dividers rounded-[2px]',
          )}
        >
          <div className={clsx('flex justify-between')}>
            <h6
              className={clsx(
                'bg-[#EBE7E3] w-fit uppercase text-accent px-[10px] h-[22px] flex items-center rounded-full text-[14px] leading-[14.4px] tracking-[-0.2px] mono',
              )}
            >
              <span>STEP {index + 1}</span>
            </h6>
            {/* <div
              className={clsx('h-[18px] w-[18px] bg-dividers rounded-[4px]')}
            ></div> */}
            <Image src={image} alt={name + 'icon'} width={28} height={28} />
          </div>
          <h6
            className={clsx(
              'geistMedium text-[18px] leading-[27px] text-maintext mt-[24px]',
            )}
          >
            {name}
          </h6>
          <p
            className={clsx(
              'text-secondaryText text-[16px] leading-[24px] geist mt-[12px]',
            )}
          >
            {description}
          </p>
        </div>
      </Accordion.Content>
      <Accordion.Trigger
        className={clsx(
          'w-full relative accordionButton pr-[24px] hoverParent',
        )}
      >
        <div
          className={clsx(
            'absolute w-[1px] bg-dividers h-full left-0 top-0 transition-opacity duration-300 opacity-0 sides',
          )}
        ></div>
        <div
          className={clsx(
            'absolute w-[1px] bg-dividers h-full right-0 top-0 transition-opacity duration-300 opacity-0 sides',
          )}
        ></div>
        <div
          className={clsx(
            'pb-[16px] pt-[28px] flex justify-between items-center w-full',
          )}
        >
          <h6
            className={clsx(
              'text-[16px] leading-[24px] geistMedium text-mainText content transition-opacity duration-300',
              'lg:text-[18px] lg:leading-[27px]',
            )}
          >
            {name}
          </h6>
          <div className={clsx('w-[20px] h-[20px] relative')}>
            <span
              className={clsx(
                'inline-block w-full h-[1px] bg-secondaryText absolute origin-center top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 ',
              )}
            ></span>
            <span
              className={clsx(
                'inline-block w-full h-[1px] bg-secondaryText rotate-90 origin-center absolute top-[50%] left-[50%]  -translate-x-1/2 -translate-y-1/2 lowerLine',
              )}
            ></span>
          </div>
        </div>
      </Accordion.Trigger>
    </Accordion.Item>
  )
}

function ProcessDesktopItem({
  name,
  description,
  image,
  index,
}: {
  name: string
  description: string
  image: string
  index: number
}) {
  const triggerRef = useRef(null)
  const contentRef = useRef(null)
  const overlayRef = useRef(null)
  const { width } = useWindowSize()
  const setProcessWidth = useThemeStore((state) => state.setProcessWidth)
  const processWidth = useThemeStore((state) => state.processWidth)
  useEffect(() => {
    if (
      triggerRef.current &&
      contentRef.current &&
      index == 0 &&
      processWidth == 0
    ) {
      setProcessWidth(
        triggerRef.current.offsetWidth + contentRef.current.offsetWidth,
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width])

  return (
    <Accordion.Item
      value={name}
      className={clsx(
        'flex',
        'border-r-[1px] border-r-dividers accordionItem relative w-full',
        index == 0 && 'border-l-[1px] border-l-dividers',
      )}
    >
      <div
        style={{ width: processWidth ? processWidth : '100%' }}
        className={clsx(
          'w-full h-full absolute opacity-0 contentOverlay overflow-hidden bg-background',
        )}
      >
        <div
          className={clsx(
            ' px-[24px] py-[16px] h-full  flex flex-col justify-between border-t-dividers border-t-[1px] border-b-dividers border-b-[1px] rounded-[2px]',
          )}
        >
          <div className={clsx('flex justify-between')}>
            <h6
              className={clsx(
                'mono text-[14px] leading-[14.4px] bg-[#EBE7E3] rounded-full w-fit px-[10px] py-[4px] h-fit text-accent',
              )}
            >
              STEP {index + 1}
            </h6>
            {/* <div
              className={clsx('w-[24px] h-[24px] bg-[#D9D5D3] rounded-[3px]')}
            ></div> */}
            <Image src={image} alt={name + 'icon'} width={28} height={28} />
          </div>
          <div
            className={clsx(
              'text-secondaryText text-[16px] leading-[24px] tracking-[-0.1px]',
            )}
          >
            <h6
              className={clsx(
                'text-sansMedium text-[19px] leading-[26.6px] tracking-[-0.1px] text-mainText mb-[24px]',
              )}
            >
              {name}
            </h6>
            <p>{description}</p>
          </div>

          <div></div>
        </div>
      </div>

      <Accordion.Trigger
        ref={triggerRef}
        className={clsx(
          'h-[408px] flex processTrigger hoverParent justify-between relative geistMedium flex-col items-center  accordionButton py-[16px]',
          'lg:mx-auto',
          'ml:px-[16px]',
          'xxl:px-[32px]',
        )}
      >
        <div
          className={clsx(
            'absolute w-full bg-dividers h-[1px] left-0 top-0 transition-opacity duration-300 opacity-0 sides',
          )}
        ></div>
        <div
          className={clsx(
            'absolute w-full bg-dividers h-[1px] right-0 bottom-0 transition-opacity duration-300 opacity-0 sides',
          )}
        ></div>
        <h6
          className={clsx(
            'text-[18px] whitespace-nowrap verticalText  transition-opacity duration-300 triggerLabel pr-[24px]',
            'lg:text-[18px] lg:leading-[27px]',
          )}
        >
          {/* {name} */}
          <FlickerText title={name} play={true} animationDelay={0} hover />
        </h6>

        <div className={clsx('w-[20px] h-[20px] relative ml-[24px] itemIcon')}>
          <span
            className={clsx(
              'inline-block w-full h-[1px] bg-secondaryText absolute origin-center top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 ',
            )}
          ></span>
          <span
            className={clsx(
              'inline-block w-full h-[1px] bg-secondaryText rotate-90 origin-center absolute top-[50%] left-[50%]  -translate-x-1/2 -translate-y-1/2 lowerLine',
            )}
          ></span>
        </div>
      </Accordion.Trigger>
      <Accordion.Content
        className={clsx('AccordionContentDesktop')}
        ref={contentRef}
      >
        <div className={clsx('w-[307px] h-full')}>
          <div
            className={clsx(
              ' px-[24px] py-[16px] h-full  flex flex-col justify-between border-t-dividers border-t-[1px] border-b-dividers border-b-[1px] rounded-[2px]',
            )}
          >
            <div className={clsx('flex justify-between opacity-0')}>
              <h6
                className={clsx(
                  'mono text-[14px] leading-[14.4px] bg-[#EBE7E3] rounded-full w-fit px-[10px] py-[4px] h-fit text-accent',
                )}
              >
                STEP {index + 1}
              </h6>
              {/* <div
                className={clsx('w-[24px] h-[24px] bg-[#D9D5D3] rounded-[3px]')}
              ></div> */}
              <Image src={image} alt={name + 'icon'} width={28} height={28} />
            </div>
            <div className={clsx('opacity-0')}>
              <p>{description}</p>
            </div>

            <div></div>
          </div>
        </div>
      </Accordion.Content>
    </Accordion.Item>
  )
}
