import { useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import type { Role } from '../../shared/types'
import { useAuthStore } from './authStore'
import { AuthLayout, SocialButtons } from './AuthLayout'
import { Button, Field, Modal, Toast } from '../../shared/ui'

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
  const [role, setRole] = useState<Role | null>(null)
  const [error, setError] = useState('')
  const [roleError, setRoleError] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [pendingUserId, setPendingUserId] = useState<string | null>(null)
  const [showVerify, setShowVerify] = useState(false)

  const checks = useMemo(() => passwordChecks(password), [password])
  const showHints = password.length > 0

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setRoleError(false)

    if (!role) {
      setRoleError(true)
      return
    }
    if (!checks.length || !checks.complexity) {
      setError('Hasło nie spełnia wymagań.')
      return
    }

    setLoading(true)
    const result = await register({ email, password, role })
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
      <form onSubmit={onSubmit} className="space-y-4">
        <Field
          type="email"
          placeholder="E-mail"
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
            <li className={checks.complexity ? 'text-success' : 'text-muted'}>
              {checks.complexity ? '✓' : '○'} Hasło powinno zawierać cyfry, litery duże i małe
            </li>
            <li className={checks.length ? 'text-success' : 'text-muted'}>
              {checks.length ? '✓' : '○'} Co najmniej 12 znaków
            </li>
          </ul>
        ) : null}

        <div className="flex gap-6 text-sm">
          {(
            [
              ['student', 'Uczeń'],
              ['master', 'Mistrz'],
            ] as const
          ).map(([value, label]) => (
            <label key={value} className="flex cursor-pointer items-center gap-2">
              <input
                type="radio"
                name="role"
                checked={role === value}
                onChange={() => {
                  setRole(value)
                  setRoleError(false)
                }}
                className="accent-coral"
              />
              {label}
            </label>
          ))}
        </div>
        {roleError ? (
          <p className="text-sm text-danger">Wybierz rolę: Uczeń lub Mistrz.</p>
        ) : null}

        {error ? (
          <div className="rounded-xl border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
            {error}
          </div>
        ) : null}

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Rejestracja…' : 'Zarejestruj się'}
        </Button>
      </form>

      <p className="mt-3 text-center text-xs text-muted">
        Rejestrując się, wyrażasz zgodę na nasze{' '}
        <span className="text-cream">Warunki</span> oraz{' '}
        <span className="text-cream">Politykę prywatności</span>.
      </p>

      <p className="mt-4 text-center text-sm text-muted">
        Masz już konto?{' '}
        <Link to="/login" className="text-coral hover:underline">
          Zaloguj się
        </Link>
      </p>

      <div className="mt-6">
        <SocialButtons
          onToast={(msg) => {
            setToast(msg)
            setTimeout(() => setToast(null), 2500)
          }}
        />
      </div>

      <Modal open={showVerify} title="Zweryfikuj swój adres e-mail!">
        <p className="mb-6 text-sm text-muted">
          Wysłaliśmy link aktywacyjny na adres: <strong className="text-cream">{email}</strong>.
          W demo kliknij poniżej, aby aktywować konto lokalnie.
        </p>
        <Button className="w-full" onClick={confirmEmail}>
          Aktywuj konto
        </Button>
      </Modal>
      <Toast message={toast} />
    </AuthLayout>
  )
}
