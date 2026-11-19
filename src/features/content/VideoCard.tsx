import { Link } from 'react-router-dom'
import type { ContentItem } from '../../shared/types'

const typeLabel: Record<ContentItem['type'], string> = {
  course: 'Kurs',
  tutorial: 'Tutorial',
  challenge: 'Challenge',
  record: 'Rekord',
  cooperation: 'Kooperacja',
  freestyle: 'Freestyle',
}

function Tag({ label }: { label: string }) {
  return (
    <span className="rounded px-2 py-0.5 text-[11px] font-medium bg-navy-4/80 text-soft-2">
      {label}
    </span>
  )
}

function PlayIcon() {
  return (
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-black/45 text-white backdrop-blur-sm">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  )
}

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
        className="group flex w-full max-w-[720px] overflow-hidden rounded-2xl border border-navy-4 bg-navy-2 shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
      >
        <div className="relative w-[280px] shrink-0 self-stretch overflow-hidden bg-navy-4">
          <img
            src={item.thumbnail}
            alt=""
            className="h-full min-h-[160px] w-full object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 grid place-items-center bg-gradient-to-b from-black/5 to-black/35">
            <PlayIcon />
          </div>
          <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[11px]">
            {item.duration}
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <div className="flex flex-wrap gap-1.5">
            {item.tags.slice(0, 3).map((t) => (
              <Tag key={t} label={t} />
            ))}
          </div>
          <h3 className="font-semibold leading-snug text-cream">{item.title}</h3>
          <div className="mt-auto flex items-center gap-2 text-sm text-navy-soft">
            <span
              className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white"
              style={{ background: item.authorRole === 'master' ? '#300cff' : '#004289' }}
            >
              {item.authorName.slice(0, 1)}
            </span>
            {item.authorName}
          </div>
          <div className="flex gap-4 text-xs text-navy-muted">
            <span>♥ {Math.round(item.views / 3)}</span>
            <span>💬 {Math.max(3, Math.round(item.views / 80))}</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      to={`/content/${item.id}`}
      className="group flex w-[280px] shrink-0 flex-col overflow-hidden rounded-2xl border border-navy-4 bg-navy-2 shadow-[0_8px_24px_rgba(0,0,0,0.25)] transition hover:border-primary/35"
    >
      <div className="relative h-[180px] overflow-hidden bg-navy-4">
        <img
          src={item.thumbnail}
          alt=""
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-b from-black/5 to-black/35 opacity-90">
          <PlayIcon />
        </div>
        <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-[11px]">
          {item.duration}
        </span>
        <span className="absolute left-2 top-2">
          <Tag label={typeLabel[item.type]} />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap gap-1.5">
          {item.tags.slice(0, 2).map((t) => (
            <Tag key={t} label={t} />
          ))}
        </div>
        <h3 className="line-clamp-2 font-semibold leading-snug text-cream">{item.title}</h3>
        <div className="mt-auto flex items-center gap-2 text-sm text-navy-soft">
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold text-white"
            style={{ background: item.authorRole === 'master' ? '#300cff' : '#004289' }}
          >
            {item.authorName.slice(0, 1)}
          </span>
          {item.authorName}
        </div>
        <div className="flex gap-4 text-xs text-navy-muted">
          <span>♥ {Math.round(item.views / 3)}</span>
          <span>💬 {Math.max(3, Math.round(item.views / 80))}</span>
          <span className="ml-auto text-rating">★ {item.rating.toFixed(1)}</span>
        </div>
      </div>
    </Link>
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
    <section className="mb-12">
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <h2 className="font-display text-[28px] font-semibold tracking-tight">{title}</h2>
        <button
          type="button"
          className="rounded-lg border border-soft/80 px-4 py-2 text-sm text-soft hover:bg-soft/10"
        >
          {actionLabel}
        </button>
      </div>
      <div className="flex gap-6 overflow-x-auto pb-2">
        {items.map((item) => (
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
