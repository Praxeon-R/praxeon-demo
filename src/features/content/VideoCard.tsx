import { Link } from 'react-router-dom'
import type { ContentItem } from '../../shared/types'

function likesOf(item: ContentItem) {
  return Math.round(item.views / 3)
}
function commentsOf(item: ContentItem) {
  return Math.max(3, Math.round(item.views / 80))
}
function avatarUrl(name: string) {
  const n = Math.abs([...name].reduce((a, c) => a + c.charCodeAt(0), 0)) % 70
  return `https://i.pravatar.cc/88?img=${n || 1}`
}

function Tag({ label, filled }: { label: string; filled?: boolean }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3.5 py-1 text-[13px] font-medium text-white ${
        filled ? 'bg-[#66005C]' : 'bg-[#2C384D]'
      }`}
    >
      {label}
    </span>
  )
}

function PlayIcon() {
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  )
}

/** Tall Figma home miniature (~350×960): author → 9:16 media → tags → title → CTA */
export function VideoCard({
  item,
  variant = 'miniature',
}: {
  item: ContentItem
  variant?: 'miniature' | 'banner'
}) {
  if (variant === 'banner') {
    return (
      <Link
        to={`/content/${item.id}`}
        className="group flex min-h-[300px] w-full max-w-[1080px] overflow-hidden rounded-2xl border border-white/10 bg-[#0B1630] shadow-[0_8px_24px_rgba(0,0,0,0.28)]"
      >
        <div className="relative w-[42%] min-w-[260px] max-w-[420px] shrink-0 self-stretch overflow-hidden bg-navy-4">
          <img
            src={item.thumbnail}
            alt=""
            className="h-full min-h-[220px] w-full object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 grid place-items-center bg-gradient-to-b from-black/5 to-black/40">
            <PlayIcon />
          </div>
          <span className="absolute bottom-3 right-3 rounded bg-black/70 px-2 py-0.5 text-[12px]">
            {item.duration}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="flex flex-wrap gap-2">
            {item.tags.slice(0, 3).map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
          <h3 className="font-display text-[22px] font-semibold leading-[130%] text-cream">
            {item.title}
          </h3>
          <div className="mt-auto flex items-center gap-3 text-sm text-navy-soft">
            <img
              src={avatarUrl(item.authorName)}
              alt=""
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="font-medium text-cream">{item.authorName}</span>
          </div>
          <div className="flex gap-5 text-sm text-[#D6CEFF]">
            <span>♥ {likesOf(item)}</span>
            <span>💬 {commentsOf(item)}</span>
          </div>
        </div>
      </Link>
    )
  }

  const modulesDone = Math.max(1, Math.round((item.rating / 5) * 12))
  const progressPct = Math.round((modulesDone / 12) * 100)

  return (
    <article className="flex w-full max-w-[350px] flex-col">
      <div className="mb-3.5 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={avatarUrl(item.authorName)}
            alt=""
            className="h-11 w-11 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold text-cream">{item.authorName}</p>
            <p className="truncate text-xs text-white/50">
              12 maj 2025 · {item.views.toLocaleString('pl-PL')} wyświetleń
            </p>
          </div>
        </div>
      </div>

      <Link
        to={`/content/${item.id}`}
        className="group relative block aspect-[9/16] overflow-hidden rounded-[10px] bg-[#0a1a2e]"
      >
        <img
          src={item.thumbnail}
          alt=""
          className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-b from-black/5 to-black/35 opacity-0 transition group-hover:opacity-100">
          <PlayIcon />
        </div>
        <div className="absolute right-3 top-3 flex gap-2">
          {['bookmark', 'share', 'more'].map((k) => (
            <span
              key={k}
              className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/10 text-sm text-white"
              aria-hidden
            >
              {k === 'bookmark' ? '⊡' : k === 'share' ? '↗' : '···'}
            </span>
          ))}
        </div>
        <span className="absolute bottom-9 left-3 rounded bg-black/50 px-1.5 py-0.5 text-[13px] font-medium text-white">
          {item.duration}
        </span>
        <span className="absolute bottom-2 right-3 text-xs font-medium text-white/70">
          {modulesDone}/12
        </span>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div
            className="h-full bg-gradient-to-r from-[#065BBC] to-[#A600FF]"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </Link>

      <div className="mt-3.5 flex flex-wrap items-center gap-2">
        {item.tags.slice(0, 2).map((t, i) => (
          <Tag key={t} label={t} filled={i === 0 && item.type === 'challenge'} />
        ))}
        <span className="ml-auto flex items-center gap-1 text-[15px] font-medium text-cream">
          ♦ {item.rating.toFixed(1)}
        </span>
      </div>

      <h3 className="mt-3 mb-4 font-display text-[22px] font-semibold leading-[130%] text-cream">
        {item.title}
      </h3>

      <Link
        to={`/content/${item.id}`}
        className="flex w-full items-center justify-center gap-2 rounded-md border-[1.5px] border-[#300CFF] bg-white py-3.5 text-base font-medium text-[#300CFF] transition hover:opacity-85"
      >
        Kontynuuj →
      </Link>

      <button
        type="button"
        className="mt-4 flex w-full items-center gap-2 text-left text-sm text-[#D6CEFF] hover:text-white/80"
      >
        <span aria-hidden>💬</span>
        <span className="flex-1">{commentsOf(item)} komentarzy</span>
        <span aria-hidden>▾</span>
      </button>
    </article>
  )
}

/** Horizontal continue-learning card from Figma (thumb | body | stats) */
export function ContinueLearningCard({
  item,
  modulesDone = 8,
  modulesTotal = 12,
  minutesLeft = 15,
  ctaModule = 7,
  compact = false,
}: {
  item: ContentItem
  modulesDone?: number
  modulesTotal?: number
  minutesLeft?: number
  ctaModule?: number
  compact?: boolean
}) {
  const progress = Math.round((modulesDone / modulesTotal) * 100)

  return (
    <Link
      to={`/content/${item.id}`}
      className={`group flex overflow-hidden rounded-2xl border border-white/10 bg-[#0B1630] ${
        compact ? 'min-h-[160px]' : 'min-h-[200px]'
      }`}
    >
      <div
        className={`relative shrink-0 self-stretch overflow-hidden bg-navy-4 ${
          compact ? 'w-[140px]' : 'w-[200px] md:w-[240px]'
        }`}
      >
        <img
          src={item.thumbnail}
          alt=""
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col justify-between gap-3 p-4 md:p-5">
        <div>
          <h3 className="mb-2 font-display text-lg font-semibold leading-snug text-cream md:text-[20px]">
            {item.title}
          </h3>
          <div className="mb-3 flex flex-wrap gap-2">
            {item.tags.slice(0, 2).map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
          <div className="mb-3 h-1.5 max-w-md overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#065BBC] to-[#A600FF]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="inline-flex items-center justify-center rounded-lg bg-[#300CFF] px-4 py-2.5 text-sm font-medium text-white">
            Kontynuuj od modułu {ctaModule}
          </span>
        </div>
      </div>
      <div className="hidden w-[140px] shrink-0 flex-col items-end justify-center gap-3 border-l border-white/10 p-4 text-right sm:flex">
        <div>
          <p className="text-lg font-semibold text-cream">
            {modulesDone}/{modulesTotal}
          </p>
          <p className="text-xs text-navy-soft">modułów</p>
        </div>
        <div>
          <p className="text-lg font-semibold text-cream">{minutesLeft} min</p>
          <p className="text-xs text-navy-soft">do ukończenia</p>
        </div>
      </div>
    </Link>
  )
}

/** @deprecated alias */
export function CourseCard(props: { item: ContentItem; progress?: number }) {
  const modulesTotal = 12
  const modulesDone = Math.round(((props.progress ?? 66) / 100) * modulesTotal)
  return (
    <ContinueLearningCard
      item={props.item}
      modulesDone={modulesDone}
      modulesTotal={modulesTotal}
      compact
    />
  )
}

export function SectionRail({
  title,
  items,
  actionLabel = 'Zobacz wszystkie',
}: {
  title: string
  items: ContentItem[]
  actionLabel?: string
}) {
  if (!items.length) return null
  return (
    <section className="mb-14">
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <h2 className="font-display text-[28px] font-semibold tracking-tight">{title}</h2>
        <button
          type="button"
          className="rounded-md border-[1.5px] border-[#D6CEFF] px-5 py-2.5 text-sm font-medium text-[#D6CEFF] hover:bg-white/5"
        >
          {actionLabel}
        </button>
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {items.slice(0, 4).map((item) => (
          <VideoCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

/** @deprecated use SectionRail */
export const HorizontalRail = SectionRail
export function BannerCard({ item }: { item: ContentItem }) {
  return <VideoCard item={item} variant="banner" />
}
