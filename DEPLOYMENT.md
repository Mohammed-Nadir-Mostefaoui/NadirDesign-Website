# Deploying to GitHub Pages + Cloudflare domain

This site has no build step, so GitHub Pages can serve it directly from the repo root.

## 1. Push to GitHub

```bash
cd "Personal website V2"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## 2. Enable GitHub Pages

1. On GitHub, open the repo → **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Branch: `main`, folder: `/ (root)`. Save.
4. GitHub gives you a URL like `https://<your-username>.github.io/<repo-name>/` — confirm the site loads there before moving on.

## 3. Add the custom domain

1. Still in **Settings → Pages**, under **Custom domain**, enter your domain (e.g. `nadirdesign.com` or `www.nadirdesign.com`) and save. GitHub creates a `CNAME` file at the repo root containing that domain — commit and push it if it doesn't appear automatically.
2. Leave **Enforce HTTPS** unchecked for now — it can't be enabled until DNS resolves and GitHub issues a certificate (step 5).

## 4. Configure DNS in Cloudflare

In the Cloudflare dashboard, under **DNS → Records**, add:

**If using the apex/root domain** (`nadirdesign.com`):

| Type | Name | Content |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |

**If using `www`:**

| Type | Name | Content |
|---|---|---|
| CNAME | www | `<your-username>.github.io` |

Most setups add both: apex A records plus a `www` CNAME, then redirect one to the other from GitHub's custom domain setting.

**Important:** set every one of these records to **DNS only** (grey cloud, not orange/proxied). GitHub can't issue or renew its TLS certificate through Cloudflare's proxy — the cert request fails silently if proxied. You can switch to proxied later, but it isn't required.

## 5. Wait for DNS + certificate

- DNS propagation is usually minutes, occasionally up to a few hours.
- Back in **Settings → Pages**, GitHub will show "DNS check successful" once it sees the records, then automatically provisions a Let's Encrypt certificate (can take up to ~24h, usually much faster).
- Once the certificate is ready, check **Enforce HTTPS**.

## 6. Verify

- Visit `https://<your-domain>` and confirm the padlock/HTTPS is active.
- Test both `www` and apex if you configured both, and confirm the redirect direction is what you intended.
- Check dark/light mode, language switching, and the footer contact form still work on the live URL.

## Notes

- Any future change just needs `git add . && git commit -m "..." && git push` — GitHub Pages redeploys automatically, no build step.
- If you ever rename the repo or move to a different GitHub account, the `CNAME` file and the DNS records both need updating.
