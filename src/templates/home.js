import { caseStudies } from "../content/caseStudies.js";
import { faq } from "../content/faq.js";
import { posts } from "../content/posts.js";
import { pricing, pricingNote } from "../content/pricing.js";
import { process as processSteps } from "../content/process.js";
import { services } from "../content/services.js";
import { site } from "../content/site.js";
import { testimonials } from "../content/testimonials.js";
import { areaChart, sparkline } from "./charts.js";
import { button, escape, icon, image, number, sectionHeading, tags, telephone } from "./shared.js";
import { postCard } from "./pages.js";

const heroStats = [
  ["$240M+", "Revenue driven"],
  ["210+", "Brands scaled"],
  ["4.2x", "Avg. blended ROAS"],
];

const chartStats = [
  ["+312%", "Organic"],
  ["4.2x", "ROAS"],
  ["−41%", "CAC"],
];

const clients = [
  "Lumen Health", "Northbeam", "Cadence", "Fernwood", "Arc Robotics",
  "Vela", "Meridian", "Bloomwell", "Quantic", "Atlas Foods",
];

const stars = `<span class="stars" role="img" aria-label="5 out of 5 stars">${icon("star").repeat(5)}</span>`;

function statList(stats, className) {
  return `<dl class="${className}">${stats.map(([value, label]) => `<div><dt>${escape(label)}</dt><dd>${escape(value)}</dd></div>`).join("")}</dl>`;
}

function hero() {
  return `<section class="hero" aria-labelledby="hero-title" data-hero>
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <p class="status-badge hero-enter"><span class="status-dot" aria-hidden="true"></span>Project inquiries open</p>
        <h1 id="hero-title">
          <span class="hero-line"><span>Growth</span></span>
          <span class="hero-line"><span>you can</span></span>
          <span class="hero-line hero-line--accent"><span>measure.</span></span>
        </h1>
        <p class="hero-description hero-enter">Brandora is the growth partner for brands that want results they can point to. Strategy, SEO, paid media, and creative — engineered around your revenue, not our retainer.</p>
        <div class="actions hero-enter">
          ${button("Get a free growth audit", "/#contact", "primary", "diagonal", true)}
          ${button("See the results", "/#work", "secondary", "arrow")}
        </div>
        ${statList(heroStats, "hero-stats")}
      </div>
      <div class="hero-visual">
        <figure class="chart-panel">
          <figcaption class="chart-heading">
            <div><p class="eyebrow">Client performance</p><h2>Lumen Health <span>· 12 months</span></h2></div>
            <span class="chart-label"><span class="status-dot" aria-hidden="true"></span>Live</span>
          </figcaption>
          <div class="chart-plot">
            <p class="chart-callout">Revenue <strong>+312% YoY</strong></p>
            ${areaChart()}
          </div>
          ${statList(chartStats, "chart-stats")}
        </figure>
        <div class="hero-rating">${stars}<span>Rated 5.0 by 60+ founders</span></div>
      </div>
    </div>
  </section>
  <section class="clients" aria-label="Brands we work with">
    <div class="wrap">
      <p class="eyebrow">Trusted by 210+ teams scaling online</p>
      <ul class="client-list" role="list">${clients.map((name) => `<li>${escape(name)}</li>`).join("")}</ul>
    </div>
  </section>`;
}

function capabilities() {
  return `<section class="section wrap" id="services" tabindex="-1" aria-labelledby="services-title">
    ${sectionHeading("What we do", "Six disciplines. One number that matters.", "We plug in wherever growth is stuck — and run each channel against the metric that moves your business.", "services-title")}
    <div class="service-grid">
      ${services.map((service, index) => `<article class="service-card" data-reveal>
        <div class="service-card-top"><span class="service-icon">${icon(service.icon)}</span><span class="index" aria-hidden="true">${number(index)}</span></div>
        <h3>${escape(service.title)}</h3>
        <p>${escape(service.summary)}</p>
        <ul class="service-deliverables" role="list">${service.deliverables.map((item) => `<li>${escape(item)}</li>`).join("")}</ul>
        <p class="service-metric"><strong>${escape(service.metric.value)}</strong><span>${escape(service.metric.label)}</span></p>
      </article>`).join("")}
    </div>
  </section>`;
}

