"use client"

import { Search, Moon, Sun, HelpCircle } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [showHelp, setShowHelp] = useState(false)

  const toggleHelp = () => {
    setShowHelp(!showHelp)
  }

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
          onClick={toggleHelp}
          aria-label="Help"
        >
          <HelpCircle className="h-4 w-4" />
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

      {showHelp && (
        <div className="absolute top-14 right-6 w-64 p-4 bg-background border rounded-lg shadow-lg">
          <h3 className="font-semibold mb-2">Help</h3>
          <p className="text-sm text-muted-foreground">
            Welcome to the Dashboard! Use the sidebar to navigate between sections.
          </p>
        </div>
      )}
    </header>
  )
}
