import { Link, useParams } from 'react-router-dom'
import { getContent, getUsers } from '../../data/seed'
import { Badge, Button } from '../../shared/ui'

export function ContentPage() {
  const { id } = useParams()
  const item = getContent().find((c) => c.id === id)
  const author = getUsers().find((u) => u.id === item?.authorId)

  if (!item) {
    return (
      <div>
        <h1 className="font-display text-2xl">Nie znaleziono treści</h1>
        <Link to="/" className="mt-4 inline-block text-link">
          Wróć
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-6 overflow-hidden rounded-3xl border border-border/50 bg-navy-2">
        <div className="relative aspect-video bg-navy-3">
          <img src={item.thumbnail} alt="" className="h-full w-full object-cover opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-full bg-black/50 px-6 py-3 text-sm">
              Podgląd · brak odtwarzacza wideo w demo
            </div>
          </div>
        </div>
        <div className="space-y-3 p-6">
          <div className="flex flex-wrap gap-2">
            <Badge>{item.type}</Badge>
            {item.tags.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <h1 className="font-display text-3xl font-semibold">{item.title}</h1>
          <p className="text-muted">{item.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
            <span>★ {item.rating.toFixed(1)}</span>
            <span>{item.views.toLocaleString('pl-PL')} wyświetleń</span>
            <span>{item.duration}</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span>
              Autor:{' '}
              {author ? (
                <Link to={`/profile/${author.id}`} className="text-link hover:underline">
                  {item.authorName}
                </Link>
              ) : (
                item.authorName
              )}
            </span>
            <Button
              variant="outline"
              onClick={() => alert('Odtwarzanie mock — brak mediów w demo.')}
            >
              Odtwórz (mock)
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
