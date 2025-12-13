import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectsPage from './page'

// Mock dependencies
vi.mock('@/components/dashboard-layout', () => ({
  DashboardLayout: ({ children }: { children: React.ReactNode }) => <div data-testid="dashboard-layout">{children}</div>,
}))

vi.mock('@/components/ui/card', () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => <div data-testid="card" className={className}>{children}</div>,
  CardContent: ({ children }: { children: React.ReactNode }) => <div data-testid="card-content">{children}</div>,
  CardDescription: ({ children, className }: { children: React.ReactNode; className?: string }) => <p data-testid="card-description" className={className}>{children}</p>,
  CardHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="card-header">{children}</div>,
  CardTitle: ({ children, className }: { children: React.ReactNode; className?: string }) => <h3 data-testid="card-title" className={className}>{children}</h3>,
}))

vi.mock('@/components/ui/badge', () => ({
  Badge: ({ children, variant }: { children: React.ReactNode; variant?: string }) => (
    <span data-testid="badge" data-variant={variant}>{children}</span>
  ),
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, variant, size, className }: { children: React.ReactNode; variant?: string; size?: string; className?: string }) => (
    <button data-testid="button" data-variant={variant} data-size={size} className={className}>{children}</button>
  ),
}))

vi.mock('@/components/ui/input', () => ({
  Input: ({ type, placeholder, className }: { type?: string; placeholder?: string; className?: string }) => (
    <input data-testid="input" type={type} placeholder={placeholder} className={className} />
  ),
}))

vi.mock('lucide-react', () => ({
  Globe: () => <svg data-testid="globe-icon" />,
  GitBranch: () => <svg data-testid="git-branch-icon" />,
  Clock: () => <svg data-testid="clock-icon" />,
  Search: () => <svg data-testid="search-icon" />,
  Plus: () => <svg data-testid="plus-icon" />,
}))

describe('ProjectsPage', () => {
  describe('Rendering', () => {
    it('should render within DashboardLayout', () => {
      render(<ProjectsPage />)
      expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument()
    })

    it('should render the page title', () => {
      render(<ProjectsPage />)
      expect(screen.getByText('Projects')).toBeInTheDocument()
    })

    it('should render the New Project button with Plus icon', () => {
      render(<ProjectsPage />)
      expect(screen.getByText('New Project')).toBeInTheDocument()
      expect(screen.getByTestId('plus-icon')).toBeInTheDocument()
    })

    it('should render the search input with placeholder', () => {
      render(<ProjectsPage />)
      const searchInput = screen.getByPlaceholderText('Search projects...')
      expect(searchInput).toBeInTheDocument()
      expect(searchInput).toHaveAttribute('type', 'search')
    })
  })

  describe('Projects List', () => {
    it('should render all 6 project cards', () => {
      render(<ProjectsPage />)
      const cards = screen.getAllByTestId('card')
      expect(cards).toHaveLength(6)
    })

    it('should display all project names', () => {
      render(<ProjectsPage />)
      expect(screen.getByText('acme-web')).toBeInTheDocument()
      expect(screen.getByText('dashboard-v2')).toBeInTheDocument()
      expect(screen.getByText('api-gateway')).toBeInTheDocument()
      expect(screen.getByText('mobile-app')).toBeInTheDocument()
      expect(screen.getByText('blog-platform')).toBeInTheDocument()
      expect(screen.getByText('e-commerce')).toBeInTheDocument()
    })

    it('should display project URLs', () => {
      render(<ProjectsPage />)
      expect(screen.getByText('acme-web.vercel.app')).toBeInTheDocument()
      expect(screen.getByText('dashboard.acme.com')).toBeInTheDocument()
      expect(screen.getByText('api.acme.com')).toBeInTheDocument()
    })

    it('should display project frameworks', () => {
      render(<ProjectsPage />)
      const nextjsFrameworks = screen.getAllByText('Next.js')
      expect(nextjsFrameworks.length).toBeGreaterThanOrEqual(4)
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('Node.js')).toBeInTheDocument()
    })

    it('should display project branches', () => {
      render(<ProjectsPage />)
      const mainBranches = screen.getAllByText('main')
      expect(mainBranches.length).toBe(4)
      expect(screen.getByText('dev')).toBeInTheDocument()
      expect(screen.getByText('staging')).toBeInTheDocument()
    })

    it('should display last deployed times', () => {
      render(<ProjectsPage />)
      expect(screen.getByText('2 minutes ago')).toBeInTheDocument()
      expect(screen.getByText('5 minutes ago')).toBeInTheDocument()
      expect(screen.getByText('12 minutes ago')).toBeInTheDocument()
      expect(screen.getByText('1 hour ago')).toBeInTheDocument()
      expect(screen.getByText('3 hours ago')).toBeInTheDocument()
      expect(screen.getByText('1 day ago')).toBeInTheDocument()
    })
  })

  describe('Badge Variants', () => {
    it('should render Ready status badges with default variant', () => {
      render(<ProjectsPage />)
      const badges = screen.getAllByTestId('badge')
      const readyBadges = badges.filter(badge => badge.textContent === 'Ready')
      expect(readyBadges).toHaveLength(4)
      readyBadges.forEach(badge => {
        expect(badge).toHaveAttribute('data-variant', 'default')
      })
    })

    it('should render Building status badge with secondary variant', () => {
      render(<ProjectsPage />)
      const badges = screen.getAllByTestId('badge')
      const buildingBadge = badges.find(badge => badge.textContent === 'Building')
      expect(buildingBadge).toHaveAttribute('data-variant', 'secondary')
    })

    it('should render Error status badge with destructive variant', () => {
      render(<ProjectsPage />)
      const badges = screen.getAllByTestId('badge')
      const errorBadge = badges.find(badge => badge.textContent === 'Error')
      expect(errorBadge).toHaveAttribute('data-variant', 'destructive')
    })
  })

  describe('Action Buttons', () => {
    it('should render Visit and Settings buttons for each project', () => {
      render(<ProjectsPage />)
      const visitButtons = screen.getAllByText('Visit')
      const settingsButtons = screen.getAllByText('Settings')
      expect(visitButtons).toHaveLength(6)
      expect(settingsButtons).toHaveLength(6)
    })
  })

  describe('Icons', () => {
    it('should render Globe icons for URLs', () => {
      render(<ProjectsPage />)
      const globeIcons = screen.getAllByTestId('globe-icon')
      expect(globeIcons).toHaveLength(6)
    })

    it('should render GitBranch icons', () => {
      render(<ProjectsPage />)
      const gitBranchIcons = screen.getAllByTestId('git-branch-icon')
      expect(gitBranchIcons).toHaveLength(6)
    })

    it('should render Clock icons', () => {
      render(<ProjectsPage />)
      const clockIcons = screen.getAllByTestId('clock-icon')
      expect(clockIcons).toHaveLength(6)
    })

    it('should render Search icon in search input area', () => {
      render(<ProjectsPage />)
      expect(screen.getByTestId('search-icon')).toBeInTheDocument()
    })
  })
})