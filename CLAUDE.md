# CLAUDE.md

Project context for Claude Code assistance.

## Project Overview

Personal bilingual portfolio website (English/Chinese) for Shihao Deng. Static site using vanilla HTML, CSS, and jQuery.

## Tech Stack

- HTML5, CSS3, jQuery 3.7.1
- Remix Icon 4.5.0 (CDN)
- Google Fonts - Geist (CDN)
- No build system required

## File Structure

```
index.html          # English version
index.zh.html       # Chinese version
css/style.css       # Shared stylesheet
js/jquery-3.7.1.min.js
json/articles.json  # Blog article metadata
```

## Development

```bash
# Serve locally
python3 -m http.server 8000

# Git workflow
git add <files> && git commit -m "message" && git push origin main
```

## Conventions

- Language files: `index.html` (EN), `index.zh.html` (ZH)
- CSS class naming: kebab-case (`.content-container`)
- Icons: Remix Icon classes (`ri-github-line`)
- Articles stored in `json/articles.json` with structure:
  ```json
  {"title": "", "url": "", "date": "", "category": "", "category_url": "", "summary": ""}
  ```

## Key Patterns

- Bilingual: separate HTML files, shared CSS
- Glassmorphism UI with backdrop-filter blur
- Flexbox-based responsive layout
- Fixed nav header with blur effect
- Color accent: #0088a9 (teal)
