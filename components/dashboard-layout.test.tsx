import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { DashboardLayout } from './dashboard-layout'

// Mock the Sidebar component
vi.mock('@/components/sidebar', () => ({
  Sidebar: () => <div data-testid="sidebar">Sidebar Mock</div>
}))

// Mock the Header component
vi.mock('@/components/header', () => ({
  Header: () => <div data-testid="header">Header Mock</div>
}))

describe('DashboardLayout', () => {
  describe('Rendering', () => {
    it('should render without crashing', () => {
      render(
        <DashboardLayout>
          <div>Test Content</div>
        </DashboardLayout>
      )
      
      expect(screen.getByTestId('sidebar')).toBeInTheDocument()
      expect(screen.getByTestId('header')).toBeInTheDocument()
    })

    it('should render children content', () => {
      render(
        <DashboardLayout>
          <div data-testid="child-content">Child Content</div>
        </DashboardLayout>
      )
      
      expect(screen.getByTestId('child-content')).toBeInTheDocument()
      expect(screen.getByText('Child Content')).toBeInTheDocument()
    })
  })

  describe('Structure', () => {
    it('should include Sidebar component', () => {
      render(
        <DashboardLayout>
          <div>Content</div>
        </DashboardLayout>
      )
      
      expect(screen.getByTestId('sidebar')).toBeInTheDocument()
    })

    it('should include Header component', () => {
      render(
        <DashboardLayout>
          <div>Content</div>
        </DashboardLayout>
      )
      
      expect(screen.getByTestId('header')).toBeInTheDocument()
    })
  })

  describe('Edge Cases', () => {
    it('should handle empty children', () => {
      render(
        <DashboardLayout>
          {null}
        </DashboardLayout>
      )
      
      expect(screen.getByTestId('sidebar')).toBeInTheDocument()
      expect(screen.getByTestId('header')).toBeInTheDocument()
    })

    it('should handle multiple children', () => {
      render(
        <DashboardLayout>
          <div data-testid="child-1">First Child</div>
          <div data-testid="child-2">Second Child</div>
          <div data-testid="child-3">Third Child</div>
        </DashboardLayout>
      )
      
      expect(screen.getByTestId('child-1')).toBeInTheDocument()
      expect(screen.getByTestId('child-2')).toBeInTheDocument()
      expect(screen.getByTestId('child-3')).toBeInTheDocument()
    })
  })

  describe('Layout Structure', () => {
    it('should have correct flex container structure', () => {
      const { container } = render(
        <DashboardLayout>
          <div>Content</div>
        </DashboardLayout>
      )
      
      const outerDiv = container.firstChild as HTMLElement
      expect(outerDiv).toHaveClass('flex', 'h-screen', 'overflow-hidden')
    })

    it('should render main element for content area', () => {
      render(
        <DashboardLayout>
          <div>Test Main Content</div>
        </DashboardLayout>
      )
      
      const mainElement = screen.getByRole('main')
      expect(mainElement).toBeInTheDocument()
      expect(mainElement).toHaveClass('flex-1', 'overflow-y-auto')
    })
  })
})