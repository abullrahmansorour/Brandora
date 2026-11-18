import { posts } from "../content/posts.js";
import { button, date, escape, icon, image, number, tags } from "./shared.js";
import { sparkline } from "./charts.js";

const allArticles = `<a class="back-link" href="/blog">${icon("left")} All articles</a>`;
const allWork = `<a class="back-link" href="/#work">${icon("left")} All work</a>`;

export function postCard(post, heading = "h3") {
  return `<article class="post-card" data-reveal>
    <a href="/blog/${post.slug}">
      <div class="post-image media">
        ${image(post.cover, post.coverAlt, 1600, 1000, { sizes: "(min-width: 1024px) 32vw, (min-width: 768px) 48vw, 100vw" })}
        <span class="pill">${escape(post.category)}</span>
      </div>
      <div class="post-card-body">
        <p class="article-meta"><time datetime="${post.date}">${date(post.date)}</time><span aria-hidden="true">·</span><span>${escape(post.readingTime)}</span></p>
        <${heading}>${escape(post.title)}</${heading}>
        <p>${escape(post.excerpt)}</p>
        <div class="post-author">
          ${image(post.author.avatar, `Portrait of ${post.author.name}`, 32, 32, { className: "avatar" })}
          <span>${escape(post.author.name)}</span>
          ${icon("diagonal")}
        </div>
      </div>
    </a>
  </article>`;
}

function pageCta(title, copy) {
  return `<aside class="page-cta" aria-label="Growth audit">
    <div><h2>${title}</h2><p>${copy}</p></div>
    ${button("Get a free growth audit", "/#contact", "primary", "diagonal", true)}
  </aside>`;
}

export function blogPage() {
  return {
    path: "/blog",
    title: "Blog — Growth tactics & marketing insights",
    description: "Tactics, frameworks, and contrarian takes on SEO, paid media, brand, and conversion from the Brandora team.",
    body: `<header class="page-hero">
      <div class="wrap">
        <nav class="breadcrumbs" aria-label="Breadcrumb"><ol role="list">
          <li><a href="/">Home</a></li><li><span aria-current="page">Blog</span></li>
        </ol></nav>
        <p class="eyebrow">The Brandora Blog</p>
        <h1>Ideas worth stealing</h1>
        <p>The same thinking we bring to client growth — on SEO, paid media, brand, and conversion. No fluff, no recycled listicles.</p>
      </div>
    </header>
    <section class="section wrap" aria-label="Articles">
      <div class="post-grid post-grid--index">${posts.map((post) => postCard(post, "h2")).join("")}</div>
      ${pageCta("Want this thinking applied to your growth?", "Skip the reading and put a senior team to work on your numbers.")}
    </section>`,
  };
}

function articleBlock(block) {
  switch (block.type) {
    case "h2":
      return `<h2>${escape(block.text)}</h2>`;
    case "ul":
      return `<ul>${block.items.map((item) => `<li>${escape(item)}</li>`).join("")}</ul>`;
    case "quote":
      return `<blockquote><p>“${escape(block.text)}”</p></blockquote>`;
    default:
      return `<p>${escape(block.text)}</p>`;
  }
}

export function articlePage(post) {
  const related = posts.filter(({ slug }) => slug !== post.slug).slice(0, 2);
  return {
    path: `/blog/${post.slug}`,
    title: post.title,
    description: post.excerpt,
    cover: post.cover,
    published: post.date,
    body: `<article>
      <header class="page-hero article-hero">
        <div class="wrap">
          ${allArticles}
          <p class="article-meta"><span class="pill">${escape(post.category)}</span><span>${escape(post.readingTime)}</span></p>
          <h1>${escape(post.title)}</h1>
          <div class="article-byline">
            ${image(post.author.avatar, `Portrait of ${post.author.name}`, 48, 48, { className: "avatar" })}
            <div><strong>${escape(post.author.name)}</strong>
              <p>${escape(post.author.role)} <span aria-hidden="true">·</span> <time datetime="${post.date}">${date(post.date)}</time></p>
            </div>
          </div>
        </div>
      </header>
      <div class="wrap">
        <div class="detail-cover article-cover media">
          ${image(post.cover, post.coverAlt, 1600, 900, { eager: true, sizes: "(min-width: 1180px) 1120px, 100vw" })}
        </div>
        <div class="article-copy prose">${post.body.map(articleBlock).join("\n")}</div>
        ${pageCta("Put these ideas to work", "We turn frameworks like this into measurable growth for brands every day. See what that could look like for yours.")}
        <section class="section related-section" aria-labelledby="related-title">
          <h2 id="related-title">Keep reading</h2>
          <div class="related-grid">${related.map((item) => postCard(item)).join("")}</div>
        </section>
      </div>
    </article>`,
  };
}

export function projectPage(project, next) {
  return {
    path: `/work/${project.slug}`,
    title: `${project.client} — ${project.tagline}`,
    description: project.summary,
    cover: project.image,
    body: `<article>
      <header class="page-hero project-hero">
        <div class="wrap">
          ${allWork}
          <div class="project-identification"><p class="eyebrow">${escape(project.client)}</p>
            <span class="pill">${escape(project.industry)}</span><span class="pill">${project.year}</span>
          </div>
          <h1>${escape(project.tagline)}</h1>
          <p>${escape(project.summary)}</p>
          ${tags(project.services)}
        </div>
      </header>
      <div class="wrap">
        <div class="detail-cover project-cover media">
          ${image(project.image, project.imageAlt, 1600, 800, { eager: true, sizes: "(min-width: 1400px) 1320px, 100vw" })}
        </div>
        <dl class="detail-metrics" aria-label="Project results">
          ${project.metrics.map(({ label, value, spark }) => `<div><dt>${escape(label)}</dt><dd>${escape(value)}</dd>${sparkline(spark)}</div>`).join("")}
        </dl>
        <div class="project-narrative">
          <section class="challenge"><h2>The challenge</h2><p>${escape(project.challenge)}</p></section>
          <div>
            <section class="approach">
              <h2>What we did</h2>
              <ol role="list">${project.approach.map((step, index) => `<li><span aria-hidden="true">${number(index)}</span><p>${escape(step)}</p></li>`).join("")}</ol>
            </section>
            <section class="outcome"><h2>The outcome</h2><p>${escape(project.results)}</p></section>
          </div>
        </div>
        <figure class="project-quote">
          <blockquote><p>“${escape(project.quote.text)}”</p></blockquote>
          <figcaption><strong>${escape(project.quote.author)}</strong> — ${escape(project.quote.role)}</figcaption>
        </figure>
        <div class="project-next">
          <div><p class="eyebrow">Next case study</p><a href="/work/${next.slug}">${escape(next.client)} ${icon("arrow")}</a></div>
          ${button("Start your growth story", "/#contact", "primary", "diagonal", true)}
        </div>
      </div>
    </article>`,
  };
}

export function notFoundPage() {
  return {
    path: "/404",
    title: "Page not found",
    notFound: true,
    body: `<section class="page-hero not-found">
      <div class="wrap"><p class="eyebrow">404</p>
        <h1>This page didn't convert</h1>
        <p>The page you're looking for moved or never existed. Let's get you back to something that performs.</p>
        <div class="actions">
          ${button("Back to home", "/")}
          ${button("Talk to us", "/#contact", "secondary", null)}
        </div>
      </div>
    </section>`,
  };
}
