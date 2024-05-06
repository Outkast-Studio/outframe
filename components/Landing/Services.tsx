import React from 'react'
import { clsx } from 'clsx'
import * as Accordion from '@radix-ui/react-accordion'
import SectionHeading from 'components/UI/SectionHeading'
const Services = () => {
  const services = [
    {
      name: 'User research',
      description:
        'We start with a kick-off call to understand your product, goals, and preferences.',
      image: '',
    },
    {
      name: 'User experience design',
      description:
        'We design a few screens and iterate on them until you’re happy with the direction.',
      image: '',
    },
    {
      name: 'Visual interface design',
      description:
        'We deliver the final designs in Figma, ready for handoff to your developers.',
      image: '',
    },
    {
      name: 'Complex design systems & tokens',
      description:
        'We hand off the designs to your developers and provide support during implementation.',
      image: '',
    },
    {
      name: 'Branding',
      description:
        'We’re here to help you with any design-related questions or tasks you might have.',
      image: '',
    },
    {
      name: 'Web design',
      description:
        'We’re here to help you with any design-related questions or tasks you might have.',
      image: '',
    },
    {
      name: 'Product strategy & consulting',
      description:
        'We’re here to help you with any design-related questions or tasks you might have.',
      image: '',
    },
  ]
  return (
    <section
      id={'services'}
      className={clsx(
        'mt-[128px] mx-gutter geist text-mainTextborder-t-dividers border-t-[1px] ',
        'md:flex',
        'lg:grid lg:grid-cols-12 lg:gap-x-columnGap',
      )}
    >
      <h6
        className={clsx(
          'w-full pt-[20px]  monoMedium tracking-[-0.2px] uppercase text-[20px] leading-[24px]',
          'md:pt-[40px]',
          'lg:col-span-4',
          'xl:text-[24px] xl:leading-[33.6px]',
        )}
      >
        <SectionHeading text={'Services'} />
      </h6>
      <Accordion.Root
        orientation="vertical"
        type={'single'}
        collapsible
        className={clsx(
          'mt-[64px]',
          'md:w-full md:mt-[40px]',
          'lg:col-start-5 lg:col-end-13',
          'xl:col-start-6',
        )}
      >
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            name={service.name}
            description={service.description}
            image={service.image}
            index={index}
          />
        ))}
      </Accordion.Root>
    </section>
  )
}

export default Services

function ServiceItem({
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
      className={clsx('border-b-[1px] border-t-dividers accordionItem')}
    >
      <Accordion.Trigger className={clsx('w-full relative accordionButton ')}>
        <div
          className={clsx(
            'pb-[16px] pt-[28px] px-[16px] flex justify-between items-center w-full',
            'md:pt-[24px] md:pb-[17px] md:px-0',
            'lg:pb-[21px]',
            index === 0 && 'md:pt-[0px]',
          )}
        >
          <h6
            className={clsx(
              'text-[16px] leading-[24px] font-sansMedium text-mainText  transition-opacity duration-300',
              'md:text-[18px] md:leading-[27px]',
              'md:text-[20px] md:leading-[28px]',
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
      <Accordion.Content
        className={clsx('AccordionContent px-[16px]', 'md:px-0')}
      >
        <p className={clsx('my-[20px] text-[16px] leading-[24px] ')}>
          {description}
        </p>
      </Accordion.Content>
    </Accordion.Item>
  )
}
