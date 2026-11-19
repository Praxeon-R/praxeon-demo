import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getContent, getUsers } from '../../data/seed'
import { useAuthStore } from '../auth/authStore'
import { VideoCard } from '../content/VideoCard'
import { Avatar, Badge, Button, Modal } from '../../shared/ui'
import type { ContentType } from '../../shared/types'

type Tab = 'progress' | 'challenge' | 'cooperations' | 'courses'

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
    () => content.filter((c) => c.authorId === id || c.authorName === profileUser?.profile.displayName),
    [content, id, profileUser],
  )

  if (!profileUser) {
    return (
      <div>
        <h1 className="font-display text-2xl">Nie znaleziono profilu</h1>
        <Link to="/" className="mt-4 inline-block text-coral">
          Wróć na start
        </Link>
      </div>
    )
  }

  const tabs: Array<{ id: Tab; label: string }> =
    profileUser.role === 'master'
      ? [
          { id: 'courses', label: 'Kursy' },
          { id: 'challenge', label: 'Challenge' },
          { id: 'cooperations', label: 'Kooperacje' },
        ]
      : [
          { id: 'progress', label: 'Progres' },
          { id: 'challenge', label: 'Challenge' },
          { id: 'cooperations', label: 'Kooperacje' },
        ]

  function itemsForTab(t: Tab) {
    const map: Record<Tab, ContentType[] | 'all'> = {
      progress: ['course', 'tutorial', 'record', 'freestyle'],
      challenge: ['challenge'],
      cooperations: ['cooperation'],
      courses: ['course', 'tutorial'],
    }
    const types = map[t]
    if (types === 'all') return authored
    return authored.filter((c) => types.includes(c.type))
  }

  const items = itemsForTab(tab)

  return (
    <div>
      <div className="mb-8 overflow-hidden rounded-3xl border border-border/50 bg-navy-2">
        <div
          className="h-36 md:h-48"
          style={{
            background: `linear-gradient(120deg, ${profileUser.profile.avatarColor}55, #06101f)`,
          }}
        />
        <div className="relative px-6 pb-6 pt-0">
          <div className="-mt-12 mb-4 flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-end gap-4">
              <Avatar
                name={profileUser.profile.displayName || profileUser.email}
                color={profileUser.profile.avatarColor}
                size="xl"
              />
              <div className="pb-1">
                <h1 className="font-display text-3xl font-semibold">
                  {profileUser.profile.displayName || profileUser.email}
                </h1>
                <p className="text-sm text-muted">
                  @{profileUser.profile.username || 'user'} ·{' '}
                  {profileUser.role === 'master' ? 'Mistrz' : 'Uczeń'}
                  {profileUser.profile.location ? ` · ${profileUser.profile.location}` : ''}
                </p>
              </div>
            </div>
            {!own && current ? (
              <div className="flex flex-wrap gap-2">
                <Button onClick={() => setModal('challenge')}>Rzuć wyzwanie</Button>
                <Button variant="outline" onClick={() => setModal('coop')}>
                  Zaproś do współpracy
                </Button>
              </div>
            ) : null}
          </div>
          {profileUser.profile.bio ? (
            <p className="mb-3 max-w-2xl text-sm text-cream/90">{profileUser.profile.bio}</p>
          ) : (
            <p className="mb-3 text-sm text-muted">Brak opisu profilu.</p>
          )}
          <div className="flex flex-wrap gap-2">
            {profileUser.profile.sports.map((s) => (
              <Badge key={s}>{s}</Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="mb-6 flex gap-2 border-b border-border/50 pb-2">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-lg px-4 py-2 text-sm ${
              tab === t.id ? 'bg-white/10 text-white' : 'text-muted hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border p-10 text-center text-muted">
          Brak treści w tej zakładce.
          {own ? ' Upload mediów jest wyłączony w demo.' : null}
        </div>
      ) : (
        <div className="flex flex-wrap gap-4">
          {items.map((item) => (
            <VideoCard key={item.id} item={item} large />
          ))}
        </div>
      )}

      <Modal
        open={modal === 'challenge'}
        title="Rzuć wyzwanie"
        onClose={() => setModal(null)}
      >
        <p className="mb-4 text-sm text-muted">
          W pełnej aplikacji tutaj wysyłasz challenge z mediów. W demo to tylko podgląd interakcji.
        </p>
        <Button className="w-full" onClick={() => setModal(null)}>
          Zamknij
        </Button>
      </Modal>
      <Modal
        open={modal === 'coop'}
        title="Zaproś do współpracy"
        onClose={() => setModal(null)}
      >
        <p className="mb-4 text-sm text-muted">
          Zaproszenie do kooperacji — bez uploadu. Demo lokalne.
        </p>
        <Button className="w-full" onClick={() => setModal(null)}>
          Zamknij
        </Button>
      </Modal>
    </div>
  )
}
