import { describe, it, expect } from 'vitest'
import nextConfig from './next.config'

describe('next.config', () => {
  it('should export a NextConfig object', () => {
    expect(nextConfig).toBeDefined()
    expect(typeof nextConfig).toBe('object')
  })

  it('should export a non-null configuration', () => {
    expect(nextConfig).not.toBeNull()
  })

  it('should be an empty configuration object by default', () => {
    expect(Object.keys(nextConfig)).toHaveLength(0)
  })
})