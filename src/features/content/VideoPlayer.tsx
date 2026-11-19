import { useEffect, useRef, useState } from 'react'

function formatTime(s: number) {
  if (!Number.isFinite(s) || s < 0) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export function VideoPlayer({
  src,
  poster,
  title,
}: {
  src: string
  poster?: string
  title?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapRef = useRef<HTMLDivElement>(null)
  const [playing, setPlaying] = useState(false)
  const [current, setCurrent] = useState(0)
  const [duration, setDuration] = useState(0)
  const [muted, setMuted] = useState(false)
  const [volume, setVolume] = useState(0.9)
  const [hover, setHover] = useState(true)
  const hideTimer = useRef<number | null>(null)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.volume = volume
  }, [volume])

  function showControls() {
    setHover(true)
    if (hideTimer.current) window.clearTimeout(hideTimer.current)
    hideTimer.current = window.setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) setHover(false)
    }, 2500)
  }

  function togglePlay() {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      void v.play()
    } else {
      v.pause()
    }
  }

  function seek(pct: number) {
    const v = videoRef.current
    if (!v || !duration) return
    v.currentTime = pct * duration
  }

  async function toggleFullscreen() {
    const el = wrapRef.current
    if (!el) return
    if (!document.fullscreenElement) {
      await el.requestFullscreen()
    } else {
      await document.exitFullscreen()
    }
  }

  const progress = duration ? (current / duration) * 100 : 0

  return (
    <div
      ref={wrapRef}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-[#050B18] shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
      onMouseMove={showControls}
      onMouseLeave={() => playing && setHover(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        preload="metadata"
        className="aspect-video w-full bg-black object-contain"
        onClick={togglePlay}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={() => setCurrent(videoRef.current?.currentTime ?? 0)}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration ?? 0)}
        onEnded={() => setPlaying(false)}
      />

      {!playing ? (
        <button
          type="button"
          onClick={togglePlay}
          className="absolute inset-0 grid place-items-center bg-gradient-to-t from-black/50 via-transparent to-black/20"
          aria-label="Odtwórz"
        >
          <span className="grid h-16 w-16 place-items-center rounded-full bg-[#300CFF] text-2xl text-white shadow-lg shadow-[#300CFF]/40 transition hover:scale-105">
            ▶
          </span>
          {title ? (
            <span className="pointer-events-none absolute bottom-20 left-5 right-5 truncate text-left font-display text-lg font-semibold text-cream md:text-xl">
              {title}
            </span>
          ) : null}
        </button>
      ) : null}

      <div
        className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#030E21] via-[#030E21]/85 to-transparent px-4 pb-3 pt-10 transition ${
          hover || !playing ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div
          className="mb-3 h-1.5 cursor-pointer overflow-hidden rounded-full bg-white/15"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            seek((e.clientX - rect.left) / rect.width)
          }}
          role="slider"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
          tabIndex={0}
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#065BBC] to-[#300CFF]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex items-center gap-2 text-sm text-cream">
          <button
            type="button"
            onClick={togglePlay}
            className="grid h-9 w-9 place-items-center rounded-lg hover:bg-white/10"
            aria-label={playing ? 'Pauza' : 'Odtwórz'}
          >
            {playing ? '❚❚' : '▶'}
          </button>
          <span className="tabular-nums text-cream/80">
            {formatTime(current)} / {formatTime(duration)}
          </span>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const v = videoRef.current
                if (!v) return
                v.muted = !v.muted
                setMuted(v.muted)
              }}
              className="grid h-9 w-9 place-items-center rounded-lg hover:bg-white/10"
              aria-label={muted ? 'Włącz dźwięk' : 'Wycisz'}
            >
              {muted ? '🔇' : '🔊'}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={muted ? 0 : volume}
              onChange={(e) => {
                const val = Number(e.target.value)
                setVolume(val)
                setMuted(val === 0)
                if (videoRef.current) {
                  videoRef.current.muted = val === 0
                  videoRef.current.volume = val
                }
              }}
              className="hidden w-20 accent-[#300CFF] sm:block"
              aria-label="Głośność"
            />
            <button
              type="button"
              onClick={() => void toggleFullscreen()}
              className="grid h-9 w-9 place-items-center rounded-lg hover:bg-white/10"
              aria-label="Pełny ekran"
            >
              ⛶
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
