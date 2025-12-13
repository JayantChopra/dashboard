import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectsPage from './page'

// Mock the DashboardLayout component
vi.mock('@/components/dashboard-layout', () => ({
  DashboardLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-layout">{children}</div>
  ),
}))

// Mock shadcn/ui components
vi.mock('@/components/ui/card', () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card" className={className}>{children}</div>
  ),
  CardContent: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-content">{children}</div>
  ),
  CardDescription: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <p data-testid="card-description" className={className}>{children}</p>
  ),
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-header">{children}</div>
  ),
  CardTitle: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <h3 data-testid="card-title" className={className}>{children}</h3>
  ),
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

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  Globe: () => <span data-testid="icon-globe" />,
  GitBranch: () => <span data-testid="icon-git-branch" />,
  Clock: () => <span data-testid="icon-clock" />,
  Search: () => <span data-testid="icon-search" />,
  Plus: () => <span data-testid="icon-plus" />,
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
  })

  describe('Project Cards', () => {
    it('should render all 6 project cards', () => {
      render(<ProjectsPage />)
      const cards = screen.getAllByTestId('card')
      expect(cards).toHaveLength(6)
    })

    it('should display project names correctly', () => {
      render(<ProjectsPage />)
      const projectNames = ['acme-web', 'dashboard-v2', 'api-gateway', 'mobile-app', 'blog-platform', 'e-commerce']
      projectNames.forEach((name) => {
        expect(screen.getByText(name)).toBeInTheDocument()
      })
    })

    it('should display project URLs', () => {
      render(<ProjectsPage />)
      expect(screen.getByText('acme-web.vercel.app')).toBeInTheDocument()
      expect(screen.getByText('dashboard.acme.com')).toBeInTheDocument()
      expect(screen.getByText('api.acme.com')).toBeInTheDocument()
    })

    it('should display framework information', () => {
      render(<ProjectsPage />)
      const nextjsElements = screen.getAllByText('Next.js')
      expect(nextjsElements.length).toBeGreaterThan(0)
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('Node.js')).toBeInTheDocument()
    })

    it('should display branch information', () => {
      render(<ProjectsPage />)
      const mainBranches = screen.getAllByText('main')
      expect(mainBranches.length).toBe(4)
      expect(screen.getByText('dev')).toBeInTheDocument()
      expect(screen.getByText('staging')).toBeInTheDocument()
    })
  })

  describe('Status Badges', () => {
    it('should render badges with correct variants based on status', () => {
      render(<ProjectsPage />)
      const badges = screen.getAllByTestId('badge')
      
      // Check that we have badges for all projects
      expect(badges).toHaveLength(6)
      
      // Count badge variants
      const defaultBadges = badges.filter((badge) => badge.getAttribute('data-variant') === 'default')
      const secondaryBadges = badges.filter((badge) => badge.getAttribute('data-variant') === 'secondary')
      const destructiveBadges = badges.filter((badge) => badge.getAttribute('data-variant') === 'destructive')
      
      // 4 Ready (default), 1 Building (secondary), 1 Error (destructive)
      expect(defaultBadges).toHaveLength(4)
      expect(secondaryBadges).toHaveLength(1)
      expect(destructiveBadges).toHaveLength(1)
    })

    it('should display correct status text', () => {
      render(<ProjectsPage />)
      const readyBadges = screen.getAllByText('Ready')
      expect(readyBadges).toHaveLength(4)
      expect(screen.getByText('Building')).toBeInTheDocument()
      expect(screen.getByText('Error')).toBeInTheDocument()
    })
  })

  describe('UI Elements', () => {
    it('should render the search input with correct placeholder', () => {
      render(<ProjectsPage />)
      const searchInput = screen.getByTestId('input')
      expect(searchInput).toHaveAttribute('placeholder', 'Search projects...')
      expect(searchInput).toHaveAttribute('type', 'search')
    })

    it('should render the New Project button', () => {
      render(<ProjectsPage />)
      expect(screen.getByText('New Project')).toBeInTheDocument()
      expect(screen.getByTestId('icon-plus')).toBeInTheDocument()
    })

    it('should render Visit and Settings buttons for each project card', () => {
      render(<ProjectsPage />)
      const visitButtons = screen.getAllByText('Visit')
      const settingsButtons = screen.getAllByText('Settings')
      
      expect(visitButtons).toHaveLength(6)
      expect(settingsButtons).toHaveLength(6)
    })

    it('should render icons in the component', () => {
      render(<ProjectsPage />)
      expect(screen.getByTestId('icon-search')).toBeInTheDocument()
      expect(screen.getByTestId('icon-plus')).toBeInTheDocument()
      expect(screen.getAllByTestId('icon-globe')).toHaveLength(6)
      expect(screen.getAllByTestId('icon-git-branch')).toHaveLength(6)
      expect(screen.getAllByTestId('icon-clock')).toHaveLength(6)
    })
  })

  describe('Last Deployed Information', () => {
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
})