function workCard(project) {
  return `<article class="work-card" data-work-card data-services="${escape(project.services.join("|"))}" data-reveal>
    <a href="/work/${project.slug}">
      <div class="work-image media">
        ${image(project.image, project.imageAlt, 1600, 1000, { sizes: "(min-width: 768px) 48vw, 100vw" })}
        <div class="work-labels"><span class="pill">${escape(project.industry)}</span><span class="pill">${project.year}</span></div>
      </div>
      <div class="work-card-body">
        <div class="work-card-title">
          <div><p class="eyebrow">${escape(project.client)}</p><h3>${escape(project.tagline)}</h3></div>
          <span class="card-arrow">${icon("diagonal")}</span>
        </div>
        <dl class="work-metrics">${project.metrics.map(({ label, value, spark }) => `<div>
          <dt>${escape(label)}</dt><dd>${escape(value)}</dd>${sparkline(spark)}
        </div>`).join("")}</dl>
        ${tags(project.services)}
      </div>
    </a>
  </article>`;
}

function selectedWork() {
  const counts = new Map();
  for (const project of caseStudies) {
    for (const service of project.services) {
      counts.set(service, (counts.get(service) ?? 0) + 1);
    }
  }
  const filters = [...counts].filter(([, count]) => count >= 2).map(([service]) => service).sort();

  return `<section class="section section--line" id="work" tabindex="-1" aria-labelledby="work-title">
    <div class="wrap">
      <div class="section-top">
        ${sectionHeading("Selected work", "Results, not vanity metrics", "A look at how we've helped brands turn marketing spend into measurable, compounding growth.", "work-title")}
        ${button("Start your story", "/#contact", "secondary")}
      </div>
      <div class="work-filters" data-work-filters hidden aria-label="Filter case studies by service" role="group">
        <button type="button" aria-pressed="true" data-filter="">All work</button>
        ${filters.map((service) => `<button type="button" aria-pressed="false" data-filter="${escape(service)}">${escape(service)}</button>`).join("")}
      </div>
      <p class="visually-hidden" role="status" data-work-count></p>
      <div class="work-grid">${caseStudies.map(workCard).join("")}</div>
    </div>
  </section>`;
}

function process() {
  return `<section class="section process-section" id="process" tabindex="-1" aria-labelledby="process-title">
    <div class="wrap">
      <div class="section-top">
        ${sectionHeading("How we work", "A process built to de-risk growth", "No black boxes. Five clear phases that turn ambition into a forecast — and a forecast into results you can see.", "process-title")}
        ${button("Book a discovery call", "/#contact", "primary", "diagonal", true)}
      </div>
      <ol class="process-list" role="list">
        ${processSteps.map((step) => `<li class="process-step" data-reveal>
          <div class="step-meta"><span class="step-number">${step.no}</span><span class="eyebrow">${escape(step.duration)}</span></div>
          <div><h3>${escape(step.title)}</h3><p>${escape(step.description)}</p></div>
          <ul class="step-outputs" role="list">${step.outputs.map((output) => `<li>${icon("check")}${escape(output)}</li>`).join("")}</ul>
        </li>`).join("")}
      </ol>
    </div>
  </section>`;
}

function about() {
  const values = [
    "Revenue over vanity metrics",
    "Forecasts we're willing to be held to",
    "Senior team, no junior handoffs",
    "Radical transparency on what's working",
  ];
  const stats = [
    ["210+", "Brands scaled"],
    ["$240M+", "Revenue driven"],
    ["94%", "Client retention"],
    ["38", "In-house specialists"],
  ];
  return `<section class="section wrap" id="about" tabindex="-1" aria-labelledby="about-title">
    <div class="about-grid">
      <div>
        ${sectionHeading("Who we are", "The growth team founders call when results have to be real", "Brandora started in 2017 with a simple frustration: too many agencies sold activity, not outcomes. We built the opposite — a senior team obsessed with the numbers that actually grow a business.", "about-title")}
        <ul class="value-list" role="list" data-reveal>${values.map((value) => `<li>${icon("check")}${escape(value)}</li>`).join("")}</ul>
      </div>
      <div class="about-image media" data-reveal>
        ${image("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80", "The Brandora team collaborating during a strategy session", 1200, 900, { sizes: "(min-width: 1024px) 48vw, 100vw" })}
      </div>
    </div>
    ${statList(stats, "about-stats")}
  </section>`;
}

