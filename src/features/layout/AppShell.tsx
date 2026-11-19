import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../auth/authStore'
import { Avatar, Logo } from '../../shared/ui'

const nav = [
  { to: '/', label: 'Start', end: true },
  { to: '/search', label: 'Szukaj' },
  { to: '/rankings', label: 'Rankingi' },
]

export function AppShell() {
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-navy text-white">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-navy/90 backdrop-blur">
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center gap-6 px-6">
          <button onClick={() => navigate('/')} className="shrink-0">
            <Logo className="text-2xl" />
          </button>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm transition ${
                    isActive ? 'bg-white/10 text-white' : 'text-muted hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="ml-auto flex items-center gap-3">
            {user ? (
              <>
                <button
                  onClick={() => navigate(`/profile/${user.id}`)}
                  className="flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-white/5"
                >
                  <Avatar name={user.profile.displayName || user.email} color={user.profile.avatarColor} />
                  <span className="hidden text-sm sm:inline">
                    {user.profile.displayName || user.email}
                  </span>
                </button>
                <button
                  onClick={() => {
                    logout()
                    navigate('/login')
                  }}
                  className="text-sm text-muted hover:text-white"
                >
                  Wyloguj
                </button>
              </>
            ) : (
              <>
                <button onClick={() => navigate('/login')} className="text-sm text-muted hover:text-white">
                  Zaloguj
                </button>
                <button
                  onClick={() => navigate('/register')}
                  className="rounded-xl bg-coral px-4 py-2 text-sm font-medium hover:bg-coral-hover"
                >
                  Dołącz
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1440px]">
        <aside className="sticky top-[72px] hidden h-[calc(100vh-72px)] w-[240px] shrink-0 border-r border-border/60 p-4 lg:block">
          <p className="mb-3 px-2 text-xs uppercase tracking-wider text-muted">Menu</p>
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2.5 text-sm transition ${
                    isActive ? 'bg-coral/20 text-cream' : 'text-muted hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            {user ? (
              <NavLink
                to={`/profile/${user.id}`}
                className={({ isActive }) =>
                  `rounded-xl px-3 py-2.5 text-sm transition ${
                    isActive ? 'bg-coral/20 text-cream' : 'text-muted hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                Mój profil
              </NavLink>
            ) : null}
            <div className="mt-4 rounded-xl border border-dashed border-border p-3 text-xs text-muted">
              Upload mediów jest wyłączony w wersji demo.
            </div>
          </div>
        </aside>
        <main className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
