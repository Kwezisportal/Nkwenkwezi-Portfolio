# How to edit your portfolio

You only need two files for almost everything:

| What you want to change | Where |
|---|---|
| Any text (hero, about, contact, footer, button labels) | `content/site.js` |
| Projects (add, remove, hide, feature, archive, reorder, categories) | `content/site.js`, in the `projects` list |
| Links (email, LinkedIn, Instagram, Canva, presentations) | `content/site.js`, in `links` and each project's `presentationLink` |
| Images | Put files in `images/`, then type the path in `content/site.js` |
| Your CV | Put your PDF in `cv/`, named `Kwezi-CV.pdf` |
| Colours, fonts, sizes, spacing, buttons | `styles/tokens.css` |

You never need to open `index.html`, `styles/main.css` or `scripts/render.js` for routine updates.

## Text
Open `content/site.js`, find the words, change what's between the quote marks, save, refresh the browser.

## Projects
Each project is one block in the `projects` list.

- **Hide:** `visible: false`
- **Show on the homepage:** `featured: true` (two or three is plenty)
- **Move to the Archive:** `featured: false`
- **Change order:** change `order` (1 shows first)
- **Categories:** `categories: ["Brand", "Social"]`. Use as many as you like.
- **Full case study page:** `caseStudy: { enabled: true, sections: [...] }`
- **Summary + link only:** `caseStudy: { enabled: false }` and fill `presentationLink`
- **Add a new one:** copy the TEMPLATE block at the bottom of the list, paste it above, give it a new `id`, set `visible: true`.

Any field left as `""` is hidden automatically, so you never get empty headings.

## Images
1. Save your image into `images/projects/` (or `images/hero/` for the homepage image). Use simple names with no spaces, e.g. `sofa-cover.jpg`.
2. In `content/site.js`, set the path and describe the image:
   ```js
   coverImage: { src: "images/projects/sofa-cover.jpg", alt: "Campaign key visual for Sofa Symphony", caption: "" },
   ```
3. Extra images go in `galleryImages`:
   ```js
   galleryImages: [
     { src: "images/projects/sofa-01.jpg", alt: "Persona slide", caption: "Five audience personas" },
     { src: "images/projects/sofa-02.jpg", alt: "Content plan", caption: "" },
   ],
   ```
Until a project has a cover image, the site shows a plain colour panel with the project name (set by `coverStyle`: blush, olive, espresso or cream). It never shows fake images.

Wide images (landscape, around 1600px wide) work best for covers. Keep each file under about 500KB so the site stays fast.

## Links
In `content/site.js` under `links`, paste full addresses starting with `https://`. Email is just the address. Empty links are hidden everywhere (contact section and footer).

For a Canva deck, use Canva's **Share → View-only link** and paste it into the project's `presentationLink.url`.

## CV
Save your CV as a PDF called `Kwezi-CV.pdf` into the `cv/` folder. To use a different name, change `cv.file` in `content/site.js` to match. Both Download CV buttons use that one setting.

## Colours and fonts
Open `styles/tokens.css`. The four brand colours are at the top. Fonts are `--font-display`, `--font-accent` and `--font-body`. If you swap a font, also update the Google Fonts link in `index.html`.

## Previewing
Double-click `index.html` to open it in your browser. Refresh after every save.

If the page goes blank after an edit, you've most likely missed a comma or a quote mark in `content/site.js`. Check the last thing you changed.

## Putting it online (free)
Drag the whole folder onto **Netlify Drop** (app.netlify.com/drop) or upload it to **GitHub Pages**. It's plain HTML, so no build step or paid plan is needed.
