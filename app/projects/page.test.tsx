import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectsPage from './page'

// Mock the dependencies
vi.mock('@/components/dashboard-layout', () => ({
  DashboardLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-layout">{children}</div>
  ),
}))

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

    it('should render all 6 project cards', () => {
      render(<ProjectsPage />)
      const cards = screen.getAllByTestId('card')
      expect(cards).toHaveLength(6)
    })
  })

  describe('Project Data Display', () => {
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

    it('should display project statuses with correct badge variants', () => {
      render(<ProjectsPage />)
      const badges = screen.getAllByTestId('badge')
      
      // Find badges by their content and check variants
      const readyBadges = badges.filter(badge => badge.textContent === 'Ready')
      const buildingBadges = badges.filter(badge => badge.textContent === 'Building')
      const errorBadges = badges.filter(badge => badge.textContent === 'Error')
      
      expect(readyBadges).toHaveLength(4)
      expect(buildingBadges).toHaveLength(1)
      expect(errorBadges).toHaveLength(1)
      
      readyBadges.forEach(badge => {
        expect(badge).toHaveAttribute('data-variant', 'default')
      })
      buildingBadges.forEach(badge => {
        expect(badge).toHaveAttribute('data-variant', 'secondary')
      })
      errorBadges.forEach(badge => {
        expect(badge).toHaveAttribute('data-variant', 'destructive')
      })
    })
  })

  describe('UI Elements', () => {
    it('should render the New Project button with Plus icon', () => {
      render(<ProjectsPage />)
      expect(screen.getByText('New Project')).toBeInTheDocument()
      expect(screen.getByTestId('plus-icon')).toBeInTheDocument()
    })

    it('should render the search input with placeholder', () => {
      render(<ProjectsPage />)
      const searchInput = screen.getByTestId('input')
      expect(searchInput).toHaveAttribute('placeholder', 'Search projects...')
      expect(searchInput).toHaveAttribute('type', 'search')
    })
  })

  describe('Project Card Details', () => {
    it('should display framework information for each project', () => {
      render(<ProjectsPage />)
      expect(screen.getAllByText('Next.js')).toHaveLength(4)
      expect(screen.getByText('React')).toBeInTheDocument()
      expect(screen.getByText('Node.js')).toBeInTheDocument()
    })

    it('should display branch information for each project', () => {
      render(<ProjectsPage />)
      expect(screen.getAllByText('main')).toHaveLength(4)
      expect(screen.getByText('dev')).toBeInTheDocument()
      expect(screen.getByText('staging')).toBeInTheDocument()
    })
  })
})