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

## Pending decisions or real data needed from the owner

- Official study name, legal identity, RUC, privacy-policy owner/contact, office address, definitive schedule and approved team details.
- A valid WhatsApp number and Facebook URL. Until then the UI must remain in an explicit demonstration state and never navigate to a fictitious recipient.
- GitHub account/repository name or final custom domain. This is only necessary before actual deployment.
- Approved photographs or written permission to publish the supplied Justice painting.

## Verification status

- `npm run build` also passed after the visual system was introduced.
- `npm run build` passed after adding all routes; Astro generated 12 static pages, including six service-detail paths.
- Browser installation, E2E tests, MCP inspection, Lighthouse and no-JS checks are pending implementation.
