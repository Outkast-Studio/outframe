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
      className={clsx('relative')}
      ref={containerRef as MutableRefObject<any>}
    >
      <MuxPlayer
        ref={playerRef}
        thumbnailTime={0}
        playbackId={playbackId}
        metadata={{
          video_id: assetId,
          video_title: '',
          viewer_user_id: 'user-id-bc-789',
        }}
        loop={true}
        autoPlay={true}
        muted={true}
        streamType="on-demand"
        // style={{
        //   borderRadius: '6px',
        //   // overflow: 'hidden',
        // }}
        paused={!canPlay}
        className={'lg:rounded-[6px]'}
        //   onCanPlay={() => setCanPlay(true)}
      />

      <div className="absolute inset-0 pointer-events-none rounded-[6px] overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 bg-background"
          style={{ height: maskSize }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 bg-background"
          style={{ height: maskSize }}
        />
        <div
          className="absolute top-0 left-0 bottom-0 bg-background"
          style={{ width: maskSize }}
        />
        <div
          className="absolute top-0 right-0 bottom-0 bg-background"
          style={{ width: maskSize }}
        />
      </div>
    </div>
  )
}

export default MuxVideo
