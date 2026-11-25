# Zarwa & Usama — Wedding Invitation Website

An interactive wedding invitation. A silk-wrapped card unties, the guest taps the Z & U wax seal, the gatefold opens and the invitation details follow.

- **Live:** https://theforeverletter.netlify.app
- **Repository:** https://github.com/hanzala9898/Wedding-Invitation

Made by Hanzala Shahzad.

---

## Files

All files sit together in one folder, with no sub-folders. Keep it that way: the code links to the files by plain name (e.g. `clip1.mp4`).

| File | What it is |
|---|---|
| `index.html` | **All the text:** names, date, venue, schedule, dress code, gifts, footer |
| `style.css` | Colours, fonts, sizes, layout |
| `main.js` | Countdown date (top of file) and the opening animation logic |
| `clip1.mp4` | Video 1: bow loosens, silk slides away, ends on the seal |
| `clip2.mp4` | Video 2: seal cracks, gatefold opens onto the ivory card |
| `poster.jpg` | First frame of clip1 (shown before tapping) |
| `og.jpg` | 1200 × 630 link preview image for WhatsApp / Facebook |
| `ivory.jpg` | The deckle-edged ivory card used as the frame of every section |
| `rose.webp` | Embossed rose in the page corners |
| `seal.webp` | Z & U wax seal (footer) |
| `venue.jpg` | Colour-graded photo of Bel Avenir |
| `venue-original.jpg` | Original Bel Avenir photo, before editing |
| `1-start-frame-silk-wrapped.png`, `2-unwrapped-seal-aligned.png`, `3-gatefold-open.png` | The approved AI images the videos were made from. Not used by the website; kept for future edits. |
| `netlify.toml` | Netlify settings (no build step needed) |
| `PROJECT-NOTES.md` | Full history, decisions and every prompt used |

---

## Making changes in VS Code

### Common edits

| What to change | Where |
|---|---|
| Bismillah and verse on the opening card (page 1) | `index.html` → section **1. OPENING**, inside `<div class="inv">` |
| Invitation wording and names (page 2) | `index.html` → **Page 2: the invitation** card |
| Venue name, address, photo, map link | `index.html` → **Venue** card |
| Schedule (times and events) | `index.html` → **The Barat Day** card, one `<li>` per event |
| Dress code or gifts text | `index.html` → those cards |
| Phone number, footer text, "Made by" | `index.html` → `<footer>` |
| Countdown date and time | `main.js` → `WEDDING_DATE` on line 8 |
| Colours | `style.css` → `:root` at the top |

### Add a new section
Copy any `<article class="sheet rv"> … </article>` block in `index.html`, paste it where you want it, and change the title and text.

### Change a schedule item
```html
<li><time>3:00 PM</time><div><h3>Rasm</h3></div></li>
```

### Hide something without deleting it
Wrap it in an HTML comment:
```html
<!-- <p class="lead">Canal Road</p> -->
```

### Update "Add to calendar"
The link in the Venue card contains `dates=20270109T080000Z/20270109T120000Z`. These are **UTC** times, so Pakistan time minus 5 hours: 1 PM PKT = `080000Z`, 5 PM PKT = `120000Z`.

### Replace a video
Export as vertical **1080 × 1920 MP4 (H.264)**, keep it under ~5 MB, and save it with the same name (`clip1.mp4` or `clip2.mp4`). If clip1 changes, also replace `poster.jpg` with its first frame.

> **After replacing any file** (photo, video, style.css, main.js): in `index.html` (and in `style.css` for `poster.jpg` / `ivory.jpg`), change `?v=3` to `?v=4` after that file's name. Otherwise phones may keep showing the old cached copy.

> **Important:** the "Tap the seal" ring is positioned for where the seal sits in the last frame of clip1 (`left:49.2%; top:38.3%` on `#sealBtn` in `style.css`). Adjust it if the seal moves.

---

## Preview on your computer

Videos don't play when you double-click `index.html`, so use a local server:

1. In VS Code, install the extension **Live Server** (by Ritwick Dey).
2. Right-click `index.html` → **Open with Live Server**.
3. To test on your phone, open the address it shows (e.g. `http://192.168.x.x:5500`) on a phone on the same Wi-Fi.

---

## Publishing changes

The site is already connected: **GitHub → Netlify**. Every change pushed to GitHub goes live in about a minute.

**From VS Code** (after cloning the repository):
```bash
git add .
git commit -m "Describe what you changed"
git push
```

**Or on the GitHub website:** open the file → pencil icon (Edit) → make the change → **Commit changes**. To replace a file (e.g. a new video), use **Add file → Upload files** with the same file name.

After it goes live, reload the site with **Ctrl + Shift + R** to skip the old cached version.

> Don't upload files inside folders. Everything must stay in the main folder, or the page will load without its design, videos and pictures.

---

## How the opening works

The page has five states, set as a class on `<body>` by `main.js`:

| State | What the guest sees |
|---|---|
| `s0` | Silk-wrapped card, "A letter for you — tap to open" |
| `s1` | Video 1 plays: bow loosens, silk slides away |
| `s2` | Paused on the wax seal, gold halo, "Tap the seal" |
| `s3` | Video 2 plays: seal cracks, gatefold opens |
| `s4` | Invitation text fades onto the ivory card, details scroll below |

There's a **Skip** button during the opening, and **Replay the opening** in the footer.
