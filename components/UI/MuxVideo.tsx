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

  return (
    <div
      className={clsx('relative w-full h-full overflow-hidden')}
      ref={containerRef as MutableRefObject<any>}
    >
      <MuxPlayer
        ref={playerRef}
        thumbnailTime={0}
        playbackId={playbackId}
        // metadata={{
        //   video_id: assetId,
        //   video_title: '',
        //   viewer_user_id: 'user-id-bc-789',
        // }}
        loop={true}
        autoPlay={true}
        muted={true}
        streamType="on-demand"
        paused={!canPlay}
        className="w-full h-full scale-[1.04]"
        // className={'lg:rounded-[6px] object-cover'}
        //   onCanPlay={() => setCanPlay(true)}
      />
    </div>
  )
}

export default MuxVideo