function reviews() {
  return `<section class="section section--line" id="testimonials" aria-labelledby="testimonials-title">
    <div class="wrap">
      ${sectionHeading("Client love", "Founders and marketers, in their words", "The relationships behind the numbers. Here's what it's like to grow with Brandora.", "testimonials-title")}
      <div class="reviews-grid">
        ${testimonials.map((review) => `<figure class="review-card" data-reveal>
          ${stars}
          <blockquote><p>“${escape(review.quote)}”</p></blockquote>
          <figcaption>
            ${image(review.avatar, `Portrait of ${review.author}`, 48, 48, { className: "avatar" })}
            <span><strong>${escape(review.author)}</strong><span>${escape(review.role)}, ${escape(review.company)}</span></span>
          </figcaption>
        </figure>`).join("")}
      </div>
    </div>
  </section>`;
}

function plans() {
  return `<section class="section wrap" id="pricing" tabindex="-1" aria-labelledby="pricing-title">
    ${sectionHeading("Pricing", "Plans that scale with your ambition", "Transparent monthly partnerships — no long lock-ins, no surprise fees. Pick the engine that fits where you are now.", "pricing-title")}
    <div class="pricing-grid">
      ${pricing.map((tier) => `<article class="pricing-card${tier.featured ? " pricing-card--featured" : ""}" data-reveal>
        <div class="pricing-heading"><h3>${escape(tier.name)}</h3>${tier.featured ? '<span class="pill pill--accent">Most popular</span>' : ""}</div>
        <p>${escape(tier.tagline)}</p>
        <p class="price"><strong>${escape(tier.price)}</strong> <span>${escape(tier.cadence)}</span></p>
        <p>${escape(tier.description)}</p>
        ${button(tier.cta, "/#contact", tier.featured ? "primary" : "secondary")}
        <ul class="feature-list" role="list">${tier.features.map((feature) => `<li>${icon("check")}${escape(feature)}</li>`).join("")}</ul>
      </article>`).join("")}
    </div>
    <p class="pricing-note">${escape(pricingNote)}</p>
  </section>`;
}

function questions() {
  return `<section class="section section--line" id="faq" aria-labelledby="faq-title">
    <div class="wrap faq-grid">
      <div>
        ${sectionHeading("Questions", "Answers before you ask", "Still weighing whether we're the right fit? Here's what most founders want to know — and a quick way to ask the rest.", "faq-title")}
        ${button("Talk to a strategist", "/#contact", "secondary")}
      </div>
      <div class="faq-list">${faq.map(({ question, answer }, index) => `<details name="brandora-faq"${index === 0 ? " open" : ""}>
        <summary><span>${escape(question)}</span><span class="icon-button">${icon("plus")}</span></summary>
        <p>${escape(answer)}</p>
      </details>`).join("")}</div>
    </div>
  </section>`;
}

function insights() {
  return `<section class="section wrap" id="blog" aria-labelledby="insights-title">
    <div class="section-top">
      ${sectionHeading("Insights", "Ideas worth stealing", "Tactics, frameworks, and contrarian takes from the team — the same thinking we bring to client growth.", "insights-title")}
      ${button("Read the blog", "/blog", "secondary")}
    </div>
    <div class="post-grid">${posts.slice(0, 3).map((post) => postCard(post)).join("")}</div>
  </section>`;
}

const budgets = ["Under $5k / mo", "$5k – $10k / mo", "$10k – $25k / mo", "$25k+ / mo", "Not sure yet"];
const contactServices = ["Brand Strategy", "SEO", "Paid Media", "Social & Content", "Web & Dev", "Creative & Video"];

