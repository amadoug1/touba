# Deployment Optimization Checklist

Use this after `npm run build` to get full production performance.

## 1) Serve frontend assets with long-lived cache headers

- `*.js`, `*.css`, images, fonts:
  - `Cache-Control: public, max-age=31536000, immutable`
- `index.html`:
  - `Cache-Control: no-cache`

Reason: hashed asset files can be cached for a year safely; HTML should always revalidate.

## 2) Keep compression enabled

- Brotli preferred, gzip fallback.
- Backend API gzip is already enabled in `/backend/server.py`.

## 3) Recommended reverse-proxy headers (example)

### Nginx (example)

```nginx
location /static/ {
  add_header Cache-Control "public, max-age=31536000, immutable";
}

location = /index.html {
  add_header Cache-Control "no-cache";
}

gzip on;
gzip_types text/css application/javascript application/json text/plain image/svg+xml;
gzip_min_length 1024;
```

## 4) Validate in production

- Chrome DevTools > Network:
  - Confirm `Cache-Control` on static assets and API.
  - Confirm `content-encoding: br` or `gzip` on responses.
- Run Lighthouse in production mode (not dev server) and check:
  - Performance
  - Best Practices
  - SEO

## 5) Vercel-specific notes

- Vercel already serves Brotli/gzip for static assets.
- Use root `vercel.json` in this repo for:
  - SPA fallback routing
  - API route mapping (`/api/*` to Python function)
  - Static cache headers
- Set environment variables in Vercel Project Settings:
  - `MONGO_URL`
  - `DB_NAME`
  - `STRIPE_API_KEY` (optional)
