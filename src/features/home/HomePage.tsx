import { useState } from 'react'
import { getContent } from '../../data/seed'
import { useAuthStore } from '../auth/authStore'
import { BannerCard, HorizontalRail, VideoCard } from '../content/VideoCard'

const CATEGORIES = [
  'Wszystkie',
  'Basketball',
  'Dance',
  'Climbing',
  'Fitness',
  'Freestyle',
  'Football',
]

export function HomePage() {
  const user = useAuthStore((s) => s.user)
  const [category, setCategory] = useState('Wszystkie')
  const content = getContent()

  const filtered =
    category === 'Wszystkie'
      ? content
      : content.filter((c) => c.tags.some((t) => t.toLowerCase() === category.toLowerCase()))

  const continueLearning = filtered.filter((c) => c.type === 'course' || c.type === 'tutorial')
  const topRated = [...filtered].sort((a, b) => b.rating - a.rating).slice(0, 6)
  const masters = filtered.filter((c) => c.authorRole === 'master')
  const students = filtered.filter((c) => c.authorRole === 'student')
  const challenges = filtered.filter((c) => c.type === 'challenge')
  const coops = filtered.filter((c) => c.type === 'cooperation')
  const banners = topRated.slice(0, 3)

  return (
    <div>
      {!user ? (
        <section className="mb-8 overflow-hidden rounded-3xl border border-navy-4 bg-gradient-to-br from-navy via-navy-2 to-primary/30 p-8 md:p-10">
          <h1 className="mb-3 max-w-xl font-display text-4xl font-semibold md:text-5xl">
            Znajdź swoją nową pasję
          </h1>
          <p className="mb-6 max-w-lg text-navy-soft">
            Oglądaj. Twórz. Zostań mistrzem. Lokalne demo — konta i treści w localStorage.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="#top-rated"
              className="inline-flex min-h-11 items-center rounded-lg bg-soft px-5 font-semibold text-primary"
            >
              Odkrywaj treści
            </a>
          </div>
        </section>
      ) : (
        <div className="mb-6">
          <h1 className="font-display text-3xl font-semibold md:text-4xl">
            Cześć, {user.profile.displayName || 'użytkowniku'}
          </h1>
          <p className="mt-1 text-navy-soft">
            {user.role === 'master' ? 'Panel mistrza' : 'Kontynuuj naukę'} · lokalne demo
          </p>
        </div>
      )}

      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setCategory(cat)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
              category === cat
                ? 'bg-soft text-primary font-semibold'
                : 'bg-navy-3 text-navy-soft hover:text-cream'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <section className="mb-10">
        <div className="flex gap-4 overflow-x-auto pb-2">
          {banners.map((item) => (
            <BannerCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <section className="mb-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold">Kontynuuj naukę</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2">
          {continueLearning.slice(0, 4).map((item) => (
            <VideoCard key={item.id} item={item} large />
          ))}
        </div>
      </section>

      <div id="top-rated">
        <HorizontalRail title="Top rated" items={topRated} />
      </div>
      <HorizontalRail title="Twoi mistrzowie" items={masters} />
      <HorizontalRail title="Znajomi uczniowie" items={students} />
      <HorizontalRail title="Mistrzowie dla Ciebie" items={[...masters].reverse()} />
      <HorizontalRail title="Uczniowie dla Ciebie" items={[...students].reverse()} />
      <HorizontalRail title="Challenge" items={challenges} />
      <HorizontalRail title="Kooperacje" items={coops} />
    </div>
  )
}