function contactField(name, label, placeholder, { type = "text", autocomplete, required = false } = {}) {
  return `<div class="field">
    <label for="${name}">${label}${required ? ' <span aria-hidden="true">*</span>' : ""}</label>
    <input id="${name}" name="${name}" type="${type}" placeholder="${escape(placeholder)}" autocomplete="${autocomplete}"${required ? ` required aria-describedby="${name}-error"` : ""}>
    ${required ? `<span class="field-error" id="${name}-error" data-field-error="${name}"></span>` : ""}
  </div>`;
}

function contact() {
  return `<section class="contact-section" id="contact" tabindex="-1" aria-labelledby="contact-title">
    <div class="contact-banner">
      <div class="wrap contact-banner-inner">
        <div>
          <p class="eyebrow">Let's talk</p>
          <h2 id="contact-title">Let's build your <span>growth engine</span></h2>
        </div>
        <a href="/#contact-form-panel" class="banner-arrow" aria-label="Go to the contact form">${icon("diagonal")}</a>
      </div>
    </div>
    <div class="wrap contact-grid">
      <div class="contact-copy">
        <p>Tell us where you want to go. We'll send back an honest read on the opportunity — and a plan to get there. No pitch decks, no pressure.</p>
        <address class="contact-address">
          <a href="mailto:${site.email}">${icon("mail")}${site.email}</a>
          <a href="${telephone}">${icon("phone")}${site.phone}</a>
          <span>${icon("pin")}${site.address}</span>
        </address>
        <p class="contact-response">${icon("check")}We reply to every inquiry within one business day.</p>
      </div>
      <div class="contact-panel" id="contact-form-panel" tabindex="-1">
        <form data-contact-form hidden action="/api/contact" method="post" novalidate>
          <div class="form-grid">
            ${contactField("name", "Name", "Jordan Rivera", { autocomplete: "name", required: true })}
            ${contactField("email", "Work email", "jordan@company.com", { type: "email", autocomplete: "email", required: true })}
            ${contactField("company", "Company", "Company Inc.", { autocomplete: "organization" })}
            <div class="field">
              <label for="budget">Monthly budget</label>
              <select id="budget" name="budget">
                <option value="" selected disabled>Select a range</option>
                ${budgets.map((budget) => `<option>${escape(budget)}</option>`).join("")}
              </select>
            </div>
          </div>
          <fieldset>
            <legend>What do you need help with?</legend>
            <div class="choice-list">${contactServices.map((service) => `<label class="choice">
              <input type="checkbox" name="services" value="${escape(service)}">
              <span>${escape(service)}</span>
            </label>`).join("")}</div>
          </fieldset>
          <div class="field">
            <label for="message">What are you trying to achieve? <span aria-hidden="true">*</span></label>
            <textarea id="message" name="message" rows="4" placeholder="We're a Series A SaaS doing $4M ARR and want to..." required aria-describedby="message-error"></textarea>
            <span class="field-error" id="message-error" data-field-error="message"></span>
          </div>
          <p class="form-error" data-form-error role="alert"></p>
          <p class="visually-hidden" data-form-status role="status"></p>
          <button class="button button--primary submit-button" type="submit"><span data-submit-label>Get my free growth audit</span>${icon("diagonal")}</button>
          <p class="form-note">By submitting, you agree to be contacted about your inquiry. We never share your details.</p>
        </form>
        <noscript><p>Email us directly at <a href="mailto:${site.email}">${site.email}</a> to request a free growth audit.</p></noscript>
        <div class="form-success" hidden data-form-success>
          <span class="service-icon">${icon("check")}</span>
          <h3 tabindex="-1">Thanks — message received.</h3>
          <p>A strategist will be in touch within one business day. In the meantime, keep an eye on your inbox.</p>
          <button class="button button--secondary" type="button" data-form-restart>Send another message</button>
        </div>
      </div>
    </div>
  </section>`;
}

export function homePage() {
  return { path: "/", body: [hero(), capabilities(), selectedWork(), process(), about(), reviews(), plans(), questions(), insights(), contact()].join("\n") };
}
