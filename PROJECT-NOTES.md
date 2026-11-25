# Zarwa & Usama Wedding Invitation — Project Notes

Everything decided and learned while building this invitation with Claude, so the work can continue without the original chat. It's a structured record of the conversation, not a word-for-word transcript.

- **Made by:** Hanzala Shahzad
- **Wedding:** Zarwa Shahzad & Usama Ahmed (son of Mr. and Mrs. Asif Iqbal), Saturday 9 January 2027, 1:00 PM (Pakistan time), Bel Avenir
- **Live preview (Claude artifact):** https://claude.ai/artifact/BiVbB69aGzWQXXDoJNkeEV

---

## 1. What the final invitation does

1. **Start screen:** a deep-wine embossed card wrapped in sheer champagne silk, tied with a thin champagne satin bow. The Z & U wax seal shows faintly through the silk. Text: "A letter for you — tap to open".
2. **Tap 1:** video 1 plays. The bow loosens, the ribbon falls loose and the silk slides away to reveal the card and seal.
3. **Pause:** the video holds on the Z & U wax seal with a pulsing gold halo and "Tap the seal". Nothing continues until the guest taps the seal itself. *(This was a firm requirement.)*
4. **Tap 2 (on the seal):** video 2 plays. The seal cracks cleanly, the gatefold cover's two doors swing open (each carrying half the seal) and a beam of light crosses the ivory card inside.
5. **Reveal (page 1):** on the ivory card: بسم الله الرحمن الرحيم, "And We created you in pairs", وَخَلَقْنَاكُمْ أَزْوَاجًا, Quran 78:8.
6. **Page 2 (first card on scroll):** "Mr. and Mrs. Dr. Mohammad Shahzad request the honor of your presence as they unite their beloved daughter ZARWA SHAHZAD with USAMA AHMED, son of Mr. and Mrs. Asif Iqbal".
7. **Page 3:** countdown. Then venue (with photo), The Barat Day, dress code, gifts, footer.

Extras: a **Skip** button during the opening, and **Replay the opening** in the footer.

---

## 2. Final design

| Element | Choice |
|---|---|
| Concept | Silk-wrapped, wax-sealed gatefold invitation, filmed realistically, then deckle-edged ivory cards on embossed wine paper |
| Palette | Bordeaux / wine-red ground `#47070d`, ivory cotton cards, champagne gold `#c7a467`, light gold `#f1dcaa`, wine ink `#4a0f1e`, soft text `#7b5a52` |
| Fonts | **Pinyon Script** (names, section titles), **Cormorant Garamond** (body), **Amiri** (Arabic) |
| Monogram | Z & U on the wax seal |
| Cards | Real photographic ivory card with torn (deckled) edges and a thin gold border, cut from the gatefold image and used as a stretchable frame |
| Corners | Embossed tone-on-tone roses cut from the card image |
| Venue photo | Bel Avenir, colour-graded: blue sky → dusk rose to champagne, building lifted to a clean ivory white, soft wine vignette, framed in an ivory mount |

### Content decisions
- **Kept:** countdown, venue, the day (titled "The Barat Day"), dress code, gifts, footer.
- **Removed by choice:** our story, travel & stay, RSVP.
- **Dress code text:** "Come as your most beautiful self. There's no rule here, because everything looks beautiful on you. Wear what makes you feel radiant, and bring us the very best version of you. The cameras are ready. Are you?"
- **Gifts text (light-hearted):** "Your presence and your duas are the greatest gift of all. Envelopes, however, are accepted with great joy and are never returned."
- **Schedule:** 1:00 PM Welcome, 2:00 PM Appetizers, 2:30 PM Lunch, 3:00 PM Rasm, 4:00 PM Rukhsati.
- **Footer:** "For any questions, call or WhatsApp 0316 4855731", and at the bottom "Made by Hanzala Shahzad".
- **Venue:** Bel Avenir. **Map:** https://maps.app.goo.gl/1SmkAtysRLpM6FRt5
- **Earlier venue (replaced):** ViceRoy by Mughal-E-Azam, Canal Road.

---

## 3. How we got here (history)

