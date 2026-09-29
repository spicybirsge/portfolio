"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { CodeXml } from "lucide-react"
import { ThemePicker } from "@/components/theme-picker"
import { LocalClock } from "@/components/local-clock"
import { portfolio } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

export function Navbar() {
  const pathname = usePathname()
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur-sm">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:bg-background focus:p-3">Skip to content</a>
      <div className="mx-auto flex min-h-14 max-w-[672px] flex-wrap items-center justify-between gap-2 px-5 py-2 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-mono text-sm font-medium tracking-tight" aria-label={portfolio.site.name + " home"}>
          <span className="flex size-7 items-center justify-center rounded-md bg-brand text-white"><CodeXml aria-hidden="true" className="size-5" /></span>
          <span className="hidden min-[380px]:inline">{portfolio.site.name}</span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-4">
          <LocalClock />
          <nav aria-label="Primary navigation">
            <ul className="flex gap-1 font-mono text-sm">
              {portfolio.navigation.map((item) => {
                const active = item.href === "/" ? pathname === "/" : pathname === item.href || pathname.startsWith(item.href + "/")
                return <li key={item.href}><Link href={item.href} aria-current={active ? "page" : undefined} className={cn("block rounded px-3 py-1.5 text-muted-foreground hover:bg-muted hover:text-foreground", active && "bg-muted text-foreground")}>{item.label}</Link></li>
              })}
            </ul>
          </nav>
          <ThemePicker />
        </div>
      </div>
    </header>
  )
}
