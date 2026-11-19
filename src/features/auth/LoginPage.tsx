import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from './authStore'
import { AuthLayout, SocialButtons } from './AuthLayout'
import { Button, Field, Toast } from '../../shared/ui'
import { DEMO_PASSWORDS } from '../../data/seed'

export function LoginPage() {
  const login = useAuthStore((s) => s.login)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [toast, setToast] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const result = await login(email, password)
    setLoading(false)
    if (!result.ok) {
      setError(result.error)
      return
    }
    if (!result.user.profileCompleted) {
      navigate('/onboarding')
      return
    }
    navigate('/')
  }

  return (
    <AuthLayout title="Logowanie">
      <form onSubmit={onSubmit} className="space-y-5">
        <Field
          type="email"
          placeholder="E-mail lub nick"
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
        {error ? (
          <div className="rounded-xl border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger-soft">
            {error}
          </div>
        ) : null}
        <Button type="submit" variant="soft" className="w-full" disabled={loading}>
          {loading ? 'Logowanie…' : 'Zaloguj się'}
        </Button>
      </form>

      <div className="mt-4 space-y-2 text-center text-sm">
        <button
          type="button"
          className="text-navy-soft hover:text-cream"
          onClick={() => {
            setToast('Reset hasła niedostępny w demo')
            setTimeout(() => setToast(null), 2500)
          }}
        >
          Nie pamiętam hasła.
        </button>
        <p className="text-navy-soft">
          Nie masz konta?{' '}
          <Link to="/register" className="text-link hover:underline">
            Zarejestruj się
          </Link>
        </p>
      </div>

      <p className="mt-5 text-center text-[11px] leading-relaxed text-muted">
        Demo: uczen@demo.pl / {DEMO_PASSWORDS.student}
        <br />
        mistrz@demo.pl / {DEMO_PASSWORDS.master}
      </p>

      <SocialButtons
        onToast={(msg) => {
          setToast(msg)
          setTimeout(() => setToast(null), 2500)
        }}
      />
      <Toast message={toast} />
    </AuthLayout>
  )
}
