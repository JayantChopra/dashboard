import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { defineConfig, devices } from '@playwright/test';

// We test the configuration object structure and values
// Since playwright.config.ts exports a config object via defineConfig(),
// we validate the configuration properties

describe('playwright.config', () => {
  const originalCI = process.env.CI;

  beforeEach(() => {
    vi.resetModules();
  });

  afterEach(() => {
    if (originalCI !== undefined) {
      process.env.CI = originalCI;
    } else {
      delete process.env.CI;
    }
  });

  describe('config structure', () => {
    it('should export a valid Playwright configuration object', async () => {
      const config = (await import('./playwright.config')).default;
      expect(config).toBeDefined();
      expect(typeof config).toBe('object');
    });

    it('should have testDir set to ./e2e', async () => {
      const config = (await import('./playwright.config')).default;
      expect(config.testDir).toBe('./e2e');
    });

    it('should have fullyParallel set to false for video clarity', async () => {
      const config = (await import('./playwright.config')).default;
      expect(config.fullyParallel).toBe(false);
    });
  });

  describe('worker configuration', () => {
    it('should use single worker for consistent video recording', async () => {
      const config = (await import('./playwright.config')).default;
      expect(config.workers).toBe(1);
    });

    it('should have retries set to 0', async () => {
      const config = (await import('./playwright.config')).default;
      expect(config.retries).toBe(0);
    });
  });

  describe('forbidOnly CI behavior', () => {
    it('should set forbidOnly to true when CI env is set', async () => {
      process.env.CI = 'true';
      vi.resetModules();
      const config = (await import('./playwright.config')).default;
      expect(config.forbidOnly).toBe(true);
    });

    it('should set forbidOnly to false when CI env is not set', async () => {
      delete process.env.CI;
      vi.resetModules();
      const config = (await import('./playwright.config')).default;
      expect(config.forbidOnly).toBe(false);
    });
  });

  describe('reporter configuration', () => {
    it('should configure multiple reporters including html, list, and json', async () => {
      const config = (await import('./playwright.config')).default;
      expect(config.reporter).toBeDefined();
      expect(Array.isArray(config.reporter)).toBe(true);
      
      const reporters = config.reporter as Array<unknown>;
      expect(reporters).toHaveLength(3);
      
      // Check html reporter
      expect(reporters[0]).toEqual(['html']);
      
      // Check list reporter
      expect(reporters[1]).toEqual(['list']);
      
      // Check json reporter with output file
      expect(reporters[2]).toEqual(['json', { outputFile: 'test-results/results.json' }]);
    });
  });

  describe('use configuration', () => {
    it('should have baseURL set to localhost:3000', async () => {
      const config = (await import('./playwright.config')).default;
      expect(config.use?.baseURL).toBe('http://localhost:3000');
    });

    it('should have trace enabled', async () => {
      const config = (await import('./playwright.config')).default;
      expect(config.use?.trace).toBe('on');
    });

    it('should have video recording enabled', async () => {
      const config = (await import('./playwright.config')).default;
      expect(config.use?.video).toBe('on');
    });

    it('should have screenshots enabled', async () => {
      const config = (await import('./playwright.config')).default;
      expect(config.use?.screenshot).toBe('on');
    });
  });

  describe('webServer configuration', () => {
    it('should configure dev server command', async () => {
      const config = (await import('./playwright.config')).default;
      expect(config.webServer).toBeDefined();
      
      const webServer = config.webServer as { command: string; url: string; reuseExistingServer: boolean; timeout: number };
      expect(webServer.command).toBe('npm run dev');
    });

    it('should configure webServer URL to localhost:3000', async () => {
      const config = (await import('./playwright.config')).default;
      const webServer = config.webServer as { url: string };
      expect(webServer.url).toBe('http://localhost:3000');
    });

    it('should allow reusing existing server', async () => {
      const config = (await import('./playwright.config')).default;
      const webServer = config.webServer as { reuseExistingServer: boolean };
      expect(webServer.reuseExistingServer).toBe(true);
    });

    it('should have 2 minute timeout for server start', async () => {
      const config = (await import('./playwright.config')).default;
      const webServer = config.webServer as { timeout: number };
      expect(webServer.timeout).toBe(120 * 1000);
    });
  });

  describe('projects configuration', () => {
    it('should have chromium project configured', async () => {
      const config = (await import('./playwright.config')).default;
      expect(config.projects).toBeDefined();
      expect(Array.isArray(config.projects)).toBe(true);
      expect(config.projects).toHaveLength(1);
      
      const chromiumProject = config.projects![0];
      expect(chromiumProject.name).toBe('chromium');
    });

    it('should configure chromium with Desktop Chrome device and custom viewport', async () => {
      const config = (await import('./playwright.config')).default;
      const chromiumProject = config.projects![0];
      
      expect(chromiumProject.use).toBeDefined();
      expect(chromiumProject.use?.viewport).toEqual({ width: 1280, height: 720 });
    });

    it('should spread Desktop Chrome device settings', async () => {
      const config = (await import('./playwright.config')).default;
      const chromiumProject = config.projects![0];
      const desktopChrome = devices['Desktop Chrome'];
      
      // Verify that Desktop Chrome properties are present (userAgent is a good indicator)
      expect(chromiumProject.use?.userAgent).toBe(desktopChrome.userAgent);
    });
  });
});