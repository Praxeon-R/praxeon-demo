import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getContent } from '../../data/seed'
import { useAuthStore } from '../auth/authStore'
import { ContinueLearningCard, SectionRail } from '../content/VideoCard'
import { FilterSortRow, HomeChips } from './HomeChips'

export function HomePage() {
  const user = useAuthStore((s) => s.user)
  const [chip, setChip] = useState('Wszystkie')
  const content = getContent()

  const filtered =
    chip === 'Wszystkie' || chip === 'Top trendy'
      ? content
      : content.filter((c) => {
          const key = chip.toLowerCase()
          return (
            c.tags.some((t) => t.toLowerCase().includes(key.slice(0, 4))) ||
            c.type.includes(key.slice(0, 4)) ||
            (key.includes('mistrz') && c.authorRole === 'master') ||
            (key.includes('uczni') && c.authorRole === 'student') ||
            (key.includes('kooper') && c.type === 'cooperation') ||
            (key.includes('rekord') && c.type === 'record') ||
            (key.includes('chall') && c.type === 'challenge') ||
            (key.includes('freest') && c.type === 'freestyle')
          )
        })

  const top = [...filtered].sort((a, b) => b.rating - a.rating)
  const courses = filtered.filter((c) => c.type === 'course' || c.type === 'tutorial')
  const challenges = filtered.filter((c) => c.type === 'challenge')
  const masters = filtered.filter((c) => c.authorRole === 'master')
  const students = filtered.filter((c) => c.authorRole === 'student')
  const coops = filtered.filter((c) => c.type === 'cooperation')
  const continueLearning = [
    courses.find((c) => c.id === 'c9') ?? courses[0],
    courses.find((c) => c.id === 'c1') ?? courses[1],
    courses.find((c) => c.id === 'c7') ?? courses[2],
  ].filter(Boolean) as typeof courses

  if (!user) {
    return (
      <div>
        <div className="mb-10">
          <HomeChips active={chip} onChange={setChip} />
        </div>

        <section className="mb-8 text-center">
          <h1 className="mb-4 font-display text-4xl font-semibold tracking-tight md:text-[56px] md:leading-[1.1]">
            Znajdź swoją{' '}
            <span className="bg-gradient-to-r from-[#A1DAF8] to-[#7EB8FF] bg-clip-text text-transparent">
              nową pasję
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base text-cream/75 md:text-lg">
            Odkryj najpopularniejsze umiejętności, ucz się od najlepszych i dziel swoim progresem.
          </p>
        </section>

        <FilterSortRow className="mb-10" />

        <SectionRail title="Top of the Top" items={top.slice(0, 4)} />
        <SectionRail title="Nowe kursy" items={courses} />
        <SectionRail title="Nowe wykonania" items={students} />
        <SectionRail title="Top rated" items={top.slice(0, 4)} />
        <SectionRail title="Challenge" items={challenges} />
        <SectionRail title="Kooperacje" items={coops} />
      </div>
    )
  }

  const name = user.profile.displayName?.split(' ')[0] || 'Jakub'

  return (
    <div>
      <div className="mb-6">
        <HomeChips active={chip} onChange={setChip} />
      </div>

      <p className="mb-8 text-center font-display text-lg text-cream md:text-[22px]">
        {name}, wyznacz cel rozwojowy i wejdź do grona Championów{' '}
        <Link to="/onboarding" className="text-tagline hover:underline">
          →
        </Link>
      </p>

      <section className="mb-8">
        <div className="mb-5 flex flex-wrap items-center gap-4">
          <h2 className="font-display text-[28px] font-semibold">Kontynuuj naukę</h2>
          <button
            type="button"
            className="rounded-md border-[1.5px] border-soft/80 px-5 py-2.5 text-sm font-medium text-soft hover:bg-soft/10"
          >
            Zobacz wszystkie
          </button>
        </div>

        {continueLearning[0] ? (
          <div className="mb-5">
            <ContinueLearningCard
              item={continueLearning[0]}
              modulesDone={8}
              modulesTotal={12}
              minutesLeft={15}
              ctaModule={7}
            />
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {continueLearning.slice(1, 3).map((item, i) => (
            <ContinueLearningCard
              key={item.id}
              item={item}
              modulesDone={i === 0 ? 8 : 3}
              modulesTotal={12}
              minutesLeft={i === 0 ? 15 : 40}
              ctaModule={i === 0 ? 7 : 4}
              compact
            />
          ))}
        </div>
      </section>

      <FilterSortRow className="mb-10" />

      <SectionRail title="Top of the Top" items={top.slice(0, 4)} />
      <SectionRail title="Twoi mistrzowie" items={masters} />
      <SectionRail title="Znajomi uczniowie" items={students} />
      <SectionRail title="Challenge" items={challenges} />
      <SectionRail title="Kooperacje" items={coops} />
    </div>
  )
}
