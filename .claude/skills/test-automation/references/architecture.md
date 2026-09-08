# This project's test architecture

What exists today (`tests/example.spec.ts`, `tests/page-objects/base.page.ts`) is a starting scaffold, not the finished pattern. This is the pattern to grow it into as real coverage gets added.

## Layers

```
tests/
├── page-objects/
│   ├── base.page.ts       # BasePage — shared helpers (navigateTo, getTitle, waitForNetworkIdle)
│   └── <domain>.page.ts   # one class per page/flow, extends BasePage
├── <feature>.spec.ts      # one spec file per feature/flow
```

`BasePage` (`tests/page-objects/base.page.ts`) is deliberately thin today — navigation and generic waits only. A domain page class extends it and adds the locators and actions specific to one page or flow:

```typescript
import { Page } from '@playwright/test';
import { BasePage } from './base.page';

export class DocsHomePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  getStartedLink() {
    return this.page.getByRole('link', { name: 'Get started' });
  }

  async clickGetStarted(): Promise<void> {
    await this.getStartedLink().click();
  }
}
```

## Import path

`tsconfig.json` already has a `@/*` alias pointing at `tests/*` — use it instead of relative `../../` chains once specs live more than one folder deep: `import { DocsHomePage } from '@/page-objects/docs-home.page';`.

## When there's a real target instead of playwright.dev

`.context/business/business-feature-map.md` currently documents the sandbox target (`https://playwright.dev`, used by the existing sample spec). Once this project points at a real application, update that file first — it drives what page objects and specs actually make sense to build, and `test-automation` reads it before proposing new ones.

## One class per page, not per test

A page object represents the page/flow, not a single test's needs. If two specs both need to interact with the same page, they share the same page-object class — don't fork a near-duplicate class because one spec only needs part of it.
