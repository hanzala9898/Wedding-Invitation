# Zarwa & Usama — Wedding Invitation Website

An interactive wedding invitation. A silk-wrapped card unties, the guest taps the Z & U wax seal, the gatefold opens and the invitation details follow.

Made by Hanzala Shahzad.

---

## Project structure

```
zarwa-usama-invitation/
├── index.html          ← ALL the text: names, date, venue, schedule, dress code, gifts, footer
├── css/style.css       ← colours, fonts, sizes, layout
├── js/main.js          ← countdown date (top of file) and the opening animation logic
├── assets/
│   ├── clip1.mp4       ← video 1: bow loosens, silk slides away, ends on the seal
│   ├── clip2.mp4       ← video 2: seal cracks, gatefold opens onto the ivory card
│   ├── poster.jpg      ← first frame of clip1 (shown before tapping, and as link preview)
│   ├── ivory.jpg       ← the deckle-edged ivory card used as the frame of every section
│   ├── rose.webp       ← embossed rose in the page corners
│   ├── seal.webp       ← Z & U wax seal (footer)
│   └── venue.jpg       ← colour-graded photo of the hall
├── design-source/      ← the original approved AI images (keep for future edits/videos)
├── netlify.toml        ← Netlify settings (no build step needed)
├── PROJECT-NOTES.md    ← full history, decisions and every prompt used
└── README.md
```

---

## Making changes in VS Code

### Common edits

| What to change | Where |
|---|---|
| Names, date, venue on the opening card | `index.html` → section **1. OPENING**, inside `<div class="inv">` |
| Venue name, address, photo, map link | `index.html` → **Venue** card |
| Schedule (times and events) | `index.html` → **The day** card, one `<li>` per event |
| Dress code or gifts text | `index.html` → those cards |
| Phone number, footer text, "Made by" | `index.html` → `<footer>` |
| Countdown date and time | `js/main.js` → `WEDDING_DATE` on line 8 |
| Colours | `css/style.css` → `:root` at the top |

### Add a new section
Copy any `<article class="sheet rv"> … </article>` block in `index.html`, paste it where you want it, and change the title and text.

### Change a schedule item
```html
<li><time>3:00 PM</time><div><h3>Rasm</h3></div></li>
```

### Update "Add to calendar"
The link in the Venue card contains `dates=20270109T080000Z/20270109T120000Z`. These are **UTC** times, so Pakistan time minus 5 hours: 1 PM PKT = `080000Z`, 5 PM PKT = `120000Z`.

### Replace a video
Export as vertical **1080 × 1920 MP4 (H.264)** and keep each file under ~5 MB. Save it over `assets/clip1.mp4` or `assets/clip2.mp4`. If clip1 changes, also replace `assets/poster.jpg` with its first frame.

> **Important:** if you replace clip1, the "Tap the seal" ring is positioned for where the seal sits in the last frame (`left:49.2%; top:38.3%` on `#sealBtn` in `style.css`). Adjust it if the seal moves.

---

## Preview on your computer

Videos don't play when you double-click `index.html`, so use a local server:

1. In VS Code, install the extension **Live Server** (by Ritwick Dey).
2. Right-click `index.html` → **Open with Live Server**.
3. To test on your phone, open the address it shows (e.g. `http://192.168.x.x:5500`) on a phone on the same Wi-Fi.

---

## Put it on GitHub

In the VS Code terminal, inside the project folder:

```bash
git init
git add .
git commit -m "Zarwa & Usama wedding invitation"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/zarwa-usama-invitation.git
git push -u origin main
```

(Create the empty repository on github.com first, with the same name, and without a README.)

---

## Publish on Netlify

1. Go to **app.netlify.com** → **Add new site** → **Import an existing project** → **GitHub**.
2. Choose the `zarwa-usama-invitation` repository.
3. Settings: **Build command:** leave empty. **Publish directory:** `.`
4. Click **Deploy**. You'll get a link like `https://something.netlify.app`.
5. Optional: **Site configuration → Change site name** to something like `zarwa-usama.netlify.app`.

From then on, every `git push` updates the live site automatically within a minute.

### After the first deploy (for nice WhatsApp previews)
In `index.html`, change
```html
<meta property="og:image" content="assets/poster.jpg">
```
to the full address, e.g.
```html
<meta property="og:image" content="https://zarwa-usama.netlify.app/assets/poster.jpg">
```
WhatsApp needs the full link to show the picture when you share the invitation.

---

## How the opening works

The page has five states, set as a class on `<body>` by `js/main.js`:

| State | What the guest sees |
|---|---|
| `s0` | Silk-wrapped card, "A letter for you — tap to open" |
| `s1` | Video 1 plays: bow loosens, silk slides away |
| `s2` | Paused on the wax seal, gold halo, "Tap the seal" |
| `s3` | Video 2 plays: seal cracks, gatefold opens |
| `s4` | Invitation text fades onto the ivory card, details scroll below |

There's a **Skip** button during the opening, and **Replay the opening** in the footer.
