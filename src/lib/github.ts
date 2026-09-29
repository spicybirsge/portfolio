import "server-only"

export type Contribution = { date: string; count: number; level: number }

export function parseContributions(data: unknown): Contribution[] {
  if (!data || typeof data !== "object" || !("contributions" in data) || !Array.isArray(data.contributions)) {
    throw new Error("Invalid contribution response")
  }
  const days: Contribution[] = data.contributions.map((day: unknown) => {
    if (!day || typeof day !== "object" || !("date" in day) || typeof day.date !== "string" ||
        !/^\d{4}-\d{2}-\d{2}$/.test(day.date) || !Number.isFinite(Date.parse(day.date)) ||
        !("count" in day) || typeof day.count !== "number" || !Number.isInteger(day.count) || day.count < 0 ||
        !("level" in day) || typeof day.level !== "number" || !Number.isInteger(day.level) || day.level < 0 || day.level > 4) {
      throw new Error("Invalid contribution day")
    }
    return { date: day.date, count: day.count, level: day.level }
  })
  days.sort((a, b) => a.date.localeCompare(b.date))
  if (new Set(days.map((day) => day.date)).size !== days.length) throw new Error("Duplicate contribution dates")
  return days
}

export async function getContributions(username: string): Promise<Contribution[] | null> {
  try {
    const response = await fetch("https://github-contributions-api.jogruber.de/v4/" + encodeURIComponent(username) + "?y=last", {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(8000),
    })
    if (!response.ok) throw new Error("Contribution API returned " + response.status)
    return parseContributions(await response.json())
  } catch (error) {
    console.error("Unable to load GitHub contributions:", error instanceof Error ? error.message : "Unknown error")
    return null
  }
}
