import { useState } from 'react'
import { getRankings } from '../../data/seed'
import { Avatar } from '../../shared/ui'
import type { Role } from '../../shared/types'

export function RankingsPage() {
  const [role, setRole] = useState<Role>('student')
  const rankings = getRankings().filter((r) => r.role === role)

  return (
    <div>
      <h1 className="mb-2 font-display text-3xl font-semibold">Arena · Rankingi</h1>
      <p className="mb-6 text-sm text-navy-soft">Mock rankingów z seeda lokalnego</p>
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setRole('student')}
          className={`rounded-full px-4 py-2 text-sm ${
            role === 'student' ? 'bg-soft text-primary font-semibold' : 'bg-navy-3 text-navy-soft'
          }`}
        >
          Uczniowie
        </button>
        <button
          onClick={() => setRole('master')}
          className={`rounded-full px-4 py-2 text-sm ${
            role === 'master' ? 'bg-soft text-primary font-semibold' : 'bg-navy-3 text-navy-soft'
          }`}
        >
          Mistrzowie
        </button>
      </div>
      <div className="overflow-hidden rounded-2xl border border-navy-4 bg-navy-2">
        <table className="w-full text-left text-sm">
          <thead className="bg-navy-3 text-navy-soft">
            <tr>
              <th className="px-4 py-3 font-medium">#</th>
              <th className="px-4 py-3 font-medium">Profil</th>
              <th className="px-4 py-3 font-medium">Dyscyplina</th>
              <th className="px-4 py-3 font-medium text-right">Punkty</th>
            </tr>
          </thead>
          <tbody>
            {rankings.map((entry, index) => (
              <tr key={entry.id} className="border-t border-navy-4/60">
                <td className="px-4 py-3 text-navy-muted">{index + 1}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Avatar name={entry.name} color={entry.avatarColor} size="sm" />
                    <div>
                      <div>{entry.name}</div>
                      {index < 3 ? (
                        <span className="text-[11px] text-rating">
                          {index === 0 ? 'Champion' : index === 1 ? 'Expert' : 'Adept'}
                        </span>
                      ) : null}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-navy-soft">{entry.sport}</td>
                <td className="px-4 py-3 text-right font-semibold">
                  {entry.score.toLocaleString('pl-PL')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
