import { setupContact } from "./contact.js";

const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)");

function setupMenu(header) {
  const openButton = header.querySelector("[data-menu-open]");
  const menu = header.querySelector("[data-menu]");
  if (typeof menu.showModal !== "function") return;

  const desktop = matchMedia("(min-width: 64rem)");
  const closeButton = menu.querySelector("[data-menu-close]");
  const drawer = menu.querySelector(".drawer");
  const proposalLink = drawer.querySelector(".button");
  let closeTimer;

  menu.querySelectorAll("nav li").forEach((item, index) => item.style.setProperty("--order", index));

  function finishClosing() {
    clearTimeout(closeTimer);
    menu.removeAttribute("data-closing");
    openButton.setAttribute("aria-expanded", "false");
    menu.close();
  }

  function closeMenu(immediate = false) {
    if (!menu.open) return;
    if (immediate || reduceMotion.matches) {
      finishClosing();
    } else if (!menu.hasAttribute("data-closing")) {
      menu.setAttribute("data-closing", "");
      closeTimer = setTimeout(finishClosing, 230);
    }
  }

  openButton.addEventListener("click", () => {
    openButton.focus({ preventScroll: true });
    menu.showModal();
    openButton.setAttribute("aria-expanded", "true");
  });
  closeButton.addEventListener("click", () => closeMenu());
  menu.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeMenu();
  });
  menu.addEventListener("keydown", (event) => {
    if (event.key !== "Tab") return;

    const first = event.shiftKey ? closeButton : proposalLink;
    const next = event.shiftKey ? proposalLink : closeButton;
    if (document.activeElement === first) {
      event.preventDefault();
      next.focus();
    }
  });
  drawer.addEventListener("animationend", (event) => {
    if (event.target === drawer && event.animationName === "drawer-out") finishClosing();
  });
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu(true);
    if (event.target === menu) closeMenu();
  });
  desktop.addEventListener("change", () => {
    if (desktop.matches) closeMenu(true);
  });

  header.setAttribute("data-menu-ready", "");
}

function setupHeaderState(header) {
  const hero = document.querySelector("[data-hero]");
  const update = () => {
    const headerBottom = header.getBoundingClientRect().bottom;
    const scrolled = hero ? hero.getBoundingClientRect().bottom <= headerBottom : scrollY > 20;
    header.toggleAttribute("data-scrolled", scrolled);
  };

  let pending = false;
  function queueUpdate() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => {
      update();
      pending = false;
    });
  }

  update();
  addEventListener("scroll", queueUpdate, { passive: true });
  addEventListener("resize", queueUpdate);
}

function reveal(element) {
  if (reduceMotion.matches || element.hidden) return;
  element.classList.add("is-revealing");
  element.addEventListener("animationend", (event) => {
    if (event.target === element) element.classList.remove("is-revealing");
  }, { once: true });
}

function setupReveals() {
  if (!("IntersectionObserver" in window) || reduceMotion.matches) return;
  const observer = new IntersectionObserver((entries) => {
    for (const { isIntersecting, target } of entries) {
      if (!isIntersecting) continue;
      observer.unobserve(target);
      reveal(target);
    }
  }, { threshold: 0.12 });

  document.querySelectorAll("[data-reveal]").forEach((element) => observer.observe(element));
}

function setupWorkFilters(filters) {
  const cards = [...document.querySelectorAll("[data-work-card]")];
  const buttons = [...filters.querySelectorAll("button")];
  const announcement = document.querySelector("[data-work-count]");

  filters.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button || button.getAttribute("aria-pressed") === "true") return;
    const service = button.dataset.filter;
    let visible = 0;

    for (const card of cards) {
      const wasHidden = card.hidden;
      const matches = !service || card.dataset.services.split("|").includes(service);
      card.hidden = !matches;
      if (matches) {
        visible++;
        if (wasHidden) reveal(card);
      } else {
        card.classList.remove("is-revealing");
      }
    }

    for (const item of buttons) item.setAttribute("aria-pressed", String(item === button));
    announcement.textContent = `${visible} case ${visible === 1 ? "study" : "studies"} shown.`;
  });

  filters.hidden = false;
}

function setupMagnet(button) {
  const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
  let bounds;
  let frame = 0;

  function reset() {
    bounds = undefined;
    cancelAnimationFrame(frame);
    button.style.removeProperty("--magnet-x");
    button.style.removeProperty("--magnet-y");
  }

  button.addEventListener("pointerenter", (event) => {
    if (finePointer.matches && !reduceMotion.matches && event.pointerType !== "touch") {
      bounds = button.getBoundingClientRect();
    }
  });

  button.addEventListener("pointermove", (event) => {
    if (!bounds) return;
    const x = (event.clientX - bounds.left - bounds.width / 2) * .06;
    const y = (event.clientY - bounds.top - bounds.height / 2) * .12;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      button.style.setProperty("--magnet-x", `${x}px`);
      button.style.setProperty("--magnet-y", `${y}px`);
    });
  });

  button.addEventListener("pointerleave", reset);
  button.addEventListener("pointercancel", reset);
  reduceMotion.addEventListener("change", reset);
}

const header = document.querySelector("[data-header]");
setupMenu(header);
setupHeaderState(header);
setupReveals();

const workFilters = document.querySelector("[data-work-filters]");
if (workFilters) setupWorkFilters(workFilters);

document.querySelectorAll("[data-magnetic]").forEach(setupMagnet);

const contact = document.querySelector("[data-contact-form]");
if (contact) setupContact(contact);