1. **Reference:** an Instagram reel of a pearly lilac digital invitation (wax-sealed envelope, satin bow reveal, embossed rose card, countdown, venue, the day, dress code, transport, hotel). The brief was **a different look with the same premium feel and animations**.
2. **Version 1, code only:** emerald velvet doors with a gold clasp. Judged not premium enough.
3. **Version 2, code only:** the **Bordeaux & champagne** palette was chosen here and kept. Wax seal split, velvet doors, handwritten names, flip countdown, falling petals, generated music.
4. **Version 3, code only:** a CSS 3D envelope with a drawn satin ribbon and bow. Rejected: it looked "graphic", not realistic.
5. **Key realisation:** the reference's realism comes from **pre-rendered video**, not code. We chose **Option 1: an AI-generated video opening**, with the website built around it.
6. **Animating stills in code** (parting a ribbon photo, splitting a seal photo) was tried as a free alternative. **Rejected:** the knot couldn't open and the crack looked like a cut-out.
7. **Kling attempts with a close-up bow:** the knot never opened realistically, and using two different scenes as start and end frames caused a **jump cut**.
8. **Breakthrough, from the reference:** a **small, thin bow tied around a silk-wrapped embossed card**, which only loosens, followed by the silk sliding away. This is something AI animates well.
9. **Frames must match:** the seal had to be visible under the silk in the start frame, and in the same place and size as in the end frame. The end frame was corrected by hand (seal moved and scaled, card texture patched) so the seal doesn't drift during the animation.
10. **Clip 2 (gatefold):** the first attempt's "tiny wax crumbs" became a dripping red stream. Fixed by asking for "one crisp break" and banning crumbs and drips in the negative prompt.
11. **Clean exports:** watermark-free 1080 × 1920 versions of both final clips were downloaded from Kling.
12. **Sections** were built from the real images (ivory card frame, rose corners, seal), then filled with the real details and the venue photo.
13. **Deployed** on Netlify via GitHub. The first deploy showed an unstyled page because the files were uploaded without folders; the code was changed to use plain file names in one folder.
14. **Update:** the opening card now shows the Bismillah and Quran 78:8; a new invitation card (page 2) with the parents' names; groom's name is Usama Ahmed; venue changed to Bel Avenir with a new graded photo.

---

## 4. Lessons learned (read before making new videos)

- **Start and end frames must be the same scene.** Same camera, framing, card and seal position. Two different scenes give a jump cut.
- **Check alignment by overlaying the two frames** at 50% opacity before spending credits. If an object moves or changes size between frames, the AI animates it drifting or growing.
- **AI video struggles with knots untying**, because the fabric passes through itself. A small bow that only loosens, plus fabric sliding away, works far better than a big bow fully untying.
- **Same frames give nearly the same result.** A Kling retry with identical frames produced an almost identical knot, so changing the prompt alone won't fix a motion problem.
- **Avoid "crumbs" and "particles"** for wax. They turn into a dripping stream. Ask for "one crisp break".
- **"Hinged at their outer edges ... swing open like doors"** gives real door motion instead of sliding.
- **AI garbles text.** Keep cards blank in videos and put the text on the website. Short initials like "Z & U" in a **classic serif** usually work; check the Z isn't mirrored.
- **No hand** in the videos (preferred).
- **Free Kling plan:** 720p and a visible "KlingAI" watermark (bottom right). Use it for testing only. Final clips must be watermark-free.

---

## 5. Kling settings used

- **Mode:** Image to Video, with **start frame + end frame** (both images uploaded)
- **Duration:** 5 seconds
- **Aspect ratio:** 9:16 vertical (taken from the images, 941 × 1672)
- **Output:** 1080 × 1920 MP4 (compressed to ~3 MB each for the website)

---

## 6. All prompts

### 6.1 Image prompts (final, approved)

**Start frame: silk-wrapped card** (`1-start-frame-silk-wrapped.png`)
> Top-down photograph, vertical 9:16, filling the entire frame. A deep wine-red Bordeaux invitation card with tone-on-tone embossed roses in the corners and an ornate embossed scalloped frame in the centre, softly wrapped in a sheer pale champagne silk satin cloth that drapes over the whole card. A thin pale champagne satin ribbon is tied around the middle of the card in a small, delicate bow placed in the lower third, with short tails. The ribbon pulls the silk tight, creating soft tension creases and folds radiating from the knot. The embossed roses and frame show softly through the sheer silk. Gentle natural light, soft pearly sheen, realistic fabric texture, photorealistic luxury wedding stationery. No text, no hands.

Then an edit to add the seal under the silk:
> Edit this image: keep everything exactly the same — the silk, the ribbon, the bow, the creases, the card, the roses, the framing and the lighting. Add a deep wine-red wax seal with a champagne-gold rim and the embossed initials "Z & U" in the centre of the scalloped frame, slightly above the bow, lying underneath the sheer silk. The seal is softly visible through the semi-transparent silk, slightly muted and hazy, with the silk draping over it. Photorealistic.

**End frame of video 1 / start of video 2: unwrapped card with seal** (`2-unwrapped-seal-aligned.png`, seal position corrected by hand afterwards)
> Edit this image: keep the exact same camera angle, framing, lighting, card, embossed roses and scalloped frame. The small bow is now untied and the thin champagne ribbon lies loose and relaxed. The sheer champagne silk cloth has slid away to the edges of the frame, revealing the deep wine-red embossed card clearly. In the centre of the scalloped frame there is now a deep wine-red wax seal with a champagne-gold rim, embossed with the initials "Z & U". Photorealistic, no other text.

