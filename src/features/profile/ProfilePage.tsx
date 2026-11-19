import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getContent, getUsers } from '../../data/seed'
import { useAuthStore } from '../auth/authStore'
import { VideoCard } from '../content/VideoCard'
import { Avatar, Button, Modal } from '../../shared/ui'
import type { ContentType } from '../../shared/types'

type Tab = 'progress' | 'challenge' | 'cooperations' | 'materials'

export function ProfilePage() {
  const { id } = useParams()
  const current = useAuthStore((s) => s.user)
  const users = getUsers()
  const content = getContent()
  const profileUser = users.find((u) => u.id === id)
  const [tab, setTab] = useState<Tab>('progress')
  const [modal, setModal] = useState<'challenge' | 'coop' | null>(null)

  const own = current?.id === profileUser?.id

  const authored = useMemo(
    () =>
      content.filter(
        (c) => c.authorId === id || c.authorName === profileUser?.profile.displayName,
      ),
    [content, id, profileUser],
  )

  if (!profileUser) {
    return (
      <div>
        <h1 className="font-display text-2xl">Nie znaleziono profilu</h1>
        <Link to="/" className="mt-4 inline-block text-link">
          Wróć na start
        </Link>
      </div>
    )
  }

  const tabs: Array<{ id: Tab; label: string }> = [
    { id: 'progress', label: 'Postęp' },
    { id: 'challenge', label: 'Wyzwania' },
    { id: 'cooperations', label: 'Kooperacje' },
    { id: 'materials', label: 'Materiały' },
  ]

  function itemsForTab(t: Tab) {
    const map: Record<Tab, ContentType[] | 'materials'> = {
      progress: ['course', 'tutorial', 'record', 'freestyle'],
      challenge: ['challenge'],
      cooperations: ['cooperation'],
      materials: 'materials',
    }
    const types = map[t]
    if (types === 'materials') return []
    return authored.filter((c) => types.includes(c.type))
  }

  const items = itemsForTab(tab)
  const progress = Math.min(100, 20 + authored.length * 15)

  return (
    <div>
      <div
        className="mb-[-48px] h-[180px] rounded-2xl"
        style={{
          background: `linear-gradient(120deg, ${profileUser.profile.avatarColor}66, #0a0233)`,
        }}
      />

      <div className="relative mb-6 flex flex-wrap items-end gap-6 rounded-2xl border border-navy-4 bg-navy-2 p-6">
        <Avatar
          name={profileUser.profile.displayName || profileUser.email}
          color={profileUser.profile.avatarColor}
          size="xl"
        />
        <div className="min-w-0 flex-1 pb-1">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <h1 className="font-display text-3xl font-semibold">
              {profileUser.profile.displayName || profileUser.email}
            </h1>
            <span className="rounded-full bg-[#007872]/25 px-2.5 py-0.5 text-xs text-[#3ddc97]">
              {profileUser.role === 'master' ? 'Mistrz' : 'Uczeń'}
            </span>
          </div>
          <p className="mb-3 text-sm text-navy-soft">
            @{profileUser.profile.username || 'user'}
            {profileUser.profile.location ? ` · ${profileUser.profile.location}` : ''}
            {' · '}
            {authored.length} treści
          </p>
          <div className="max-w-md">
            <div className="mb-1 flex justify-between text-xs text-navy-soft">
              <span>Postęp profilu</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-navy-4">
              <div className="h-full rounded-full bg-primary" style={{ width: `${progress}%` }} />
            </div>
          </div>
          {profileUser.profile.bio ? (
            <p className="mt-3 max-w-2xl text-sm text-cream/90">{profileUser.profile.bio}</p>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-2">
            {profileUser.profile.sports.map((s) => (
              <span key={s} className="rounded-full bg-navy-4 px-2.5 py-0.5 text-xs text-soft-2">
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2 pb-1">
          {own ? (
            <Button variant="outline" className="!min-h-10 text-sm">
              Edytuj
            </Button>
          ) : (
            <>
              <Button variant="outline" className="!min-h-10 text-sm" onClick={() => setModal('coop')}>
                Zaproś do współpracy
              </Button>
              <Button variant="soft" className="!min-h-10 text-sm" onClick={() => setModal('challenge')}>
                Rzuć wyzwanie
              </Button>
            </>
          )}
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm ${
              tab === t.id ? 'bg-soft text-primary font-semibold' : 'bg-navy-3 text-navy-soft'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'materials' ? (
        <div className="space-y-3">
          <div className="rounded-xl border border-navy-4 bg-navy-2 px-4 py-3 text-sm">
            Notatki z lekcji.pdf <span className="text-navy-muted">· 1.2 MB · PDF</span>
          </div>
          <div className="rounded-xl border border-navy-4 bg-navy-2 px-4 py-3 text-sm">
            Plan treningowy.pdf <span className="text-navy-muted">· 2.4 MB · PDF</span>
          </div>
          <p className="text-xs text-navy-muted">Upload mediów wyłączony w demo — to mock listy.</p>
        </div>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-navy-4 p-10 text-center text-navy-soft">
          Brak treści w tej zakładce.
          {own ? ' Upload mediów jest wyłączony w demo.' : null}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => (
            <VideoCard key={item.id} item={item} />
          ))}
        </div>
      )}

      <Modal open={modal === 'challenge'} title="Rzuć wyzwanie" onClose={() => setModal(null)}>
        <p className="mb-4 text-sm text-navy-soft">
          W pełnej aplikacji wysyłasz challenge z mediów. W demo to podgląd interakcji.
        </p>
        <Button className="w-full" variant="soft" onClick={() => setModal(null)}>
          Zamknij
        </Button>
      </Modal>
      <Modal open={modal === 'coop'} title="Zaproś do współpracy" onClose={() => setModal(null)}>
        <p className="mb-4 text-sm text-navy-soft">Zaproszenie do kooperacji — bez uploadu.</p>
        <Button className="w-full" variant="soft" onClick={() => setModal(null)}>
          Zamknij
        </Button>
      </Modal>
    </div>
  )
}
