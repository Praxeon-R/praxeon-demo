import { create } from 'zustand'
import type { Role, User, UserProfile } from '../../shared/types'
import { hashPassword } from '../../shared/crypto'
import { uid } from '../../shared/id'
import { loadJson, saveJson, removeKey } from '../../shared/storage'
import { getUsers, saveUsers } from '../../data/seed'

interface AuthState {
  user: User | null
  ready: boolean
  hydrate: () => void
  register: (input: {
    email: string
    password: string
    role: Role
  }) => Promise<{ ok: true; user: User } | { ok: false; error: string }>
  verifyEmail: (userId: string) => void
  login: (
    email: string,
    password: string,
  ) => Promise<{ ok: true; user: User } | { ok: false; error: string }>
  logout: () => void
  updateProfile: (profile: Partial<UserProfile> & { profileCompleted?: boolean }) => void
  findById: (id: string) => User | undefined
}

function persistSession(userId: string | null) {
  if (userId) saveJson('session', userId)
  else removeKey('session')
}

function emptyProfile(): UserProfile {
  return {
    displayName: '',
    username: '',
    bio: '',
    sports: [],
    location: '',
    avatarColor: '#e07a5f',
  }
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  ready: false,

  hydrate: () => {
    const sessionId = loadJson<string | null>('session', null)
    const users = getUsers()
    const user = sessionId ? users.find((u) => u.id === sessionId) ?? null : null
    set({ user, ready: true })
  },

  register: async ({ email, password, role }) => {
    const users = getUsers()
    const normalized = email.trim().toLowerCase()
    if (users.some((u) => u.email === normalized)) {
      return {
        ok: false,
        error: 'Profil dla podanego adresu e-mail lub numeru telefonu już istnieje.',
      }
    }
    if (!role) {
      return { ok: false, error: 'Wybierz rolę: Uczeń lub Mistrz.' }
    }

    const user: User = {
      id: uid('user'),
      email: normalized,
      passwordHash: await hashPassword(password),
      role,
      emailVerified: false,
      profileCompleted: false,
      profile: emptyProfile(),
      createdAt: new Date().toISOString(),
    }
    saveUsers([...users, user])
    return { ok: true, user }
  },

  verifyEmail: (userId) => {
    const users = getUsers().map((u) =>
      u.id === userId ? { ...u, emailVerified: true } : u,
    )
    saveUsers(users)
    const user = users.find((u) => u.id === userId) ?? null
    if (user) {
      persistSession(user.id)
      set({ user })
    }
  },

  login: async (email, password) => {
    const users = getUsers()
    const normalized = email.trim().toLowerCase()
    const user = users.find((u) => u.email === normalized)
    if (!user) {
      return { ok: false, error: 'Nieprawidłowy e-mail lub hasło.' }
    }
    const hash = await hashPassword(password)
    if (hash !== user.passwordHash) {
      return { ok: false, error: 'Nieprawidłowy e-mail lub hasło.' }
    }
    if (!user.emailVerified) {
      return { ok: false, error: 'Potwierdź adres e-mail, aby się zalogować.' }
    }
    persistSession(user.id)
    set({ user })
    return { ok: true, user }
  },

  logout: () => {
    persistSession(null)
    set({ user: null })
  },

  updateProfile: (patch) => {
    const current = get().user
    if (!current) return
    const { profileCompleted, ...profilePatch } = patch
    const users = getUsers().map((u) => {
      if (u.id !== current.id) return u
      return {
        ...u,
        profileCompleted: profileCompleted ?? u.profileCompleted,
        profile: { ...u.profile, ...profilePatch },
      }
    })
    saveUsers(users)
    const user = users.find((u) => u.id === current.id)!
    set({ user })
  },

  findById: (id) => getUsers().find((u) => u.id === id),
}))
