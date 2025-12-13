import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// We need to test the config object, not call defineConfig directly
// Mock @playwright/test to capture the config passed to defineConfig
const mockDefineConfig = vi.fn((config) => config);
const mockDevices = {
  'Desktop Chrome': {
    userAgent: 'Mozilla/5.0 Chrome',
    viewport: { width: 1920, height: 1080 },
  },
};

vi.mock('@playwright/test', () => ({
  defineConfig: mockDefineConfig,
  devices: mockDevices,
}));

describe('playwright.config.ts', () => {
  let config: ReturnType<typeof import('./playwright.config').default>;

  beforeEach(async () => {
    // Clear module cache to re-import fresh config
    vi.resetModules();
    const module = await import('./playwright.config');
    config = module.default;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Base Configuration', () => {
    it('should set testDir to ./e2e', () => {
      expect(config.testDir).toBe('./e2e');
    });

    it('should disable parallel execution for video clarity', () => {
      expect(config.fullyParallel).toBe(false);
    });

    it('should set workers to 1 for consistent video recording', () => {
      expect(config.workers).toBe(1);
    });

    it('should set retries to 0', () => {
      expect(config.retries).toBe(0);
    });

    it('should forbid .only in CI environment', () => {
      // The config uses !!process.env.CI, so it depends on runtime
      expect(typeof config.forbidOnly).toBe('boolean');
    });
  });

  describe('Reporter Configuration', () => {
    it('should configure multiple reporters', () => {
      expect(config.reporter).toBeInstanceOf(Array);
      expect(config.reporter).toHaveLength(3);
    });

    it('should include html reporter', () => {
      const reporters = config.reporter as Array<unknown>;
      const htmlReporter = reporters.find(
        (r) => Array.isArray(r) && r[0] === 'html'
      );
      expect(htmlReporter).toBeDefined();
    });

    it('should include list reporter', () => {
      const reporters = config.reporter as Array<unknown>;
      const listReporter = reporters.find(
        (r) => Array.isArray(r) && r[0] === 'list'
      );
      expect(listReporter).toBeDefined();
    });

    it('should include json reporter with output file', () => {
      const reporters = config.reporter as Array<unknown>;
      const jsonReporter = reporters.find(
        (r) => Array.isArray(r) && r[0] === 'json'
      ) as tring, { outputFile: string }];
      expect(jsonReporter).toBeDefined();
      expect(jsonReporter[1].outputFile).toBe('test-results/results.json');
    });
  });

  describe('Use Options', () => {
    it('should set baseURL to localhost:3000', () => {
      expect(config.use?.baseURL).toBe('http://localhost:3000');
    });

    it('should enable trace capture', () => {
      expect(config.use?.trace).toBe('on');
    });

    it('should enable video recording', () => {
      expect(config.use?.video).toBe('on');
    });

    it('should enable screenshot capture', () => {
      expect(config.use?.screenshot).toBe('on');
    });
  });

  describe('WebServer Configuration', () => {
    it('should configure dev server command', () => {
      expect(config.webServer).toBeDefined();
      const webServer = config.webServer as {
        command: string;
        url: string;
        reuseExistingServer: boolean;
        timeout: number;
      };
      expect(webServer.command).toBe('npm run dev');
    });

    it('should set server URL to localhost:3000', () => {
      const webServer = config.webServer as { url: string };
      expect(webServer.url).toBe('http://localhost:3000');
    });

    it('should allow reusing existing server', () => {
      const webServer = config.webServer as { reuseExistingServer: boolean };
      expect(webServer.reuseExistingServer).toBe(true);
    });

    it('should set server timeout to 2 minutes', () => {
      const webServer = config.webServer as { timeout: number };
      expect(webServer.timeout).toBe(120 * 1000);
    });
  });

  describe('Projects Configuration', () => {
    it('should configure chromium project', () => {
      expect(config.projects).toBeInstanceOf(Array);
      expect(config.projects).toHaveLength(1);
    });

    it('should name project as chromium', () => {
      const chromiumProject = config.projects?.[0];
      expect(chromiumProject?.name).toBe('chromium');
    });

    it('should spread Desktop Chrome device settings', () => {
      const chromiumProject = config.projects?.[0];
      expect(chromiumProject?.use).toBeDefined();
    });

    it('should override viewport to 1280x720', () => {
      const chromiumProject = config.projects?.[0];
      expect(chromiumProject?.use?.viewport).toEqual({
        width: 1280,
        height: 720,
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle CI environment variable being undefined', async () => {
      const originalCI = process.env.CI;
      delete process.env.CI;
      vi.resetModules();
      
      const module = await import('./playwright.config');
      const ciConfig = module.default;
      
      expect(ciConfig.forbidOnly).toBe(false);
      
      if (originalCI !== undefined) {
        process.env.CI = originalCI;
      }
    });

    it('should handle CI environment variable being truthy', async () => {
      const originalCI = process.env.CI;
      process.env.CI = 'true';
      vi.resetModules();
      
      const module = await import('./playwright.config');
      const ciConfig = module.default;
      
      expect(ciConfig.forbidOnly).toBe(true);
      
      if (originalCI !== undefined) {
        process.env.CI = originalCI;
      } else {
        delete process.env.CI;
      }
    });
  });
});
