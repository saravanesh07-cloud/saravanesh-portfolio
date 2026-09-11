/**
 * =============================================================================
 * APP.JS - CORE PORTFOLIO CONTROLLER
 * =============================================================================
 * Handles:
 * - Dynamic configuration injection
 * - Sticky navigation & active link spy
 * - Mobile hamburger menu
 * - Animated statistics counters
 * - Skills interactive filtering
 * - Case study modal dialogs (<dialog> API)
 * - Certificate lightbox modal viewer
 * - Contact form handling & feedback toast
 * - Back-to-top floating trigger
 */

document.addEventListener("DOMContentLoaded", () => {
  initConfigurationBinding();
  initNavigation();
  initScrollAnimations();
  initStatsCounters();
  initSkillsFilter();
  initCaseStudyModals();
  initCertificateModal();
  initContactForm();
  initBackToTop();
  initToastSystem();
});

/**
 * 1. BIND CENTRAL CONFIGURATION TO DOM
 */
function initConfigurationBinding() {
  if (typeof PORTFOLIO_CONFIG === "undefined") return;

  const { LINKS, STATS, PROFILE, EDUCATION } = PORTFOLIO_CONFIG;

  // Bind links by data-config-link attribute
  document.querySelectorAll("[data-config-link]").forEach((el) => {
    const key = el.getAttribute("data-config-link");
    if (LINKS[key]) {
      const url = LINKS[key];
      if (key === "EMAIL_ADDRESS") {
        el.setAttribute("href", `mailto:${url}`);
      } else if (key === "PHONE_NUMBER" || key === "PHONE_TEL") {
        el.setAttribute("href", LINKS.PHONE_TEL || `tel:${url}`);
      } else {
        el.setAttribute("href", url);
      }

      // Handle placeholder links (#)
      if (url === "#" || url === "" || url === null) {
        el.addEventListener("click", (e) => {
          e.preventDefault();
          showToast("This link is being configured and will be available soon!", "info");
        });
      }
    }
  });

  // Bind text placeholders
  document.querySelectorAll("[data-config-text]").forEach((el) => {
    const path = el.getAttribute("data-config-text").split(".");
    let val = PORTFOLIO_CONFIG;
    for (const p of path) {
      if (val && val[p] !== undefined) {
        val = val[p];
      } else {
        val = null;
        break;
      }
    }
    if (val !== null) {
      el.textContent = val;
    }
  });

  // Inject target values for stats counters
  const statProject = document.getElementById("stat-projects");
  if (statProject && STATS.PROJECTS_COUNT) {
    statProject.setAttribute("data-target", STATS.PROJECTS_COUNT);
    statProject.setAttribute("data-suffix", STATS.PROJECTS_SUFFIX || "+");
  }

  const statSkills = document.getElementById("stat-skills");
  if (statSkills && STATS.SKILLS_COUNT) {
    statSkills.setAttribute("data-target", STATS.SKILLS_COUNT);
    statSkills.setAttribute("data-suffix", STATS.SKILLS_SUFFIX || "+");
  }

  const statHackathons = document.getElementById("stat-hackathons");
  if (statHackathons && STATS.HACKATHONS_COUNT) {
    statHackathons.setAttribute("data-target", STATS.HACKATHONS_COUNT);
    statHackathons.setAttribute("data-suffix", STATS.HACKATHONS_SUFFIX || "+");
  }

  const statCerts = document.getElementById("stat-certs");
  if (statCerts && STATS.CERTIFICATIONS_COUNT) {
    statCerts.setAttribute("data-target", STATS.CERTIFICATIONS_COUNT);
    statCerts.setAttribute("data-suffix", STATS.CERTIFICATIONS_SUFFIX || "+");
  }
}

/**
 * 2. STICKY NAVIGATION & ACTIVE SCROLL SPY
 */
function initNavigation() {
  const header = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileToggle = document.querySelector(".mobile-menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const sections = document.querySelectorAll("section[id]");

  // Sticky header background transition
  const handleScroll = () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  };
  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  // Mobile menu toggle
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      const isExpanded = mobileToggle.getAttribute("aria-expanded") === "true";
      mobileToggle.setAttribute("aria-expanded", !isExpanded);
      mobileToggle.classList.toggle("active");
      navMenu.classList.toggle("open");
      document.body.classList.toggle("no-scroll", !isExpanded);
    });

    // Close when clicking nav links
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.classList.remove("active");
        navMenu.classList.remove("open");
        document.body.classList.remove("no-scroll");
      });
    });

    // Close on outside click
    document.addEventListener("click", (e) => {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.classList.remove("active");
        navMenu.classList.remove("open");
        document.body.classList.remove("no-scroll");
      }
    });

    // Close on Escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && navMenu.classList.contains("open")) {
        mobileToggle.setAttribute("aria-expanded", "false");
        mobileToggle.classList.remove("active");
        navMenu.classList.remove("open");
        document.body.classList.remove("no-scroll");
      }
    });
  }

  // Active section scroll spy
  if ("IntersectionObserver" in window) {
    const spyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute("id");
            navLinks.forEach((link) => {
              if (link.getAttribute("href") === `#${id}`) {
                link.classList.add("active");
              } else {
                link.classList.remove("active");
              }
            });
          }
        });
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );

    sections.forEach((sec) => spyObserver.observe(sec));
  }
}

