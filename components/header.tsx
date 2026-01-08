"use client"

import { useState, useCallback } from "react"
import { Search, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { debounceSearch, parseSearchQuery } from "@/lib/search-utils"

export function Header() {
  const { theme, setTheme } = useTheme()
  const [parsedFilters, setParsedFilters] = useState<{ type?: string[]; field?: string }>({})

  const handleSearchChange = useCallback(
    debounceSearch((value: string) => {
      const { text, filters } = parseSearchQuery(value)
      setParsedFilters(filters)
      console.log("Search:", text, "Filters:", filters)
    }, 300),
    []
  )

  return (
    <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
      <div className="flex-1 flex items-center gap-4">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search... (try type:page or type:project)"
            className="pl-10"
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {parsedFilters.type && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
              {parsedFilters.type.map((t) => (
                <span key={t} className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
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
