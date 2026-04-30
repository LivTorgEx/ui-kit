# @livtorgex/ui-kit

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Storybook](https://img.shields.io/badge/Storybook-FF4785?logo=storybook&logoColor=white)](https://ui.livtorgex.com)
[![Made by LivTorgEx](https://img.shields.io/badge/made%20by-livtorgex.com-0d9488)](https://livtorgex.com)

The official design system and React component library for the
[**LivTorgEx**](https://livtorgex.com) trading platform — built with
**React 19**, **TypeScript**, and **Tailwind CSS v4**.

> Source ships unbuilt. Consumers transpile via Next.js `transpilePackages`,
> Vite, or any modern bundler. No build step is required at install time.

---

## Components

| Component  | Description                                   |
| ---------- | --------------------------------------------- |
| `Button`   | Primary, secondary, ghost variants            |
| `Badge`    | Status/label pills                            |
| `Card`     | Surface container with header / body / footer |
| `Input`    | Text input with label, hint, error states    |
| `Select`   | Dropdown select                               |
| `Alert`    | Info, success, warning, danger banners       |
| `StatTile` | KPI / metric tile                             |
| `DataRow`  | Label / value row for detail views           |
| `Skeleton` | Loading placeholder                           |
| `Spinner`  | Inline loading spinner                        |

Browse the live Storybook → **<https://ui.livtorgex.com>**

---

## Installation

This package is distributed directly from GitHub (the repository is public).
No registry login required.

```bash
pnpm add github:LivTorgEx/ui-kit#main
# or pin to a tag once releases exist:
# pnpm add github:LivTorgEx/ui-kit#v0.1.0
```

`react`, `react-dom`, and `tailwindcss` are peer dependencies — install them in
your app if you haven't already.

### Bundler / framework setup

#### Next.js (App Router)

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@livtorgex/ui-kit"],
};

export default nextConfig;
```

#### Vite

Vite handles TS/TSX in dependencies by default — no extra config needed.

### Tailwind v4

Import the kit's stylesheet once in your global CSS entrypoint:

```css
@import "tailwindcss";
@import "@livtorgex/ui-kit/style.css";
```

---

## Usage

```tsx
import { Button, Card, StatTile } from "@livtorgex/ui-kit";

export default function Dashboard() {
  return (
    <Card>
      <StatTile label="24h Volume" value="$1.2M" delta="+8.4%" />
      <Button variant="primary" size="lg">
        Start trading
      </Button>
    </Card>
  );
}
```

---

## Development

```bash
pnpm install
pnpm storybook       # http://localhost:6006
pnpm typecheck
pnpm lint
pnpm build           # emits .d.ts to dist/ (sources still ship from src/)
pnpm build-storybook # static Storybook to storybook-static/
```

The repo also ships a `Dockerfile` + `nginx.conf` that serves the built
Storybook — used to deploy <https://ui.livtorgex.com>.

---

## Contributing

We welcome issues and pull requests. Please read
[CONTRIBUTING.md](./CONTRIBUTING.md) before opening a PR, and abide by our
[Code of Conduct](./CODE_OF_CONDUCT.md).

For security disclosures, see [SECURITY.md](./SECURITY.md).

---

## License

[MIT](./LICENSE) © [LivTorgEx](https://livtorgex.com)
