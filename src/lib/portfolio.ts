import portfolioData from "@/data/portfolio.json"
import type { PortfolioContent } from "@/types/portfolio"

export const portfolio: PortfolioContent = portfolioData

export function getProjects() {
  return portfolio.projects.filter((item) => item.published).sort((a, b) => a.order - b.order)
}

export function getWork() {
  return portfolio.work.filter((item) => item.published).sort((a, b) => a.order - b.order)
}
