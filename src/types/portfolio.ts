export type NavigationItem = {
  label: string
  href: string
}

export type PortfolioContent = {
  site: {
    name: string
    shortName: string
    resumeUrl: string | null
  }
  navigation: NavigationItem[]
  socials: unknown[]
  work: unknown[]
  projects: unknown[]
  skills: unknown[]
}
