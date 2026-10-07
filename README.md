# Olli Järvinen — Data & Business Analytics portfolio

Static portfolio site built with the generated Sites/Vinext app-router scaffold. It is designed to deploy to GitHub Pages and can also be hosted as a static Sites project.

## Local development

```bash
npm install
npm run dev
```

Open the local URL printed by the dev server. A production build can be checked with:

```bash
npm run build
```

## Editing content

- Update the homepage copy in `app/page.tsx`.
- Update shared navigation, footer, tags, and visuals in `app/components/site.tsx`.
- Update the project collection in `app/data/projects.ts`. Adding another project object automatically makes it appear in the project index; create a matching visual or content section only when the case study needs something specific.
- Update the thesis content in `app/thesis/page.tsx`.
- Update education, CV, and About copy in their respective `app/*/page.tsx` files.
- Replace placeholder links such as `hello@example.com`, GitHub, LinkedIn, and document paths before publishing.

## Adding a project

Add a new object to `app/data/projects.ts` with a unique `slug`. The dynamic route at `app/projects/[slug]/page.tsx` uses `generateStaticParams`, so the new case-study URL is generated during the static build.

## Documents

Add final PDFs to `public/documents/` using the filenames referenced in the pages, or update the links to match your preferred filenames. The current UI deliberately labels these as placeholders.

## GitHub Pages deployment

The workflow in `.github/workflows/deploy.yml` builds the static export and deploys it with GitHub Pages. Push the repository to GitHub, enable Pages with **GitHub Actions** as the source, then push to `main`.

The default workflow assumes a user/organization Pages repository or a custom domain. If you publish from a project repository, set `NEXT_PUBLIC_BASE_PATH` to `/${{ github.event.repository.name }}` in the build step after confirming the repository name, then update the site URL metadata in `app/layout.tsx`.

## Finland Fiscal Lab

The homepage and project index link to `/projects/finland-fiscal-lab`. The case study includes real screenshots, methodology, validation and an **Open interactive tool** link. The application is included beneath this same site at `/finland-fiscal-lab/`, with a return link to its case study. It needs no backend or separate hosting.

The full static application is tracked in `public/finland-fiscal-lab/` and copied into the portfolio’s static output by the existing build. Do not remove its hashed assets or `.nojekyll` file. Future source updates can be copied in with:

```sh
node scripts/update-fiscal-lab.mjs "../fix the Finnish deficit 2027"
npm run build
```

The update command requires the Fiscal Lab source checkout and its build dependencies. GitHub Pages builds need only the already-prepared public files. The tool is an exploratory prototype: its policy estimates and illustrative assumptions are not official forecasts or validated reform costings.
