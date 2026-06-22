# Review Gate Checklist

## Preflight gates

- External-service auth checked before work starts.
- Required account/zone/project/repo visibility confirmed before implementation/deployment.
- Token/env file paths recorded with secrets redacted.
- Missing permissions are reported before long-running implementation begins.

## Site implementation gates

- PRD-required pages exist.
- Forbidden claims absent: guarantee-style audit claims, absolute success claims, unconditional cost-reduction claims, unsupported superlatives.
- Main CTA and contact form exist.
- Self-check works.
- Blog posts.json loads.
- `sitemap.xml` and `robots.txt` exist for crawlers.
- Human footer links point to human-readable pages, not raw XML/code-like files.
- `_redirects` does not cause pretty-URL redirect loops on Cloudflare Pages.
- Mobile nav works.
- No secrets in files.

## Completion report gates

- Include agent/phase activity log: which agent did what, when, and with what evidence.
- Include exact verification commands/results or observed evidence.
- Include deployment URL and browser console status.
- Include known incomplete integrations, especially:
  - Cloudflare Pages Functions/server-side mail vs EmailJS-only status.
  - Cloudflare Turnstile site key/widget/server verification status.
  - KakaoTalk channel URL/integration status.
  - Search Console/Naver ownership status.
  - Real logo/OG/client/partner asset status.
- Include Cloudflare Pages settings and custom-domain/DNS status.
- Include exact DNS record details for every configured hostname: record type, name, target/content, proxy status, TTL, zone, verification result, and rationale when CNAME is used instead of A/AAAA.
