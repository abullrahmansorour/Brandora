# Brandora

Brandora is a marketing agency site built with semantic HTML, modular CSS, and vanilla JavaScript. A dependency-free Node build generates static pages for the homepage, blog, and case studies. Vercel runs the contact endpoint.

## Local development

Use Node.js 24.

- `npm run dev` rebuilds the site and serves it at `http://127.0.0.1:3000`. Restart after changing source files.
- `npm run build` generates the deployable site in `dist/`.

Edit the agency content in `src/content/`, page templates in `src/templates/`, and browser assets in `src/assets/`.

## Contact and hosting

The form posts JSON to `POST /api/contact`. Set `CONTACT_FORWARD_URL` in Vercel to forward submissions to the existing webhook. For local testing, use a test webhook URL through the environment or an ignored `.env.local` file. When the variable is unset, the handler logs the lead on the server.

`vercel.json` selects the Other framework preset and preserves the site's extensionless routes. The existing live site is available at [brandoras.vercel.app](https://brandoras.vercel.app/).
