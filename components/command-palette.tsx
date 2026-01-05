"use client"

import { useState, useEffect, useCallback } from "react"
import { Command, Search, FileText, FolderKanban, Settings, BarChart3, Moon, Sun, LogOut } from "lucide-react"
import { useTheme } from "next-themes"
import { Input } from "@/components/ui/input"

interface CommandItem {
  id: string
  label: string
  icon: React.ElementType
  shortcut?: string
  action: () => void
  category: string
}

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedIndex, setSelectedIndex] = useState(0)
  const { theme, setTheme } = useTheme()

  const commands: CommandItem[] = [
    { id: "new-file", label: "Create New File", icon: FileText, shortcut: "N", action: () => console.log("New file"), category: "Actions" },
    { id: "new-project", label: "Create New Project", icon: FolderKanban, shortcut: "P", action: () => console.log("New project"), category: "Actions" },
    { id: "go-dashboard", label: "Go to Dashboard", icon: BarChart3, action: () => console.log("Dashboard"), category: "Navigation" },
    { id: "go-settings", label: "Go to Settings", icon: Settings, action: () => console.log("Settings"), category: "Navigation" },
    { id: "toggle-theme", label: theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode", icon: theme === "dark" ? Sun : Moon, shortcut: "T", action: () => setTheme(theme === "dark" ? "light" : "dark"), category: "Preferences" },
    { id: "logout", label: "Sign Out", icon: LogOut, action: () => console.log("Logout"), category: "Account" },
  ]

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cmd.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const groupedCommands = filteredCommands.reduce((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = []
    acc[cmd.category].push(cmd)
    return acc
  }, {} as Record<string, CommandItem[]>)

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Open with Cmd+K
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault()
      setIsOpen(prev => !prev)
      setSearchQuery("")
      setSelectedIndex(0)
    }

    if (!isOpen) return

    // Close with Escape
    if (e.key === "Escape") {
      setIsOpen(false)
    }

    // Navigate with arrows
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, filteredCommands.length - 1))
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    }

    // Execute with Enter
    if (e.key === "Enter" && filteredCommands[selectedIndex]) {
      filteredCommands[selectedIndex].action()
      setIsOpen(false)
    }
  }, [isOpen, filteredCommands, selectedIndex])

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [handleKeyDown])

  const executeCommand = (cmd: CommandItem) => {
    cmd.action()
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
      data-testid="command-palette-overlay"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="fixed left-1/2 top-1/4 -translate-x-1/2 w-full max-w-lg bg-background border rounded-lg shadow-2xl overflow-hidden"
        data-testid="command-palette-dialog"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input */}
        <div className="flex items-center border-b px-4" data-testid="command-palette-search-container">
          <Search className="h-4 w-4 text-muted-foreground mr-2" />
          <Input
            type="text"
            placeholder="Type a command or search..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setSelectedIndex(0)
            }}
            className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            data-testid="command-palette-search-input"
            autoFocus
          />
          <kbd className="px-2 py-1 bg-muted rounded text-xs" data-testid="command-palette-shortcut-hint">
            ESC
          </kbd>
        </div>

        {/* Commands List */}
        <div className="max-h-80 overflow-y-auto p-2" data-testid="command-palette-results">
          {Object.entries(groupedCommands).length === 0 ? (
            <div className="py-6 text-center text-sm text-muted-foreground" data-testid="command-palette-no-results">
              No commands found for "{searchQuery}"
            </div>
          ) : (
            Object.entries(groupedCommands).map(([category, cmds]) => (
              <div key={category} className="mb-2">
                <div className="px-2 py-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {category}
                </div>
                {cmds.map((cmd, idx) => {
                  const globalIdx = filteredCommands.findIndex(c => c.id === cmd.id)
                  const isSelected = globalIdx === selectedIndex
                  return (
                    <button
                      key={cmd.id}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                        isSelected ? "bg-accent text-accent-foreground" : "hover:bg-muted"
                      }`}
                      onClick={() => executeCommand(cmd)}
                      data-testid={`command-item-${cmd.id}`}
                      data-selected={isSelected}
                    >
                      <span className="flex items-center gap-3">
                        <cmd.icon className="h-4 w-4" />
                        {cmd.label}
                      </span>
                      {cmd.shortcut && (
                        <kbd className="px-2 py-0.5 bg-muted rounded text-xs">
                          <Command className="h-3 w-3 inline mr-1" />
                          {cmd.shortcut}
                        </kbd>
                      )}
                    </button>
                  )
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="border-t px-4 py-2 flex items-center justify-between text-xs text-muted-foreground" data-testid="command-palette-footer">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-muted rounded">↑↓</kbd> Navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-muted rounded">Enter</kbd> Select
            </span>
          </div>
          <span>Press ESC to close</span>
        </div>
      </div>
    </div>
  )
}
