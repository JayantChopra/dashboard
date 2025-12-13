import { describe, it, expect } from 'vitest'
import config from './tailwind.config'

describe('tailwind.config', () => {
  describe('config structure', () => {
    it('should export a valid Config object', () => {
      expect(config).toBeDefined()
      expect(typeof config).toBe('object')
    })

    it('should have required top-level properties', () => {
      expect(config).toHaveProperty('darkMode')
      expect(config).toHaveProperty('content')
      expect(config).toHaveProperty('theme')
      expect(config).toHaveProperty('plugins')
    })

    it('should have theme.extend property', () => {
      expect(config.theme).toHaveProperty('extend')
      expect(config.theme?.extend).toHaveProperty('colors')
      expect(config.theme?.extend).toHaveProperty('borderRadius')
    })
  })

  describe('darkMode', () => {
    it('should be configured with class strategy', () => {
      expect(config.darkMode).toEqual(['class'])
    })
  })

  describe('content', () => {
    it('should include all required content paths', () => {
      expect(config.content).toContain('./pages/**/*.{js,ts,jsx,tsx,mdx}')
      expect(config.content).toContain('./components/**/*.{js,ts,jsx,tsx,mdx}')
      expect(config.content).toContain('./app/**/*.{js,ts,jsx,tsx,mdx}')
      expect(config.content).toHaveLength(3)
    })
  })

  describe('theme.extend.colors', () => {
    it('should define all semantic color tokens', () => {
      const colors = config.theme?.extend?.colors
      expect(colors).toBeDefined()
      
      // Simple color tokens
      expect(colors).toHaveProperty('border', 'hsl(var(--border))')
      expect(colors).toHaveProperty('input', 'hsl(var(--input))')
      expect(colors).toHaveProperty('ring', 'hsl(var(--ring))')
      expect(colors).toHaveProperty('background', 'hsl(var(--background))')
      expect(colors).toHaveProperty('foreground', 'hsl(var(--foreground))')
      
      // Compound color tokens with DEFAULT and foreground
      const compoundColors = ['primary', 'secondary', 'destructive', 'muted', 'accent', 'popover', 'card']
      compoundColors.forEach((colorName) => {
        expect(colors).toHaveProperty(colorName)
        expect((colors as Record<string, { DEFAULT: string; foreground: string }>)olorName]).toHaveProperty('DEFAULT')
        expect((colors as Record<string, { DEFAULT: string; foreground: string }>)olorName]).toHaveProperty('foreground')
        expect((colors as Record<string, { DEFAULT: string; foreground: string }>)olorName].DEFAULT).toMatch(/^hsl\(var\(--\w+\)\)$/)
        expect((colors as Record<string, { DEFAULT: string; foreground: string }>)olorName].foreground).toMatch(/^hsl\(var\(--\w+-foreground\)\)$/)
      })
    })
  })

  describe('theme.extend.borderRadius', () => {
    it('should define border radius values using CSS variables', () => {
      const borderRadius = config.theme?.extend?.borderRadius
      expect(borderRadius).toBeDefined()
      expect(borderRadius).toHaveProperty('lg', 'var(--radius)')
      expect(borderRadius).toHaveProperty('md', 'calc(var(--radius) - 2px)')
      expect(borderRadius).toHaveProperty('sm', 'calc(var(--radius) - 4px)')
    })
  })

  describe('plugins', () => {
    it('should have an empty plugins array', () => {
      expect(config.plugins).toEqual([])
      expect(Array.isArray(config.plugins)).toBe(true)
    })
  })
})