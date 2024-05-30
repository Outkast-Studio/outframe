import React, { use, useEffect, useState } from 'react'
import DOMPurify from 'dompurify'
import { clsx } from 'clsx'

type Props = {
  svg: string
}

const DynamicSvg = ({ svg }: Props) => {
  const [svgContent, SetSVGContent] = useState<HTMLOrSVGImageElement>()
  useEffect(() => {
    const cleanSvg = DOMPurify.sanitize(svg)
    SetSVGContent(cleanSvg)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={clsx('svgContainer')}
      dangerouslySetInnerHTML={{ __html: svgContent }}
    />
  )
}

export default DynamicSvg
