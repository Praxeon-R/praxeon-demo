export type Role = 'student' | 'master'

export type ContentType =
  | 'course'
  | 'tutorial'
  | 'challenge'
  | 'record'
  | 'cooperation'
  | 'freestyle'

export interface UserProfile {
  displayName: string
  username: string
  bio: string
  sports: string[]
  location: string
  avatarColor: string
}

export interface User {
  id: string
  email: string
  passwordHash: string
  role: Role
  emailVerified: boolean
  profileCompleted: boolean
  profile: UserProfile
  createdAt: string
}

export interface ContentItem {
  id: string
  title: string
  type: ContentType
  authorId: string
  authorName: string
  authorRole: Role
  rating: number
  views: number
  duration: string
  thumbnail: string
  videoUrl: string
  description: string
  tags: string[]
}

export interface RankingEntry {
  id: string
  name: string
  role: Role
  score: number
  sport: string
  avatarColor: string
}