**End frame of video 2: gatefold open** (`3-gatefold-open.png`)
> Edit this image: keep the exact same top-down camera angle, framing, lighting and the champagne silk at the edges of the frame. The deep wine-red embossed cover is a gatefold that has now opened: it has split straight down the centre, through the middle of the wax seal, and its two panels have swung open outward to the left and right, standing partly open at the sides of the frame. Each panel still carries one broken half of the Z & U wax seal on its inner edge. Revealed in the centre, lying flat inside, is a blank warm ivory cotton-paper invitation card with softly deckled edges and a thin champagne-gold foil border, filling most of the frame. Soft warm light falls on the ivory card. The loose champagne ribbon lies along the bottom edge. Photorealistic. The ivory card is completely blank, no text.

### 6.2 Kling video prompts (final)

**Video 1: bow loosens, silk slides away** (start: silk-wrapped, end: unwrapped with seal)
> Slow motion, locked camera. The right loop of the small champagne satin bow is slowly drawn back through the knot, the knot gently loosens and opens, and the ribbon falls loose in two soft strands. Then the sheer champagne silk cloth slowly slides away toward the edges of the frame, revealing the deep wine-red embossed card and the Z & U wax seal. The seal stays perfectly still. Realistic fabric physics, smooth and graceful, photorealistic.

Negative:
> hands, fingers, sudden cut, jump cut, scene change, motion blur, bow sliding sideways, knot jumping, ribbon teleporting, seal moving, seal changing size, rigid fabric, extra ribbons, extra bows, ribbon passing through itself, distorted letters, text, fast motion, flicker, morphing, warping, cartoon, CGI, plastic texture

*(The first successful version used this prompt, with near-identical results: "Slow motion, locked camera. The small champagne satin bow slowly loosens and comes undone, the thin ribbon relaxes and slips aside, and the sheer champagne silk cloth gently slides away from the card toward the edges of the frame, its creases softening as it moves, revealing the deep wine-red embossed card and the Z & U wax seal underneath. The wax seal stays perfectly still in place. Realistic fabric physics, soft pearly sheen gliding across the silk, smooth and graceful, photorealistic.")*

**Video 2: seal cracks, gatefold opens** (start: unwrapped with seal, end: gatefold open)
> Slow motion, locked camera. The deep wine-red wax seal with the initials "Z & U" cracks cleanly down the middle in one crisp break. The wine-red gatefold cover splits along the crack, and its two panels, hinged at their outer edges, slowly swing open outward like doors, each carrying one half of the broken seal, while the loose champagne ribbon slides softly down to the bottom edge. A blank ivory invitation card with a thin gold border is revealed lying inside, and soft warm light spills onto it. Smooth, graceful, realistic paper physics, photorealistic.

Negative:
> crumbs, dripping, liquid, falling particles, drops, blood, hands, fingers, sudden cut, jump cut, scene change, text on the card, writing, distorted letters, seal reappearing, cover tearing, ribbon morphing, warping, flicker, fast motion, cartoon, CGI

### 6.3 Earlier prompts (archive, not used in the final)
- **Close-up champagne bow** (looked beautiful, but the knot was too complex to untie): "Extreme macro close-up, vertical 9:16, the frame completely filled by a lavish champagne-gold silk satin ribbon tied in a full, soft bow…"
- **Close-up Z & U wax seal on wine paper with champagne ribbons at the corners:** good image, but a different scene from the bow, which caused the jump cut.
- **Ivory card rising from a wine envelope** with broken seal and petals: replaced by the gatefold concept.

---

## 7. How the website assets were made

- `clip1.mp4`, `clip2.mp4`: the clean Kling exports, re-encoded (H.264, CRF 23, AAC audio, fast-start) to ~3 MB each.
- `poster.jpg`: the first frame of clip1.
- `ivory.jpg`: the ivory card cropped from the gatefold image, used as a 9-slice `border-image`, so every section looks like the same physical card.
- `rose.webp`: the top-left embossed rose from the unwrapped card image, with a soft faded edge.
- `seal.webp`: the Z & U seal cut from the unwrapped card image.
- `venue.jpg`: the hall photo, upscaled 2×, sharpened, with the sky replaced by a dusk-rose to champagne gradient, a warm grade and a wine vignette.

---

## 8. Live site

- Netlify: https://theforeverletter.netlify.app
- GitHub: https://github.com/hanzala9898/Wedding-Invitation
- All files sit in one folder (no sub-folders), so file links in the code are plain names like `clip1.mp4`.

## 9. Still to do / ideas

- Optional: RSVP form connected to a sheet or a service like Netlify Forms, if wanted later.
- Optional: background music file after the gatefold opens.
- Optional: custom domain on Netlify.
