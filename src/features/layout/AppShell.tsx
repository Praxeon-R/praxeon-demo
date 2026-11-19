import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../auth/authStore'
import { Avatar, Button, Logo } from '../../shared/ui'
import { Footer } from './Footer'

const guestLinks = [
  { label: 'O nas', href: '#' },
  { label: 'Współpraca', href: '#' },
  { label: 'Rankingi', to: '/rankings' },
]

const menuItems = [
  { to: '/', label: 'Start', icon: '⌂', end: true },
  { to: '/search', label: 'Kursy', icon: '▦' },
  { to: '/rankings', label: 'Arena', icon: '◆' },
]

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
            'radial-gradient(1200px 600px at 20% -10%, rgba(56,58,95,0.33), transparent), #00162E',
        }}
      >
        <header className="border-b border-navy-4/70">
          <div className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-8 px-6 md:px-10">
            <button onClick={() => navigate('/')} className="shrink-0">
              <Logo className="text-[22px] tracking-[0.16em]" />
            </button>
            <nav className="hidden items-center gap-6 text-sm text-navy-soft md:flex">
              {guestLinks.map((l) =>
                'to' in l && l.to ? (
                  <NavLink key={l.label} to={l.to} className="hover:text-cream">
                    {l.label}
                  </NavLink>
                ) : (
                  <span key={l.label} className="cursor-default hover:text-cream">
                    {l.label}
                  </span>
                ),
              )}
            </nav>
            <div className="ml-auto flex items-center gap-3">
              <Button variant="link" onClick={() => navigate('/login')}>
                Zaloguj się
              </Button>
              <Button
                variant="soft"
                className="!min-h-10 px-4 text-sm"
                onClick={() => navigate('/register')}
              >
                Zarejestruj się
              </Button>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-[1440px] px-6 py-8 md:px-10 md:py-12">
          <Outlet />
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div
      className="min-h-screen text-cream"
      style={{
        background:
          'radial-gradient(1200px 600px at 20% -10%, rgba(56,58,95,0.33), transparent), #030E21',
      }}
    >
      <header className="mx-4 mt-3 rounded-lg border border-navy-4 bg-navy md:mx-6">
        <div className="flex min-h-[72px] items-center gap-4 px-4 md:px-6">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg text-cream hover:bg-white/5"
            aria-label="Menu"
          >
            ☰
          </button>
          <button onClick={() => navigate('/')} className="font-display text-lg font-semibold">
            Praxeon
          </button>
          <button
            onClick={() => navigate('/search')}
            className="ml-2 hidden max-w-[420px] flex-1 items-center gap-2 rounded-lg border border-navy-4 bg-navy-3 px-4 py-2.5 text-left text-sm text-navy-muted md:flex"
          >
            ⌕ Szukaj
          </button>
          <div className="ml-auto flex items-center gap-2">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-lg text-cream hover:bg-white/5"
              aria-label="Powiadomienia"
            >
              🔔
            </button>
            <button
              onClick={() => navigate(`/profile/${user.id}`)}
              className="rounded-full p-0.5 hover:bg-white/5"
              aria-label="Profil"
            >
              <Avatar
                name={user.profile.displayName || user.email}
                color={user.profile.avatarColor}
                size="sm"
              />
            </button>
            <button
              onClick={() => {
                logout()
                navigate('/login')
              }}
              className="ml-1 hidden text-xs text-navy-soft hover:text-cream sm:inline"
            >
              Wyloguj
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1440px] gap-4 px-4 py-4 md:px-6">
        <aside className="sticky top-4 hidden h-fit w-[240px] shrink-0 rounded-2xl border border-navy-4 bg-navy-3 p-4 lg:block">
          <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-wide text-navy-soft">
            Nawigacja
          </p>
          <div className="flex flex-col gap-1">
            {menuItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                    isActive
                      ? 'bg-soft/10 text-soft'
                      : 'text-cream hover:bg-white/5'
                  }`
                }
              >
                <span className="w-5 text-center opacity-80">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
            <NavLink
              to={`/profile/${user.id}`}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                  isActive ? 'bg-soft/10 text-soft' : 'text-cream hover:bg-white/5'
                }`
              }
            >
              <span className="w-5 text-center opacity-80">◉</span>
              Profil
            </NavLink>
          </div>
        </aside>

        <main className="min-w-0 flex-1 px-1 pb-10 pt-2 md:px-4">
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  )
}
