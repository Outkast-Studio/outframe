import React, { useRef, useEffect } from 'react'
import { clsx } from 'clsx'
import * as Accordion from '@radix-ui/react-accordion'
import { useWindowSize } from 'hooks/useWindowSize'
import { useThemeStore } from 'stores/themeStore'
import SectionHeading from 'components/UI/Sectionheading'
const Process = () => {
  const processItems = [
    {
      name: 'Discovery call',
      description:
        'We start with a kick-off call to understand your product, goals, and preferences.',
      image: '',
    },
    {
      name: 'Choose Scope',
      description:
        'We design a few screens and iterate on them until you’re happy with the direction.',
      image: '',
    },
    {
      name: 'Audit & research',
      description:
        'We deliver the final designs in Figma, ready for handoff to your developers.',
      image: '',
    },
    {
      name: 'UX Design',
      description:
        'We hand off the designs to your developers and provide support during implementation.',
      image: '',
    },
    {
      name: 'Design System',
      description:
        'We’re here to help you with any design-related questions or tasks you might have.',
      image: '',
    },
    {
      name: 'Visual Design',
      description:
        'We’re here to help you with any design-related questions or tasks you might have.',
      image: '',
    },
    {
      name: 'Handoff',
      description:
        'We’re here to help you with any design-related questions or tasks you might have.',
      image: '',
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
        collapsible
        defaultValue="Discovery call"
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
                'bg-[#EBE7E3] w-fit uppercase text-accent px-[10px] py-[4px] rounded-full text-[12px] leading-[14.4px] tracking-[-0.2px] font-monoRegular',
              )}
            >
              STEP {index + 1}
            </h6>
            <div
              className={clsx('h-[18px] w-[18px] bg-dividers rounded-[4px]')}
            ></div>
            {/* <Image src={"#"} /> */}
          </div>
          <h6
            className={clsx(
              'font-sansMedium text-[18px] leading-[27px] text-maintext mt-[24px]',
            )}
          >
            {name}
          </h6>
          <p
            className={clsx(
              'text-secondaryText text-[16px] leading-[24px] font-sansRegular mt-[12px]',
            )}
          >
            {description}
          </p>
        </div>
      </Accordion.Content>
      <Accordion.Trigger className={clsx('w-full relative accordionButton ')}>
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
            'pb-[16px] pt-[28px] px-[24px] flex justify-between items-center w-full',
          )}
        >
          <h6
            className={clsx(
              'text-[16px] leading-[24px] font-sansMedium text-mainText content transition-opacity duration-300',
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
          'w-full h-full absolute opacity-0 contentOverlay overflow-hidden',
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
                'font-monoRegular text-[12px] leading-[14.4px] bg-[#EBE7E3] rounded-full w-fit px-[10px] py-[4px] h-fit text-accent',
              )}
            >
              STEP {index + 1}
            </h6>
            <div
              className={clsx('w-[24px] h-[24px] bg-[#D9D5D3] rounded-[3px]')}
            ></div>
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
          'h-[408px] flex processTrigger justify-between relative font-sansMedium flex-col items-center pr-[16px] pl-[32px] accordionButton py-[16px]',
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
            'text-[18px] whitespace-nowrap verticalText  transition-opacity duration-300 triggerLabel',
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
                  'font-monoRegular text-[12px] leading-[14.4px] bg-[#EBE7E3] rounded-full w-fit px-[10px] py-[4px] h-fit text-accent',
                )}
              >
                STEP {index + 1}
              </h6>
              <div
                className={clsx('w-[24px] h-[24px] bg-[#D9D5D3] rounded-[3px]')}
              ></div>
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
