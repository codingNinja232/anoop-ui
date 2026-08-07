# Coronary Pressure Atlas

A dark-mode, data-dense visualization of pressure drop across a coronary artery blockage. Built with **Next.js (App Router)**, **React 19**, **TypeScript**, and **Recharts**.

Illustrative model for educational purposes — not medical advice. Hemodynamic data is simulated.

## Tech Stack

- Next.js (App Router, static export)
- React 19
- TypeScript (strict)
- Recharts
- CSS Modules + design tokens (`src/styles/tokens.css`)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000/anoop-ui](http://localhost:3000/anoop-ui) with your browser to see the result.

> The app uses a `basePath` of `/anoop-ui` so it works under GitHub Pages. To run without the prefix, set `PAGES_BASE_PATH=""` before running `npm run dev`.

## Scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Lint + build the static export into `out/` |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint |

## Deploying to GitHub Pages

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that builds the site as a static export and publishes it to GitHub Pages on every push to `main`.

1. In the GitHub UI, go to **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push a commit to `main` (or run the workflow manually from the **Actions** tab).
4. The site will be live at `https://<your-username>.github.io/anoop-ui/`.

If you rename the repository, update the `basePath` fallback in `next.config.ts` to match the new repo name (the workflow sets the correct value automatically via `actions/configure-pages`).

## Learn More

- [Next.js static export](https://nextjs.org/docs/app/building-your-application/deploying/static-exports)
- [Official GitHub Pages deploy template](https://github.com/nextjs/deploy-github-pages)
