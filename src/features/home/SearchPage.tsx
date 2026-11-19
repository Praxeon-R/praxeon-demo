import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getContent } from '../../data/seed'
import { VideoCard } from '../content/VideoCard'
import type { ContentType } from '../../shared/types'

const FILTERS: Array<{ id: 'all' | ContentType; label: string }> = [
  { id: 'all', label: 'Wszystko' },
  { id: 'course', label: 'Kursy' },
  { id: 'tutorial', label: 'Tutoriale' },
  { id: 'challenge', label: 'Challenge' },
  { id: 'cooperation', label: 'Kooperacje' },
  { id: 'record', label: 'Rekordy' },
  { id: 'freestyle', label: 'Freestyle' },
]

export function SearchPage() {
  const [params] = useSearchParams()
  const [query, setQuery] = useState(params.get('q') ?? '')
  const [filter, setFilter] = useState<(typeof FILTERS)[number]['id']>('all')
  const content = getContent()

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return content.filter((item) => {
      if (filter !== 'all' && item.type !== filter) return false
      if (!q) return true
      return (
        item.title.toLowerCase().includes(q) ||
        item.authorName.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q))
      )
    })
  }, [content, query, filter])

  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-semibold">Szukaj</h1>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Szukaj treści, autorów, tagów…"
        className="mb-4 w-full max-w-xl rounded-xl border border-border bg-navy-2 px-4 py-3 outline-none focus:border-primary focus:ring-2 focus:ring-primary/40"
      />
      <div className="mb-8 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-4 py-1.5 text-sm ${
              filter === f.id ? 'bg-soft text-primary' : 'bg-navy-3 text-navy-soft hover:text-cream'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      {results.length === 0 ? (
        <p className="text-muted">Brak wyników dla podanego zapytania.</p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {results.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
