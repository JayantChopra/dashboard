import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import Home from './page'

// Mock the components
vi.mock('@/components/dashboard-layout', () => ({
  DashboardLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-layout">{children}</div>
  ),
}))

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

vi.mock('lucide-react', () => ({
  ArrowUpRight: () => <span data-testid="arrow-up-icon" />,
  ArrowDownRight: () => <span data-testid="arrow-down-icon" />,
  Activity: () => <span data-testid="activity-icon" />,
  Users: () => <span data-testid="users-icon" />,
  CreditCard: () => <span data-testid="credit-card-icon" />,
  DollarSign: () => <span data-testid="dollar-sign-icon" />,
}))

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render the page within DashboardLayout', () => {
      render(<Home />)
      expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument()
    })

    it('should render the Overview heading', () => {
      render(<Home />)
      expect(screen.getByText('Overview')).toBeInTheDocument()
      expect(screen.getByText('Overview').tagName).toBe('H2')
    })
  })

  describe('Stats Grid', () => {
    it('should render all four stat cards with correct values', () => {
      render(<Home />)
      
      // Check all stat titles
      expect(screen.getByText('Total Revenue')).toBeInTheDocument()
      expect(screen.getByText('Subscriptions')).toBeInTheDocument()
      expect(screen.getByText('Sales')).toBeInTheDocument()
      expect(screen.getByText('Active Now')).toBeInTheDocument()
      
      // Check values
      expect(screen.getByText('$45,231.89')).toBeInTheDocument()
      expect(screen.getByText('+2,350')).toBeInTheDocument()
      expect(screen.getByText('+12,234')).toBeInTheDocument()
      expect(screen.getByText('+573')).toBeInTheDocument()
    })

    it('should render change percentages with correct formatting', () => {
      render(<Home />)
      
      expect(screen.getByText('+20.1%')).toBeInTheDocument()
      expect(screen.getByText('+180.1%')).toBeInTheDocument()
      expect(screen.getByText('+19%')).toBeInTheDocument()
      expect(screen.getByText('+201')).toBeInTheDocument()
    })

    it('should render up trend icons for all stats', () => {
      render(<Home />)
      
      // All stats have "up" trend, so we should see ArrowUpRight icons
      const upIcons = screen.getAllByTestId('arrow-up-icon')
      expect(upIcons.length).toBe(4)
    })

    it('should render "from last month" text for all stats', () => {
      render(<Home />)
      
      const fromLastMonthTexts = screen.getAllByText(/from last month/)
      expect(fromLastMonthTexts.length).toBe(4)
    })
  })

  describe('Recent Deployments', () => {
    it('should render Recent Deployments section with correct heading', () => {
      render(<Home />)
      
      expect(screen.getByText('Recent Deployments')).toBeInTheDocument()
      expect(screen.getByText('Latest deployment activity across your projects')).toBeInTheDocument()
    })

    it('should render all four deployments with project names', () => {
      render(<Home />)
      
      expect(screen.getByText('acme-web')).toBeInTheDocument()
      expect(screen.getByText('dashboard-v2')).toBeInTheDocument()
      expect(screen.getByText('api-gateway')).toBeInTheDocument()
      expect(screen.getByText('mobile-app')).toBeInTheDocument()
    })

    it('should render commit messages for each deployment', () => {
      render(<Home />)
      
      expect(screen.getByText('Update landing page')).toBeInTheDocument()
      expect(screen.getByText('Add new charts')).toBeInTheDocument()
      expect(screen.getByText('Fix authentication')).toBeInTheDocument()
      expect(screen.getByText('Update dependencies')).toBeInTheDocument()
    })

    it('should render deployment timestamps', () => {
      render(<Home />)
      
      expect(screen.getByText('2m ago')).toBeInTheDocument()
      expect(screen.getByText('5m ago')).toBeInTheDocument()
      expect(screen.getByText('12m ago')).toBeInTheDocument()
      expect(screen.getByText('1h ago')).toBeInTheDocument()
    })

    it('should render badges with correct variants based on status', () => {
      render(<Home />)
      
      const badges = screen.getAllByTestId('badge')
      
      // Find badges by their content and check variants
      const readyBadges = badges.filter(badge => badge.textContent === 'Ready')
      const buildingBadges = badges.filter(badge => badge.textContent === 'Building')
      const errorBadges = badges.filter(badge => badge.textContent === 'Error')
      
      expect(readyBadges.length).toBe(2)
      readyBadges.forEach(badge => {
        expect(badge).toHaveAttribute('data-variant', 'default')
      })
      
      expect(buildingBadges.length).toBe(1)
      buildingBadges.forEach(badge => {
        expect(badge).toHaveAttribute('data-variant', 'secondary')
      })
      
      expect(errorBadges.length).toBe(1)
      errorBadges.forEach(badge => {
        expect(badge).toHaveAttribute('data-variant', 'destructive')
      })
    })
  })

  describe('Quick Actions', () => {
    it('should render Quick Actions section with correct heading', () => {
      render(<Home />)
      
      expect(screen.getByText('Quick Actions')).toBeInTheDocument()
      expect(screen.getByText('Commonly used actions and shortcuts')).toBeInTheDocument()
    })

    it('should render three quick action buttons', () => {
      render(<Home />)
      
      expect(screen.getByText('New Project')).toBeInTheDocument()
      expect(screen.getByText('View Analytics')).toBeInTheDocument()
      expect(screen.getByText('Team Settings')).toBeInTheDocument()
    })

    it('should render quick action descriptions', () => {
      render(<Home />)
      
      expect(screen.getByText('Deploy a new project from Git')).toBeInTheDocument()
      expect(screen.getByText('Check your site performance')).toBeInTheDocument()
      expect(screen.getByText('Manage team members and permissions')).toBeInTheDocument()
    })

    it('should render quick action buttons as button elements', () => {
      render(<Home />)
      
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBe(3)
    })
  })

  describe('Layout and Structure', () => {
    it('should render multiple cards', () => {
      render(<Home />)
      
      const cards = screen.getAllByTestId('card')
      // 4 stat cards + 1 deployments card + 1 quick actions card = 6
      expect(cards.length).toBe(6)
    })

    it('should render card headers and contents', () => {
      render(<Home />)
      
      const headers = screen.getAllByTestId('card-header')
      const contents = screen.getAllByTestId('card-content')
      
      expect(headers.length).toBeGreaterThan(0)
      expect(contents.length).toBeGreaterThan(0)
    })
  })
})
