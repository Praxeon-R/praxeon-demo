import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from './authStore'
import { AuthLayout, SocialButtons } from './AuthLayout'
import { Button, Field, Modal, Toast } from '../../shared/ui'

type AgeChoice = 'adult' | 'child' | null

function passwordChecks(password: string) {
  return {
    length: password.length >= 12,
    complexity: /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password),
  }
}

export function RegisterPage() {
  const register = useAuthStore((s) => s.register)
  const verifyEmail = useAuthStore((s) => s.verifyEmail)
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [age, setAge] = useState<AgeChoice>(null)
  const [error, setError] = useState('')
  const [ageError, setAgeError] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [pendingUserId, setPendingUserId] = useState<string | null>(null)
  const [showVerify, setShowVerify] = useState(false)

  const checks = useMemo(() => passwordChecks(password), [password])
  const showHints = password.length > 0

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setAgeError(false)

    if (!age) {
      setAgeError(true)
      return
    }
    if (!checks.length || !checks.complexity) {
      setError('Hasło nie spełnia wymagań.')
      return
    }

    setLoading(true)
    const result = await register({
      email,
      password,
      role: 'student',
    })
    setLoading(false)

    if (!result.ok) {
      setError(result.error)
      return
    }

    setPendingUserId(result.user.id)
    setShowVerify(true)
  }

  function confirmEmail() {
    if (!pendingUserId) return
    verifyEmail(pendingUserId)
    setShowVerify(false)
    navigate('/onboarding')
  }

  return (
    <AuthLayout title="Rejestracja">
      <form onSubmit={onSubmit} className="space-y-5">
        <Field
          type="email"
          placeholder="E-mail lub numer telefonu"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Field
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        {showHints ? (
          <ul className="space-y-1 text-sm">
            <li className={checks.complexity ? 'text-success' : 'text-navy-soft'}>
              {checks.complexity ? '✓' : '○'} Hasło powinno zawierać cyfry, litery duże i małe
            </li>
            <li className={checks.length ? 'text-success' : 'text-navy-soft'}>
              {checks.length ? '✓' : '○'} Co najmniej 12 znaków
            </li>
          </ul>
        ) : null}

        <div className="flex flex-wrap justify-between gap-3 text-sm">
          {(
            [
              ['adult', 'Mam ukończone 13 lat'],
              ['child', 'Zakładam konto dla dziecka'],
            ] as const
          ).map(([value, label]) => (
            <label key={value} className="flex cursor-pointer items-center gap-2">
              <span
                className={`flex h-5 w-5 items-center justify-center rounded-full border ${
                  age === value ? 'border-soft' : 'border-border'
                }`}
              >
                {age === value ? <span className="h-2.5 w-2.5 rounded-full bg-soft" /> : null}
              </span>
              <input
                type="radio"
                name="age"
                className="sr-only"
                checked={age === value}
                onChange={() => {
                  setAge(value)
                  setAgeError(false)
                }}
              />
              {label}
            </label>
          ))}
        </div>
        {ageError ? (
          <p className="text-sm text-danger-soft">Wybierz jedną z opcji powyżej.</p>
        ) : null}

        {error ? (
          <div className="rounded-xl border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger-soft">
            {error}
          </div>
        ) : null}

        <Button type="submit" variant="soft" className="w-full" disabled={loading}>
          {loading ? 'Rejestracja…' : 'Zarejestruj się'}
        </Button>
      </form>

      <div className="mt-4 space-y-2 text-center text-sm text-navy-soft">
        <p>
          Rejestrując się, wyrażasz zgodę na nasze{' '}
          <button type="button" className="text-link">
            Warunki korzystania
          </button>{' '}
          oraz{' '}
          <button type="button" className="text-link">
            Politykę prywatności
          </button>
        </p>
        <p>
          Masz już konto?{' '}
          <Link to="/login" className="text-link hover:underline">
            Zaloguj się
          </Link>
        </p>
      </div>

      <SocialButtons
        onToast={(msg) => {
          setToast(msg)
          setTimeout(() => setToast(null), 2500)
        }}
      />

      <Modal open={showVerify} title="Zweryfikuj swój adres e-mail!">
        <p className="mb-6 text-sm text-navy-soft">
          Wysłaliśmy link aktywacyjny na adres: <strong className="text-cream">{email}</strong>.
          W demo kliknij poniżej, aby aktywować konto lokalnie.
        </p>
        <Button className="w-full" variant="soft" onClick={confirmEmail}>
          Aktywuj konto
        </Button>
      </Modal>
      <Toast message={toast} />
    </AuthLayout>
  )
}
