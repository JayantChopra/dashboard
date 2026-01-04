"use client"

import { Search, Moon, Sun, Bell, Settings, User, LogOut, HelpCircle, Command, Plus, FileText, FolderPlus, Upload } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [notificationCount, setNotificationCount] = useState(3)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showHelpMenu, setShowHelpMenu] = useState(false)
  const [showQuickActions, setShowQuickActions] = useState(false)

  const quickActions = [
    { icon: FileText, label: "New File", shortcut: "N", action: () => console.log("New file") },
    { icon: FolderPlus, label: "New Folder", shortcut: "F", action: () => console.log("New folder") },
    { icon: Upload, label: "Upload", shortcut: "U", action: () => console.log("Upload") },
  ]

  const clearNotifications = () => {
    setNotificationCount(0)
  }

  const handleLogout = () => {
    console.log("Logging out...")
    setShowUserMenu(false)
  }

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        document.querySelector<HTMLInputElement>('input[type="search"]')?.focus()
      }
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault()
        setShowHelpMenu(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

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

        <div className="relative">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowQuickActions(!showQuickActions)}
            aria-label="Quick actions"
            data-testid="quick-actions-button"
            className="gap-1"
          >
            <Plus className="h-4 w-4" />
            New
          </Button>
          {showQuickActions && (
            <div
              className="absolute right-0 top-10 w-48 bg-background border rounded-md shadow-lg py-1 z-50"
              data-testid="quick-actions-menu"
            >
              {quickActions.map((item) => (
                <button
                  key={item.label}
                  className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center justify-between"
                  onClick={() => {
                    item.action()
                    setShowQuickActions(false)
                  }}
                  data-testid={`quick-action-${item.label.toLowerCase().replace(' ', '-')}`}
                >
                  <span className="flex items-center gap-2">
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </span>
                  <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">
                    {item.shortcut}
                  </kbd>
                </button>
              ))}
            </div>
          )}
        </div>

        <Button variant="default" size="sm">
          Deploy
        </Button>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowHelpMenu(!showHelpMenu)}
            aria-label="Help"
            data-testid="help-button"
          >
            <HelpCircle className="h-4 w-4" />
          </Button>
          {showHelpMenu && (
            <div
              className="absolute right-0 top-10 w-64 bg-background border rounded-md shadow-lg p-3 z-50"
              data-testid="help-menu"
            >
              <h4 className="font-semibold text-sm mb-2">Keyboard Shortcuts</h4>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>Search</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs flex items-center gap-1">
                    <Command className="h-3 w-3" /> K
                  </kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span>Toggle Help</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs flex items-center gap-1">
                    <Command className="h-3 w-3" /> /
                  </kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span>Toggle Theme</span>
                  <kbd className="px-2 py-1 bg-muted rounded text-xs flex items-center gap-1">
                    <Command className="h-3 w-3" /> D
                  </kbd>
                </div>
              </div>
            </div>
          )}
        </div>

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
