import { describe, it, expect } from 'vitest'
import config from './tailwind.config'

describe('tailwind.config', () => {
  describe('config structure', () => {
    it('should export a valid Config object', () => {
      expect(config).toBeDefined()
      expect(typeof config).toBe('object')
      expect(config).toHaveProperty('darkMode')
      expect(config).toHaveProperty('content')
      expect(config).toHaveProperty('theme')
      expect(config).toHaveProperty('plugins')
    })
  })

  describe('darkMode', () => {
    it('should configure class-based dark mode', () => {
      expect(config.darkMode).toEqual(['class'])
    })
  })

  describe('content', () => {
    it('should include all required content paths', () => {
      expect(config.content).toBeInstanceOf(Array)
      expect(config.content).toHaveLength(3)
      expect(config.content).toContain('./pages/**/*.{js,ts,jsx,tsx,mdx}')
      expect(config.content).toContain('./components/**/*.{js,ts,jsx,tsx,mdx}')
      expect(config.content).toContain('./app/**/*.{js,ts,jsx,tsx,mdx}')
    })
  })

  describe('theme.extend.colors', () => {
    it('should define all shadcn/ui color tokens', () => {
      const colors = config.theme?.extend?.colors
      expect(colors).toBeDefined()
      
      // Base colors
      expect(colors).toHaveProperty('border')
      expect(colors).toHaveProperty('input')
      expect(colors).toHaveProperty('ring')
      expect(colors).toHaveProperty('background')
      expect(colors).toHaveProperty('foreground')
      
      // Semantic color pairs
      const colorPairs = ['primary', 'secondary', 'destructive', 'muted', 'accent', 'popover', 'card']
      colorPairs.forEach((colorName) => {
        expect(colors).toHaveProperty(colorName)
        expect(colors!olorName]).toHaveProperty('DEFAULT')
        expect(colors!olorName]).toHaveProperty('foreground')
      })
    })

    it('should use HSL CSS variables for colors', () => {
      const colors = config.theme?.extend?.colors
      expect(colors?.background).toBe('hsl(var(--background))')
      expect(colors?.primary?.DEFAULT).toBe('hsl(var(--primary))')
      expect(colors?.primary?.foreground).toBe('hsl(var(--primary-foreground))')
    })
  })

  describe('theme.extend.borderRadius', () => {
    it('should define lg, md, and sm border radius values', () => {
      const borderRadius = config.theme?.extend?.borderRadius
      expect(borderRadius).toBeDefined()
      expect(borderRadius).toHaveProperty('lg', 'var(--radius)')
      expect(borderRadius).toHaveProperty('md', 'calc(var(--radius) - 2px)')
      expect(borderRadius).toHaveProperty('sm', 'calc(var(--radius) - 4px)')
    })
  })

  describe('plugins', () => {
    it('should have an empty plugins array', () => {
      expect(config.plugins).toBeInstanceOf(Array)
      expect(config.plugins).toHaveLength(0)
    })
  })
})
