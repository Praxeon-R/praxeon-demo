import { useState } from 'react'
import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { getContent } from '../../data/seed'
import { useAuthStore } from '../auth/authStore'
import { BannerCard, SectionRail, VideoCard } from '../content/VideoCard'
import { Button } from '../../shared/ui'

const GUEST_CHIPS = ['Dla Ciebie', 'Sport', 'Taniec', 'Edukacja', 'Muzyka', 'Sztuka']
const LOGGED_CHIPS = ['Dla Ciebie', 'Sport', 'Taniec', 'Edukacja', 'Muzyka', 'Sztuka']

export function HomePage() {
  const user = useAuthStore((s) => s.user)
  const navigate = useNavigate()
  const [chip, setChip] = useState('Dla Ciebie')
  const [query, setQuery] = useState('')
  const content = getContent()

  const filtered =
    chip === 'Dla Ciebie'
      ? content
      : content.filter((c) =>
          c.tags.some((t) => t.toLowerCase().includes(chip.toLowerCase().slice(0, 4))),
        )

  const top = [...filtered].sort((a, b) => b.rating - a.rating)
  const courses = filtered.filter((c) => c.type === 'course' || c.type === 'tutorial')
  const challenges = filtered.filter((c) => c.type === 'challenge')
  const masters = filtered.filter((c) => c.authorRole === 'master')
  const students = filtered.filter((c) => c.authorRole === 'student')
  const coops = filtered.filter((c) => c.type === 'cooperation')
  const continueLearning = courses.slice(0, 3)

  function onSearch(e: FormEvent) {
    e.preventDefault()
    navigate(query.trim() ? `/search?q=${encodeURIComponent(query.trim())}` : '/search')
  }

  if (!user) {
    return (
      <div>
        <section className="mx-auto mb-14 max-w-3xl pt-6 text-center md:pt-10">
          <h1 className="mb-6 font-display text-4xl font-semibold tracking-tight md:text-6xl">
            Znajdź swoją nową pasję
          </h1>
          <form
            onSubmit={onSearch}
            className="mx-auto flex max-w-xl overflow-hidden rounded-xl border border-navy-4 bg-navy-2"
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Czego chcesz się nauczyć?"
              className="min-w-0 flex-1 bg-transparent px-4 py-3.5 text-sm outline-none placeholder:text-navy-muted"
            />
            <button
              type="submit"
              className="bg-soft px-5 text-sm font-semibold text-primary hover:bg-soft-2"
            >
              Szukaj
            </button>
          </form>
        </section>

        <div className="mb-8 flex flex-wrap justify-center gap-2">
          {GUEST_CHIPS.map((label, i) => (
            <button
              key={label}
              type="button"
              onClick={() => setChip(label)}
              className={`rounded-full px-4 py-2 text-sm ${
                chip === label || (i === 0 && chip === 'Dla Ciebie' && label === 'Dla Ciebie')
                  ? 'bg-soft text-primary font-semibold'
                  : 'bg-navy-3 text-navy-soft hover:text-cream'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <SectionRail title="Top of the Top" items={top.slice(0, 6)} />
        <SectionRail title="Nowe kursy" items={courses} />
        <SectionRail title="Nowe wydarzenia" items={coops.length ? coops : challenges} />
        <SectionRail title="Top twórcy" items={masters} />
        <SectionRail title="Challenge" items={challenges} />
        <SectionRail title="Warsztaty dla Ciebie" items={courses.slice().reverse()} />
      </div>
    )
  }

  const name = user.profile.displayName?.split(' ')[0] || 'Użytkowniku'

  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        {LOGGED_CHIPS.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => setChip(label)}
            className={`rounded-full px-4 py-2 text-sm ${
              chip === label
                ? 'bg-soft text-primary font-semibold'
                : 'bg-navy-3 text-navy-soft hover:text-cream'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <h1 className="mb-8 font-display text-2xl font-semibold md:text-[28px]">
        {name}, wejdź do gry o awans i zostań Championem
      </h1>

      <section className="mb-12">
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <h2 className="font-display text-[28px] font-semibold">Kontynuuj naukę</h2>
          <Button variant="outline" className="!min-h-10 text-sm">
            Zobacz wszystkie
          </Button>
        </div>
        <div className="flex flex-wrap gap-6">
          {continueLearning[0] ? (
            <BannerCard item={continueLearning[0]} />
          ) : null}
          {continueLearning.slice(1).map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <SectionRail title="Top of the Top" items={top.slice(0, 6)} />
      <SectionRail title="Twoi mistrzowie" items={masters} />
      <SectionRail title="Znajomi uczniowie" items={students} />
      <SectionRail title="Challenge" items={challenges} />
      <SectionRail title="Kooperacje" items={coops} />
    </div>
  )
}
