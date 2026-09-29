export type NavigationItem = {
  label: string
  href: string
}

export type PortfolioContent = {
  site: {
    name: string
    shortName: string
    resumeUrl: string | null
    description: string
  }
  navigation: NavigationItem[]
  profile: { name: string; role: string; company: string; summary: string; eyebrow: string; headline: string; headlineAccent: string; intro: string; location: string; availability: string; about: string; currently: string }
  clock: { timeZone: string; label: string }
  github: { username: string; heading: string; description: string }
  sections: { skillsTitle: string; workTitle: string; workDescription: string; experienceTitle: string; aboutTitle: string; contactTitle: string; contactDescription: string; footer: string }
  contact: { email: string; label: string }
  socials: { label: string; url: string }[]
  work: WorkEntry[]
  projects: Project[]
  skills: string[]
}

type ContentRecord = { id: string; slug: string; order: number; published: boolean }
export type WorkEntry = ContentRecord & { company: string; role: string; startDate: string; endDate: string | null; description: string; url?: string | null }
export type Project = ContentRecord & { name: string; category: string; description: string; tags: string[]; accent: string; monogram: string; year: string; url: string | null; repoUrl?: string | null }