/**
 * 3. SCROLL REVEAL ANIMATIONS
 */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".reveal-on-scroll");

  if (!("IntersectionObserver" in window)) {
    animatedElements.forEach((el) => el.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  animatedElements.forEach((el) => observer.observe(el));
}

/**
 * 4. ANIMATED STATS COUNTERS
 */
function initStatsCounters() {
  const counterElements = document.querySelectorAll(".stat-number");

  if (!counterElements.length) return;

  const animateCounter = (el) => {
    const target = parseInt(el.getAttribute("data-target"), 10) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1600;
    const startTime = performance.now();

    const updateCount = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      const currentVal = Math.floor(easeOut * target);

      el.textContent = `${currentVal}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      } else {
        el.textContent = `${target}${suffix}`;
      }
    };

    requestAnimationFrame(updateCount);
  };

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counterElements.forEach((el) => observer.observe(el));
  } else {
    counterElements.forEach((el) => animateCounter(el));
  }
}

/**
 * 5. SKILLS INTERACTIVE CATEGORY FILTER
 */
function initSkillsFilter() {
  const filterBtns = document.querySelectorAll(".skill-filter-btn");
  const skillCards = document.querySelectorAll(".skill-category-card");

  if (!filterBtns.length || !skillCards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.getAttribute("data-filter");

      skillCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        if (filter === "all" || category === filter) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "translateY(0)";
          }, 10);
        } else {
          card.style.opacity = "0";
          card.style.transform = "translateY(15px)";
          setTimeout(() => {
            card.style.display = "none";
          }, 250);
        }
      });
    });
  });
}

/**
 * 6. PROJECT CASE STUDY MODAL SYSTEM (<dialog>)
 */
function initCaseStudyModals() {
  const openButtons = document.querySelectorAll("[data-open-case-study]");
  const closeButtons = document.querySelectorAll("[data-close-modal]");
  let lastActiveElement = null;

  openButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const targetModalId = btn.getAttribute("data-open-case-study");
      const dialog = document.getElementById(targetModalId);

      if (dialog && typeof dialog.showModal === "function") {
        lastActiveElement = document.activeElement;
        dialog.showModal();
        document.body.classList.add("no-scroll");

        const closeBtn = dialog.querySelector("[data-close-modal]");
        if (closeBtn) closeBtn.focus();
      }
    });
  });

  closeButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const dialog = btn.closest("dialog");
      if (dialog) {
        dialog.close();
      }
    });
  });

  document.querySelectorAll("dialog.case-study-modal").forEach((dialog) => {
    dialog.addEventListener("click", (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width;
      if (!isInDialog) {
        dialog.close();
      }
    });

    dialog.addEventListener("close", () => {
      document.body.classList.remove("no-scroll");
      if (lastActiveElement) {
        lastActiveElement.focus();
      }
    });
  });
}

/**
 * 7. CERTIFICATE LIGHTBOX MODAL
 */
function initCertificateModal() {
  const certModal = document.getElementById("modal-cert-viewer");
  const certImg = document.getElementById("cert-modal-image");
  const certIframe = document.getElementById("cert-modal-frame");
  const certTitle = document.getElementById("cert-modal-title");
  const certDownload = document.getElementById("cert-modal-download");

  if (!certModal) return;

  document.querySelectorAll("[data-preview-cert]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const src = btn.getAttribute("data-preview-cert");
      const title = btn.getAttribute("data-cert-title") || "Certificate";

      if (certTitle) certTitle.textContent = title;
      if (certDownload) certDownload.setAttribute("href", src);

      if (src.endsWith(".pdf")) {
        if (certImg) certImg.style.display = "none";
        if (certIframe) {
          certIframe.style.display = "block";
          certIframe.src = src;
        }
      } else {
        if (certIframe) certIframe.style.display = "none";
        if (certImg) {
          certImg.style.display = "block";
          certImg.src = src;
        }
      }

      certModal.showModal();
      document.body.classList.add("no-scroll");
    });
  });
}

/**
 * 8. CONTACT FORM HANDLING
 */
function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = form.querySelector("#contact-name");
    const emailInput = form.querySelector("#contact-email");
    const messageInput = form.querySelector("#contact-message");

    const name = nameInput?.value.trim() || "";
    const email = emailInput?.value.trim() || "";
    const message = messageInput?.value.trim() || "";

    if (!name || !email || !message) {
      showToast("Please fill in all fields before sending.", "error");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToast("Please enter a valid email address.", "error");
      return;
    }

    const submitBtn = form.querySelector(".btn-submit");
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = "Opening Email...";
    }

    const recipient = PORTFOLIO_CONFIG?.LINKS?.EMAIL_ADDRESS || "saravanesh07@gmail.com";
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(
      `Hello Saravanesh,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}\n\nSent via Portfolio Website`
    );

    const mailtoUrl = `mailto:${recipient}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Send Message</span> <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>`;
      }
      form.reset();
      showToast("Opening your email client with your message!", "success");
      window.location.href = mailtoUrl;
    }, 600);
  });
}

/**
 * 9. BACK TO TOP BUTTON
 */
function initBackToTop() {
  const bttBtn = document.getElementById("back-to-top");
  if (!bttBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 450) {
      bttBtn.classList.add("visible");
    } else {
      bttBtn.classList.remove("visible");
    }
  }, { passive: true });

  bttBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/**
 * 10. ACCESSIBLE TOAST SYSTEM
 */
function initToastSystem() {
  if (!document.getElementById("toast-container")) {
    const container = document.createElement("div");
    container.id = "toast-container";
    container.setAttribute("aria-live", "polite");
    container.setAttribute("role", "status");
    document.body.appendChild(container);
  }
}

function showToast(message, type = "info") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `portfolio-toast toast-${type}`;

  const iconSvg =
    type === "success"
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>`
      : type === "error"
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#00f2fe" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`;

  toast.innerHTML = `
    <span class="toast-icon">${iconSvg}</span>
    <span class="toast-text">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
