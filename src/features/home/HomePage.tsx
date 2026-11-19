import { Link } from 'react-router-dom'
import { getContent } from '../../data/seed'
import { useAuthStore } from '../auth/authStore'
import { HorizontalRail, VideoCard } from '../content/VideoCard'
import { Button } from '../../shared/ui'

export function HomePage() {
  const user = useAuthStore((s) => s.user)
  const content = getContent()

  const continueLearning = content.filter((c) => c.type === 'course' || c.type === 'tutorial')
  const topRated = [...content].sort((a, b) => b.rating - a.rating).slice(0, 6)
  const masters = content.filter((c) => c.authorRole === 'master')
  const students = content.filter((c) => c.authorRole === 'student')
  const challenges = content.filter((c) => c.type === 'challenge')
  const coops = content.filter((c) => c.type === 'cooperation')

  if (!user) {
    return (
      <div className="space-y-10">
        <section className="rounded-3xl border border-border/50 bg-gradient-to-br from-navy-3 to-navy p-8 md:p-12">
          <p className="mb-2 text-sm uppercase tracking-wider text-coral">Praxeon demo</p>
          <h1 className="mb-4 max-w-xl font-display text-4xl font-semibold md:text-5xl">
            Oglądaj. Twórz. Zostań mistrzem.
          </h1>
          <p className="mb-6 max-w-lg text-muted">
            Lokalna wersja platformy bez backendu. Zaloguj się lub zarejestruj — dane zapiszą się w
            localStorage.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link to="/register">
              <Button>Dołącz za darmo</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline">Zaloguj się</Button>
            </Link>
          </div>
        </section>
        <HorizontalRail title="Popularne treści" items={topRated} />
      </div>
    )
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-semibold md:text-4xl">
          Cześć, {user.profile.displayName || 'użytkowniku'}
        </h1>
        <p className="mt-1 text-muted">
          {user.role === 'master' ? 'Panel mistrza' : 'Kontynuuj naukę'} · lokalne demo
        </p>
      </div>

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold">Kontynuuj naukę</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {continueLearning.slice(0, 3).map((item) => (
            <VideoCard key={item.id} item={item} large />
          ))}
        </div>
      </section>

      <HorizontalRail title="Top rated" items={topRated} />
      <HorizontalRail title="Twoi mistrzowie" items={masters} />
      <HorizontalRail title="Znajomi uczniowie" items={students} />
      <HorizontalRail title="Mistrzowie dla Ciebie" items={masters.slice().reverse()} />
      <HorizontalRail title="Uczniowie dla Ciebie" items={students.slice().reverse()} />
      <HorizontalRail title="Challenge" items={challenges} />
      <HorizontalRail title="Kooperacje" items={coops} />
    </div>
  )
}
