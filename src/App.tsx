import { useEffect } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { ensureSeed } from './data/seed'
import { useAuthStore } from './features/auth/authStore'
import { LoginPage } from './features/auth/LoginPage'
import { RegisterPage } from './features/auth/RegisterPage'
import { OnboardingPage } from './features/onboarding/OnboardingPage'
import { AppShell } from './features/layout/AppShell'
import { HomePage } from './features/home/HomePage'
import { SearchPage } from './features/home/SearchPage'
import { ProfilePage } from './features/profile/ProfilePage'
import { RankingsPage } from './features/rankings/RankingsPage'
import { ContentPage } from './features/content/ContentPage'
import { RequireGuest, RequireOnboarding } from './app/guards'

export default function App() {
  const hydrate = useAuthStore((s) => s.hydrate)
  const ready = useAuthStore((s) => s.ready)

  useEffect(() => {
    void (async () => {
      await ensureSeed()
      hydrate()
    })()
  }, [hydrate])

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy text-muted">
        Ładowanie demo…
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<RequireGuest />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<RequireOnboarding />}>
          <Route path="/onboarding" element={<OnboardingPage />} />
        </Route>
        <Route element={<AppShell />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/rankings" element={<RankingsPage />} />
          <Route path="/profile/:id" element={<ProfilePage />} />
          <Route path="/content/:id" element={<ContentPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
