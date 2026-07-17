# Home Page Design

## Goal
Create minimal Nuxt 3 home page that displays only `Storytime Project` and styles it with SCSS using BEM naming.

## Current Project State
- Fresh Nuxt 3 project.
- `app.vue` still renders `NuxtWelcome`.
- No commits yet.
- No styling stack installed beyond default Nuxt setup.

## Recommended Approach
Use Nuxt's built-in SCSS support with the `sass` package only.

Why this approach:
- Smallest diff.
- Native Nuxt support.
- Keeps project structure clean without adding unnecessary abstractions.

## File Changes
- `package.json` — add `sass` dependency.
- `nuxt.config.ts` — register global stylesheet.
- `app.vue` — render `NuxtPage` instead of welcome screen.
- `pages/index.vue` — add minimal home page markup using BEM.
- `assets/scss/base/_reset.scss` — minimal reset and document defaults.
- `assets/scss/pages/_home.scss` — home page styles.
- `assets/scss/main.scss` — import SCSS partials.

## Structure
### Markup
Home page uses one root block and one element:
- `.home`
- `.home__title`

Rendered text:
- `Storytime Project`

### Styling
Global SCSS will:
- normalize box sizing
- remove default body margin
- set base font stack
- center content on full viewport
- provide simple background and readable text styling

### Nuxt Integration
`nuxt.config.ts` will load `assets/scss/main.scss` globally so page styles are available without per-file imports.

## Error Handling
No runtime error handling needed. Scope is static page only.

## Testing
Verification scope:
- app starts successfully
- home route renders only `Storytime Project`
- styles apply from SCSS without build errors

## Out of Scope
- additional pages
- shared components
- theme system
- design tokens
- responsive variants beyond natural browser behavior
- animation
