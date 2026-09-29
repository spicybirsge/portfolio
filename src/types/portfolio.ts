export type NavigationItem = {
  label: string
  href: string
}

export type PortfolioContent = {
  site: {
    name: string
    resumeUrl: string | null
    description: string
  }
  navigation: NavigationItem[]
  profile: { name: string; role: string; company: string | null; summary: string; availability: string }
  clock: { timeZone: string; label: string }
  github: { username: string; heading: string }
  sections: { skillsTitle: string; workTitle: string; workDescription: string; experienceTitle: string; contactTitle: string; contactDescription: string; footer: string }
  contact: { email: string }
  socials: { label: string; url: string }[]
  work: WorkEntry[]
  projects: Project[]
  skills: string[]
}

type ContentRecord = { id: string; order: number; published: boolean }
export type WorkEntry = ContentRecord & { company: string; role: string; startDate: string; endDate: string | null; description: string; url?: string | null }
export type Project = ContentRecord & { slug: string; name: string; description: string; tags: string[]; year: string; url: string | null; repoUrl?: string | null }
