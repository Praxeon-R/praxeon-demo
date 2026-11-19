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
        {error ? (
          <div className="rounded-xl border border-danger/40 bg-danger/10 px-3 py-2 text-sm text-danger">
            {error}
          </div>
        ) : null}
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Logowanie…' : 'Zaloguj się'}
        </Button>
      </form>

      <p className="mt-4 text-center text-sm text-muted">
        Nie masz konta?{' '}
        <Link to="/register" className="text-coral hover:underline">
          Zarejestruj się
        </Link>
      </p>

      <div className="mt-6 rounded-xl border border-border/60 bg-navy-3/50 p-3 text-xs text-muted">
        Demo: <code className="text-cream">uczen@demo.pl</code> /{' '}
        <code className="text-cream">{DEMO_PASSWORDS.student}</code>
        <br />
        lub <code className="text-cream">mistrz@demo.pl</code> /{' '}
        <code className="text-cream">{DEMO_PASSWORDS.master}</code>
      </div>

      <div className="mt-6">
        <SocialButtons
          onToast={(msg) => {
            setToast(msg)
            setTimeout(() => setToast(null), 2500)
          }}
        />
      </div>
      <Toast message={toast} />
    </AuthLayout>
  )
}
