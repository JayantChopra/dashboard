# Add Simple E2E Test

## Summary
Create one very simple Playwright E2E test that loads the homepage and checks it renders, then commit.

## Changes
- **New test file `e2e/smoke.spec.ts`** -- Create a single test that navigates to `/`, asserts the page title contains "Dashboard" or the Overview heading is visible. No navigation, no interactions, no waitForTimeout. Just: goto + one assertion. Keep it under 15 lines total.
  - Do NOT duplicate anything from the existing `e2e/app.spec.ts`
  - Do NOT add complex flows, multi-page navigation, or theme toggling
  - Use `baseURL` from config (just `page.goto('/')`)

## Verification
- `npx playwright test e2e/smoke.spec.ts --reporter=list` passes
- File is under 15 lines of actual code
- `git diff --stat` shows only the new file
