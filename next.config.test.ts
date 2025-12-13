import { describe, it, expect } from 'vitest'
import nextConfig from './next.config'

describe('next.config', () => {
  it('should export a valid NextConfig object', () => {
    expect(nextConfig).toBeDefined()
    expect(typeof nextConfig).toBe('object')
  })

  it('should be an empty configuration object', () => {
    expect(nextConfig).toEqual({})
  })

  it('should not have any custom configuration properties', () => {
    expect(Object.keys(nextConfig)).toHaveLength(0)
  })
})
