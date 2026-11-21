# CLM Consultants Limited website

Vue 3 single-page website built with Vite, Vue Router, Pinia and Tailwind CSS v4. Public content and contact inquiries use the Laravel `/api/v1` API. Staff authentication uses Sanctum session cookies.

## Development

Start Laravel from `backend/`:

```sh
php artisan serve
```

In another terminal, start Vue from `frontend/`:

```sh
npm install
npm run dev
```

Vite proxies `/api` and `/sanctum` to `http://127.0.0.1:8000`. Configure Laravel's `FRONTEND_URL`, `SANCTUM_STATEFUL_DOMAINS`, session domain and CORS settings for the frontend origin. Run `php artisan migrate --seed` to create the database schema and seed development content.

## Routes and content

The public site includes Home, About, Services and service details, Insights and articles, Contact, Learn and Privacy. Case studies and Learn products are hidden until approved content is published. `/forum` and its subpaths redirect to `/contact`; legacy About, News and Contact URLs redirect to their replacements.

Site copy and service content live in `src/data/`. Keep unconfirmed details and account features unpublished. `ENABLE_ACCOUNTS` in `src/data/features.js` remains `false` until courses and payments are ready.

## Production

Deploy `frontend/` to Vercel with `npm run build` and `dist` as the output directory. `vercel.json` contains the legacy redirects and SPA fallback. Set the Vercel build environment variable `VITE_API_ORIGIN` to the origin serving Laravel; leave it empty only when a separate same-origin proxy is configured. Configure Laravel's CORS and Sanctum stateful domains, session cookie domain and HTTPS settings for the deployed frontend. Do not change domain DNS or mail-exchange records as part of a frontend deployment.

Run backend migrations before deploying the API, including the contact inquiry and Insights category migrations. Configure production SMTP in Laravel (`MAIL_MAILER`, `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`, `MAIL_PASSWORD`, `MAIL_ENCRYPTION`, `MAIL_FROM_ADDRESS` and `MAIL_FROM_NAME`) so contact inquiries can be delivered to `info@clmconsultants.co.tz`. Local `MAIL_MAILER=log` records messages in the application log and does not send email.

## Validation

From `frontend/`, run `npm run build`. From `backend/`, run `php artisan test`.
