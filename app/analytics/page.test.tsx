import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import AnalyticsPage from './page'

// Mock recharts to avoid canvas/SVG rendering issues in tests
vi.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="responsive-container">{children}</div>
  ),
  AreaChart: ({ children, data }: { children: React.ReactNode; data: unknown[] }) => (
    <div data-testid="area-chart" data-items={data.length}>{children}</div>
  ),
  BarChart: ({ children, data }: { children: React.ReactNode; data: unknown[] }) => (
    <div data-testid="bar-chart" data-items={data.length}>{children}</div>
  ),
  LineChart: ({ children, data }: { children: React.ReactNode; data: unknown[] }) => (
    <div data-testid="line-chart" data-items={data.length}>{children}</div>
  ),
  Area: () => <div data-testid="area" />,
  Bar: () => <div data-testid="bar" />,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
}))

// Mock DashboardLayout
vi.mock('@/components/dashboard-layout', () => ({
  DashboardLayout: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dashboard-layout">{children}</div>
  ),
}))

// Mock Card components
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

describe('AnalyticsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Rendering', () => {
    it('should render the page within DashboardLayout', () => {
      render(<AnalyticsPage />)
      expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument()
    })

    it('should render the Analytics heading', () => {
      render(<AnalyticsPage />)
      expect(screen.getByRole('heading', { name: /analytics/i })).toBeInTheDocument()
    })

    it('should render all stat cards', () => {
      render(<AnalyticsPage />)
      const cards = screen.getAllByTestId('card')
      // 4 stat cards + 3 chart cards = 7 total
      expect(cards.length).toBe(7)
    })
  })

  describe('Stats Cards', () => {
    it('should display Total Visitors stat', () => {
      render(<AnalyticsPage />)
      expect(screen.getByText('Total Visitors')).toBeInTheDocument()
      expect(screen.getByText('34,500')).toBeInTheDocument()
      expect(screen.getByText('+12.5% from last month')).toBeInTheDocument()
    })

    it('should display Page Views stat', () => {
      render(<AnalyticsPage />)
      expect(screen.getByText('Page Views')).toBeInTheDocument()
      expect(screen.getByText('124,206')).toBeInTheDocument()
      expect(screen.getByText('+8.2% from last month')).toBeInTheDocument()
    })

    it('should display Bounce Rate stat', () => {
      render(<AnalyticsPage />)
      expect(screen.getByText('Bounce Rate')).toBeInTheDocument()
      expect(screen.getByText('42.3%')).toBeInTheDocument()
      expect(screen.getByText('-2.1% from last month')).toBeInTheDocument()
    })

    it('should display Avg. Session stat', () => {
      render(<AnalyticsPage />)
      expect(screen.getByText('Avg. Session')).toBeInTheDocument()
      expect(screen.getByText('3m 24s')).toBeInTheDocument()
      expect(screen.getByText('+0.3m from last month')).toBeInTheDocument()
    })
  })

  describe('Charts', () => {
    it('should render Visitors Overview AreaChart with correct data', () => {
      render(<AnalyticsPage />)
      expect(screen.getByText('Visitors Overview')).toBeInTheDocument()
      expect(screen.getByText('Monthly visitor trends for the current year')).toBeInTheDocument()
      
      const areaChart = screen.getByTestId('area-chart')
      expect(areaChart).toBeInTheDocument()
      expect(areaChart).toHaveAttribute('data-items', '7')
    })

    it('should render Weekly Page Views BarChart with correct data', () => {
      render(<AnalyticsPage />)
      expect(screen.getByText('Weekly Page Views')).toBeInTheDocument()
      expect(screen.getByText('Page views for the last 7 days')).toBeInTheDocument()
      
      const barChart = screen.getByTestId('bar-chart')
      expect(barChart).toBeInTheDocument()
      expect(barChart).toHaveAttribute('data-items', '7')
    })

    it('should render Revenue Trends LineChart with correct data', () => {
      render(<AnalyticsPage />)
      expect(screen.getByText('Revenue Trends')).toBeInTheDocument()
      expect(screen.getByText('Monthly revenue for the current year')).toBeInTheDocument()
      
      const lineChart = screen.getByTestId('line-chart')
      expect(lineChart).toBeInTheDocument()
      expect(lineChart).toHaveAttribute('data-items', '6')
    })
  })

  describe('Accessibility', () => {
    it('should have proper heading hierarchy', () => {
      render(<AnalyticsPage />)
      const mainHeading = screen.getByRole('heading', { level: 2, name: /analytics/i })
      expect(mainHeading).toBeInTheDocument()
      expect(mainHeading).toHaveClass('text-3xl', 'font-bold')
    })

    it('should render all card titles as h3 elements', () => {
      render(<AnalyticsPage />)
      const cardTitles = screen.getAllByTestId('card-title')
      expect(cardTitles.length).toBe(7)
    })
  })
})
