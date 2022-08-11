// TODO: use context for this
interface VideoProps {
  src: string
  playOnHover?: boolean
  className?: string
}

export function Video({ src, playOnHover = false, className = "" }: VideoProps) {
  // TODO: add handling for touch devices
  // TODO: remove default video controls and put custom ones beneath the video
  const onMouseOver: React.MouseEventHandler<HTMLVideoElement> = (event) => {
    (event.target as HTMLVideoElement).play()
  }
  const onMouseOut: React.MouseEventHandler<HTMLVideoElement> = (event) => {
    (event.target as HTMLVideoElement).pause()
  }

  return (
    <video className={className} controls src={src} {...playOnHover ?{
      onMouseOver,
      // onMouseOut,
    } : {}} />
  )
}