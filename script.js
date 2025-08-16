// Modern Social Work Portfolio JavaScript
document.addEventListener("DOMContentLoaded", function () {
  "use strict";

  // Initialize all features
  initSmoothScrolling();
  initNavigationEffects();
  initScrollAnimations();
  initInteractiveElements();
  initTypewriterEffect();
  initParallaxEffects();
  initScrollProgress();
  initBackToTop();
  initMobileMenu();
  initFormValidation();
  initLazyLoading();

  console.log("🚀 Portfolio loaded successfully!");
});

// Smooth Scrolling for Anchor Links
function initSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const headerHeight = document.querySelector(".main-nav").offsetHeight;
        const targetPosition = targetElement.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

// Enhanced Navigation Effects
function initNavigationEffects() {
  const nav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".main-nav a");

  // Set current page as active
  function setCurrentPageActive() {
    const currentPage =
      window.location.pathname.split("/").pop() || "index.html";
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === currentPage) {
        link.classList.add("active");
      }
    });
  }

  // Active navigation highlighting for same-page sections
  function updateActiveNav() {
    const sections = document.querySelectorAll("section[id], main > div[id]");
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          if (link.getAttribute("href").startsWith("#")) {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${sectionId}`) {
              link.classList.add("active");
            }
          }
        });
      }
    });
  }

  // Navbar background on scroll
  function updateNavBackground() {
    if (window.scrollY > 100) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }

  // Set current page active on load
  setCurrentPageActive();

  window.addEventListener("scroll", () => {
    updateActiveNav();
    updateNavBackground();
  });

  // Hover effects for nav items
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-2px)";
    });

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)";
    });
  });
}

// Scroll-triggered Animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");

        // Add staggered animation for child elements
        const children = entry.target.querySelectorAll(".animate-child");
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add("animate-in");
          }, index * 100);
        });
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".module, .about-content section, .integrated-profile-content section, .module-gallery, .artifact-item"
  );
  animateElements.forEach((el) => {
    el.classList.add("animate-on-scroll");
    observer.observe(el);
  });
}

// Interactive Elements Enhancement
function initInteractiveElements() {
  // Enhanced artifact hover effects
  const artifactItems = document.querySelectorAll(".artifact-item");

  artifactItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-8px) scale(1.02)";
      this.style.boxShadow = "var(--shadow-xl)";
    });

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
      this.style.boxShadow = "var(--shadow-md)";
    });
  });

  // Button ripple effects
  const buttons = document.querySelectorAll(
    ".cta-button, .view-asset-btn, .module-link"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      const ripple = document.createElement("span");
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

      this.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
}

// Typewriter Effect for Hero Section
function initTypewriterEffect() {
  const heroTitle = document.querySelector("header h1");
  if (!heroTitle) return;

  const text = heroTitle.textContent;
  heroTitle.textContent = "";
  heroTitle.style.borderRight = "2px solid var(--primary)";

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      heroTitle.style.borderRight = "none";
    }
  };

  // Start typing after a short delay
  setTimeout(typeWriter, 500);
}

// Parallax Effects
function initParallaxEffects() {
  const parallaxElements = document.querySelectorAll(".hero, .cta");

  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach((element) => {
      const speed = 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });
  });
}

// Scroll Progress Indicator
function initScrollProgress() {
  const progressBar = document.createElement("div");
  progressBar.className = "scroll-progress";
  progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, var(--primary), var(--secondary));
        z-index: 9999;
        transition: width 0.1s ease;
    `;

  document.body.appendChild(progressBar);

  window.addEventListener("scroll", () => {
    const scrolled =
      (window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight)) *
      100;
    progressBar.style.width = scrolled + "%";
  });
}

// Back to Top Button
function initBackToTop() {
  const backToTop = document.createElement("button");
  backToTop.className = "back-to-top";
  backToTop.innerHTML = "↑";
  backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--primary);
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 1.5rem;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: var(--shadow-lg);
    `;

  document.body.appendChild(backToTop);

  // Show/hide button based on scroll position
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.style.opacity = "1";
      backToTop.style.visibility = "visible";
    } else {
      backToTop.style.opacity = "0";
      backToTop.style.visibility = "hidden";
    }
  });

  // Scroll to top functionality
  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Hover effects
  backToTop.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-3px) scale(1.1)";
    this.style.background = "var(--primary-dark)";
  });

  backToTop.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
    this.style.background = "var(--primary)";
  });
}

// Mobile Menu Toggle
function initMobileMenu() {
  const nav = document.querySelector(".main-nav");
  const navToggle = document.createElement("button");
  navToggle.className = "nav-toggle";
  navToggle.innerHTML = "☰";
  navToggle.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: var(--gray-700);
        cursor: pointer;
        padding: var(--space-sm);
    `;

  nav.appendChild(navToggle);

  // Mobile menu functionality
  function toggleMobileMenu() {
    nav.classList.toggle("mobile-open");
    navToggle.innerHTML = nav.classList.contains("mobile-open") ? "✕" : "☰";
  }

  navToggle.addEventListener("click", toggleMobileMenu);

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!nav.contains(e.target)) {
      nav.classList.remove("mobile-open");
      navToggle.innerHTML = "☰";
    }
  });

  // Responsive behavior
  function handleResize() {
    if (window.innerWidth > 768) {
      nav.classList.remove("mobile-open");
      navToggle.innerHTML = "☰";
    }
  }

  window.addEventListener("resize", handleResize);
}

// Form Validation (for any future forms)
function initFormValidation() {
  const forms = document.querySelectorAll("form");

  forms.forEach((form) => {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Basic validation
      const inputs = this.querySelectorAll(
        "input[required], textarea[required]"
      );
      let isValid = true;

      inputs.forEach((input) => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add("error");

          // Remove error class after user starts typing
          input.addEventListener("input", function () {
            this.classList.remove("error");
          });
        }
      });

      if (isValid) {
        // Show success message
        showNotification("Form submitted successfully!", "success");
        this.reset();
      } else {
        showNotification("Please fill in all required fields.", "error");
      }
    });
  });
}

// Lazy Loading for Images
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: var(--space-md);
        background: ${
          type === "success"
            ? "var(--secondary)"
            : type === "error"
            ? "#ef4444"
            : "var(--primary)"
        };
        color: white;
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto remove after 5 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 5000);
}

// Add CSS animations
const style = document.createElement("style");
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .animate-on-scroll {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-on-scroll.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .animate-child {
        opacity: 0;
        transform: translateY(20px);
        transition: all 0.4s ease;
    }
    
    .animate-child.animate-in {
        opacity: 1;
        transform: translateY(0);
    }
    
    .main-nav.scrolled {
        background: rgba(255, 255, 255, 0.98);
        backdrop-filter: blur(20px);
        box-shadow: var(--shadow-lg);
    }
    
    .main-nav a.active {
        background: var(--primary);
        color: white;
    }
    
    @media (max-width: 768px) {
        .main-nav.mobile-open ul {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: var(--shadow-lg);
            padding: var(--space-md);
        }
        
        .nav-toggle {
            display: block !important;
        }
    }
    

    
    .error {
        border-color: #ef4444 !important;
        box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }
`;

document.head.appendChild(style);
