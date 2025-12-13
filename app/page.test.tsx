import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './page'

// Mock the DashboardLayout component
vi.mock('@/components/dashboard-layout', () => ({
  DashboardLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-layout">{children}</div>
  ),
}))

// Mock the UI components
vi.mock('@/components/ui/card', () => ({
  Card: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card" className={className}>{children}</div>
  ),
  CardHeader: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card-header" className={className}>{children}</div>
  ),
  CardTitle: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <h3 data-testid="card-title" className={className}>{children}</h3>
  ),
  CardDescription: ({ children }: { children: React.ReactNode }) => (
    <p data-testid="card-description">{children}</p>
  ),
  CardContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card-content" className={className}>{children}</div>
  ),
}))

vi.mock('@/components/ui/badge', () => ({
  Badge: ({ children, variant }: { children: React.ReactNode; variant?: string }) => (
    <span data-testid="badge" data-variant={variant}>{children}</span>
  ),
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ArrowUpRight: () => <span data-testid="arrow-up-right" />,
  ArrowDownRight: () => <span data-testid="arrow-down-right" />,
  Activity: () => <span data-testid="activity-icon" />,
  Users: () => <span data-testid="users-icon" />,
  CreditCard: () => <span data-testid="credit-card-icon" />,
  DollarSign: () => <span data-testid="dollar-sign-icon" />,
}))

describe('Home Page', () => {
  describe('Component Rendering', () => {
    it('should render within DashboardLayout', () => {
      render(<Home />)
      expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument()
    })

    it('should render the Overview heading', () => {
      render(<Home />)
      expect(screen.getByText('Overview')).toBeInTheDocument()
    })
  })

  describe('Stats Cards', () => {
    it('should render all four stat cards', () => {
      render(<Home />)
      expect(screen.getByText('Total Revenue')).toBeInTheDocument()
      expect(screen.getByText('Subscriptions')).toBeInTheDocument()
      expect(screen.getByText('Sales')).toBeInTheDocument()
      expect(screen.getByText('Active Now')).toBeInTheDocument()
    })

    it('should display correct stat values', () => {
      render(<Home />)
      expect(screen.getByText('$45,231.89')).toBeInTheDocument()
      expect(screen.getByText('+2,350')).toBeInTheDocument()
      expect(screen.getByText('+12,234')).toBeInTheDocument()
      expect(screen.getByText('+573')).toBeInTheDocument()
    })

    it('should display change percentages', () => {
      render(<Home />)
      expect(screen.getByText('+20.1%')).toBeInTheDocument()
      expect(screen.getByText('+180.1%')).toBeInTheDocument()
      expect(screen.getByText('+19%')).toBeInTheDocument()
      expect(screen.getByText('+201')).toBeInTheDocument()
    })

    it('should show "from last month" text for all stats', () => {
      render(<Home />)
      const fromLastMonthTexts = screen.getAllByText(/from last month/i)
      expect(fromLastMonthTexts).toHaveLength(4)
    })
  })

  describe('Recent Deployments', () => {
    it('should render Recent Deployments section', () => {
      render(<Home />)
      expect(screen.getByText('Recent Deployments')).toBeInTheDocument()
      expect(screen.getByText('Latest deployment activity across your projects')).toBeInTheDocument()
    })

    it('should render all deployment projects', () => {
      render(<Home />)
      expect(screen.getByText('acme-web')).toBeInTheDocument()
      expect(screen.getByText('dashboard-v2')).toBeInTheDocument()
      expect(screen.getByText('api-gateway')).toBeInTheDocument()
      expect(screen.getByText('mobile-app')).toBeInTheDocument()
    })

    it('should render deployment statuses with correct badge variants', () => {
      render(<Home />)
      const badges = screen.getAllByTestId('badge')
      
      // Find badges by their content
      const readyBadges = badges.filter(badge => badge.textContent === 'Ready')
      const buildingBadge = badges.find(badge => badge.textContent === 'Building')
      const errorBadge = badges.find(badge => badge.textContent === 'Error')

      expect(readyBadges).toHaveLength(2)
      expect(buildingBadge).toHaveAttribute('data-variant', 'secondary')
      expect(errorBadge).toHaveAttribute('data-variant', 'destructive')
    })
  })

  describe('Quick Actions', () => {
    it('should render Quick Actions section', () => {
      render(<Home />)
      expect(screen.getByText('Quick Actions')).toBeInTheDocument()
      expect(screen.getByText('Commonly used actions and shortcuts')).toBeInTheDocument()
    })

    it('should render all quick action buttons', () => {
      render(<Home />)
      expect(screen.getByText('New Project')).toBeInTheDocument()
      expect(screen.getByText('View Analytics')).toBeInTheDocument()
      expect(screen.getByText('Team Settings')).toBeInTheDocument()
      
      // Check descriptions
      expect(screen.getByText('Deploy a new project from Git')).toBeInTheDocument()
      expect(screen.getByText('Check your site performance')).toBeInTheDocument()
      expect(screen.getByText('Manage team members and permissions')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should render correct number of cards (4 stats + 2 content cards)', () => {
      render(<Home />)
      const cards = screen.getAllByTestId('card')
      expect(cards.length).toBe(6)
    })
  })
})