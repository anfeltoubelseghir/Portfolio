/* ==========================================================================
   script.js
   All interactive behaviour for the portfolio site.
   Organized into small, independent functions so each feature is easy
   to read, edit, or remove on its own.
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initMobileMenu();
  initActiveNavLink();
  initFadeInOnScroll();
  initTerminalTyping();
});

/* --------------------------------------------------------------------
   1. Mobile hamburger menu
   Toggles the nav menu open/closed and closes it again when a link
   is clicked, so navigating on mobile doesn't leave the menu open.
   -------------------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById("navToggle");
  const menu = document.getElementById("navMenu");

  if (!toggle || !menu) return;

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("is-open");
    toggle.classList.toggle("is-open", isOpen);
    toggle.setAttribute("aria-expanded", String(isOpen));
    toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
  });

  menu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      menu.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
    });
  });
}

/* --------------------------------------------------------------------
   2. Active navigation link
   Highlights the nav link for whichever section is currently in view,
   so visitors always know where they are on the page.
   -------------------------------------------------------------------- */
function initActiveNavLink() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          const matches = link.getAttribute("href") === `#${id}`;
          link.classList.toggle("active-link", matches);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px" } // triggers when a section is near the middle of the screen
  );

  sections.forEach((section) => observer.observe(section));
}

/* --------------------------------------------------------------------
   3. Fade-in sections on scroll
   Adds the "is-visible" class (defined in style.css) once a section
   scrolls into the viewport, for a subtle, one-time reveal.
   -------------------------------------------------------------------- */
function initFadeInOnScroll() {
  const fadeEls = document.querySelectorAll(".fade-in");
  if (!fadeEls.length) return;

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target); // only animate once
        }
      });
    },
    { threshold: 0.15 }
  );

  fadeEls.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------
   4. Hero terminal typing animation
   Types out a short "profile" inside the terminal card in the hero
   section, like lines being printed to a console.
   -------------------------------------------------------------------- */
function initTerminalTyping() {
  const target = document.getElementById("terminalCode");
  if (!target) return;

  const lines = [
    "> whoami",
    "Anfel Toubal Seghir",
    "",
    "> role",
    "3rd Year CS Student",
    "",
    "> interests",
    "Web Development, AI",
    "",
    "> status",
    "Currently learning & building",
  ];

  const fullText = lines.join("\n");
  let index = 0;

  // Respect users who prefer reduced motion: show the final text instantly
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    target.textContent = fullText;
    return;
  }

  function typeNextCharacter() {
    if (index <= fullText.length) {
      target.textContent = fullText.slice(0, index);
      index++;
      setTimeout(typeNextCharacter, 22);
    }
  }

  typeNextCharacter();
}

