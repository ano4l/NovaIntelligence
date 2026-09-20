# Nova Intelligence Showcase

Production-style frontend showcase for Nova Intelligence. All records, hashes,
employers and interactions are fictional. No external services are connected.

## Local development

Requires Node.js 20 or newer and pnpm.

```bash
pnpm install --frozen-lockfile
pnpm run dev
```

## Production build

```bash
pnpm run build
pnpm run preview
```

The production output is generated in `dist/`.

## Vercel

The repository includes `vercel.json`, which configures Vercel to:

- install dependencies with the committed pnpm lockfile;
- run the TypeScript and Vite production build;
- publish the `dist/` directory;
- serve the application entry point for client-side routes.

Import the Git repository into Vercel and deploy with the detected settings. No
environment variables are required for this showcase build.

The page is marked `noindex, nofollow` because it contains fictional showcase
data and is not intended to be publicly indexed yet.
