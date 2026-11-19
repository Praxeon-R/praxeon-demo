const CHIPS = [
  'Wszystkie',
  'Top trendy',
  'Twoi Mistrzowie',
  'Znajomi Uczniowie',
  'Kooperacja',
  'Rekordy',
  'Challenge',
  'Freestyle',
  'Breakdance',
  'Koszykówka',
  'Taniec',
  'Żonglowanie',
]

export function HomeChips({
  active,
  onChange,
}: {
  active: string
  onChange: (label: string) => void
}) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {CHIPS.map((label) => {
        const selected = active === label
        return (
          <button
            key={label}
            type="button"
            onClick={() => onChange(label)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm transition ${
              selected
                ? 'border border-white bg-transparent font-medium text-cream'
                : 'border border-transparent bg-[#15233A] text-cream/80 hover:bg-[#1c2d4a]'
            }`}
          >
            {label}
          </button>
        )
      })}
    </div>
  )
}

export function FilterSortRow({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center justify-end gap-3 ${className}`}>
      <button
        type="button"
        className="rounded-full bg-[#0866FF] px-4 py-2 text-sm font-medium text-white"
      >
        Filtrowanie: Lorem, Ipsum…
      </button>
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-[#0B1630]"
      >
        Sortuj <span aria-hidden>▾</span>
      </button>
    </div>
  )
}

export { CHIPS }
