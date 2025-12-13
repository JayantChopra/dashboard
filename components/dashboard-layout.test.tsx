import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DashboardLayout } from './dashboard-layout'

// Mock the Sidebar component
vi.mock('@/components/sidebar', () => ({
  Sidebar: () => <div data-testid="sidebar">Sidebar</div>
}))

// Mock the Header component
vi.mock('@/components/header', () => ({
  Header: () => <div data-testid="header">Header</div>
}))

describe('DashboardLayout', () => {
  it('renders without crashing', () => {
    render(
      <DashboardLayout>
        <div>Test Content</div>
      </DashboardLayout>
    )
    expect(screen.getByText('Test Content')).toBeInTheDocument()
  })

  it('renders Sidebar component', () => {
    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    )
    expect(screen.getByTestId('sidebar')).toBeInTheDocument()
  })

  it('renders Header component', () => {
    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    )
    expect(screen.getByTestId('header')).toBeInTheDocument()
  })

  it('renders children content correctly', () => {
    render(
      <DashboardLayout>
        <div data-testid="child-content">Child Content</div>
      </DashboardLayout>
    )
    expect(screen.getByTestId('child-content')).toBeInTheDocument()
    expect(screen.getByText('Child Content')).toBeInTheDocument()
  })

  it('renders multiple children elements', () => {
    render(
      <DashboardLayout>
        <div data-testid="first-child">First</div>
        <div data-testid="second-child">Second</div>
      </DashboardLayout>
    )
    expect(screen.getByTestId('first-child')).toBeInTheDocument()
    expect(screen.getByTestId('second-child')).toBeInTheDocument()
  })

  it('renders main element with correct role', () => {
    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    )
    const mainElement = screen.getByRole('main')
    expect(mainElement).toBeInTheDocument()
    expect(mainElement).toHaveClass('flex-1', 'overflow-y-auto', 'bg-muted/10')
  })
})