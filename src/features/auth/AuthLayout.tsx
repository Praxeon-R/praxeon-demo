import type { ReactNode } from 'react'
import { Logo } from '../../shared/ui'

export function AuthLayout({ children, title }: { children: ReactNode; title: string }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-navy">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse at 70% 40%, #1a3a5c 0%, transparent 55%), radial-gradient(ellipse at 20% 80%, #3d2a22 0%, transparent 40%)',
        }}
      />
      <div className="relative mx-auto grid min-h-screen max-w-[1440px] gap-8 px-6 py-10 lg:grid-cols-[425px_1fr] lg:items-center lg:px-16">
        <div className="w-full max-w-[425px]">
          <Logo className="mb-8 text-center text-white" />
          <p className="mb-8 text-center font-display text-2xl font-medium text-cream">
            Oglądaj. Twórz. Zostań mistrzem.
          </p>
          <h1 className="mb-6 font-display text-3xl font-semibold">{title}</h1>
          {children}
        </div>
        <div className="relative hidden min-h-[520px] overflow-hidden rounded-3xl border border-border/40 lg:block">
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(135deg, #1b3a57 0%, #0a1628 45%, #3a241c 100%)',
            }}
          />
          <div className="absolute inset-0 flex flex-col justify-end p-10">
            <p className="mb-2 font-display text-4xl font-semibold text-cream">
              Trenuj. Rywalizuj.
              <br />
              Współpracuj.
            </p>
            <p className="max-w-md text-muted">
              Lokalne demo Praxeon — konta i treści zapisują się w przeglądarce (localStorage).
            </p>
            <div className="mt-8 flex gap-2">
              <span className="h-2 w-8 rounded-full bg-coral" />
              <span className="h-2 w-2 rounded-full bg-white/30" />
              <span className="h-2 w-2 rounded-full bg-white/30" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SocialButtons({ onToast }: { onToast: (msg: string) => void }) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3 text-sm text-muted">
        <div className="h-px flex-1 bg-border" />
        lub
        <div className="h-px flex-1 bg-border" />
      </div>
      {['Google', 'Apple', 'Facebook'].map((provider) => (
        <button
          key={provider}
          type="button"
          onClick={() => onToast(`${provider} niedostępne w demo lokalnym`)}
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-border bg-navy-3 px-4 py-3 text-sm hover:bg-navy-2"
        >
          Kontynuuj z {provider}
        </button>
      ))}
    </div>
  )
}
