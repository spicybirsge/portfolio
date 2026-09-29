"use client"

import { useEffect, useState } from "react"
import { portfolio } from "@/lib/portfolio"

export function LocalClock() {
  const [time, setTime] = useState<string | null>(null)
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat("en-GB", { timeZone: portfolio.clock.timeZone, hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true })
    const update = () => setTime(formatter.format(new Date()))
    update()
    const interval = setInterval(update, 1000)
    return () => clearInterval(interval)
  }, [])
  return <span className="hidden whitespace-nowrap font-mono text-xs text-muted-foreground tabular-nums sm:inline" aria-label={"Local time in " + portfolio.clock.timeZone}>{portfolio.clock.label} {time?.toUpperCase() ?? "--:--:--:--"}</span>
}
