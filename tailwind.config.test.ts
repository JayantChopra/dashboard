import { describe, it, expect } from 'vitest'
import config from './tailwind.config'

describe('tailwind.config', () => {
  describe('config structure', () => {
    it('should export a valid config object', () => {
      expect(config).toBeDefined()
      expect(typeof config).toBe('object')
    })

    it('should have darkMode set to class-based', () => {
      expect(config.darkMode).toEqual(['class'])
    })

    it('should have correct content paths', () => {
      expect(config.content).toEqual([
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
      ])
    })

    it('should have empty plugins array', () => {
      expect(config.plugins).toEqual([])
    })
  })

  describe('theme colors', () => {
    it('should define all required base color tokens', () => {
      const colors = config.theme?.extend?.colors
      expect(colors).toBeDefined()
      
      const baseColors = ['border', 'input', 'ring', 'background', 'foreground']
      baseColors.forEach((color) => {
        expect(colors?.olor]).toBeDefined()
        expect(colors?.olor]).toMatch(/^hsl\(var\(--\w+\)\)$/)
      })
    })

    it('should define nested color tokens with DEFAULT and foreground', () => {
      const colors = config.theme?.extend?.colors
      const nestedColors = ['primary', 'secondary', 'destructive', 'muted', 'accent', 'popover', 'card']
      
      nestedColors.forEach((color) => {
        const colorConfig = colors?.olor] as { DEFAULT: string; foreground: string } | undefined
        expect(colorConfig).toBeDefined()
        expect(colorConfig?.DEFAULT).toMatch(/^hsl\(var\(--\w+\)\)$/)
        expect(colorConfig?.foreground).toMatch(/^hsl\(var\(--\w+-foreground\)\)$/)
      })
    })
  })

  describe('theme borderRadius', () => {
    it('should define lg, md, and sm border radius values', () => {
      const borderRadius = config.theme?.extend?.borderRadius
      expect(borderRadius).toBeDefined()
      expect(borderRadius?.lg).toBe('var(--radius)')
      expect(borderRadius?.md).toBe('calc(var(--radius) - 2px)')
      expect(borderRadius?.sm).toBe('calc(var(--radius) - 4px)')
    })

    it('should have correct calc expressions for md and sm', () => {
      const borderRadius = config.theme?.extend?.borderRadius
      expect(borderRadius?.md).toContain('calc(')
      expect(borderRadius?.md).toContain('- 2px')
      expect(borderRadius?.sm).toContain('calc(')
      expect(borderRadius?.sm).toContain('- 4px')
    })
  })
})