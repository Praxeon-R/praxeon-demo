import { Link, useParams } from 'react-router-dom'
import { getContent, getUsers } from '../../data/seed'
import { Badge, Button } from '../../shared/ui'
import { VideoPlayer } from './VideoPlayer'

export function ContentPage() {
  const { id } = useParams()
  const all = getContent()
  const item = all.find((c) => c.id === id)
  const author = getUsers().find((u) => u.id === item?.authorId)
  const related = all.filter((c) => c.id !== id).slice(0, 3)

  if (!item) {
    return (
      <div>
        <h1 className="font-display text-2xl">Nie znaleziono treści</h1>
        <Link to="/" className="mt-4 inline-block text-[#D6CEFF]">
          Wróć
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-5xl">
      <VideoPlayer src={item.videoUrl} poster={item.thumbnail} title={item.title} />

      <div className="mt-6 space-y-4 rounded-2xl border border-white/10 bg-[#0B1630] p-6">
        <div className="flex flex-wrap gap-2">
          <Badge>{item.type}</Badge>
          {item.tags.map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <h1 className="font-display text-3xl font-semibold text-cream">{item.title}</h1>
        <p className="text-cream/70">{item.description}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm text-navy-soft">
          <span className="text-rating">★ {item.rating.toFixed(1)}</span>
          <span>{item.views.toLocaleString('pl-PL')} wyświetleń</span>
          <span>{item.duration}</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 border-t border-white/10 pt-4">
          <span className="text-sm text-cream/80">
            Autor:{' '}
            {author ? (
              <Link to={`/profile/${author.id}`} className="font-medium text-[#D6CEFF] hover:underline">
                {item.authorName}
              </Link>
            ) : (
              item.authorName
            )}
          </span>
          <Button
            variant="soft"
            className="!min-h-10 !rounded-md px-4 text-sm"
            onClick={() => alert('Zapisano do „Kontynuuj naukę” (mock).')}
          >
            Zapisz postęp
          </Button>
        </div>
      </div>

      {related.length ? (
        <section className="mt-10">
          <h2 className="mb-4 font-display text-xl font-semibold">Podobne materiały</h2>
          <div className="grid gap-3 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.id}
                to={`/content/${r.id}`}
                className="overflow-hidden rounded-xl border border-white/10 bg-[#0B1630] transition hover:border-[#300CFF]/50"
              >
                <img src={r.thumbnail} alt="" className="aspect-video w-full object-cover" />
                <div className="p-3">
                  <p className="line-clamp-2 text-sm font-medium text-cream">{r.title}</p>
                  <p className="mt-1 text-xs text-navy-soft">{r.duration}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  )
}
