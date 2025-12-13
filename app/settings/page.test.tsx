import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import SettingsPage from './page'

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
    <button data-testid={`button-${variant || 'default'}`} {...props}>{children}</button>
  ),
}))

vi.mock('@/components/ui/label', () => ({
  Label: ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => (
    <label data-testid={`label-${htmlFor}`} htmlFor={htmlFor}>{children}</label>
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
      expect(screen.getByText('Settings')).toBeInTheDocument()
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

  describe('Profile Card', () => {
    it('should render profile form inputs with correct default values', () => {
      render(<SettingsPage />)
      
      const nameInput = screen.getByTestId('input-name')
      const emailInput = screen.getByTestId('input-email')
      const bioInput = screen.getByTestId('input-bio')
      
      expect(nameInput).toHaveAttribute('defaultValue', 'John Doe')
      expect(emailInput).toHaveAttribute('defaultValue', 'john@example.com')
      expect(emailInput).toHaveAttribute('type', 'email')
      expect(bioInput).toHaveAttribute('placeholder', 'Tell us about yourself')
    })

    it('should render labels for profile inputs', () => {
      render(<SettingsPage />)
      
      expect(screen.getByTestId('label-name')).toHaveTextContent('Name')
      expect(screen.getByTestId('label-email')).toHaveTextContent('Email')
      expect(screen.getByTestId('label-bio')).toHaveTextContent('Bio')
    })

    it('should render Save Changes button', () => {
      render(<SettingsPage />)
      expect(screen.getByText('Save Changes')).toBeInTheDocument()
    })
  })

  describe('Team Card', () => {
    it('should render team input with default value', () => {
      render(<SettingsPage />)
      
      const teamInput = screen.getByTestId('input-team')
      expect(teamInput).toHaveAttribute('defaultValue', 'Acme Inc.')
      expect(teamInput).toHaveAttribute('placeholder', 'Acme Inc.')
    })

    it('should render Update Team button', () => {
      render(<SettingsPage />)
      expect(screen.getByText('Update Team')).toBeInTheDocument()
    })
  })

  describe('Danger Zone Card', () => {
    it('should render destructive Delete Account button', () => {
      render(<SettingsPage />)
      
      const deleteButton = screen.getByTestId('button-destructive')
      expect(deleteButton).toHaveTextContent('Delete Account')
    })

    it('should render danger zone description', () => {
      render(<SettingsPage />)
      expect(screen.getByText('Irreversible and destructive actions')).toBeInTheDocument()
    })
  })

  describe('Card Descriptions', () => {
    it('should render all card descriptions', () => {
      render(<SettingsPage />)
      
      expect(screen.getByText('Manage your account settings and preferences')).toBeInTheDocument()
      expect(screen.getByText('Manage your team members and their roles')).toBeInTheDocument()
      expect(screen.getByText('Irreversible and destructive actions')).toBeInTheDocument()
    })
  })
})