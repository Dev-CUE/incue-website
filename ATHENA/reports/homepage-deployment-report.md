# Incue Homepage Deployment Report

## Status

- Static homepage implementation: DONE
- GitHub repository and commits: DONE
- Cloudflare Pages project: CREATED
- Cloudflare Pages production deployment: DONE
- Custom domain `incue.co.kr`: PENDING / DNS not controlled by current token context

## Corrected Cloudflare Auth Finding

The Cloudflare token file did exist. It was located at:

- `C:/Users/Athena/.hermes/secure-vault/cloudflare.env`
- `C:/Athena/home/.hermes/secure-vault/cloudflare.env`

Token value was not printed. Variables present:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_ZONE_ID`
- `CLOUDFLARE_ZONE_NAME`

`wrangler whoami` succeeded after sourcing the env file.

## Repository

- Local path: `C:/Athena/repos/incue-website`
- GitHub: `https://github.com/Dev-CUE/incue-website`
- Branch: `main`
- Latest commit: `d113b7a fix: avoid Cloudflare Pages pretty URL redirect loops`

## Cloudflare Pages

- Project: `incue-website`
- Production URL: `https://incue-website.pages.dev/`
- Latest deployment URL: `https://954419ff.incue-website.pages.dev`
- Framework preset: None
- Build command: empty
- Output directory: repository root

## Verified URLs

```text
https://incue-website.pages.dev/                 200
https://incue-website.pages.dev/service/smart   200
https://incue-website.pages.dev/solution/zerp   200
https://incue-website.pages.dev/plus/audit      200
https://incue-website.pages.dev/blog            200
```

Browser console on deployed homepage:

```text
0 console messages
0 JavaScript errors
```

## Custom Domain Status

Cloudflare Pages custom domains were added:

- `incue.co.kr`: pending
- `www.incue.co.kr`: pending

However, the currently loaded Cloudflare zone context lists only the `frameq.io` zone, not the `incue.co.kr` zone. Therefore Athena could not correctly create DNS records for `incue.co.kr` in this token/account context.

An attempted DNS record creation landed in the wrong zone as `incue.co.kr.frameq.io` / `www.incue.co.kr.frameq.io`; those wrong-zone records were immediately deleted.

Current external checks:

- `https://www.incue.co.kr/` still serves the older site title `Incue - Enterprise IT Solutions`.
- `https://incue.co.kr/` does not yet serve the new Cloudflare Pages site.

## Remaining Action for incue.co.kr

Need access to the Cloudflare zone/account that actually manages `incue.co.kr`, or DNS changes at the registrar/current DNS host:

```text
incue.co.kr      CNAME / proxied target: incue-website.pages.dev
www.incue.co.kr  CNAME / proxied target: incue-website.pages.dev
```

Once DNS points correctly, Pages custom domain verification should move from `pending` to active.
