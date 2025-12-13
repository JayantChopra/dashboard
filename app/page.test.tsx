import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import Home from './page'

// Mock DashboardLayout
vi.mock('@/components/dashboard-layout', () => ({
  DashboardLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-layout">{children}</div>
  ),
}))

// Mock UI components
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
  ArrowUpRight: ({ className }: { className?: string }) => (
    <svg data-testid="arrow-up-right" className={className} />
  ),
  ArrowDownRight: ({ className }: { className?: string }) => (
    <svg data-testid="arrow-down-right" className={className} />
  ),
  Activity: ({ className }: { className?: string }) => (
    <svg data-testid="activity-icon" className={className} />
  ),
  Users: ({ className }: { className?: string }) => (
    <svg data-testid="users-icon" className={className} />
  ),
  CreditCard: ({ className }: { className?: string }) => (
    <svg data-testid="credit-card-icon" className={className} />
  ),
  DollarSign: ({ className }: { className?: string }) => (
    <svg data-testid="dollar-sign-icon" className={className} />
  ),
}))

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('should render within DashboardLayout', () => {
      render(<Home />)
      expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument()
    })

    it('should render the Overview heading', () => {
      render(<Home />)
      expect(screen.getByRole('heading', { name: /overview/i })).toBeInTheDocument()
    })

    it('should render the overview heading with correct styling class', () => {
      render(<Home />)
      const heading = screen.getByRole('heading', { name: /overview/i })
      expect(heading).toHaveClass('text-3xl', 'font-bold', 'tracking-tight')
    })
  })

  describe('Stats Grid', () => {
    it('should render all 4 stat cards', () => {
      render(<Home />)
      const cards = screen.getAllByTestId('card')
      // 4 stats cards + 2 deployment section cards = 6 total
      expect(cards.length).toBeGreaterThanOrEqual(4)
    })

    it('should render Total Revenue stat with correct value', () => {
      render(<Home />)
      expect(screen.getByText('Total Revenue')).toBeInTheDocument()
      expect(screen.getByText('$45,231.89')).toBeInTheDocument()
      expect(screen.getByText('+20.1%')).toBeInTheDocument()
    })

    it('should render Subscriptions stat with correct value', () => {
      render(<Home />)
      expect(screen.getByText('Subscriptions')).toBeInTheDocument()
      expect(screen.getByText('+2,350')).toBeInTheDocument()
      expect(screen.getByText('+180.1%')).toBeInTheDocument()
    })

    it('should render Sales stat with correct value', () => {
      render(<Home />)
      expect(screen.getByText('Sales')).toBeInTheDocument()
      expect(screen.getByText('+12,234')).toBeInTheDocument()
      expect(screen.getByText('+19%')).toBeInTheDocument()
    })

    it('should render Active Now stat with correct value', () => {
      render(<Home />)
      expect(screen.getByText('Active Now')).toBeInTheDocument()
      expect(screen.getByText('+573')).toBeInTheDocument()
      expect(screen.getByText('+201')).toBeInTheDocument()
    })

    it('should display up trend icons for all stats', () => {
      render(<Home />)
      const upArrows = screen.getAllByTestId('arrow-up-right')
      expect(upArrows.length).toBe(4)
    })
  })

  describe('Recent Deployments', () => {
    it('should render Recent Deployments card title', () => {
      render(<Home />)
      expect(screen.getByText('Recent Deployments')).toBeInTheDocument()
    })

    it('should render deployment description', () => {
      render(<Home />)
      expect(screen.getByText('Latest deployment activity across your projects')).toBeInTheDocument()
    })

    it('should render all deployment projects', () => {
      render(<Home />)
      expect(screen.getByText('acme-web')).toBeInTheDocument()
      expect(screen.getByText('dashboard-v2')).toBeInTheDocument()
      expect(screen.getByText('api-gateway')).toBeInTheDocument()
      expect(screen.getByText('mobile-app')).toBeInTheDocument()
    })

    it('should render deployment commit messages', () => {
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

    it('should render badges with correct variants for statuses', () => {
      render(<Home />)
      const badges = screen.getAllByTestId('badge')
      
      // Find badges by their content
      const readyBadges = badges.filter(badge => badge.textContent === 'Ready')
      const buildingBadge = badges.find(badge => badge.textContent === 'Building')
      const errorBadge = badges.find(badge => badge.textContent === 'Error')
      
      expect(readyBadges.length).toBe(2)
      expect(readyBadges[0]).toHaveAttribute('data-variant', 'default')
      expect(buildingBadge).toHaveAttribute('data-variant', 'secondary')
      expect(errorBadge).toHaveAttribute('data-variant', 'destructive')
    })
  })

  describe('Quick Actions', () => {
    it('should render Quick Actions card title', () => {
      render(<Home />)
      expect(screen.getByText('Quick Actions')).toBeInTheDocument()
    })

    it('should render quick action description', () => {
      render(<Home />)
      expect(screen.getByText('Commonly used actions and shortcuts')).toBeInTheDocument()
    })

    it('should render all 3 quick action buttons', () => {
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

    it('should render quick action buttons with correct styling', () => {
      render(<Home />)
      const buttons = screen.getAllByRole('button')
      expect(buttons.length).toBe(3)
      buttons.forEach(button => {
        expect(button).toHaveClass('w-full')
      })
    })
  })

  describe('Edge Cases', () => {
    it('should render from last month text for all stats', () => {
      render(<Home />)
      const fromLastMonthTexts = screen.getAllByText(/from last month/i)
      expect(fromLastMonthTexts.length).toBe(4)
    })

    it('should render correct icon components in quick actions', () => {
      render(<Home />)
      // Activity icon appears twice (once in stats, once in View Analytics)
      expect(screen.getAllByTestId('activity-icon').length).toBeGreaterThanOrEqual(1)
      // Users icon appears twice (once in stats, once in Team Settings)
      expect(screen.getAllByTestId('users-icon').length).toBeGreaterThanOrEqual(1)
    })
  })
})