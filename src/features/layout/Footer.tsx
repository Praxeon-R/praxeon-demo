import { Logo } from '../../shared/ui'

export function Footer() {
  return (
    <footer className="mt-16 border-t border-navy-4 bg-navy-3">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-12 md:grid-cols-[1.2fr_1fr_1fr_1fr]">
        <div>
          <Logo className="mb-3 text-xl tracking-[0.16em]" />
          <p className="mb-4 max-w-xs text-sm text-navy-soft">
            Oglądaj. Twórz. Zostań mistrzem. Lokalne demo bez backendu.
          </p>
          <div className="flex gap-3 text-sm text-link">
            <span>IG</span>
            <span>YT</span>
            <span>TT</span>
          </div>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Produkt</p>
          <ul className="space-y-2 text-sm text-navy-soft">
            <li>Kursy</li>
            <li>Challenge</li>
            <li>Kooperacje</li>
            <li>Rankingi</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Firma</p>
          <ul className="space-y-2 text-sm text-navy-soft">
            <li>O nas</li>
            <li>Kontakt</li>
            <li>Blog</li>
          </ul>
        </div>
        <div>
          <p className="mb-3 text-sm font-semibold">Newsletter</p>
          <p className="mb-3 text-sm text-navy-soft">Nowości z platformy (mock).</p>
          <div className="flex gap-2">
            <input
              placeholder="E-mail"
              className="min-w-0 flex-1 rounded-lg border border-border bg-field px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <button
              type="button"
              className="rounded-lg bg-soft px-3 py-2 text-sm font-semibold text-primary"
            >
              OK
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-navy-4 px-6 py-4 text-center text-xs text-muted">
        © {new Date().getFullYear()} Praxeon · demo lokalne
      </div>
    </footer>
  )
}
