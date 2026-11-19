import { useState } from 'react'
import { getRankings } from '../../data/seed'
import { Avatar } from '../../shared/ui'
import type { Role } from '../../shared/types'

export function RankingsPage() {
  const [role, setRole] = useState<Role>('student')
  const rankings = getRankings().filter((r) => r.role === role)

  return (
    <div>
      <h1 className="mb-6 font-display text-3xl font-semibold">Rankingi</h1>
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setRole('student')}
          className={`rounded-xl px-4 py-2 text-sm ${
            role === 'student' ? 'bg-soft text-primary' : 'bg-navy-3 text-navy-soft'
          }`}
        >
          Uczniowie
        </button>
        <button
          onClick={() => setRole('master')}
          className={`rounded-xl px-4 py-2 text-sm ${
            role === 'master' ? 'bg-soft text-primary' : 'bg-navy-3 text-navy-soft'
          }`}
        >
          Mistrzowie
        </button>
      </div>
      <div className="overflow-hidden rounded-2xl border border-border/50">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy-3 text-muted">
            <tr>
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Profil</th>
              <th className="px-4 py-3 font-medium">Dyscyplina</th>
              <th className="px-4 py-3 font-medium text-right">Punkty</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((entry, index) => (
              <tr key={entry.id} className="border-t border-border/40">
                <td className="px-4 py-3 text-muted">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={entry.name} color={entry.avatarColor} size="sm" />
                    {entry.name}
                  </div>
                </td>
                <td className="px-4 py-3 text-muted">{entry.sport}</td>
                <td className="px-4 py-3 text-right font-medium">{entry.score.toLocaleString('pl-PL')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
