import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div
      className={`font-display text-[28px] font-bold tracking-[0.18em] text-cream ${className}`}
    >
      PRAXEON
    </div>
  )
}

export function Button({
  variant = 'soft',
  className = '',
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'soft' | 'primary' | 'outline' | 'ghost' | 'link'
}) {
  const styles = {
    soft: 'bg-soft text-primary hover:bg-soft-2 border-transparent min-h-[52px] px-6 rounded-lg font-semibold',
    primary:
      'bg-primary text-cream hover:bg-primary-hover border-transparent min-h-[44px] px-5 rounded-lg font-semibold',
    outline:
      'bg-transparent text-soft border-soft/80 hover:bg-soft/10 min-h-[48px] px-5 rounded-xl border',
    ghost: 'bg-transparent hover:bg-white/5 text-cream border-transparent',
    link: 'bg-transparent text-link hover:underline border-transparent px-1 py-0 min-h-0 font-medium',
  }[variant]
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 transition disabled:opacity-45 ${styles} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export function Field({
  label,
  error,
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label?: string; error?: string }) {
  return (
    <label className={`block w-full ${className}`}>
      {label ? <span className="mb-1.5 block text-sm text-navy-soft">{label}</span> : null}
      <input
        className={`w-full rounded-xl border bg-field px-4 py-3.5 text-cream outline-none transition placeholder:text-navy-muted focus:border-primary ${
          error ? 'border-danger-soft' : 'border-border'
        }`}
        {...props}
      />
      {error ? <span className="mt-1 block text-sm text-danger-soft">{error}</span> : null}
    </label>
  )
}

export function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean
  title: string
  children: ReactNode
  onClose?: () => void
}) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-navy-4 bg-navy-2 p-8 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold">{title}</h2>
          {onClose ? (
            <button onClick={onClose} className="text-muted hover:text-cream text-xl leading-none">
              ×
            </button>
          ) : null}
        </div>
        {children}
      </div>
    </div>
  )
}

export function Avatar({
  name,
  color,
  size = 'md',
}: {
  name: string
  color: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  const sizes = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-16 w-16 text-xl',
    xl: 'h-24 w-24 text-3xl',
  }
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
  return (
    <div
      className={`inline-flex items-center justify-center rounded-full font-semibold text-white ${sizes[size]}`}
      style={{ background: color }}
    >
      {initials || '?'}
    </div>
  )
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full bg-white/10 px-2.5 py-0.5 text-xs text-cream">{children}</span>
  )
}

export function Toast({ message }: { message: string | null }) {
  if (!message) return null
  return (
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl border border-navy-4 bg-navy px-4 py-3 text-sm shadow-lg">
      {message}
    </div>
  )
}
