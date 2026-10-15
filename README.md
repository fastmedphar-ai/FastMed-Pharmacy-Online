# FastMed Pharmacy — Website

Official website for **FastMed Pharmacy**, Marina Street, Poblacion, Ajuy, Iloilo 5012, Philippines.

Plain HTML, CSS and JavaScript. No server, database, build step, or paid service. Hosted free on GitHub Pages.

```
fastmed-pharmacy/
├── index.html   ← page content and structure
├── style.css    ← colors, layout, mobile design
├── script.js    ← CONFIG (contact details) + menu, map, inquiry form
└── README.md    ← this guide
```

---

## 1. Fill in your real details (do this first)

Open `script.js`. At the very top is a `CONFIG` section. Fill in only details you have confirmed:

| Setting | Example format | Where it appears |
|---|---|---|
| `phone` | `"+639171234567"` | Click-to-call link, SMS option in the form |
| `phoneDisplay` | `"0917 123 4567"` | How the number looks on screen |
| `facebookUrl` | `"https://www.facebook.com/YourPageName"` | Contact section, footer |
| `messengerUrl` | `"https://m.me/YourPageName"` | Contact section, Messenger option in the form |
| `email` | `"name@example.com"` | Contact section, email option in the form (optional) |
| `hours` | `"Open daily, 7:00 AM – 8:00 PM"` | Location, contact, footer |
| `mapEmbedUrl` | link from Google Maps "Embed a map" | The map |
| `directionsUrl` | link from Google Maps "Send a link" | All "Get Directions" buttons |

Leave anything you don't have as `""`. The site will show "coming soon" instead of a fake value.

> If you change the hours, also update them in `index.html` (search for `7:00 AM`) — in the JSON-LD block near the top (`"opens"` / `"closes"`) and in the meta description.

### Setting the exact map pin (once the Google Maps listing is confirmed)
1. Open Google Maps and search for FastMed Pharmacy in Ajuy.
2. Make sure the pin is on the correct building. If there is no listing yet, you can add one through **Google Business Profile** (free).
3. Tap **Share → Embed a map → Copy HTML**. Paste it into a notepad and copy only the link inside `src="…"`. Put it in `mapEmbedUrl`.
4. Tap **Share → Send a link → Copy link**. Put it in `directionsUrl`.

Until then, the map and directions use a search for the address, which is safe and needs no coordinates.

### Services list
The service cards in `index.html` (section `id="services"`) are services you confirmed: prescription dispensing, OTC medicines, vitamins, wellness essentials, availability inquiries, medicine-use guidance, delivery within Ajuy, Messenger reservations, and PhilHealth GAMOT patients. If one stops being offered, delete its whole `<article class="card"> … </article>` block.

---

## 2. Adding your own photos (optional but recommended)

A real photo of the storefront or counter builds more trust than stock photos. To add one:

1. Take a clear, landscape photo. Resize it to about 1600 px wide and save as JPG (under 300 KB — free tools: squoosh.app).
2. In your repository, create a folder named `images` and upload it as `images/storefront.jpg`.
3. In `index.html`, find `<div class="hero-visual" aria-hidden="true">` and replace that whole block (down to its closing `</div>`) with:

```html
<div class="hero-visual">
  <img src="images/storefront.jpg" alt="FastMed Pharmacy storefront on Marina Street, Poblacion, Ajuy" width="800" height="600" style="border-radius:28px;box-shadow:0 30px 60px rgba(18,97,160,.25);object-fit:cover">
</div>
```

Only use photos you took yourself or that you have permission to use. Avoid photos showing customers' faces or prescriptions.

**Facebook share image:** save a 1200 × 630 px image as `images/og-image.jpg`, then uncomment the `og:image` line in `index.html` and replace `USERNAME`.

---

## 3. Publish free on GitHub Pages (step by step)

1. **Get the files.** Download and unzip `fastmed-pharmacy.zip`. You should see `index.html`, `style.css`, `script.js`, `README.md`.
2. **Create a GitHub account** at <https://github.com/signup> if you don't have one (free). Your username becomes part of your web address.
3. **Create a repository.** Click **+** (top right) → **New repository**.
   - Repository name: `fastmed-pharmacy`
   - Visibility: **Public**
   - Click **Create repository**.
4. **Upload the files.** On the new repository page, click **uploading an existing file**. Drag in all four files (the files themselves, not the folder). Scroll down and click **Commit changes**.
5. **Open Settings.** Click the **Settings** tab of the repository.
6. **Find Pages.** In the left sidebar, under **Code and automation**, click **Pages**.
7. **Choose the source.** Under **Build and deployment → Source**, choose **Deploy from a branch**. Under **Branch**, choose `main` and folder `/ (root)`.
8. **Save** and wait 1–3 minutes. Refresh the Pages screen until it shows "Your site is live at …".
9. **Open and test** the address. It will look like:

   `https://YOUR-USERNAME.github.io/fastmed-pharmacy/`

10. **Update later.** Open a file in the repository → click the pencil icon (Edit) → make your change → **Commit changes**. The live site updates in a minute or two. For new images, use **Add file → Upload files**.

After publishing, go back to `index.html` and fill in the `canonical` and `og:url` lines with your real address (then remove their `<!-- -->` comment markers).

### Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| **404 / page not found** | Wait a few more minutes. Check that the file is named exactly `index.html` (lowercase) and sits at the top level of the repository, not inside a folder. Check Settings → Pages shows branch `main`, folder `/ (root)`. |
| **Page shows but no colors/design (CSS not loading)** | `style.css` is missing, misnamed (e.g. `Style.css`, `style.css.txt`), or inside a subfolder. File names are case-sensitive on GitHub. |
| **Menu or map not working** | `script.js` is missing or misnamed. Also check you didn't break the CONFIG section: every value needs quotes and a comma after it. |
| **Broken image** | The path in the HTML must match exactly, including capital letters and the `images/` folder. Paths must not start with `/`. |
| **Old version still showing** | Hard-refresh: Ctrl + F5 on PC, or clear the browser cache on mobile. |
| **Facebook shows old preview** | Paste your link into the Facebook Sharing Debugger (developers.facebook.com/tools/debug) and click "Scrape Again". |

---

## 4. Pre-launch checklist

- [ ] Phone number in `CONFIG` is the official one, and tapping it starts a call on a phone
- [ ] Facebook and Messenger links open the **official** FastMed page
- [ ] Hours are correct everywhere (CONFIG, meta description, JSON-LD)
- [ ] Map shows the right place; "Get Directions" opens Google Maps to FastMed
- [ ] Every service card is something the pharmacy actually offers today
- [ ] No prices, stock levels, discounts, or medical claims were added
- [ ] Inquiry form tested with each configured channel (Messenger / Email / SMS)
- [ ] Site checked on a phone: menu opens and closes, nothing overflows sideways
- [ ] All menu links jump to the right section
- [ ] Footer shows the current year and the health disclaimer
- [ ] Any photos used are your own or properly licensed
- [ ] `canonical`, `og:url` (and `og:image`, if used) updated with the live address
- [ ] Website link added to the FastMed Facebook page "About" section

---

## 5. About the inquiry form (important)

GitHub Pages only serves files — it cannot receive, store, or send form submissions. So the form does **not** send anything by itself. It prepares the customer's message and opens **their own** Messenger, email, or SMS app; nothing is sent until they press Send there. If no contact channel is configured, the form says so plainly instead of pretending the inquiry was received.

The form intentionally asks only for a first name, product, quantity, and a short note, and warns customers not to share medical history, prescriptions, or ID numbers. Please keep it that way.

---

*Website content is general information and does not replace professional medical advice.*
