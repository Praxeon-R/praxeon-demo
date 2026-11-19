import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <div className={`font-display text-3xl font-bold tracking-wide ${className}`}>
      praxeon
    </div>
  )
}

export function Button({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'ghost' | 'outline' | 'dark'
}) {
  const styles = {
    primary: 'bg-coral hover:bg-coral-hover text-white border-transparent',
    ghost: 'bg-transparent hover:bg-white/10 text-white border-transparent',
    outline: 'bg-transparent hover:bg-white/5 text-white border-border',
    dark: 'bg-navy-3 hover:bg-navy-2 text-white border-border',
  }[variant]
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl border px-5 py-3 font-medium transition disabled:opacity-50 ${styles} ${className}`}
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
      {label ? <span className="mb-1.5 block text-sm text-muted">{label}</span> : null}
      <input
        className={`w-full rounded-xl border bg-field px-4 py-3 text-navy outline-none transition placeholder:text-slate-400 focus:ring-2 focus:ring-coral/50 ${
          error ? 'border-danger' : 'border-transparent'
        }`}
        {...props}
      />
      {error ? <span className="mt-1 block text-sm text-danger">{error}</span> : null}
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-navy-2 p-8 shadow-2xl border border-border">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold">{title}</h2>
          {onClose ? (
            <button onClick={onClose} className="text-muted hover:text-white text-xl leading-none">
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
  const sizes = { sm: 'h-8 w-8 text-xs', md: 'h-10 w-10 text-sm', lg: 'h-16 w-16 text-xl', xl: 'h-24 w-24 text-3xl' }
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

export function SectionHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between gap-4 px-1">
      <h2 className="font-display text-2xl font-semibold">{title}</h2>
      {action}
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
    <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-navy-3 px-4 py-3 text-sm shadow-lg border border-border">
      {message}
    </div>
  )
}
