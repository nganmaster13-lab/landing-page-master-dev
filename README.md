# Master Dev — studio website

Landing page, Privacy Policy (`/policy`) and Terms of Service (`/terms`) for the Master Dev app studio.

## Run locally

Prerequisites: Node.js

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build in dist/
```

## Deploy to Netlify

The repository includes [`netlify.toml`](netlify.toml), which configures Netlify to run
`npm run build` and publish the generated `dist` directory. Client-side routes such as
`/policy` and `/terms` are redirected to `index.html` so they also work when opened directly.

After connecting the GitHub repository, trigger a new deploy. If the Netlify UI contains
older build settings, use `npm run build` as the build command and `dist` as the publish directory.

## Configuration

All content lives in [`src/data/db.json`](src/data/db.json). There is no config UI on the site — edit the file and rebuild. [`src/data/db.template.json`](src/data/db.template.json) shows the structure, including a template for adding a new app.

| Key | What it controls |
| --- | --- |
| `company` | Studio name, legal name, headline (`tagline`), intro text (`subtagline`), contact `email`, location, working hours |
| `stores.appStore.url` | Apple developer page — used by the App Store badges, store section and footer |
| `stores.googlePlay.url` | Google Play developer page — same places as above |
| `metrics` | The four numbers in the dark band |
| `products` | App cards. Each has its own `appStoreUrl` / `googlePlayUrl`, icon, cover image and details for the popup |
| `pillars` | "How we work" list (`icon` is no longer used) |
| `faq` | Questions section |
| `policyDocument`, `termsDocument` | Text of the `/policy` and `/terms` pages |

Product filter tabs match on `product.category` — if you add a new category, add it to the `categories` list in [`src/components/ProductSection.tsx`](src/components/ProductSection.tsx).

Colors and fonts are defined as theme tokens at the top of [`src/index.css`](src/index.css).
