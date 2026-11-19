import { useState } from 'react'
import type { FormEvent } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../auth/authStore'
import { Avatar, Logo } from '../../shared/ui'
import { Footer } from './Footer'

const sideMenu = [
  { to: '/', label: 'Aktywności', icon: '◎', end: true },
  { to: '/onboarding', label: 'Dodaj materiał', icon: '+' },
  { to: '/search', label: 'Moje kursy', icon: '▣' },
  { to: '/profile', label: 'Strefa rozwoju', icon: '◆', profile: true },
  { to: '/rankings', label: 'Mistrzowie & Uczniowie', icon: '👥' },
  { to: '/search', label: 'Materiały i sprzęt', icon: '🛒', key: 'gear' },
  { to: '/rankings', label: 'Ranking', icon: '🏆', key: 'rank' },
] as const

function SearchField({ className = '' }: { className?: string }) {
  const navigate = useNavigate()
  const [q, setQ] = useState('')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    navigate(q.trim() ? `/search?q=${encodeURIComponent(q.trim())}` : '/search')
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`flex h-11 max-w-[520px] flex-1 items-center gap-2 rounded-full border border-white/15 bg-[#0A162C] px-4 ${className}`}
    >
      <span className="text-navy-soft" aria-hidden>
        ⌕
      </span>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Szukaj"
        className="min-w-0 flex-1 bg-transparent text-sm text-cream outline-none placeholder:text-navy-muted"
      />
    </form>
  )
}

export function AppShell() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  if (!user) {
    return (
      <div
        className="min-h-screen text-cream"
        style={{
          background:
            'radial-gradient(900px 480px at 50% 18%, rgba(93,127,190,0.18), transparent 55%), #00162E',
        }}
      >
        <header className="border-b border-white/10">
          <div className="mx-auto flex h-[92px] max-w-[1440px] items-center gap-6 px-6 md:px-10">
            <button type="button" onClick={() => navigate('/')} className="shrink-0">
              <Logo className="text-[22px] tracking-[0.2em]" />
            </button>
            <SearchField className="mx-auto hidden md:flex" />
            <div className="ml-auto flex shrink-0 items-center gap-3">
              <button
                type="button"
                onClick={() => navigate('/login')}
                className="h-11 rounded-full border border-white/80 px-5 text-sm font-medium text-cream hover:bg-white/5"
              >
                Zaloguj się
              </button>
              <button
                type="button"
                onClick={() => navigate('/register')}
                className="px-2 text-sm font-medium text-cream hover:text-tagline"
              >
                Zarejestruj się
              </button>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-[1440px] px-6 pb-12 pt-6 md:px-10">
          <Outlet />
        </main>
        <Footer />
      </div>
    )
  }

  const profilePath = `/profile/${user.id}`

  return (
    <div
      className="min-h-screen text-cream"
      style={{
        background:
          'radial-gradient(900px 480px at 40% 0%, rgba(93,127,190,0.14), transparent 50%), #030E21',
      }}
    >
      <header className="border-b border-white/10 bg-[#030E21]/80 backdrop-blur-sm">
        <div className="mx-auto flex h-[92px] max-w-[1440px] items-center gap-6 px-4 md:px-8">
          <button type="button" onClick={() => navigate('/')} className="shrink-0">
            <Logo className="text-[22px] tracking-[0.2em]" />
          </button>
          <SearchField className="mx-auto hidden md:flex" />
          <div className="ml-auto flex shrink-0 items-center gap-1">
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full text-cream hover:bg-white/5"
              aria-label="Wiadomości"
            >
              ✉
            </button>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full text-cream hover:bg-white/5"
              aria-label="Powiadomienia"
              title="Powiadomienia"
            >
              🔔
            </button>
            <button
              type="button"
              onClick={() => navigate(profilePath)}
              className="ml-1 rounded-full p-0.5 hover:bg-white/5"
              aria-label="Profil"
            >
              <Avatar
                name={user.profile.displayName || user.email}
                color={user.profile.avatarColor}
                size="sm"
              />
            </button>
            <button
              type="button"
              onClick={() => {
                logout()
                navigate('/login')
              }}
              className="ml-2 hidden text-xs text-navy-soft hover:text-cream lg:inline"
            >
              Wyloguj
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1440px] gap-0 md:gap-2">
        <aside className="sticky top-0 hidden h-[calc(100vh-92px)] w-[280px] shrink-0 overflow-y-auto border-r border-white/10 bg-[#0A0F24] px-3 py-6 lg:block">
          <nav className="flex flex-col gap-1">
            {sideMenu.map((item) => {
              const to = 'profile' in item && item.profile ? profilePath : item.to
              const key = 'key' in item ? item.key : item.label
              return (
                <NavLink
                  key={key}
                  to={to}
                  end={'end' in item ? item.end : false}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] transition ${
                      isActive
                        ? 'bg-[#2A1A6B] text-cream'
                        : 'text-cream/85 hover:bg-white/5'
                    }`
                  }
                >
                  <span className="w-6 text-center text-base opacity-90">{item.icon}</span>
                  {item.label}
                </NavLink>
              )
            })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 px-4 pb-12 pt-5 md:px-8">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
