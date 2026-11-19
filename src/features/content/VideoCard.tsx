import { Link } from 'react-router-dom'
import type { ContentItem } from '../../shared/types'
import { Badge } from '../../shared/ui'

const typeLabel: Record<ContentItem['type'], string> = {
  course: 'Kurs',
  tutorial: 'Tutorial',
  challenge: 'Challenge',
  record: 'Rekord',
  cooperation: 'Kooperacja',
  freestyle: 'Freestyle',
}

export function VideoCard({ item, large }: { item: ContentItem; large?: boolean }) {
  return (
    <Link
      to={`/content/${item.id}`}
      className={`group block shrink-0 overflow-hidden rounded-2xl border border-border/50 bg-navy-2 transition hover:border-coral/40 ${
        large ? 'w-[280px]' : 'w-[220px]'
      }`}
    >
      <div className={`relative overflow-hidden ${large ? 'h-[160px]' : 'h-[124px]'}`}>
        <img
          src={item.thumbnail}
          alt=""
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute bottom-2 right-2 rounded bg-black/70 px-1.5 py-0.5 text-xs">
          {item.duration}
        </span>
      </div>
      <div className="space-y-2 p-3">
        <div className="flex items-center gap-2">
          <Badge>{typeLabel[item.type]}</Badge>
          <span className="text-xs text-muted">★ {item.rating.toFixed(1)}</span>
        </div>
        <h3 className="line-clamp-2 font-medium leading-snug">{item.title}</h3>
        <p className="text-xs text-muted">{item.authorName}</p>
      </div>
    </Link>
  )
}

export function HorizontalRail({
  title,
  items,
}: {
  title: string
  items: ContentItem[]
}) {
  return (
    <section className="mb-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl font-semibold">{title}</h2>
        <span className="text-sm text-muted">{items.length} pozycji</span>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {items.map((item) => (
          <VideoCard key={item.id} item={item} large />
        ))}
      </div>
    </section>
  )
}
