import React from 'react'
import { clsx } from 'clsx'
import * as Accordion from '@radix-ui/react-accordion'
import SectionHeading from 'components/UI/SectionHeading'
const Services = () => {
  const services = [
    {
      name: 'User research',
      description:
        "If there’s a need, we have all it takes to focus on deep user research, ensuring that every design decision is informed by data and real user insights. Our thorough approach helps identify your users' needs, behaviors, and pain points, paving the way for tailored solutions that truly resonate. Based on budget and time limits we can do as much or as little of user research as required for each situation.",
      image: '',
    },
    {
      name: 'User experience design',
      description:
        'Crafting seamless user experiences through meticulous planning and execution. From flowcharts to user flows and wireframes, we create the foundational blueprints that guide intuitive and efficient interactions throughout your products.',
      image: '',
    },
    {
      name: 'Visual interface design',
      description:
        'Transforming functional blueprints into striking and engaging interfaces. We focus on creating visually appealing designs that not only capture attention and help your sales demos stand out, but also facilitate user interaction and enhance overall usability.',
      image: '',
    },
    {
      name: 'Complex design systems & tokens',
      description:
        'We specialise in developing comprehensive design systems that maintain consistency across all platforms and help scale design functions. Our use of design tokens allows for a modular approach, ensuring that your brand remains cohesive no matter where it appears.',
      image: '',
    },
    {
      name: 'Branding',
      description:
        'Branding goes beyond mere aesthetics at Outframe. Our branding expert will work to forge a powerful visual identity that captures your brand’s essence and sets you apart in the marketplace.',
      image: '',
    },
    {
      name: 'Web design',
      description:
        "Collaborating with the industry's most talented website design contractors, we lead the entire web design process from concept to launch. We ensure that every web solution is not only beautiful but also optimized for performance and user engagement.",
      image: '',
    },
    {
      name: 'Product strategy and consulting',
      description:
        'More than just designers, we are strategists and entrepreneurs at heart. We offer comprehensive product strategy and consulting services, drawing on our experience launching successful companies to help you refine your vision and achieve market success.',
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
        <p
          className={clsx('my-[20px] text-[16px] leading-[24px] max-w-[800px]')}
        >
          {description}
        </p>
      </Accordion.Content>
    </Accordion.Item>
  )
}
