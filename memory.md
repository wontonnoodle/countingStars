# countingStars — Project Memory

## What This Is

A wireframe website that serves as both a development workspace and the eventual finished product. The goal is to eliminate fragmentation — one environment where content work and site structure converge into a sales-ready website.

The test product is a deck of cards called **Counting Stars**.

## Live URLs

- **Site:** https://jocular-selkie-bed53f.netlify.app
- **Admin/CMS:** https://jocular-selkie-bed53f.netlify.app/admin
- **GitHub repo:** https://github.com/wontonnoodle/countingStars

## Stack

| Layer | Tool | Role |
|-------|------|------|
| Framework | Astro v6 | Static site builder, content-first |
| CMS | Decap CMS v3 | Browser-based content editor at `/admin` |
| Hosting | Netlify | Auto-deploy on GitHub push, Identity auth |
| Version control | GitHub | Source of truth for all files |
| Auth | Netlify Identity | Login for Decap CMS, invite-only |

## Workflow

```
Write in Decap → Decap commits to GitHub → Netlify rebuilds → Live site updates
```

For structural changes (templates, layout, config), edit files locally and push via Terminal.

## Current Site Structure

### Pages
- **Home** (`/`) — Hero with headline, subheadline, CTA button
- **Product** (`/product`) — Product details, image placeholder, buy button placeholder
- **Blog** (`/blog`) — List of posts with links to individual entries
- **Our story** (`/story`) — Brand story page (file still named `about.md` internally; URL and label both use "story")

### Navigation
- Site nav: Home, Product, Blog, Our story, Admin (subtle link)
- Admin bar: "View Site →" link opens live site in new tab

### Content Collections (editable in Decap)
- **Pages** — Home, Product, About (file-based collection; "About" label still used in Decap)
- **Blog** — Create unlimited posts (folder-based collection)

### Decap Preview Templates
- All four content types have live preview panels in the CMS
- Preview styles match the site's minimal design

## Key Decisions Made

1. **Astro + Decap over alternatives** — Chose over Webflow (cost, code ownership), Ghost (less design control), and Notion-based options (limited design). Full code ownership, free hosting, content-first workflow.

2. **Clean build over starter template** — Built from scratch so the bones are ours from day one.

3. **Browser-based editing preferred** — James prefers writing content in browser (Decap) over text editor. Terminal used only for structural changes.

4. **Clean and minimal design** — Black, white, system fonts. Basic functionality first, then bring in reference sites for visual direction.

5. **No blog preview on home page** — Removed per preference. Home is hero + CTA only.

6. **Netlify subdomain for now** — No custom domain yet. Can add later.

## Key Technical Details

### Astro v6 Specifics
- Content collections require `glob` loader in `content.config.ts` (not the older type-based API)
- Rendering uses `import { render } from "astro:content"` then `render(entry)` — NOT `entry.render()`
- Scripts from external CDNs require `is:inline` attribute or Astro's bundler breaks them
- `<style>` in `Base.astro` needs `is:global` so layout CSS applies to `<body>` and content

### CSS Gotchas
- `Base.astro` uses a universal reset (`* { margin: 0 }`) which wipes browser defaults on `<p>`, headings, and lists. Spacing for these elements inside `<main>` is restored explicitly — don't remove those rules or rich-text content will render with no paragraph breaks

### Netlify Identity Setup
- Registration set to **Invite only**
- Identity widget script belongs **only** on the admin page (`public/admin/index.html`), NOT in `Base.astro`
- If the widget loads on the main site, the "View Site →" button from `/admin` redirect-loops back to admin (the widget auto-logs you back in). This bug has recurred twice — once via Decap edit, once via a github.com web edit
- Admin page needs the identity widget script in `<head>` for auth to work
- Password reset/invite links require the identity widget to be deployed before they'll function

### File Structure
```
countingStars/
├── public/
│   └── admin/
│       ├── index.html          # Decap CMS entry point + preview templates
│       └── config.yml          # CMS collection definitions
├── src/
│   ├── content/
│   │   ├── blog/
│   │   │   └── first-post.md
│   │   └── pages/
│   │       ├── home.md
│   │       ├── product.md
│   │       └── about.md
│   ├── layouts/
│   │   └── Base.astro          # Shared nav, footer, CSS
│   ├── pages/
│   │   ├── index.astro         # Home template
│   │   ├── product.astro       # Product template
│   │   ├── story.astro         # Our story template (URL: /story)
│   │   └── blog/
│   │       ├── index.astro     # Blog list template
│   │       └── [...slug].astro # Individual post template
│   └── content.config.ts       # Collection schemas
└── package.json
```

## Git Workflow Notes
- GitHub auth uses Personal Access Token (starts with `ghp_`)
- Token is entered as password when prompted
- Always run `git add .` before `git commit` — forgetting this means nothing gets committed
- Dev server must be stopped or use a separate Terminal tab for git commands
- Always `git pull` before making local changes — Decap commits directly to GitHub, so the remote can be ahead
- **Content files are Decap's territory** (`src/content/pages/*.md`, `src/content/blog/*.md`) — avoid editing them locally; if necessary, pull first. Conflicts here risk losing written content.
- **Structural files are local territory** (`src/layouts/`, `src/pages/`, `public/admin/`) — Decap never touches these, so no conflict risk
- **Editing files directly on github.com counts as a "local" change** — bypasses local history and can reintroduce bugs (this is how the Identity widget got re-added to `Base.astro`)

## Session Start Workflow
Git pull is never automatic. Start every session with:
```
git status   # check for uncommitted local changes
git pull     # bring in remote changes (Decap edits, GitHub web edits, other machines)
```
If `git status` shows local changes, resolve those before pulling to avoid conflicts. Claude can run these at the start of a session — just ask "pull and let's get started".

## What's Next

### Immediate priorities
1. **Visual direction** — Find reference sites to guide wireframe evolution
2. **Expand content structure** — Add fields for product pricing, images, contact info
3. **Fill out Our story page** — Real content is in, but could be expanded

### Future iterations
- Custom domain setup
- Product images and media management
- E-commerce integration (purchase/order flow)
- Design refinement from wireframe to polished
- SEO metadata fields in content collections
- Contact page or form
- Clean up git identity (currently using Mac hostname)
- Consider SSH keys for GitHub auth (eliminates token entry)

## Session Date
May 19, 2026
