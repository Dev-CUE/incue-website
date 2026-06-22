# Incue Homepage Completion Report

## Executive status

First production-style homepage artifact is deployed and reviewable.

- Current review URL: `https://incue.frameq.io/`
- Cloudflare Pages production URL: `https://incue-website.pages.dev/`
- GitHub repo: `https://github.com/Dev-CUE/incue-website`
- Local repo: `C:/Athena/repos/incue-website`

## Preflight permission/auth checks

This is now a required gate for future work.

| Service | Check | Result | Notes |
|---|---|---|---|
| Google Drive / PRD | Local Drive export/rules available | PASS | Read `C:/Athena/work/Incue_Home/file_rules.md` and PRD prompt. |
| GitHub | Token-backed `gh` path and push ability | PASS | Repo created and pushed under Dev-CUE. |
| Cloudflare | Vault env file discovery | PASS after correction | Token file existed at `C:/Users/Athena/.hermes/secure-vault/cloudflare.env`; initial miss caused avoidable delay. |
| Cloudflare Pages | Project create/deploy permissions | PASS | Created `incue-website` and deployed. |
| Cloudflare DNS: `frameq.io` | Zone access and DNS edit | PASS | Added `incue.frameq.io` CNAME to Pages target. |
| Cloudflare DNS: `incue.co.kr` | Zone access | NOT AVAILABLE | Current token context did not expose the `incue.co.kr` zone. Custom domains remain pending there. |

## Agent / phase activity log

| Phase | Agent / executor | Work performed | Evidence |
|---|---|---|---|
| PRD/rules intake | Athena main session | Read local Drive rules and homepage PRD prompt. | `C:/Athena/work/Incue_Home/file_rules.md`, PRD prompt file. |
| Fresh-context review | Hermes background subagent `deleg_050274a3` | Audited initial repo against PRD; reported missing pages, SEO, routing, form, and Git gaps. | Async gap report returned in chat. |
| Static site implementation | Athena main session | Implemented full static site scaffold, pages, CSS, JS, sitemap/robots, ATHENA records. | Repo files and commit history. |
| QA pass | Athena main session | Required file check, HTML parser check, forbidden phrase scan, internal link check, local HTTP route checks, browser console check. | `missing []`, `html_parse_ok`, `forbidden_hits []`, `links_checked 452 missing_count 0`, browser console 0 errors. |
| GitHub delivery | Athena main session | Initialized repo, committed, created `Dev-CUE/incue-website`, pushed main branch. | GitHub repo and commits. |
| Cloudflare Pages deployment | Athena main session | Loaded Cloudflare token from secure vault, created Pages project, deployed static root. | `https://incue-website.pages.dev/`, latest deployment URLs. |
| Temporary review domain | Athena main session | Added `incue.frameq.io` Pages custom domain and DNS CNAME. | `https://incue.frameq.io/` returns 200. |
| Reporting update | Athena main session | Added this completion report and deployment report, including known integration gaps. | `ATHENA/reports/`. |

## Implemented site surface

- `/`
- `/service/erp`
- `/service/mes`
- `/service/smart`
- `/solution/atlas`
- `/solution/zerp`
- `/solution/atlasframe`
- `/plus/vcto`
- `/plus/haas`
- `/plus/audit`
- `/reference`
- `/blog`
- `/about`
- `/contact`
- `/privacy.html`
- `/sitemap.html`
- `/sitemap.xml`
- `/404.html`

## QA summary

Latest verified endpoints:

```text
https://incue.frameq.io/                 200
https://incue.frameq.io/service/smart    200
https://incue.frameq.io/blog             200
```

Earlier Pages route checks:

```text
https://incue-website.pages.dev/                 200
https://incue-website.pages.dev/service/smart   200
https://incue-website.pages.dev/solution/zerp   200
https://incue-website.pages.dev/plus/audit      200
https://incue-website.pages.dev/blog            200
```

Browser console:

```text
0 console messages
0 JavaScript errors
```

## DNS / review-domain configuration

