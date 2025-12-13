import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Sidebar } from './sidebar'

// Mock next/navigation
const mockUsePathname = vi.fn()
vi.mock('next/navigation', () => ({
  usePathname: () => mockUsePathname(),
}))

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, className }: { children: React.ReactNode; href: string; className?: string }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}))

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  LayoutDashboard: ({ className }: { className?: string }) => <svg data-testid="icon-dashboard" className={className} />,
  FolderKanban: ({ className }: { className?: string }) => <svg data-testid="icon-projects" className={className} />,
  BarChart3: ({ className }: { className?: string }) => <svg data-testid="icon-analytics" className={className} />,
  Settings: ({ className }: { className?: string }) => <svg data-testid="icon-settings" className={className} />,
  ChevronRight: ({ className }: { className?: string }) => <svg data-testid="icon-chevron" className={className} />,
}))

describe('Sidebar', () => {
  beforeEach(() => {
    mockUsePathname.mockReset()
  })

  describe('Rendering', () => {
    it('should render the logo section with Dashboard link', () => {
      mockUsePathname.mockReturnValue('/')
      render(<Sidebar />)

      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      const logoLink = screen.getByRole('link', { name: /dashboard/i })
      expect(logoLink).toHaveAttribute('href', '/')
    })

    it('should render all navigation items', () => {
      mockUsePathname.mockReturnValue('/')
      render(<Sidebar />)

      expect(screen.getByText('Overview')).toBeInTheDocument()
      expect(screen.getByText('Projects')).toBeInTheDocument()
      expect(screen.getByText('Analytics')).toBeInTheDocument()
      expect(screen.getByText('Settings')).toBeInTheDocument()
    })

    it('should render user section with mock user data', () => {
      mockUsePathname.mockReturnValue('/')
      render(<Sidebar />)

      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.getByText('john@example.com')).toBeInTheDocument()
      expect(screen.getByText('JD')).toBeInTheDocument()
    })

    it('should render navigation icons', () => {
      mockUsePathname.mockReturnValue('/')
      render(<Sidebar />)

      expect(screen.getByTestId('icon-dashboard')).toBeInTheDocument()
      expect(screen.getByTestId('icon-projects')).toBeInTheDocument()
      expect(screen.getByTestId('icon-analytics')).toBeInTheDocument()
      expect(screen.getByTestId('icon-settings')).toBeInTheDocument()
    })
  })

  describe('Navigation Active State', () => {
    it('should highlight Overview when pathname is "/"', () => {
      mockUsePathname.mockReturnValue('/')
      render(<Sidebar />)

      const overviewLink = screen.getByRole('link', { name: /overview/i })
      expect(overviewLink).toHaveClass('bg-secondary')
      expect(overviewLink).toHaveClass('text-foreground')
    })

    it('should highlight Projects when pathname is "/projects"', () => {
      mockUsePathname.mockReturnValue('/projects')
      render(<Sidebar />)

      const projectsLink = screen.getByRole('link', { name: /projects/i })
      expect(projectsLink).toHaveClass('bg-secondary')
      expect(projectsLink).toHaveClass('text-foreground')

      // Ensure Overview is not active
      const overviewLink = screen.getByRole('link', { name: /overview/i })
      expect(overviewLink).toHaveClass('text-muted-foreground')
    })

    it('should highlight Settings when pathname is "/settings"', () => {
      mockUsePathname.mockReturnValue('/settings')
      render(<Sidebar />)

      const settingsLink = screen.getByRole('link', { name: /settings/i })
      expect(settingsLink).toHaveClass('bg-secondary')
      expect(settingsLink).toHaveClass('text-foreground')
    })

    it('should not highlight any nav item when pathname does not match', () => {
      mockUsePathname.mockReturnValue('/unknown-route')
      render(<Sidebar />)

      const overviewLink = screen.getByRole('link', { name: /overview/i })
      const projectsLink = screen.getByRole('link', { name: /projects/i })
      const analyticsLink = screen.getByRole('link', { name: /analytics/i })
      const settingsLink = screen.getByRole('link', { name: /settings/i })

      expect(overviewLink).toHaveClass('text-muted-foreground')
      expect(projectsLink).toHaveClass('text-muted-foreground')
      expect(analyticsLink).toHaveClass('text-muted-foreground')
      expect(settingsLink).toHaveClass('text-muted-foreground')
    })
  })

  describe('Navigation Links', () => {
    it('should have correct href attributes for all navigation items', () => {
      mockUsePathname.mockReturnValue('/')
      render(<Sidebar />)

      const links = screen.getAllByRole('link')
      const hrefs = links.map((link) => link.getAttribute('href'))

      expect(hrefs).toContain('/')
      expect(hrefs).toContain('/projects')
      expect(hrefs).toContain('/analytics')
      expect(hrefs).toContain('/settings')
    })
  })
})
