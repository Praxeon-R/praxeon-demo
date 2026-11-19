import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import type { Role } from '../../shared/types'
import { useAuthStore } from '../auth/authStore'
import { getUsers, saveUsers } from '../../data/seed'
import { Avatar, Button, Field, Logo } from '../../shared/ui'

const INTERESTS = ['Sport', 'Taniec', 'Edukacja', 'Muzyka', 'Sztuka', 'Fitness', 'Climbing']
const COLORS = ['#300cff', '#004289', '#007872', '#66005c', '#5e3fff', '#d61f1f']
const STEPS = ['Rola', 'Profil', 'Zainteresowania']

export function OnboardingPage() {
  const user = useAuthStore((s) => s.user)
  const updateProfile = useAuthStore((s) => s.updateProfile)
  const hydrate = useAuthStore((s) => s.hydrate)
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [role, setRole] = useState<Role>(user?.role || 'student')
  const [displayName, setDisplayName] = useState(user?.profile.displayName || '')
  const [username, setUsername] = useState(user?.profile.username || '')
  const [sports, setSports] = useState<string[]>(user?.profile.sports || [])
  const [avatarColor, setAvatarColor] = useState(user?.profile.avatarColor || COLORS[0])

  if (!user) return <Navigate to="/login" replace />

  function toggleSport(sport: string) {
    setSports((prev) =>
      prev.includes(sport) ? prev.filter((s) => s !== sport) : [...prev, sport],
    )
  }

  function persistRole(next: Role) {
    setRole(next)
    const users = getUsers().map((u) => (u.id === user!.id ? { ...u, role: next } : u))
    saveUsers(users)
    hydrate()
  }

  function finish() {
    updateProfile({
      displayName: displayName.trim() || user!.email.split('@')[0],
      username: username.trim() || 'user',
      sports,
      avatarColor,
      profileCompleted: true,
    })
    navigate('/')
  }

  return (
    <div
      className="relative min-h-screen"
      style={{
        background: 'linear-gradient(180deg, #0f112f 0%, #000622 40%)',
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-canvas/55" />
      <div className="relative flex min-h-screen items-center justify-center p-6">
        <div className="w-full max-w-[698px] rounded-2xl border border-navy-4 bg-navy-3 p-8 shadow-[0_16px_48px_rgba(0,0,0,0.45)] md:p-10">
          <Logo className="mb-6 text-center text-xl tracking-[0.16em]" />
          <h1 className="mb-4 text-center text-base font-semibold">
            Uzupełnij dane o swoim profilu
          </h1>
          <div className="mb-8 flex gap-2">
            {STEPS.map((label, i) => (
              <div key={label} className="flex-1">
                <div
                  className={`mb-2 h-1.5 rounded-full ${i <= step ? 'bg-primary' : 'bg-navy-4'}`}
                />
                <p
                  className={`text-center text-xs ${
                    i <= step ? 'text-cream' : 'text-navy-muted'
                  }`}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>

          {step === 0 ? (
            <div className="space-y-4">
              <p className="font-medium">Cześć! Witamy w społeczności PRAXEON.</p>
              <p className="text-sm text-navy-soft">
                Domyślnie Twój profil jest ustawiony jako Uczeń. Jeżeli chcesz zacząć jako Mistrz,
                wybierz tę opcję poniżej.
              </p>
              <label className="block text-sm">
                <span className="mb-1.5 block text-navy-soft">Typ profilu</span>
                <select
                  value={role}
                  onChange={(e) => persistRole(e.target.value as Role)}
                  className="w-full rounded-xl border border-border bg-field px-4 py-3 text-cream outline-none focus:border-primary"
                >
                  <option value="student">Uczeń</option>
                  <option value="master">Mistrz</option>
                </select>
              </label>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="space-y-4">
              <p className="font-medium">Ustaw swój nick oraz kolor avatara</p>
              <Field
                placeholder="Nick"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <Field
                placeholder="Nazwa wyświetlana"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="flex min-h-[160px] flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-navy-muted p-4">
                  <p className="text-xs text-navy-soft">Zdjęcie profilowe</p>
                  <Avatar name={displayName || username || 'U'} color={avatarColor} size="lg" />
                  <p className="text-[11px] text-navy-muted">Upload wyłączony w demo</p>
                </div>
                <div className="flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-navy-muted p-4">
                  <p className="text-xs text-navy-soft">Kolor avatara / tło</p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {COLORS.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setAvatarColor(color)}
                        className={`h-9 w-9 rounded-full border-2 ${
                          avatarColor === color ? 'border-white scale-110' : 'border-transparent'
                        }`}
                        style={{ background: color }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-4">
              <p className="font-medium">Wybierz zainteresowania</p>
              <div className="flex flex-wrap gap-2">
                {INTERESTS.map((sport) => {
                  const active = sports.includes(sport)
                  return (
                    <button
                      key={sport}
                      type="button"
                      onClick={() => toggleSport(sport)}
                      className={`rounded-full px-4 py-2 text-sm ${
                        active ? 'bg-soft text-primary font-semibold' : 'bg-navy-2 text-navy-soft'
                      }`}
                    >
                      {sport}
                    </button>
                  )
                })}
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex justify-center gap-3">
            {step > 0 ? (
              <Button variant="outline" onClick={() => setStep((s) => s - 1)}>
                Wróć
              </Button>
            ) : null}
            <Button
              variant="soft"
              onClick={() => {
                if (step >= STEPS.length - 1) finish()
                else setStep((s) => s + 1)
              }}
            >
              {step >= STEPS.length - 1 ? 'Zakończ' : 'Dalej'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
