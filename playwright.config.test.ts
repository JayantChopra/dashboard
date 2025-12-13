import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { defineConfig, devices } from '@playwright/test'

// Since playwright.config.ts exports a default config object created via defineConfig,
// we test the configuration values directly by importing and validating structure

describe('playwright.config', () => {
  const originalEnv = process.env.CI

  afterEach(() => {
    if (originalEnv === undefined) {
      delete process.env.CI
    } else {
      process.env.CI = originalEnv
    }
    vi.resetModules()
  })

  describe('basic configuration', () => {
    it('should have testDir set to ./e2e', async () => {
      const { default: config } = await import('./playwright.config')
      expect(config.testDir).toBe('./e2e')
    })

    it('should run tests sequentially with single worker', async () => {
      const { default: config } = await import('./playwright.config')
      expect(config.fullyParallel).toBe(false)
      expect(config.workers).toBe(1)
    })

    it('should have zero retries configured', async () => {
      const { default: config } = await import('./playwright.config')
      expect(config.retries).toBe(0)
    })
  })

  describe('forbidOnly behavior based on CI environment', () => {
    it('should set forbidOnly to true when CI env is set', async () => {
      process.env.CI = 'true'
      vi.resetModules()
      const { default: config } = await import('./playwright.config')
      expect(config.forbidOnly).toBe(true)
    })

    it('should set forbidOnly to false when CI env is not set', async () => {
      delete process.env.CI
      vi.resetModules()
      const { default: config } = await import('./playwright.config')
      expect(config.forbidOnly).toBe(false)
    })
  })

  describe('use options', () => {
    it('should have correct baseURL', async () => {
      const { default: config } = await import('./playwright.config')
      expect(config.use?.baseURL).toBe('http://localhost:3000')
    })

    it('should enable trace, video, and screenshot recording', async () => {
      const { default: config } = await import('./playwright.config')
      expect(config.use?.trace).toBe('on')
      expect(config.use?.video).toBe('on')
      expect(config.use?.screenshot).toBe('on')
    })
  })

  describe('webServer configuration', () => {
    it('should configure dev server with correct command and URL', async () => {
      const { default: config } = await import('./playwright.config')
      const webServer = config.webServer as { command: string; url: string; reuseExistingServer: boolean; timeout: number }
      expect(webServer.command).toBe('npm run dev')
      expect(webServer.url).toBe('http://localhost:3000')
      expect(webServer.reuseExistingServer).toBe(true)
    })

    it('should have 2 minute timeout for server start', async () => {
      const { default: config } = await import('./playwright.config')
      const webServer = config.webServer as { timeout: number }
      expect(webServer.timeout).toBe(120 * 1000)
    })
  })

  describe('reporter configuration', () => {
    it('should have html, list, and json reporters configured', async () => {
      const { default: config } = await import('./playwright.config')
      expect(config.reporter).toEqual([
        ['html'],
        ['list'],
        ['json', { outputFile: 'test-results/results.json' }]
      ])
    })
  })

  describe('projects configuration', () => {
    it('should have chromium project configured', async () => {
      const { default: config } = await import('./playwright.config')
      expect(config.projects).toHaveLength(1)
      expect(config.projects?.[0].name).toBe('chromium')
    })

    it('should use Desktop Chrome device with custom viewport', async () => {
      const { default: config } = await import('./playwright.config')
      const chromiumProject = config.projects?.[0]
      expect(chromiumProject?.use?.viewport).toEqual({ width: 1280, height: 720 })
    })
  })
})