import { useEffect, useState, type ReactNode } from 'react'
import { Logo } from '../../shared/ui'
import slide1 from '../../assets/figma/slider-img-1.jpg'
import slide2 from '../../assets/figma/slider-img-2.jpg'
import slide3 from '../../assets/figma/slider-img-3.jpg'

const SLIDES = [
  {
    image: slide1,
    quote:
      'Dobra platforma nie jest tylko narzędziem — jest mostem między pomysłami a ludźmi, którzy potrafią je urzeczywistnić.',
    author: 'Janek — nauczyciel jazdy na deskorolce',
  },
  {
    image: slide2,
    quote:
      'Nie musisz znać kroków. To platforma nauczy Cię tańczyć od podstaw — we własnym tempie.',
    author: 'Kasia — nauczyła mnie tańca',
  },
  {
    image: slide3,
    quote: 'Każde nagranie to nie perfekcja, lecz postęp — tu uczysz się tańczyć klatka po klatce.',
    author: 'Kasia — nauczyła mnie tańca',
  },
]

export function AuthLayout({ children, title }: { children: ReactNode; title: string }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length)
    }, 5000)
    return () => window.clearInterval(id)
  }, [])

  const slide = SLIDES[index]

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4 py-8 md:px-10">
      <div className="mx-auto grid w-full max-w-[1220px] items-stretch gap-10 lg:grid-cols-[425px_minmax(0,1fr)] lg:gap-16">
        <div className="mx-auto flex w-full max-w-[425px] flex-col items-center">
          <div className="mb-8 flex flex-col items-center gap-2">
            <Logo />
            <p className="text-center text-base tracking-wide text-tagline capitalize">
              Oglądaj. Twórz. Zostań mistrzem.
            </p>
          </div>
          <h1 className="mb-8 w-full text-center font-display text-[32px] font-semibold leading-tight">
            {title}
          </h1>
          <div className="w-full">{children}</div>
        </div>

        <div className="relative hidden min-h-[640px] overflow-hidden rounded-[28px] lg:block">
          {SLIDES.map((s, i) => (
            <img
              key={s.author}
              src={s.image}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                i === index ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-8">
            <p className="mb-3 max-w-xl font-display text-xl font-medium leading-snug text-cream">
              „{slide.quote}”
            </p>
            <p className="mb-6 text-sm text-navy-soft">{slide.author}</p>
            <div className="flex gap-2">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Slajd ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-1 rounded-full transition ${
                    i === index ? 'w-8 bg-cream' : 'w-4 bg-white/35'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path
        fill="#EA4335"
        d="M9 7.2v3.5h4.9c-.2 1.1-.9 2.1-1.9 2.7l3.1 2.4c1.8-1.7 2.8-4.1 2.8-7 0-.7-.1-1.3-.2-1.9H9z"
      />
      <path
        fill="#34A853"
        d="M3.9 10.7l-.7.5-2.3 1.8C2.4 15.6 5.5 18 9 18c2.4 0 4.4-.8 5.9-2.1l-3.1-2.4c-.8.6-1.9.9-2.8.9-2.2 0-4-1.5-4.7-3.5z"
      />
      <path
        fill="#4A90E2"
        d="M.9 5.1C.3 6.3 0 7.6 0 9s.3 2.7.9 3.9l3-2.3C3.7 9.7 3.6 9.4 3.6 9c0-.4.1-.7.2-1.1L.9 5.1z"
      />
      <path
        fill="#FBBC05"
        d="M9 3.6c1.3 0 2.5.5 3.4 1.3l2.5-2.5C13.4.9 11.4 0 9 0 5.5 0 2.4 2.4.9 5.1l2.9 2.3C4.9 5.1 6.8 3.6 9 3.6z"
      />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden fill="#1877F2">
      <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.03 1.79-4.7 4.54-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.5 0-1.96.93-1.96 1.89v2.26h3.34l-.53 3.49h-2.81V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  )
}

export function SocialButtons({ onToast }: { onToast: (msg: string) => void }) {
  return (
    <div className="mt-8 w-full space-y-3">
      <div className="flex items-center gap-3 text-sm text-navy-soft">
        <div className="h-px flex-1 bg-border" />
        lub
        <div className="h-px flex-1 bg-border" />
      </div>
      <button
        type="button"
        onClick={() => onToast('Google niedostępne w demo lokalnym')}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-soft/80 bg-transparent px-4 py-3.5 text-sm text-soft hover:bg-soft/5"
      >
        <GoogleIcon />
        Kontynuuj z Google
      </button>
      <button
        type="button"
        onClick={() => onToast('Facebook niedostępny w demo lokalnym')}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-soft/80 bg-transparent px-4 py-3.5 text-sm text-soft hover:bg-soft/5"
      >
        <FacebookIcon />
        Kontynuuj z Facebookiem
      </button>
    </div>
  )
}
