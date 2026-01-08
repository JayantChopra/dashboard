/**
 * Search utility functions for the dashboard
 */

export interface SearchResult {
  id: string
  title: string
  type: 'page' | 'project' | 'setting' | 'user'
  path: string
  score: number
}

export interface SearchOptions {
  maxResults?: number
  minScore?: number
  types?: SearchResult['type'][]
  caseSensitive?: boolean
}

/**
 * Calculate the fuzzy match score between a query and a target string
 * Returns a score between 0 and 1, where 1 is a perfect match
 */
export function fuzzyMatch(query: string, target: string, caseSensitive = false): number {
  if (!query || !target) return 0

  const q = caseSensitive ? query : query.toLowerCase()
  const t = caseSensitive ? target : target.toLowerCase()

  // Exact match
  if (t === q) return 1

  // Contains match
  if (t.includes(q)) {
    return 0.8 + (q.length / t.length) * 0.2
  }

  // Fuzzy character matching
  let qIndex = 0
  let consecutiveMatches = 0
  let maxConsecutive = 0
  let totalMatches = 0

  for (let i = 0; i < t.length && qIndex < q.length; i++) {
    if (t[i] === q[qIndex]) {
      totalMatches++
      consecutiveMatches++
      maxConsecutive = Math.max(maxConsecutive, consecutiveMatches)
      qIndex++
    } else {
      consecutiveMatches = 0
    }
  }

  if (qIndex < q.length) return 0 // Not all characters matched

  const matchRatio = totalMatches / q.length
  const consecutiveBonus = maxConsecutive / q.length * 0.3
  const lengthPenalty = Math.min(1, q.length / t.length)

  return Math.min(1, matchRatio * 0.5 + consecutiveBonus + lengthPenalty * 0.2)
}

/**
 * Highlight matching parts of a string
 */
export function highlightMatches(text: string, query: string): string {
  if (!query || !text) return text

  const lowerText = text.toLowerCase()
  const lowerQuery = query.toLowerCase()

  const index = lowerText.indexOf(lowerQuery)
  if (index === -1) return text

  const before = text.slice(0, index)
  const match = text.slice(index, index + query.length)
  const after = text.slice(index + query.length)

  return `${before}<mark>${match}</mark>${after}`
}

/**
 * Debounce a search function
 */
export function debounceSearch<T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout | null = null

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      fn(...args)
      timeoutId = null
    }, delay)
  }
}

/**
 * Filter and sort search results based on options
 */
export function filterSearchResults(
  results: SearchResult[],
  options: SearchOptions = {}
): SearchResult[] {
  const {
    maxResults = 10,
    minScore = 0.3,
    types,
  } = options

  let filtered = results.filter(r => r.score >= minScore)

  if (types && types.length > 0) {
    filtered = filtered.filter(r => types.includes(r.type))
  }

  filtered.sort((a, b) => b.score - a.score)

  return filtered.slice(0, maxResults)
}

/**
 * Parse search query for special operators
 * Supports: type:page, type:project, in:title
 */
export function parseSearchQuery(query: string): {
  text: string
  filters: { type?: SearchResult['type'][]; field?: string }
} {
  const filters: { type?: SearchResult['type'][]; field?: string } = {}
  let text = query

  // Extract type: operators
  const typeMatch = query.match(/type:(\w+)/g)
  if (typeMatch) {
    filters.type = typeMatch.map(m => m.replace('type:', '') as SearchResult['type'])
    text = text.replace(/type:\w+/g, '').trim()
  }

  // Extract in: operators
  const inMatch = query.match(/in:(\w+)/)
  if (inMatch) {
    filters.field = inMatch[1]
    text = text.replace(/in:\w+/g, '').trim()
  }

  return { text, filters }
}

/**
 * Format search result for display
 */
export function formatSearchResult(result: SearchResult): string {
  const typeEmoji = {
    page: '📄',
    project: '📁',
    setting: '⚙️',
    user: '👤',
  }

  return `${typeEmoji[result.type]} ${result.title} (${Math.round(result.score * 100)}%)`
}