Because this site is hosted on **Cloudflare Pages**, the correct DNS shape for the pre-production/review hostname is a proxied **CNAME** to the Pages project, not a manually chosen A record. Cloudflare Pages does not provide a stable origin IP that should be hard-coded as an A record for this use case; Cloudflare handles the edge routing behind the Pages custom-domain binding.

Configured DNS record:

```text
Zone: frameq.io
Type: CNAME
Name: incue.frameq.io
Target: incue-website.pages.dev
Proxy: enabled
TTL: auto
Purpose: pre-production/review domain for Incue homepage
```

Verification:

```text
Cloudflare DNS API: record exists, proxied=true
HTTP: https://incue.frameq.io/ -> 200
```

Reporting rule for future deployments:

```text
Every completion report must include the exact DNS record type, hostname, target, proxy status, TTL, verification result, and rationale when Athena chooses CNAME instead of A/AAAA.
```

## Sitemap fix

Issue: Footer linked directly to `sitemap.xml`, which shows XML/code-like output to human visitors. This is expected for crawlers but bad UX for a visible footer link.

Fix:

- Created human-readable `/sitemap.html`.
- Footer now links to `/sitemap.html` as `사이트맵`.
- Kept `/sitemap.xml` for search engines.
- Updated `robots.txt` to reference `https://incue.frameq.io/sitemap.xml` while this review domain is active.

## Known incomplete integrations / required follow-up

These must be reported explicitly until completed.

### 1. Contact form mail delivery

Current state:

- Contact form is in safe mode.
- It does not send real email yet.

Recommendation:

- For operational stability, prefer **Cloudflare Pages Functions + server-side mail sending** over EmailJS-only operation.
- EmailJS can be a quick MVP path, but server-side Functions better support secret handling, rate limiting, validation, logging, and future CRM routing.

Required follow-up:

- Decide mail provider/API.
- Add Pages Function endpoint.
- Store mail credentials as Cloudflare Pages secrets, not in client JS.
- Add success/failure logging and user-facing error messages.

### 2. Cloudflare Turnstile

Current state:

- The contact page contains a placeholder: `Cloudflare Turnstile 영역 — 사이트 키 입력 예정`.
- No real Turnstile widget/site key is wired yet.

Required follow-up:

- Create Turnstile site key for the active hostname.
- Add client widget to contact form.
- Verify token server-side in Pages Function.
- Block submission if verification fails.

### 3. KakaoTalk channel integration

Current state:

- Header and floating CTA show Kakao/contact intent.
- Actual KakaoTalk channel URL is not configured.
- Current CTA routes to `/contact`.

Required follow-up:

- Provide or confirm KakaoTalk channel URL.
- Replace placeholder CTA links.
- Verify mobile/desktop behavior.
- Consider event tracking for Kakao CTA clicks.

### 4. Real brand/media assets

Current state:

- Text logo and CSS/SVG style visual are used.
- Real logo, customer logos, partner logos, and OG image are not yet finalized.

Required follow-up:

- Add approved logo assets.
- Add `img/og-image.jpg` or update OG image path.
- Add customer/partner logos only after public-use approval.

### 5. `incue.co.kr` final domain

Current state:

- `incue.frameq.io` is working.
- `incue.co.kr` Pages custom domain remains pending because current token/account did not expose the `incue.co.kr` DNS zone.

Required follow-up:

- Confirm authoritative DNS for `incue.co.kr`.
- Add CNAME/required DNS target to `incue-website.pages.dev` in the correct DNS authority.
- Re-check Pages custom domain status.

## Process improvements adopted from Kevin feedback

1. **Preflight auth gate:** before future deployment work, Athena must verify token/env files, account/zone/project visibility, and required permissions before implementation or dispatch.
2. **Agent activity log:** every completion report must state which agent/session handled each phase and what evidence it returned.
3. **Placeholder/incomplete integrations:** form mail delivery, Turnstile, Kakao, Search Console/Naver, and brand assets must be listed as explicit remaining work, not implied as complete.
4. **Human-facing QA:** footer links should not expose raw technical files like XML unless intentionally labeled for crawlers.
