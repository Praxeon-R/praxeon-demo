import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../auth/authStore'
import { Button, Field, Logo } from '../../shared/ui'

const SPORTS = ['Basketball', 'Dance', 'Climbing', 'Fitness', 'Freestyle', 'Football']
const COLORS = ['#e07a5f', '#4a90d9', '#7cb342', '#ab47bc', '#26a69a', '#ef5350']

export function OnboardingPage() {
  const user = useAuthStore((s) => s.user)
  const updateProfile = useAuthStore((s) => s.updateProfile)
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [displayName, setDisplayName] = useState(user?.profile.displayName || '')
  const [username, setUsername] = useState(user?.profile.username || '')
  const [bio, setBio] = useState(user?.profile.bio || '')
  const [location, setLocation] = useState(user?.profile.location || '')
  const [sports, setSports] = useState<string[]>(user?.profile.sports || [])
  const [avatarColor, setAvatarColor] = useState(user?.profile.avatarColor || COLORS[0])

  if (!user) return <Navigate to="/login" replace />

  function toggleSport(sport: string) {
    setSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport],
    )
  }

  function finish() {
    updateProfile({
      displayName: displayName.trim() || user!.email.split('@')[0],
      username: username.trim() || 'user',
      bio,
      location,
      sports,
      avatarColor,
      profileCompleted: true,
    })
    navigate('/')
  }

  const steps = [
    {
      title: 'Jak masz na imię?',
      body: (
        <div className="space-y-4">
          <Field
            label="Nazwa wyświetlana"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="np. Albus"
          />
          <Field
            label="Nazwa użytkownika"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="np. albus"
          />
        </div>
      ),
    },
    {
      title: 'Czym się interesujesz?',
      body: (
        <div className="flex flex-wrap gap-2">
          {SPORTS.map((sport) => {
            const active = sports.includes(sport)
            return (
              <button
                key={sport}
                type="button"
                onClick={() => toggleSport(sport)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  active ? 'bg-coral text-white' : 'bg-navy-3 text-muted hover:text-white'
                }`}
              >
                {sport}
              </button>
            )
          })}
        </div>
      ),
    },
    {
      title: 'Opowiedz o sobie',
      body: (
        <div className="space-y-4">
          <Field
            label="Lokalizacja"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Miasto"
          />
          <label className="block">
            <span className="mb-1.5 block text-sm text-muted">Bio</span>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full rounded-xl border border-transparent bg-field px-4 py-3 text-navy outline-none focus:ring-2 focus:ring-coral/50"
              placeholder="Krótki opis profilu"
            />
          </label>
        </div>
      ),
    },
    {
      title: 'Wybierz kolor avatara',
      body: (
        <div className="space-y-4">
          <p className="text-sm text-muted">
            Upload zdjęć jest wyłączony w demo — używamy kolorowego avatara.
          </p>
          <div className="flex flex-wrap gap-3">
            {COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => setAvatarColor(color)}
                className={`h-12 w-12 rounded-full border-2 ${
                  avatarColor === color ? 'border-white scale-110' : 'border-transparent'
                }`}
                style={{ background: color }}
              />
            ))}
          </div>
        </div>
      ),
    },
  ]

  const current = steps[step]
  const isLast = step === steps.length - 1

  return (
    <div className="relative min-h-screen bg-navy">
      <div className="mx-auto flex min-h-screen max-w-xl flex-col px-6 py-10">
        <Logo className="mb-8 text-center" />
        <div className="mb-8 flex gap-2">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-coral' : 'bg-border'}`}
            />
          ))}
        </div>
        <p className="mb-2 text-sm text-muted">
          Krok {step + 1} / {steps.length}
        </p>
        <h1 className="mb-6 font-display text-3xl font-semibold">{current.title}</h1>
        <div className="flex-1">{current.body}</div>
        <div className="mt-8 flex gap-3">
          {step > 0 ? (
            <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
              Wstecz
            </Button>
          ) : null}
          <Button
            className="flex-1"
            onClick={() => {
              if (isLast) finish()
              else setStep((s) => s + 1)
            }}
          >
            {isLast ? 'Zakończ' : 'Dalej'}
          </Button>
        </div>
      </div>
    </div>
  )
}
