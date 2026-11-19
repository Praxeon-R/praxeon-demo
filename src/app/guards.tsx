import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../features/auth/authStore'

export function RequireAuth() {
  const user = useAuthStore((s) => s.user)
  const ready = useAuthStore((s) => s.ready)
  if (!ready) return null
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}

export function RequireGuest() {
  const user = useAuthStore((s) => s.user)
  const ready = useAuthStore((s) => s.ready)
  if (!ready) return null
  if (user?.profileCompleted) return <Navigate to="/" replace />
  if (user && !user.profileCompleted) return <Navigate to="/onboarding" replace />
  return <Outlet />
}

export function RequireOnboarding() {
  const user = useAuthStore((s) => s.user)
  const ready = useAuthStore((s) => s.ready)
  if (!ready) return null
  if (!user) return <Navigate to="/login" replace />
  if (user.profileCompleted) return <Navigate to="/" replace />
  return <Outlet />
}
