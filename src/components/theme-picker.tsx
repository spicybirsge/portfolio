"use client"

import { useSyncExternalStore } from "react"
import { Monitor, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const subscribe = () => () => {}
const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "system", label: "System", icon: Monitor },
  { value: "dark", label: "Dark", icon: Moon },
] as const

export function ThemePicker() {
  const { theme, setTheme } = useTheme()
  const mounted = useSyncExternalStore(subscribe, () => true, () => false)
  return (
    <div role="group" aria-label="Color theme" className="flex overflow-hidden rounded-md border bg-muted/60">
      {themes.map(({ value, label, icon: Icon }) => (
        <Button key={value} variant="ghost" size="icon-sm" aria-label={label + " theme"} title={label + " theme"} aria-pressed={mounted && theme === value} onClick={() => setTheme(value)} className={cn("size-8 rounded-none text-muted-foreground", mounted && theme === value && "bg-background text-foreground shadow-xs")}>
          <Icon aria-hidden="true" className="size-3.5" />
        </Button>
      ))}
    </div>
  )
}
