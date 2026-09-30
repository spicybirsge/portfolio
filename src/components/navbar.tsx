"use client"

import { useState, useEffect, useSyncExternalStore } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { CodeXml, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemePicker } from "@/components/theme-picker"
import { LocalClock } from "@/components/local-clock"
import { portfolio } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

const subscribeToHydration = () => () => {}

export function Navbar() {
  const pathname = usePathname()

  // The production domain may rewrite the initial request. Defer pathname-based
  // UI until mount so the server HTML and first client render always agree.
  const isHydrated = useSyncExternalStore(
    subscribeToHydration,
    () => true,
    () => false
  )
  const clientPathname = isHydrated ? pathname : ""
  const [isOpen, setIsOpen] = useState(false)

  // Reset menu state when pathname changes during navigation
  const [prevPathname, setPrevPathname] = useState(pathname)
  if (prevPathname !== pathname) {
    setPrevPathname(pathname)
    setIsOpen(false)
  }

  // Close mobile navigation on Escape key press
  useEffect(() => {
    if (!isOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/95 backdrop-blur-sm">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-3 focus:text-foreground focus:ring-2 focus:ring-ring"
      >
        Skip to content
      </a>
      <div className="mx-auto flex min-h-14 max-w-[672px] items-center justify-between gap-3 px-5 py-2 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2.5 font-mono text-sm font-medium tracking-tight"
          aria-label={portfolio.site.name + " home"}
          onClick={() => setIsOpen(false)}
        >
          <span className="flex size-7 items-center justify-center rounded-md bg-brand text-white">
            <CodeXml aria-hidden="true" className="size-5" />
          </span>
          <span className="hidden min-[380px]:inline">{portfolio.site.name}</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <LocalClock className="hidden sm:inline" />

          {/* Desktop primary navigation */}
          <nav aria-label="Primary navigation" className="hidden sm:block">
            <ul className="flex gap-1 font-mono text-sm">
              {portfolio.navigation.map((item) => {
                const active =
                  item.href === "/"
                    ? clientPathname === "/"
                    : clientPathname === item.href ||
                      clientPathname.startsWith(item.href + "/")
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded px-3 py-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                        active && "bg-muted text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <ThemePicker />

          {/* Mobile menu toggle */}
          <Button
            variant="ghost"
            size="icon-sm"
            className="sm:hidden text-muted-foreground hover:text-foreground"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          >
            {isOpen ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Menu className="size-4" aria-hidden="true" />
            )}
          </Button>
        </div>
      </div>

      {/* Collapsed navigation panel for small devices */}
      {isOpen && (
        <nav
          id="mobile-navigation"
          aria-label="Mobile navigation"
          className="border-t border-border/60 bg-background/95 px-5 py-3 sm:hidden animate-in fade-in slide-in-from-top-2 duration-150 backdrop-blur-sm"
        >
          <div className="mx-auto max-w-[672px]">
            <ul className="flex flex-col gap-1 font-mono text-sm">
              {portfolio.navigation.map((item) => {
                const active =
                  item.href === "/"
                    ? clientPathname === "/"
                    : clientPathname === item.href ||
                      clientPathname.startsWith(item.href + "/")
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center justify-between rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
                        active && "bg-muted text-foreground font-medium"
                      )}
                    >
                      <span>{item.label}</span>
                      {active && (
                        <span className="size-1.5 rounded-full bg-brand" aria-hidden="true" />
                      )}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <div className="mt-2.5 flex items-center justify-between border-t border-border/40 pt-2.5 font-mono text-xs text-muted-foreground">
              <span>Time ({portfolio.clock.label})</span>
              <LocalClock className="inline" />
            </div>
          </div>
        </nav>
      )}
    </header>
  )
}
