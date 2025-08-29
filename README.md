# Professional Portfolio (Offline-Friendly)

This repo contains a simple, fully offline portfolio website you can open directly in a browser. No package installs, no CDNs, no build tools.

## How to use

- Open `index.html` in your browser to view the site.
- Edit the content in the HTML files to personalize:
  - `index.html`: Hero, featured projects, resume link
  - `about.html`: Bio, skills, values
  - `projects.html`: Full project list
  - `contact.html`: Email and social links
- Replace placeholder text and update links (e.g., your email, LinkedIn, GitHub).
- The image `Elisa-1.jpg` and resume file `E_Rode_Resume_2024.docx` are currently referenced from the repo root. You can keep them there or move them into `assets/` and update the links.

## Editing Tips

- Keep project cards concise: problem → solution → impact → tech.
- Prefer PNG/JPG images stored locally to keep everything offline.
- For a printable resume link, consider exporting to PDF and updating the link.

## Structure

- `index.html` — Landing page
- `about.html` — About and skills
- `projects.html` — Projects overview
- `contact.html` — Contact methods
- `css/styles.css` — Styles (no external fonts)
- `assets/` — Optional folder for images and documents

## Offline by design

- No external fonts, icons, or scripts.
- Uses a system-font stack and pure CSS for responsiveness.

## Next steps (optional)

- If you later want a blog or templates, we can introduce a static site generator. That would require installing tooling and (brief) network access to fetch dependencies.
