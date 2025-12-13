import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  describe('happy path scenarios', () => {
    it('should merge single class string', () => {
      const result = cn('text-red-500')
      expect(result).toBe('text-red-500')
    })

    it('should merge multiple class strings', () => {
      const result = cn('px-4', 'py-2', 'bg-blue-500')
      expect(result).toBe('px-4 py-2 bg-blue-500')
    })

    it('should handle conditional classes with objects', () => {
      const result = cn('base-class', { 'active-class': true, 'inactive-class': false })
      expect(result).toBe('base-class active-class')
    })

    it('should handle array of classes', () => {
      const result = cn(['px-4', 'py-2'], 'bg-white')
      expect(result).toBe('px-4 py-2 bg-white')
    })
  })

  describe('edge cases', () => {
    it('should return empty string when called with no arguments', () => {
      const result = cn()
      expect(result).toBe('')
    })

    it('should handle undefined values', () => {
      const result = cn('px-4', undefined, 'py-2')
      expect(result).toBe('px-4 py-2')
    })

    it('should handle null values', () => {
      const result = cn('px-4', null, 'py-2')
      expect(result).toBe('px-4 py-2')
    })

    it('should handle empty strings', () => {
      const result = cn('px-4', '', 'py-2')
      expect(result).toBe('px-4 py-2')
    })

    it('should handle boolean false values', () => {
      const result = cn('px-4', false, 'py-2')
      expect(result).toBe('px-4 py-2')
    })
  })

  describe('Tailwind class conflict resolution', () => {
    it('should resolve conflicting padding classes (last wins)', () => {
      const result = cn('px-4', 'px-6')
      expect(result).toBe('px-6')
    })

    it('should resolve conflicting background colors', () => {
      const result = cn('bg-red-500', 'bg-blue-500')
      expect(result).toBe('bg-blue-500')
    })

    it('should resolve conflicting text sizes', () => {
      const result = cn('text-sm', 'text-lg')
      expect(result).toBe('text-lg')
    })
  })
})