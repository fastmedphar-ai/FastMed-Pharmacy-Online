/* =========================================================
   FastMed Pharmacy — script.js
   ========================================================= */

/* ---------------------------------------------------------
   CONFIG — EDIT THIS SECTION ONLY
   Leave a value as "" (empty) until you have the REAL detail.
   Empty values are hidden on the site and shown as "coming soon".
   Never put made-up numbers or links here.
   --------------------------------------------------------- */
const CONFIG = {
  // Phone in international format for click-to-call, e.g. "+639171234567"
  phone: "",                 // TODO: official phone number
  // How the number should look on screen, e.g. "0917 123 4567"
  phoneDisplay: "",          // TODO

  // Full Facebook page address, e.g. "https://www.facebook.com/YourPageName"
  facebookUrl: "",           // TODO: official Facebook page URL

  // Messenger link, e.g. "https://m.me/YourPageName"
  // (Facebook page > Settings > Messaging shows your m.me link)
  messengerUrl: "",          // TODO

  // Email address, only if the pharmacy has one
  email: "",                 // TODO (optional)

  // Business hours shown across the site
  hours: "Open daily, 7:00 AM – 8:00 PM",

  // MAP: until the exact Google Maps listing is confirmed, the map uses a search.
  // Once confirmed: Google Maps > find FastMed Pharmacy > Share > "Embed a map" > copy ONLY the src="..." link
  mapEmbedUrl: "",           // TODO (optional)
  // Once confirmed: Google Maps > FastMed Pharmacy > Share > "Send a link" > paste it here
  directionsUrl: "",         // TODO (optional)

  // Used for the map and directions when the two values above are empty
  mapQuery: "FastMed Pharmacy, Marina Street, Poblacion, Ajuy, Iloilo 5012"
};
/* ------------------------- END CONFIG ------------------------- */


