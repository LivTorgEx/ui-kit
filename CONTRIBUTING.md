# Contributing to @livtorgex/ui-kit

Thanks for your interest in improving the LivTorgEx design system!

## Getting started

```bash
git clone https://github.com/LivTorgEx/ui-kit.git
cd ui-kit
pnpm install
pnpm storybook
```

Storybook runs at <http://localhost:6006>.

## Project structure

```
src/
  components/<Name>/
    <Name>.tsx          # implementation
    <Name>.stories.tsx  # Storybook stories
  index.ts              # public exports
  style.css             # Tailwind v4 entry + tokens
```

Every new component **must**:

1. Live under `src/components/<Name>/`.
2. Export from `src/index.ts`.
3. Include a `<Name>.stories.tsx` covering at least one default state.
4. Use Tailwind v4 utilities — no inline styles, no CSS modules.
5. Be fully typed; no `any`, no `unknown`, no `as` casts (see repo typing rules).
6. Pass `pnpm lint` and `pnpm typecheck` with zero warnings.

## Pull requests

- Branch from `main`. Keep PRs small and focused on one component or fix.
- Run `pnpm lint && pnpm typecheck && pnpm build-storybook` before pushing.
- Update the README component table if you add a new component.
- Describe the visual / API change in the PR body, ideally with a screenshot.

## Commit style

Conventional Commits is encouraged:

- `feat(button): add loading state`
- `fix(select): correct keyboard nav on Esc`
- `chore: bump deps`

## Code of conduct

This project follows the [Code of Conduct](./CODE_OF_CONDUCT.md).

## Questions

Open a discussion or issue on GitHub, or reach us at
[support@livtorgex.com](mailto:support@livtorgex.com).
