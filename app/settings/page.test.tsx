import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SettingsPage from './page'

// Mock the DashboardLayout component
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
  CardContent: ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <div data-testid="card-content" className={className}>{children}</div>
  ),
  CardDescription: ({ children }: { children: React.ReactNode }) => (
    <p data-testid="card-description">{children}</p>
  ),
  CardHeader: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="card-header">{children}</div>
  ),
  CardTitle: ({ children }: { children: React.ReactNode }) => (
    <h3 data-testid="card-title">{children}</h3>
  ),
}))

vi.mock('@/components/ui/input', () => ({
  Input: (props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <input data-testid={`input-${props.id}`} {...props} />
  ),
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, variant, ...props }: { children: React.ReactNode; variant?: string }) => (
    <button data-testid="button" data-variant={variant} {...props}>
      {children}
    </button>
  ),
}))

vi.mock('@/components/ui/label', () => ({
  Label: ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => (
    <label data-testid={`label-${htmlFor}`} htmlFor={htmlFor}>
      {children}
    </label>
  ),
}))

describe('SettingsPage', () => {
  describe('Rendering', () => {
    it('should render the page within DashboardLayout', () => {
      render(<SettingsPage />)
      expect(screen.getByTestId('dashboard-layout')).toBeInTheDocument()
    })

    it('should render the Settings heading', () => {
      render(<SettingsPage />)
      expect(screen.getByRole('heading', { name: /settings/i })).toBeInTheDocument()
    })

    it('should render three cards (Profile, Team, Danger Zone)', () => {
      render(<SettingsPage />)
      const cards = screen.getAllByTestId('card')
      expect(cards).toHaveLength(3)
    })

    it('should render all card titles', () => {
      render(<SettingsPage />)
      expect(screen.getByText('Profile')).toBeInTheDocument()
      expect(screen.getByText('Team')).toBeInTheDocument()
      expect(screen.getByText('Danger Zone')).toBeInTheDocument()
    })
  })

  describe('Profile Section', () => {
    it('should render name input with default value', () => {
      render(<SettingsPage />)
      const nameInput = screen.getByTestId('input-name')
      expect(nameInput).toBeInTheDocument()
      expect(nameInput).toHaveValue('John Doe')
    })

    it('should render email input with default value', () => {
      render(<SettingsPage />)
      const emailInput = screen.getByTestId('input-email')
      expect(emailInput).toBeInTheDocument()
      expect(emailInput).toHaveAttribute('type', 'email')
      expect(emailInput).toHaveValue('john@example.com')
    })

    it('should render bio input without default value', () => {
      render(<SettingsPage />)
      const bioInput = screen.getByTestId('input-bio')
      expect(bioInput).toBeInTheDocument()
      expect(bioInput).toHaveAttribute('placeholder', 'Tell us about yourself')
    })

    it('should render Save Changes button', () => {
      render(<SettingsPage />)
      expect(screen.getByRole('button', { name: /save changes/i })).toBeInTheDocument()
    })
  })

  describe('Team Section', () => {
    it('should render team name input with default value', () => {
      render(<SettingsPage />)
      const teamInput = screen.getByTestId('input-team')
      expect(teamInput).toBeInTheDocument()
      expect(teamInput).toHaveValue('Acme Inc.')
    })

    it('should render Update Team button', () => {
      render(<SettingsPage />)
      expect(screen.getByRole('button', { name: /update team/i })).toBeInTheDocument()
    })
  })

  describe('Danger Zone Section', () => {
    it('should render Delete Account button', () => {
      render(<SettingsPage />)
      expect(screen.getByRole('button', { name: /delete account/i })).toBeInTheDocument()
    })

    it('should render Delete Account button with destructive variant', () => {
      render(<SettingsPage />)
      const deleteButton = screen.getByRole('button', { name: /delete account/i })
      expect(deleteButton).toHaveAttribute('data-variant', 'destructive')
    })
  })

  describe('Accessibility', () => {
    it('should have labels properly associated with inputs', () => {
      render(<SettingsPage />)
      expect(screen.getByTestId('label-name')).toHaveAttribute('for', 'name')
      expect(screen.getByTestId('label-email')).toHaveAttribute('for', 'email')
      expect(screen.getByTestId('label-bio')).toHaveAttribute('for', 'bio')
      expect(screen.getByTestId('label-team')).toHaveAttribute('for', 'team')
    })
  })

  describe('Card Descriptions', () => {
    it('should render correct descriptions for each section', () => {
      render(<SettingsPage />)
      expect(screen.getByText('Manage your account settings and preferences')).toBeInTheDocument()
      expect(screen.getByText('Manage your team members and their roles')).toBeInTheDocument()
      expect(screen.getByText('Irreversible and destructive actions')).toBeInTheDocument()
    })
  })
})
