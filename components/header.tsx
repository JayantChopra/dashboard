"use client"

import { Search, Moon, Sun, Bell } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Utility function to format notification count
export function formatNotificationCount(count: number): string {
  if (count <= 0) return ""
  if (count > 99) return "99+"
  return count.toString()
}

export function Header() {
  const { theme, setTheme } = useTheme()
  const [notificationCount, setNotificationCount] = useState(0)

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <div className="flex-1 flex items-center gap-4">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          data-testid="notifications-button"
          onClick={() => setNotificationCount(prev => prev > 0 ? 0 : 5)}
        >
          <Bell className="h-4 w-4" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 h-4 min-w-4 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center px-1">
              {formatNotificationCount(notificationCount)}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>

        <Button variant="outline" size="sm">
          Deploy
        </Button>
      </div>
    </header>
  )
}
