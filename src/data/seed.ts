import type { ContentItem, RankingEntry, User } from '../shared/types'
import { hashPassword } from '../shared/crypto'
import { loadJson, saveJson } from '../shared/storage'

const COLORS = ['#e07a5f', '#4a90d9', '#7cb342', '#ab47bc', '#26a69a', '#ef5350', '#ffa726']

/** Portrait-ish Unsplash crops for Figma-like 9:16 cards */
function photo(id: string, w = 700, h = 1200) {
  return `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`
}

const PHOTOS = {
  basketball: photo('photo-1546519638-68e109498ffc'),
  fitness: photo('photo-1517836357463-d25dfeac3438'),
  challenge: photo('photo-1574629810360-7efbbe195018'),
  freestyle: photo('photo-1517649763962-0c623066013b'),
  dance: photo('photo-1508700115892-45ecd05ae2ad'),
  dance2: photo('photo-1547153760-18fc86324498'),
  defense: photo('photo-1608245449230-4ac19066d2d0'),
  plank: photo('photo-1571019614242-c5c5dee9f50b'),
  skate: photo('photo-1547447134-cd3f5c416163', 1080, 600),
  climb: photo('photo-1522163182402-834f871fd851'),
}

/** AI-generated mock clips in public/videos (respect Vite base for GH Pages) */
function clip(file: string) {
  return `${import.meta.env.BASE_URL}videos/${file}`
}

const VIDEOS = {
  basketball: clip('demo-basketball.mp4'),
  dance: clip('demo-dance.mp4'),
  fitness: clip('demo-fitness.mp4'),
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
    thumbnail: PHOTOS.basketball,
    videoUrl: VIDEOS.basketball,
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
    thumbnail: PHOTOS.fitness,
    videoUrl: VIDEOS.fitness,
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
    thumbnail: PHOTOS.challenge,
    videoUrl: VIDEOS.basketball,
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
    thumbnail: PHOTOS.freestyle,
    videoUrl: VIDEOS.dance,
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
    thumbnail: PHOTOS.dance,
    videoUrl: VIDEOS.dance,
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
    thumbnail: PHOTOS.dance2,
    videoUrl: VIDEOS.dance,
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
    thumbnail: PHOTOS.defense,
    videoUrl: VIDEOS.basketball,
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
    thumbnail: PHOTOS.plank,
    videoUrl: VIDEOS.fitness,
    description: 'Wyzwanie wytrzymałościowe.',
    tags: ['Fitness', 'Challenge'],
  },
  {
    id: 'c9',
    title: 'Deskorolka — Ollie od podstaw',
    type: 'course',
    authorId: 'user_demo_master',
    authorName: 'Minerva Mistrz',
    authorRole: 'master',
    rating: 4.7,
    views: 1560,
    duration: '14:20',
    thumbnail: PHOTOS.skate,
    videoUrl: VIDEOS.fitness,
    description: 'Pierwszy trick — ollie krok po kroku.',
    tags: ['Sport', 'Beginner'],
  },
  {
    id: 'c10',
    title: 'Wspinaczka: technika stóp',
    type: 'tutorial',
    authorId: 'user_demo_master',
    authorName: 'Minerva Mistrz',
    authorRole: 'master',
    rating: 4.6,
    views: 740,
    duration: '09:50',
    thumbnail: PHOTOS.climb,
    videoUrl: VIDEOS.fitness,
    description: 'Precyzja stóp na ściance.',
    tags: ['Climbing'],
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

const SEED_VERSION = 4

export async function ensureSeed(): Promise<void> {
  const version = loadJson<number>('seed_version', 0)
  if (version >= SEED_VERSION) return

  const existingUsers = loadJson<User[]>('users', [])
  if (!existingUsers.length) {
    saveJson('users', await buildDemoUsers())
  }
  saveJson('content', SEED_CONTENT)
  saveJson('rankings', SEED_RANKINGS)
  saveJson('seed_version', SEED_VERSION)
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
