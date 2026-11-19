import type { ContentItem, RankingEntry, User } from '../shared/types'
import { hashPassword } from '../shared/crypto'
import { loadJson, saveJson } from '../shared/storage'

const COLORS = ['#e07a5f', '#4a90d9', '#7cb342', '#ab47bc', '#26a69a', '#ef5350', '#ffa726']

function thumb(seed: string, color: string) {
  const svg = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
      <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop stop-color="${color}"/><stop offset="1" stop-color="#06101f"/>
      </linearGradient></defs>
      <rect width="640" height="360" fill="url(#g)"/>
      <text x="32" y="310" fill="white" font-family="Arial" font-size="28" font-weight="700">${seed}</text>
    </svg>`,
  )
  return `data:image/svg+xml,${svg}`
}

export const DEMO_PASSWORDS = {
  student: 'DemoStudent12',
  master: 'DemoMaster12',
} as const

async function buildDemoUsers(): Promise<User[]> {
  const studentHash = await hashPassword(DEMO_PASSWORDS.student)
  const masterHash = await hashPassword(DEMO_PASSWORDS.master)
  return [
    {
      id: 'user_demo_student',
      email: 'uczen@demo.pl',
      passwordHash: studentHash,
      role: 'student',
      emailVerified: true,
      profileCompleted: true,
      profile: {
        displayName: 'Albus Uczeń',
        username: 'albus',
        bio: 'Uczę się basketballu i wspinaczki.',
        sports: ['Basketball', 'Climbing'],
        location: 'Warszawa',
        avatarColor: COLORS[0],
      },
      createdAt: new Date().toISOString(),
    },
    {
      id: 'user_demo_master',
      email: 'mistrz@demo.pl',
      passwordHash: masterHash,
      role: 'master',
      emailVerified: true,
      profileCompleted: true,
      profile: {
        displayName: 'Minerva Mistrz',
        username: 'minerva',
        bio: 'Trenerka z 12-letnim doświadczeniem.',
        sports: ['Dance', 'Basketball'],
        location: 'Kraków',
        avatarColor: COLORS[1],
      },
      createdAt: new Date().toISOString(),
    },
  ]
}

export const SEED_CONTENT: ContentItem[] = [
  {
    id: 'c1',
    title: 'Podstawy rzutu z dystansu',
    type: 'course',
    authorId: 'user_demo_master',
    authorName: 'Minerva Mistrz',
    authorRole: 'master',
    rating: 4.8,
    views: 1240,
    duration: '12:40',
    thumbnail: thumb('Kurs · Rzut', COLORS[1]),
    description: 'Technika rzutu za 3 punkty krok po kroku.',
    tags: ['Basketball', 'Podstawy'],
  },
  {
    id: 'c2',
    title: 'Mountain climbers — forma',
    type: 'tutorial',
    authorId: 'user_demo_master',
    authorName: 'Minerva Mistrz',
    authorRole: 'master',
    rating: 4.6,
    views: 890,
    duration: '08:15',
    thumbnail: thumb('Tutorial', COLORS[0]),
    description: 'Jak poprawnie wykonywać mountain climbers.',
    tags: ['Fitness'],
  },
  {
    id: 'c3',
    title: 'Challenge: 50 rzutów',
    type: 'challenge',
    authorId: 'user_demo_master',
    authorName: 'Minerva Mistrz',
    authorRole: 'master',
    rating: 4.9,
    views: 2100,
    duration: '05:00',
    thumbnail: thumb('Challenge', COLORS[5]),
    description: 'Rzuć wyzwanie — 50 celnych rzutów w 5 minut.',
    tags: ['Basketball', 'Challenge'],
  },
  {
    id: 'c4',
    title: 'Rekord freestyle',
    type: 'record',
    authorId: 'user_demo_student',
    authorName: 'Albus Uczeń',
    authorRole: 'student',
    rating: 4.2,
    views: 430,
    duration: '01:20',
    thumbnail: thumb('Rekord', COLORS[3]),
    description: 'Próba pobicia rekordu freestyle.',
    tags: ['Freestyle'],
  },
  {
    id: 'c5',
    title: 'Kooperacja duo drill',
    type: 'cooperation',
    authorId: 'user_demo_master',
    authorName: 'Minerva Mistrz',
    authorRole: 'master',
    rating: 4.7,
    views: 670,
    duration: '15:30',
    thumbnail: thumb('Kooperacja', COLORS[4]),
    description: 'Ćwiczenie partnerskie dla dwóch osób.',
    tags: ['Kooperacja', 'Dance'],
  },
  {
    id: 'c6',
    title: 'Freestyle w rytm',
    type: 'freestyle',
    authorId: 'user_demo_student',
    authorName: 'Albus Uczeń',
    authorRole: 'student',
    rating: 4.4,
    views: 520,
    duration: '03:45',
    thumbnail: thumb('Freestyle', COLORS[2]),
    description: 'Improwizacja taneczna na beat.',
    tags: ['Dance', 'Freestyle'],
  },
  {
    id: 'c7',
    title: 'Obrona 1 na 1',
    type: 'course',
    authorId: 'user_demo_master',
    authorName: 'Minerva Mistrz',
    authorRole: 'master',
    rating: 4.5,
    views: 980,
    duration: '18:00',
    thumbnail: thumb('Kurs · Obrona', COLORS[1]),
    description: 'Fundamenty obrony indywidualnej.',
    tags: ['Basketball'],
  },
  {
    id: 'c8',
    title: 'Challenge: plank 3 min',
    type: 'challenge',
    authorId: 'user_demo_student',
    authorName: 'Albus Uczeń',
    authorRole: 'student',
    rating: 4.1,
    views: 310,
    duration: '03:10',
    thumbnail: thumb('Challenge', COLORS[6]),
    description: 'Wyzwanie wytrzymałościowe.',
    tags: ['Fitness', 'Challenge'],
  },
]

export const SEED_RANKINGS: RankingEntry[] = [
  { id: 'r1', name: 'Minerva Mistrz', role: 'master', score: 9820, sport: 'Dance', avatarColor: COLORS[1] },
  { id: 'r2', name: 'Marcus Pro', role: 'master', score: 9100, sport: 'Basketball', avatarColor: COLORS[5] },
  { id: 'r3', name: 'Sofia Climb', role: 'master', score: 8740, sport: 'Climbing', avatarColor: COLORS[4] },
  { id: 'r4', name: 'Albus Uczeń', role: 'student', score: 4210, sport: 'Basketball', avatarColor: COLORS[0] },
  { id: 'r5', name: 'Kasia Flow', role: 'student', score: 3890, sport: 'Dance', avatarColor: COLORS[3] },
  { id: 'r6', name: 'Tomek Spike', role: 'student', score: 3560, sport: 'Basketball', avatarColor: COLORS[2] },
  { id: 'r7', name: 'Ola Peak', role: 'student', score: 3120, sport: 'Climbing', avatarColor: COLORS[6] },
  { id: 'r8', name: 'Jan Coach', role: 'master', score: 8010, sport: 'Fitness', avatarColor: COLORS[0] },
]

export async function ensureSeed(): Promise<void> {
  const seeded = loadJson<boolean>('seeded', false)
  if (seeded) return

  const users = await buildDemoUsers()
  saveJson('users', users)
  saveJson('content', SEED_CONTENT)
  saveJson('rankings', SEED_RANKINGS)
  saveJson('seeded', true)
}

export function getContent(): ContentItem[] {
  return loadJson<ContentItem[]>('content', SEED_CONTENT)
}

export function getRankings(): RankingEntry[] {
  return loadJson<RankingEntry[]>('rankings', SEED_RANKINGS)
}

export function getUsers(): User[] {
  return loadJson<User[]>('users', [])
}

export function saveUsers(users: User[]): void {
  saveJson('users', users)
}
