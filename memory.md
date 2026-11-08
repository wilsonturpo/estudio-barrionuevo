# Memory

## Project context

- Static, multipage Astro site for a Peruvian labour-law firm.
- All public-facing business data must remain editable JSON in `src/data/`.
- Initial content is demonstrative only: do not imply real staff, credentials, case outcomes, addresses, phone numbers or WhatsApp destinations.
- Design direction: premium and restrained, using espresso, bronze and ivory. Mobile-first, accessible, with minimal client JavaScript.
- The required route set is home, about, services, generated service detail pages, contact, privacy policy and 404.

## Implementation log

### 2026-11-08 - Foundation (complete)

- Read the complete project specification in `AGENTS.md`.
- Confirmed the workspace initially contained only `AGENTS.md`.
- Confirmed Node `v24.21.0`, npm `11.19.0`, and Git `2.56.0.windows.1` are available.
- Initialized Git locally. No remote has been configured and nothing will be published.
- Installed local dependencies: Astro, Sass, Playwright Test and the Astro sitemap integration. The sitemap integration may be removed if the final no-public-domain policy makes a static hand-authored solution clearer.
- Astro configuration uses static output, trailing slashes and environment-configurable `BASE_PATH` / `SITE_URL`, so no fake public URL is committed.
- `npm run build` completed successfully and generated `dist/`.

## Commit history maintained by OpenCode

- `chore: initialize Astro project foundation` - Git repository, local dependencies, static build configuration, ignore rules and continuity record.
- `feat: add editable content and shared visual system` - JSON content catalogues, accessible base layout, mobile navigation, footer, safe WhatsApp entry point, reusable buttons/cards/headings, SCSS theme and favicon.
- `feat: build multipage service and contact experience` - Home, about, service listing, six generated detail pages, contact, privacy draft and 404, including safe client-side contact-message preparation.
- `test: add browser verification and deployment documentation` - Playwright suites, visual-capture checks, MCP configuration, Lighthouse command, robots/sitemap behavior, GitHub Pages workflow and human-facing README.

## Pending decisions or real data needed from the owner

- Official study name, legal identity, RUC, privacy-policy owner/contact, office address, definitive schedule and approved team details.
- A valid WhatsApp number and Facebook URL. Until then the UI must remain in an explicit demonstration state and never navigate to a fictitious recipient.
- GitHub account/repository name or final custom domain. This is only necessary before actual deployment.
- Approved photographs or written permission to publish the supplied Justice painting.

## Verification status

- `npm run build` passed after all routes and production configuration; Astro generated 12 pages plus `robots.txt`.
- Installed the Playwright Chromium browser locally. `npm test` passed all 29 browser checks against Astro development, and `npm run test:preview` passed all 29 checks against the compiled output.
- Inspected actual Chromium captures of home at 390 px, services at 768 px and contact at 1440 px. The tablet capture exposed the labelled floating contact control intruding into a card; it was reduced to an accessible 52 px circular control at widths up to 1024 px and rechecked visually.
- Ran Lighthouse against local production preview. Its HTML report is at `docs/audits/lighthouse.html` and is intentionally ignored by Git. No report score is claimed here because the report was not committed; review it before making performance claims for a public domain.
- Added `opencode.json` with a validated local Playwright MCP command (`npx @playwright/mcp --help`). OpenCode loads this configuration only at startup, so this running session cannot invoke the new MCP tools; a restart is required for the mandatory MCP interaction workflow.
- Browser installation, E2E tests, MCP inspection, Lighthouse and no-JS checks are pending implementation.
