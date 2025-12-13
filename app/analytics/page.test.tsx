import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import AnalyticsPage from './page'

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
  CardContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card-content" className={className}>{children}</div>
  ),
  CardDescription: ({ children }: { children: React.ReactNode }) => (
    <p data-testid="card-description">{children}</p>
  ),
  CardHeader: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card-header" className={className}>{children}</div>
  ),
  CardTitle: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <h3 data-testid="card-title" className={className}>{children}</h3>
  ),
}))

// Mock Recharts components
vi.mock('recharts', () => ({
  BarChart: ({ children, data }: { children: React.ReactNode; data: unknown[] }) => (
    <div data-testid="bar-chart" data-length={data.length}>{children}</div>
  ),
  Bar: () => <div data-testid="bar" />,
  LineChart: ({ children, data }: { children: React.ReactNode; data: unknown[] }) => (
    <div data-testid="line-chart" data-length={data.length}>{children}</div>
  ),
  Line: () => <div data-testid="line" />,
  AreaChart: ({ children, data }: { children: React.ReactNode; data: unknown[] }) => (
    <div data-testid="area-chart" data-length={data.length}>{children}</div>
  ),
  Area: () => <div data-testid="area" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
}))

describe('AnalyticsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render within DashboardLayout', () => {
      render(<AnalyticsPage />)
      expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument()
    })

    it('should render the page heading', () => {
      render(<AnalyticsPage />)
      expect(screen.getByText('Analytics')).toBeInTheDocument()
    })

    it('should render with correct heading styles', () => {
      render(<AnalyticsPage />)
      const heading = screen.getByText('Analytics')
      expect(heading.tagName).toBe('H2')
      expect(heading).toHaveClass('text-3xl', 'font-bold', 'tracking-tight')
    })
  })

  describe('Stats Cards', () => {
    it('should render all four stat cards', () => {
      render(<AnalyticsPage />)
      expect(screen.getByText('Total Visitors')).toBeInTheDocument()
      expect(screen.getByText('Page Views')).toBeInTheDocument()
      expect(screen.getByText('Bounce Rate')).toBeInTheDocument()
      expect(screen.getByText('Avg. Session')).toBeInTheDocument()
    })

    it('should display correct stat values', () => {
      render(<AnalyticsPage />)
      expect(screen.getByText('34,500')).toBeInTheDocument()
      expect(screen.getByText('124,206')).toBeInTheDocument()
      expect(screen.getByText('42.3%')).toBeInTheDocument()
      expect(screen.getByText('3m 24s')).toBeInTheDocument()
    })

    it('should display percentage change indicators', () => {
      render(<AnalyticsPage />)
      expect(screen.getByText('+12.5% from last month')).toBeInTheDocument()
      expect(screen.getByText('+8.2% from last month')).toBeInTheDocument()
      expect(screen.getByText('-2.1% from last month')).toBeInTheDocument()
      expect(screen.getByText('+0.3m from last month')).toBeInTheDocument()
    })
  })

  describe('Charts', () => {
    it('should render Visitors Overview AreaChart with correct data length', () => {
      render(<AnalyticsPage />)
      expect(screen.getByText('Visitors Overview')).toBeInTheDocument()
      expect(screen.getByText('Monthly visitor trends for the current year')).toBeInTheDocument()
      const areaChart = screen.getByTestId('area-chart')
      expect(areaChart).toBeInTheDocument()
      expect(areaChart).toHaveAttribute('data-length', '7')
    })

    it('should render Weekly Page Views BarChart with correct data length', () => {
      render(<AnalyticsPage />)
      expect(screen.getByText('Weekly Page Views')).toBeInTheDocument()
      expect(screen.getByText('Page views for the last 7 days')).toBeInTheDocument()
      const barChart = screen.getByTestId('bar-chart')
      expect(barChart).toBeInTheDocument()
      expect(barChart).toHaveAttribute('data-length', '7')
    })

    it('should render Revenue Trends LineChart with correct data length', () => {
      render(<AnalyticsPage />)
      expect(screen.getByText('Revenue Trends')).toBeInTheDocument()
      expect(screen.getByText('Monthly revenue for the current year')).toBeInTheDocument()
      const lineChart = screen.getByTestId('line-chart')
      expect(lineChart).toBeInTheDocument()
      expect(lineChart).toHaveAttribute('data-length', '6')
    })
  })

  describe('Responsive Containers', () => {
    it('should wrap all charts in ResponsiveContainer', () => {
      render(<AnalyticsPage />)
      const responsiveContainers = screen.getAllByTestId('responsive-container')
      expect(responsiveContainers).toHaveLength(3)
    })
  })

  describe('Card Structure', () => {
    it('should render correct number of cards', () => {
      render(<AnalyticsPage />)
      const cards = screen.getAllByTestId('card')
      // 4 stat cards + 2 chart cards in grid + 1 revenue chart card = 7 total
      expect(cards).toHaveLength(7)
    })

    it('should render chart cards with correct grid classes', () => {
      render(<AnalyticsPage />)
      const cards = screen.getAllByTestId('card')
      const visitorsCard = cards.find(card => card.className?.includes('col-span-4'))
      const pageViewsCard = cards.find(card => card.className?.includes('col-span-3'))
      expect(visitorsCard).toBeInTheDocument()
      expect(pageViewsCard).toBeInTheDocument()
    })
  })
})
