module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/'],
      startServerCommand: 'pnpm build && pnpm start',
      startServerReadyPattern: 'Ready on',
      startServerReadyTimeout: 60000,
      numberOfRuns: 3,
      settings: {
        // Disable storage reset to maintain consistent test conditions
        disableStorageReset: false,
        // Use desktop form factor for consistent results
        formFactor: 'desktop',
        // Set specific viewport for consistent screenshots
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1,
          disabled: false,
        },
        // Throttling settings for consistent network conditions
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
        // Skip PWA audits if not applicable
        skipAudits: [
          'service-worker',
          'installable-manifest',
          'apple-touch-icon',
          'splash-screen',
          'themed-omnibox',
          'maskable-icon',
        ],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      assertions: {
        // Performance assertions
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],

        // Core Web Vitals
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 3000 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'speed-index': ['error', { maxNumericValue: 3000 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],

        // Resource optimization
        'unused-css-rules': ['error', { maxNumericValue: 20000 }],
        'unused-javascript': ['error', { maxNumericValue: 20000 }],
        'modern-image-formats': ['error', { minScore: 0.8 }],
        'uses-optimized-images': ['error', { minScore: 0.8 }],
        'uses-text-compression': ['error', { minScore: 0.9 }],

        // Accessibility
        'color-contrast': ['error', { minScore: 1 }],
        'heading-order': ['error', { minScore: 1 }],
        'image-alt': ['error', { minScore: 1 }],
        'link-name': ['error', { minScore: 1 }],

        // SEO
        'meta-description': ['error', { minScore: 1 }],
        'document-title': ['error', { minScore: 1 }],
        'is-crawlable': ['error', { minScore: 1 }],
        'robots-txt': ['warn', { minScore: 0.8 }],

        // Best Practices
        'uses-https': ['error', { minScore: 1 }],
        'no-vulnerable-libraries': ['error', { minScore: 1 }],
        'csp-xss': ['warn', { minScore: 0.8 }],
      },
    },
  },
}