(function () {
  "use strict";

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const isHttpsUrl = (value) => /^https:\/\/[^\s]+$/i.test(value || "");
  const isEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value || "");
  const cleanPhone = (value) => (value || "").replace(/[^\d+]/g, "");

  const phone = cleanPhone(CONFIG.phone);
  const hasPhone = phone.length >= 7;
  const hasFacebook = isHttpsUrl(CONFIG.facebookUrl);
  const hasMessenger = isHttpsUrl(CONFIG.messengerUrl);
  const hasEmail = isEmail(CONFIG.email);

  /* ---------- Footer year ---------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---------- Hours text ---------- */
  if (CONFIG.hours) {
    $$("[data-config-text='hours']").forEach((el) => { el.textContent = CONFIG.hours; });
  }

  /* ---------- Map + directions ---------- */
  const query = encodeURIComponent(CONFIG.mapQuery);
  const directionsHref = isHttpsUrl(CONFIG.directionsUrl)
    ? CONFIG.directionsUrl
    : "https://www.google.com/maps/dir/?api=1&destination=" + query;
  $$("[data-directions]").forEach((a) => { a.href = directionsHref; });

  const map = $("#map");
  if (map) {
    map.src = isHttpsUrl(CONFIG.mapEmbedUrl)
      ? CONFIG.mapEmbedUrl
      : "https://maps.google.com/maps?q=" + query + "&z=16&output=embed";
  }

  /* ---------- Copy address ---------- */
  const copyBtn = $("#copy-address");
  const copyStatus = $("#copy-status");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      const text = "FastMed Pharmacy, " + $("#full-address").textContent.trim();
      const ok = await copyText(text);
      copyStatus.textContent = ok ? "Address copied." : "Couldn't copy automatically. Please select the address and copy it.";
    });
  }

  /* ---------- Contact details ---------- */
  function makeLink(href, label, external) {
    const a = document.createElement("a");
    a.href = href;
    a.textContent = label;
    if (external) { a.target = "_blank"; a.rel = "noopener"; }
    return a;
  }
  function fill(selector, node) {
    $$(selector).forEach((el) => { el.replaceChildren(node.cloneNode(true)); });
  }
  function footerItem(key, node) {
    const li = $("[data-footer='" + key + "']");
    if (!li) return;
    li.replaceChildren(node);
    li.hidden = false;
  }

  if (hasPhone) {
    const label = CONFIG.phoneDisplay || CONFIG.phone;
    fill("[data-contact='phone']", makeLink("tel:" + phone, label + " (tap to call)", false));
    footerItem("phone", makeLink("tel:" + phone, "Call " + label, false));
  }
  if (hasFacebook) {
    fill("[data-contact='facebook']", makeLink(CONFIG.facebookUrl, "Visit our Facebook page", true));
    footerItem("facebook", makeLink(CONFIG.facebookUrl, "Facebook page", true));
  }
  if (hasMessenger) {
    fill("[data-contact='messenger']", makeLink(CONFIG.messengerUrl, "Message us on Messenger", true));
  }
  if (hasEmail) {
    fill("[data-contact='email']", makeLink("mailto:" + CONFIG.email, CONFIG.email, false));
    footerItem("email", makeLink("mailto:" + CONFIG.email, CONFIG.email, false));
  }

  /* ---------- Mobile navigation ---------- */
  const header = $(".site-header");
  const toggle = $(".nav-toggle");
  const nav = $("#primary-nav");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("open", open);
  }
  if (toggle && nav) {
    toggle.addEventListener("click", () => setMenu(toggle.getAttribute("aria-expanded") !== "true"));
    nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && nav.classList.contains("open")) { setMenu(false); toggle.focus(); }
    });
    document.addEventListener("click", (e) => {
      if (nav.classList.contains("open") && !nav.contains(e.target) && !toggle.contains(e.target)) setMenu(false);
    });
    window.addEventListener("resize", () => { if (window.innerWidth > 960) setMenu(false); });
  }

  /* ---------- Header shadow on scroll ---------- */
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Highlight current section in nav ---------- */
  const links = $$(".nav-link");
  const sections = links
    .map((a) => document.getElementById(a.getAttribute("href").slice(1)))
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => {
          const active = a.getAttribute("href") === "#" + entry.target.id;
          a.classList.toggle("active", active);
          if (active) a.setAttribute("aria-current", "true"); else a.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach((s) => observer.observe(s));
  }

  /* ---------- Inquiry form ----------
     A static website cannot send or store messages by itself.
     This form only prepares a message and opens the customer's own app.
     Nothing typed here is saved or sent anywhere by this website. */
  const form = $("#inquiry-form");
  const channelSelect = $("#inq-channel");
  const statusEl = $("#form-status");

  const channels = [];
  if (hasMessenger) channels.push({ value: "messenger", label: "Facebook Messenger" });
  if (hasEmail) channels.push({ value: "email", label: "Email" });
  if (hasPhone) channels.push({ value: "sms", label: "SMS / text message" });

  if (channelSelect) {
    if (channels.length) {
      channels.forEach((c) => channelSelect.add(new Option(c.label, c.value)));
    } else {
      channelSelect.add(new Option("Not available yet", ""));
      channelSelect.disabled = true;
    }
  }

  function setStatus(message, type) {
    statusEl.textContent = message;
    statusEl.className = "form-status " + (type || "");
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (_) { /* fall through */ }
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch (_) {
      return false;
    }
  }

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nameEl = $("#inq-name");
      const productEl = $("#inq-product");
      const name = nameEl.value.trim();
      const product = productEl.value.trim();
      const qty = $("#inq-qty").value.trim();
      const notes = $("#inq-notes").value.trim();

      nameEl.setAttribute("aria-invalid", String(!name));
      productEl.setAttribute("aria-invalid", String(!product));
      if (!name || !product) {
        setStatus("Please enter your name and the product you're asking about.", "warn");
        (!name ? nameEl : productEl).focus();
        return;
      }

      if (!channels.length) {
        setStatus("Online inquiries aren't set up yet, so nothing was sent. Please visit the pharmacy on Marina Street, Poblacion, Ajuy.", "warn");
        return;
      }

      const lines = [
        "Hi FastMed Pharmacy! Product availability inquiry:",
        "Name: " + name,
        "Product: " + product
      ];
      if (qty) lines.push("Quantity: " + qty);
      if (notes) lines.push("Note: " + notes);
      lines.push("Is this available? Thank you!");
      const message = lines.join("\n");

      const channel = channelSelect.value;

      if (channel === "email") {
        const href = "mailto:" + CONFIG.email +
          "?subject=" + encodeURIComponent("Product availability inquiry: " + product) +
          "&body=" + encodeURIComponent(message);
        window.location.href = href;
        setStatus("Your email app should open with the message ready. It is only sent after you press Send there.", "ok");
        return;
      }

      if (channel === "sms") {
        const sep = /iPhone|iPad|iPod/i.test(navigator.userAgent) ? "&" : "?";
        window.location.href = "sms:" + phone + sep + "body=" + encodeURIComponent(message);
        setStatus("Your messaging app should open with the text ready. It is only sent after you press Send there.", "ok");
        return;
      }

      if (channel === "messenger") {
        const copied = await copyText(message);
        window.open(CONFIG.messengerUrl, "_blank", "noopener");
        setStatus(
          copied
            ? "Your message was copied. In Messenger, paste it into the chat and press Send. Nothing has been sent yet."
            : "Messenger is opening. Please type your inquiry there and press Send. Nothing has been sent yet.",
          "ok"
        );
      }
    });
  }
})();
