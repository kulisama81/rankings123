#!/usr/bin/env node
import { chromium } from 'playwright';

const routes = [
  { path: '/', name: 'Homepage' },
  { path: '/atp-live', name: 'ATP Live' },
  { path: '/wta-live', name: 'WTA Live' },
  { path: '/world-cup', name: 'World Cup' },
];

const baseUrl = 'https://rankings123.com';

async function measureRoute(page, route) {
  const url = `${baseUrl}${route.path}`;

  await page.goto(url, { waitUntil: 'networkidle' });

  const metrics = await page.evaluate(() => {
    const entries = performance.getEntriesByType('navigation')[0];
    const paintEntries = performance.getEntriesByType('paint');
    const fcp = paintEntries.find(e => e.name === 'first-contentful-paint')?.startTime || 0;

    // Get LCP
    let lcp = 0;
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      lcp = lastEntry.renderTime || lastEntry.loadTime;
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    // Wait a bit for LCP to settle
    return new Promise(resolve => {
      setTimeout(() => {
        // Get CLS
        let cls = 0;
        const clsObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (!entry.hadRecentInput) {
              cls += entry.value;
            }
          }
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });

        // Get total transfer size
        const resources = performance.getEntriesByType('resource');
        const totalTransfer = entries.transferSize + resources.reduce((sum, r) => sum + (r.transferSize || 0), 0);

        resolve({
          ttfb: (entries.responseStart / 1000).toFixed(2),
          fcp: (fcp / 1000).toFixed(2),
          lcp: lcp > 0 ? (lcp / 1000).toFixed(2) : 'N/A',
          cls: cls.toFixed(3),
          totalTransfer: Math.round(totalTransfer / 1024)
        });
      }, 2000);
    });
  });

  return metrics;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  console.log('\nCore Web Vitals — https://rankings123.com\n');
  console.log('Route          LCP     FCP     CLS     TTFB    Transfer');
  console.log('─'.repeat(65));

  for (const route of routes) {
    try {
      const metrics = await measureRoute(page, route);
      const name = route.name.padEnd(14);
      console.log(`${name} ${metrics.lcp}s   ${metrics.fcp}s   ${metrics.cls}   ${metrics.ttfb}s   ${metrics.totalTransfer}KB`);
    } catch (error) {
      console.log(`${route.name.padEnd(14)} ERROR: ${error.message}`);
    }
  }

  await browser.close();
}

main().catch(console.error);
