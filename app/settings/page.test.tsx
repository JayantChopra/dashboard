import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SettingsPage from './page'

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
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-header">{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <h3 data-testid="card-title">{children}</h3>
  ),
  CardDescription: ({ children }: { children: React.ReactNode }) => (
    <p data-testid="card-description">{children}</p>
  ),
  CardContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card-content" className={className}>{children}</div>
  ),
}))

vi.mock('@/components/ui/input', () => ({
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input data-testid={`input-${props.id}`} {...props} />
  ),
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, variant, ...props }: { children: React.ReactNode; variant?: string }) => (
    <button data-testid={variant === 'destructive' ? 'destructive-button' : 'button'} {...props}>
      {children}
    </button>
  ),
}))

vi.mock('@/components/ui/label', () => ({
  Label: ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => (
    <label htmlFor={htmlFor}>{children}</label>
  ),
}))

describe('SettingsPage', () => {
  describe('Rendering', () => {
    it('should render the settings page', () => {
      render(<SettingsPage />)
      expect(screen.getByText('Settings')).toBeInTheDocument()
    })

    it('should render within DashboardLayout', () => {
      render(<SettingsPage />)
      expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument()
    })

    it('should render all three cards', () => {
      render(<SettingsPage />)
      const cards = screen.getAllByTestId('card')
      expect(cards).toHaveLength(3)
    })
  })

  describe('Profile Section', () => {
    it('should render Profile card with correct title', () => {
      render(<SettingsPage />)
      expect(screen.getByText('Profile')).toBeInTheDocument()
    })

    it('should render Profile card with description', () => {
      render(<SettingsPage />)
      expect(screen.getByText('Manage your account settings and preferences')).toBeInTheDocument()
    })

    it('should render name, email, and bio input fields', () => {
      render(<SettingsPage />)
      expect(screen.getByTestId('input-name')).toBeInTheDocument()
      expect(screen.getByTestId('input-email')).toBeInTheDocument()
      expect(screen.getByTestId('input-bio')).toBeInTheDocument()
    })

    it('should have correct default values for name and email', () => {
      render(<SettingsPage />)
      expect(screen.getByTestId('input-name')).toHaveValue('John Doe')
      expect(screen.getByTestId('input-email')).toHaveValue('john@example.com')
    })

    it('should render Save Changes button', () => {
      render(<SettingsPage />)
      expect(screen.getByText('Save Changes')).toBeInTheDocument()
    })
  })

  describe('Team Section', () => {
    it('should render Team card with correct title and description', () => {
      render(<SettingsPage />)
      expect(screen.getByText('Team')).toBeInTheDocument()
      expect(screen.getByText('Manage your team members and their roles')).toBeInTheDocument()
    })

    it('should render team name input with default value', () => {
      render(<SettingsPage />)
      expect(screen.getByTestId('input-team')).toHaveValue('Acme Inc.')
    })

    it('should render Update Team button', () => {
      render(<SettingsPage />)
      expect(screen.getByText('Update Team')).toBeInTheDocument()
    })
  })

  describe('Danger Zone Section', () => {
    it('should render Danger Zone card with correct title and description', () => {
      render(<SettingsPage />)
      expect(screen.getByText('Danger Zone')).toBeInTheDocument()
      expect(screen.getByText('Irreversible and destructive actions')).toBeInTheDocument()
    })

    it('should render Delete Account button with destructive variant', () => {
      render(<SettingsPage />)
      expect(screen.getByTestId('destructive-button')).toBeInTheDocument()
      expect(screen.getByText('Delete Account')).toBeInTheDocument()
    })
  })

  describe('Accessibility', () => {
    it('should have proper labels for all input fields', () => {
      render(<SettingsPage />)
      expect(screen.getByText('Name')).toBeInTheDocument()
      expect(screen.getByText('Email')).toBeInTheDocument()
      expect(screen.getByText('Bio')).toBeInTheDocument()
      expect(screen.getByText('Team Name')).toBeInTheDocument()
    })

    it('should have email input with correct type', () => {
      render(<SettingsPage />)
      expect(screen.getByTestId('input-email')).toHaveAttribute('type', 'email')
    })
  })
})
