import { nav, site } from "../content/site.js";
import { services } from "../content/services.js";

const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
export const escape = (value) => String(value).replace(/[&<>"']/g, (character) => entities[character]);
export const number = (index) => String(index + 1).padStart(2, "0");
export const telephone = `tel:${site.phone.replace(/[^\d+]/g, "")}`;

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric", month: "short", day: "numeric", timeZone: "UTC",
});
export const date = (iso) => dateFormatter.format(new Date(iso));

const icons = {
  arrow: '<path d="M4 12h15m-6-6 6 6-6 6"/>',
  diagonal: '<path d="M6 18 18 6M8 6h10v10"/>',
  left: '<path d="M20 12H5m6-6-6 6 6 6"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  close: '<path d="m6 6 12 12M18 6 6 18"/>',
  menu: '<path d="M3 9h18M3 15h18"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  star: '<path d="m12 2 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1Z" fill="currentColor" stroke="none"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  phone: '<path d="M8 3H5a2 2 0 0 0-2 2c0 8.8 7.2 16 16 16a2 2 0 0 0 2-2v-3l-5-2-2 2a11 11 0 0 1-6-6l2-2Z"/>',
  pin: '<path d="M19 10c0 5-7 11-7 11s-7-6-7-11a7 7 0 0 1 14 0Z"/><circle cx="12" cy="10" r="2"/>',
  Gem: '<path d="M2 9 6 4h12l4 5-10 12L2 9Zm0 0h20M6 4l6 17 6-17"/>',
  Search: '<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5M8 11l2 2 3-4"/>',
  Target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  MessagesSquare: '<path d="M15 11a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2Zm3-3h1a2 2 0 0 1 2 2v11l-4-4h-6"/>',
  MonitorSmartphone: '<path d="M13 18H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2v2M7 21h5m-2-3v3"/><rect x="15" y="9" width="7" height="12" rx="1.5"/>',
  Clapperboard: '<path d="m3 10 17-5-1-3L2 7l1 3Zm0 0v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9H3Zm5-5 3 3m3-5 3 3m-7 7 5 3-5 3Z"/>',
  linkedin: '<path d="M5 9v10m0-14v.1M10 19V9m0 4a4 4 0 0 1 8 0v6"/>',
  instagram: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17 7v.1"/>',
  x: '<path d="M4 4h4l12 16h-4L4 4Zm15 0-6 7m-2 2-6 7"/>',
  dribbble: '<circle cx="12" cy="12" r="9"/><path d="M8 4c4 4 7 10 8 16M3 11c7 0 12-2 15-5M5 18c4-5 9-7 16-5"/>',
};

export function icon(name) {
  return `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;
}

export const mark = `<svg class="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
  <rect x="2" y="21" width="7" height="9" rx="1.2" fill="currentColor"/>
  <rect x="12.5" y="13" width="7" height="17" rx="1.2" fill="currentColor"/>
  <rect x="23" y="3" width="7" height="27" rx="1.2" fill="var(--accent)"/>
</svg>`;

export const brand = `<a class="brand" href="/" aria-label="Brandora home">${mark}<span>Brandora</span></a>`;

export function button(label, href, treatment = "primary", arrow = "diagonal", magnetic = false) {
  return `<a class="button button--${treatment}" href="${escape(href)}"${magnetic ? " data-magnetic" : ""}>
    <span>${escape(label)}</span>${arrow ? icon(arrow) : ""}
  </a>`;
}

export function sectionHeading(eyebrow, title, description, id) {
  return `<div class="section-heading" data-reveal>
    <p class="eyebrow">${escape(eyebrow)}</p>
    <h2 id="${escape(id)}">${escape(title)}</h2>
    ${description ? `<p class="section-intro">${escape(description)}</p>` : ""}
  </div>`;
}

export function image(src, alt, width, height, { eager = false, className = "", sizes = "" } = {}) {
  let responsive = "";
  if (sizes) {
    const url = new URL(src);
    const originalWidth = Number(url.searchParams.get("w"));
    const candidates = [480, 768, 1200].filter((candidate) => candidate < originalWidth).map((candidate) => {
      url.searchParams.set("w", String(candidate));
      return `${url.href} ${candidate}w`;
    });
    candidates.push(`${src} ${originalWidth}w`);
    responsive = ` srcset="${escape(candidates.join(", "))}" sizes="${escape(sizes)}"`;
  }
  return `<img class="${className}" src="${escape(src)}"${responsive} alt="${escape(alt)}" width="${width}" height="${height}" decoding="async" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}>`;
}

export function tags(items) {
  return `<ul class="tag-list" role="list">${items.map((item) => `<li>${escape(item)}</li>`).join("")}</ul>`;
}

function navLinks(path) {
  return nav.map(({ href, label }) => {
    const current = href === "/blog" && (path === "/blog" || path.startsWith("/blog/"));
    return `<li><a href="${href}"${current ? ` aria-current="${path === "/blog" ? "page" : "location"}"` : ""}>${label}</a></li>`;
  }).join("");
}

function header(path) {
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header" data-header>
    <div class="header-shell">
      <div class="wrap header-inner">
        ${brand}
        <nav class="primary-nav" aria-label="Primary">
          <ul role="list">${navLinks(path)}</ul>
        </nav>
        <div class="desktop-cta">${button("Get a proposal", "/#contact", "primary", "diagonal", true)}</div>
        <button class="menu-toggle" type="button" aria-label="Open menu" aria-haspopup="dialog" aria-controls="mobile-menu" aria-expanded="false" data-menu-open>
          <span>Menu</span> ${icon("menu")}
        </button>
      </div>
    </div>
    <dialog class="mobile-menu" id="mobile-menu" aria-labelledby="mobile-menu-title" data-menu>
      <div class="drawer">
        <div class="drawer-top">
          <p class="eyebrow" id="mobile-menu-title">Menu</p>
          <button class="icon-button" type="button" aria-label="Close menu" data-menu-close autofocus>${icon("close")}</button>
        </div>
        <nav aria-label="Mobile"><ul role="list">${navLinks(path)}</ul></nav>
        ${button("Get a proposal", "/#contact")}
      </div>
    </dialog>
  </header>`;
}

