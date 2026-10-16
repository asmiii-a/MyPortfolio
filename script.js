document.addEventListener("DOMContentLoaded", function () {
  const menuBtn = document.getElementById("menuBtn");
  const navLinks = document.getElementById("navLinks");
  const navbar = document.querySelector(".navbar");
  const backToTop = document.getElementById("backToTop");
  const navItems = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("main section[id]");
  const heroImage = document.querySelector(".hero-image");

  // Mobile navigation
  function closeMenu() {
    if (!menuBtn || !navLinks) return;
    navLinks.classList.remove("show");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.setAttribute("aria-label", "Open navigation menu");
    const icon = menuBtn.querySelector("i");
    if (icon) {
      icon.classList.remove("fa-xmark");
      icon.classList.add("fa-bars");
    }
  }

  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("show");
      menuBtn.setAttribute("aria-expanded", String(isOpen));
      menuBtn.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
      const icon = menuBtn.querySelector("i");
      if (icon) {
        icon.classList.toggle("fa-bars", !isOpen);
        icon.classList.toggle("fa-xmark", isOpen);
      }
    });

    navItems.forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 800) closeMenu();
    });
  }

  // Navbar and back-to-top scroll effects
  function handleScroll() {
    const scrollY = window.scrollY;
    if (navbar) navbar.classList.toggle("scrolled", scrollY > 50);
    if (backToTop) backToTop.classList.toggle("visible", scrollY > 450);

    let currentSection = "";
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 170;
      if (scrollY >= sectionTop) currentSection = section.id;
    });

    navItems.forEach(function (link) {
      const isActive = link.getAttribute("href") === "#" + currentSection;
      link.classList.toggle("active", isActive);
    });
  }

  window.addEventListener("scroll", handleScroll, { passive: true });
  handleScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Scroll reveal
  const revealElements = document.querySelectorAll(
    ".service-card, .skill-box, .project-card, .timeline-item, .experience-card, .credential-card, .stat, .about-copy, .contact-card"
  );

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(function (entries, currentObserver) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealElements.forEach(function (element, index) {
      element.classList.add("reveal");
      element.style.setProperty("--reveal-delay", (index % 4) * 75 + "ms");
      observer.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("revealed");
    });
  }

  // Automatically update footer year
  const yearElement = document.getElementById("year");
  if (yearElement) yearElement.textContent = new Date().getFullYear();

  // Subtle image tilt on larger screens; disabled for touch/reduced motion
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (heroImage && window.innerWidth > 900 && !reduceMotion) {
    heroImage.addEventListener("mousemove", function (event) {
      const rect = heroImage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateX = (y - 0.5) * -7;
      const rotateY = (x - 0.5) * 7;
      heroImage.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    heroImage.addEventListener("mouseleave", function () {
      heroImage.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    });
  }
});

