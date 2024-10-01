import MuxPlayer from '@mux/mux-player-react'
import { MutableRefObject, useRef } from 'react'
import { useInView } from 'hooks/useInView'
import { clsx } from 'clsx'
import { useState, useEffect } from 'react'
type Props = {
  playbackId: string
  assetId: string
  maskSize: string
}

const MuxVideo = ({ playbackId, assetId, maskSize }: Props) => {
  const playerRef = useRef(null)
  const [canPlay, setCanPlay] = useState(false)
  const [containerRef, isInView] = useInView()

  useEffect(() => {
    if (isInView) {
      setCanPlay(true)
    } else {
      setCanPlay(false)
    }
  }, [isInView])
  const cleanPlaybackId = decodeURIComponent(playbackId).replace(/[^\w-]/g, '')
  return (
    <div
      className={clsx('relative w-full h-full overflow-hidden')}
      ref={containerRef as MutableRefObject<any>}
    >
      <MuxPlayer
        ref={playerRef}
        thumbnailTime={0}
        playbackId={cleanPlaybackId}
        loop={true}
        autoPlay={true}
        muted={true}
        streamType="on-demand"
        paused={!canPlay}
        className="!w-full !h-full object-cover scale-[1.04] "
      />
    </div>
  )
}

export default MuxVideo