const company = [
  ["About", "/#about"], ["Work", "/#work"], ["Process", "/#process"],
  ["Pricing", "/#pricing"], ["Blog", "/blog"],
];
const socials = { linkedin: "LinkedIn", instagram: "Instagram", x: "X", dribbble: "Dribbble" };

function footerLinks(links) {
  return links.map(([label, href]) => `<li><a href="${href}">${escape(label)}</a></li>`).join("");
}

function footer() {
  return `<footer class="site-footer">
    <div class="wrap">
      <div class="footer-grid">
        <div class="footer-brand">
          ${brand}
          <p>A results-driven marketing agency helping startups and established brands scale online — with strategy, creative, and media that performs.</p>
          <ul class="social-links" role="list">${Object.entries(site.social).map(([key, href]) =>
            `<li><a class="icon-button" href="${href}" aria-label="${socials[key]}">${icon(key)}</a></li>`).join("")}</ul>
        </div>
        <nav aria-label="Services"><h2>Services</h2><ul role="list">${footerLinks(services.map(({ title }) => [title, "/#services"]))}</ul></nav>
        <nav aria-label="Company"><h2>Company</h2><ul role="list">${footerLinks(company)}</ul></nav>
        <div><h2>Get in touch</h2><address>
          <a href="mailto:${site.email}">${site.email}</a>
          <a href="${telephone}">${site.phone}</a>
          <span>${site.address}</span>
        </address></div>
      </div>
      <a class="footer-wordmark" href="/" aria-label="Brandora home">BRANDORA<span aria-hidden="true">.</span></a>
      <div class="footer-bottom">
        <p>© ${new Date().getUTCFullYear()} Brandora. All rights reserved.</p>
        <p>Designed by Abull Rahman</p>
        <ul role="list">${footerLinks([["Privacy", "/#"], ["Terms", "/#"], ["Contact", "/#contact"]])}</ul>
      </div>
    </div>
  </footer>`;
}

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  description: site.description,
  email: site.email,
  telephone: site.phone,
  address: {
    "@type": "PostalAddress", streetAddress: "548 Market St", addressLocality: "San Francisco",
    addressRegion: "CA", postalCode: "94104", addressCountry: "US",
  },
  sameAs: Object.values(site.social),
};

export function document(page) {
  const { path, body, title, description = site.description, cover, published, notFound } = page;
  const pageTitle = title ? `${title} — ${site.name}` : `${site.name} — ${site.tagline}`;
  const canonical = new URL(path, site.url).href;
  const socialImage = cover ?? `${site.url}/opengraph-image`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#0a0a0c">
  <title>${escape(pageTitle)}</title>
  <meta name="description" content="${escape(description)}">
  <meta name="robots" content="${notFound ? "noindex, follow" : "index, follow"}">
  ${notFound ? "" : `<link rel="canonical" href="${canonical}">`}
  <meta name="keywords" content="marketing agency, SEO agency, paid media, performance marketing, brand strategy, growth marketing">
  <meta property="og:type" content="${cover ? "article" : "website"}">
  <meta property="og:locale" content="en_US">
  <meta property="og:site_name" content="Brandora">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${escape(pageTitle)}">
  <meta property="og:description" content="${escape(description)}">
  <meta property="og:image" content="${escape(socialImage)}">
  ${published ? `<meta property="article:published_time" content="${escape(published)}">` : ""}
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escape(pageTitle)}">
  <meta name="twitter:description" content="${escape(description)}">
  <meta name="twitter:image" content="${escape(socialImage)}">
  <link rel="icon" type="image/png" href="/icon" sizes="32x32">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&amp;family=Space+Grotesk:wght@400..700&amp;display=swap" media="print" onload="this.media='all'">
  <noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400..700&amp;family=Space+Grotesk:wght@400..700&amp;display=swap"></noscript>
  <link rel="stylesheet" href="/assets/css/variables.css">
  <link rel="stylesheet" href="/assets/css/style.css">
  <script type="application/ld+json">${JSON.stringify(organization).replaceAll("<", "\\u003c")}</script>
  <script type="module" src="/assets/js/main.js"></script>
</head>
<body>
  ${header(path)}
  <main id="main" tabindex="-1">${body}</main>
  ${footer()}
</body>
</html>
`;
}
