import { NextApiRequest, NextApiResponse } from 'next'

const subscribeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const ip = req.headers['x-forwarded-for']
  try {
    const region = await fetch(`https://ipinfo.io/${ip}?token=4016e2224e010e`)
    const data = await region.json()

    res.status(200).json({
      data,
    })
    return
  } catch (error) {
    res.status(500).json({ error: error })
    return
  }
}

export default subscribeHandler
