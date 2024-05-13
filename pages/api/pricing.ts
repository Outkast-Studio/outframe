import { NextApiRequest, NextApiResponse } from 'next'

const subscribeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const ip = req.headers['x-forwarded-for']
  try {
    const region = await fetch(`https://ipinfo.io/${ip}?token=4016e2224e010e`)
    const data = await region.json()
    const country = data.country

    const Europe = [
      'IM',
      'BG',
      'HR',
      'CY',
      'CZ',
      'DK',
      'EE',
      'FI',
      'FR',
      'DE',
      'GR',
      'HU',
      'IE',
      'IT',
      'LV',
      'LT',
      'LU',
      'MT',
      'NL',
      'PL',
      'PT',
      'RO',
      'SK',
      'SI',
      'ES',
      'SE',
      'AL',
      'AD',
      'AM',
      'BY',
      'BA',
      'FO',
      'GE',
      'GI',
      'IS',
      'XK',
      'LI',
      'MK',
      'MD',
      'MC',
      'ME',
      'NO',
      'SM',
      'RS',
      'CH',
      'UA',
      'VA',
    ]

    const UK = ['GB', 'IM']

    if (Europe.includes(country)) {
      res.status(200).json({
        country: 'Europe',
      })
      return
    } else if (UK.includes(country)) {
      res.status(200).json({
        country: 'UK',
      })
      return
    } else {
      res.status(200).json({
        country: 'US',
      })
      return
    }
  } catch (error) {
    res.status(500).json({ error: error })
    return
  }
}

export default subscribeHandler
