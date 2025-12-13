import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createRef } from 'react'
import { Label } from './label'

// Mock the cn utility
vi.mock('@/lib/utils', () => ({
  cn: (...classes: (string | undefined)[]) => classes.filter(Boolean).join(' ')
}))

describe('Label', () => {
  describe('rendering', () => {
    it('should render a label element', () => {
      render(<Label>Test Label</Label>)
      const label = screen.getByText('Test Label')
      expect(label).toBeInTheDocument()
      expect(label.tagName).toBe('LABEL')
    })

    it('should render children correctly', () => {
      render(
        <Label>
          <span data-testid="child">Child Content</span>
        </Label>
      )
      expect(screen.getByTestId('child')).toBeInTheDocument()
      expect(screen.getByText('Child Content')).toBeInTheDocument()
    })
  })

  describe('className handling', () => {
    it('should apply default classes', () => {
      render(<Label data-testid="label">Label</Label>)
      const label = screen.getByTestId('label')
      expect(label.className).toContain('text-sm')
      expect(label.className).toContain('font-medium')
      expect(label.className).toContain('leading-none')
      expect(label.className).toContain('peer-disabled:cursor-not-allowed')
      expect(label.className).toContain('peer-disabled:opacity-70')
    })

    it('should merge custom className with default classes', () => {
      render(
        <Label data-testid="label" className="custom-class">
          Label
        </Label>
      )
      const label = screen.getByTestId('label')
      expect(label.className).toContain('custom-class')
      expect(label.className).toContain('text-sm')
    })
  })

  describe('prop forwarding', () => {
    it('should forward htmlFor attribute', () => {
      render(<Label htmlFor="input-id">Label</Label>)
      const label = screen.getByText('Label')
      expect(label).toHaveAttribute('for', 'input-id')
    })

    it('should forward additional HTML attributes', () => {
      render(
        <Label
          data-testid="label"
          id="custom-id"
          title="Label title"
          aria-describedby="description"
        >
          Label
        </Label>
      )
      const label = screen.getByTestId('label')
      expect(label).toHaveAttribute('id', 'custom-id')
      expect(label).toHaveAttribute('title', 'Label title')
      expect(label).toHaveAttribute('aria-describedby', 'description')
    })
  })

  describe('ref forwarding', () => {
    it('should forward ref to the label element', () => {
      const ref = createRef<HTMLLabelElement>()
      render(<Label ref={ref}>Label</Label>)
      expect(ref.current).toBeInstanceOf(HTMLLabelElement)
      expect(ref.current?.textContent).toBe('Label')
    })
  })

  describe('displayName', () => {
    it('should have correct displayName', () => {
      expect(Label.displayName).toBe('Label')
    })
  })
})