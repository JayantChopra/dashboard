import { describe, it, expect } from 'vitest'
import nextConfig from './next.config'

describe('next.config', () => {
  it('should export a config object', () => {
    expect(nextConfig).toBeDefined()
  })

  it('should be a plain object', () => {
    expect(typeof nextConfig).toBe('object')
    expect(nextConfig).not.toBeNull()
    expect(Array.isArray(nextConfig)).toBe(false)
  })

  it('should be an empty config by default', () => {
    expect(Object.keys(nextConfig)).toHaveLength(0)
  })
})