"use client"

import { Search, Moon, Sun, Bell, Settings, User, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [notificationCount, setNotificationCount] = useState(3)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const clearNotifications = () => {
    setNotificationCount(0)
  }

  const handleLogout = () => {
    console.log("Logging out...")
    setShowUserMenu(false)
  }

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <div className="flex-1 flex items-center gap-4">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search projects, settings, or help..."
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={clearNotifications}
          className="relative"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          {notificationCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {notificationCount}
            </Badge>
          )}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Settings"
        >
          <Settings className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        </Button>

        <Button variant="default" size="sm">
          Deploy
        </Button>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowUserMenu(!showUserMenu)}
            aria-label="User menu"
            data-testid="user-menu-button"
          >
            <User className="h-4 w-4" />
          </Button>
          {showUserMenu && (
            <div
              className="absolute right-0 top-10 w-48 bg-background border rounded-md shadow-lg py-1 z-50"
              data-testid="user-menu-dropdown"
            >
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center gap-2"
                onClick={() => setShowUserMenu(false)}
                data-testid="profile-link"
              >
                <User className="h-4 w-4" />
                Profile
              </button>
              <button
                className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center gap-2 text-destructive"
                onClick={handleLogout}
                data-testid="logout-button"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
