# Incue Homepage Implementation Brief

Fresh-context worker task. Source PRD: `C:/Athena/work/Incue_Home/Incue_홈페이지_ClaudeCode_프롬프트 (아틀라스).md`.

## Scope
Build the static Incue homepage and supporting pages from the PRD using HTML/CSS/JS. Cloudflare Pages target: static root output, no build command.

## Allowed files
- HTML pages under root/service/solution/plus/blog/reference/about/contact
- css/style.css
- js/*.js
- robots.txt, sitemap.xml, _redirects, README.md

## Forbidden
- No secrets, no deploy from coding worker, no Cloudflare settings changes by worker, no aggressive marketing claims, no guarantee language.

## Verification
- Static file existence check
- Link/redirect coverage check
- Local HTTP smoke test
- Browser console check
- Cloudflare deploy readiness report
