import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../auth/authStore'
import { Avatar, Button, Logo } from '../../shared/ui'
import { Footer } from './Footer'

const nav = [
  { to: '/', label: 'Start', end: true },
  { to: '/search', label: 'Szukaj' },
  { to: '/rankings', label: 'Rankingi' },
]

const sideIcons = [
  { to: '/', label: 'Home', icon: '⌂' },
  { to: '/search', label: 'Szukaj', icon: '⌕' },
  { to: '/rankings', label: 'Rankingi', icon: '☰' },
]

export function AppShell() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-canvas text-cream">
      <header className="sticky top-0 z-40 border-b border-navy-4/80 bg-canvas/95 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-4 px-4 md:px-6">
          <button onClick={() => navigate('/')} className="shrink-0">
            <Logo className="text-[22px] tracking-[0.16em]" />
          </button>

          <button
            onClick={() => navigate('/search')}
            className="ml-2 hidden max-w-md flex-1 items-center gap-2 rounded-xl border border-navy-4 bg-navy-3 px-4 py-2.5 text-left text-sm text-navy-muted md:flex"
          >
            <span>⌕</span>
            Szukaj treści, mistrzów, challenge…
          </button>

          <div className="ml-auto flex items-center gap-2 md:gap-3">
            {user ? (
              <>
                <button
                  onClick={() => navigate(`/profile/${user.id}`)}
                  className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-white/5"
                >
                  <Avatar
                    name={user.profile.displayName || user.email}
                    color={user.profile.avatarColor}
                  />
                  <span className="hidden text-sm sm:inline">
                    {user.profile.displayName || user.email}
                  </span>
                </button>
                <button
                  onClick={() => {
                    logout()
                    navigate('/login')
                  }}
                  className="text-sm text-navy-soft hover:text-cream"
                >
                  Wyloguj
                </button>
              </>
            ) : (
              <>
                <Button variant="link" onClick={() => navigate('/login')}>
                  Zaloguj
                </Button>
                <Button variant="soft" className="!min-h-10 px-4 text-sm" onClick={() => navigate('/register')}>
                  Dołącz
                </Button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1440px]">
        <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] w-[72px] shrink-0 flex-col items-center gap-2 border-r border-navy-4/80 py-4 lg:flex">
          {sideIcons.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              title={item.label}
              className={({ isActive }) =>
                `flex h-11 w-11 items-center justify-center rounded-xl text-lg transition ${
                  isActive ? 'bg-primary/25 text-soft' : 'text-navy-soft hover:bg-white/5 hover:text-cream'
                }`
              }
            >
              {item.icon}
            </NavLink>
          ))}
          {user ? (
            <NavLink
              to={`/profile/${user.id}`}
              title="Profil"
              className={({ isActive }) =>
                `mt-auto flex h-11 w-11 items-center justify-center rounded-xl text-sm transition ${
                  isActive ? 'bg-primary/25 text-soft' : 'text-navy-soft hover:bg-white/5'
                }`
              }
            >
              ◉
            </NavLink>
          ) : null}
        </aside>

        <div className="min-w-0 flex-1">
          <nav className="flex gap-2 overflow-x-auto border-b border-navy-4/60 px-4 py-3 md:px-6 lg:hidden">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-full px-3 py-1.5 text-sm ${
                    isActive ? 'bg-soft text-primary' : 'bg-navy-3 text-navy-soft'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <main className="min-w-0 p-4 md:p-6 lg:p-8">
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}
