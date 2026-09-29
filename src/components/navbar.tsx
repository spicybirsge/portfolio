"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileTextIcon, MenuIcon } from "lucide-react"

import { ThemePicker } from "@/components/theme-picker"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { portfolio } from "@/lib/portfolio"
import { cn } from "@/lib/utils"

function isActiveRoute(pathname: string, href: string) {
  return href === "/"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`)
}

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label={`${portfolio.site.name} home`}
          className="mr-auto flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
            {portfolio.site.shortName}
          </span>
          <span className="hidden text-sm font-semibold tracking-tight sm:inline">
            {portfolio.site.name}
          </span>
        </Link>

        <nav aria-label="Primary navigation" className="hidden sm:block">
          <ul className="flex items-center gap-0.5 sm:gap-1">
            {portfolio.navigation.map((item) => {
              const active = isActiveRoute(pathname, item.href)

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "inline-flex h-9 items-center rounded-md px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50 sm:px-3",
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

        {portfolio.site.resumeUrl ? (
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <a href={portfolio.site.resumeUrl} target="_blank" rel="noreferrer">
              Resume
            </a>
          </Button>
        ) : null}

        <div className="ml-1 border-l border-border pl-2">
          <ThemePicker />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full sm:hidden"
              aria-label="Open navigation menu"
            >
              <MenuIcon />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-44">
            {portfolio.navigation.map((item) => (
              <DropdownMenuItem key={item.href} asChild>
                <Link
                  href={item.href}
                  aria-current={
                    isActiveRoute(pathname, item.href) ? "page" : undefined
                  }
                  className={cn(
                    isActiveRoute(pathname, item.href) && "bg-accent"
                  )}
                >
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ))}
            {portfolio.site.resumeUrl ? (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <a
                    href={portfolio.site.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FileTextIcon />
                    Resume
                  </a>
                </DropdownMenuItem>
              </>
            ) : null}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
