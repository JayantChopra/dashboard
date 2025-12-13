import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DashboardLayout } from './dashboard-layout'

// Mock child components
vi.mock('@/components/header', () => ({
  Header: () => <header data-testid="mock-header">Header</header>
}))

vi.mock('@/components/sidebar', () => ({
  Sidebar: () => <aside data-testid="mock-sidebar">Sidebar</aside>
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
    expect(screen.getByTestId('mock-sidebar')).toBeInTheDocument()
  })

  it('renders Header component', () => {
    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    )
    expect(screen.getByTestId('mock-header')).toBeInTheDocument()
  })

  it('renders children content correctly', () => {
    const childContent = 'Child Component Content'
    render(
      <DashboardLayout>
        <span>{childContent}</span>
      </DashboardLayout>
    )
    expect(screen.getByText(childContent)).toBeInTheDocument()
  })

  it('has correct layout structure with flex container', () => {
    const { container } = render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    )
    const rootDiv = container.firstChild as HTMLElement
    expect(rootDiv).toHaveClass('flex', 'h-screen', 'overflow-hidden')
  })

  it('renders main content area with correct classes', () => {
    render(
      <DashboardLayout>
        <div>Content</div>
      </DashboardLayout>
    )
    const mainElement = screen.getByRole('main')
    expect(mainElement).toBeInTheDocument()
    expect(mainElement).toHaveClass('flex-1', 'overflow-y-auto')
  })
})