document.addEventListener("DOMContentLoaded", () => {
  // Update copyright year
  document.getElementById("year").textContent = new Date().getFullYear();

  // Add animation indices to project cards for staggered animation
  const projectCards = document.querySelectorAll(".project-card");
  projectCards.forEach((card, index) => {
    card.style.setProperty("--card-index", index);
  });

  // Scroll animations for sections
  const sections = document.querySelectorAll("section");

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation = "fadeIn 0.8s ease forwards";
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    section.style.opacity = "0";
    observer.observe(section);
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Header hide/show on scroll
  let lastScrollTop = 0;
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 200) {
      header.classList.add("header-hidden");
    } else {
      header.classList.remove("header-hidden");
    }

    lastScrollTop = scrollTop;
  });

  const projectTitles = new Set();
  projectCards.forEach((card) => {
    const title = card.querySelector("h3").textContent.trim();
    projectTitles.add(title);
  });
});

const themeToggle = document.getElementById("themeToggle");
const themeStylesheet = document.getElementById("themeStylesheet");

const savedTheme = localStorage.getItem("theme");
const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(theme) {
  if (theme === "dark") {
    themeStylesheet.href = "css/dark.css";
    themeToggle.checked = true;
  } else {
    themeStylesheet.href = "css/light.css";
    themeToggle.checked = false;
  }
  localStorage.setItem("theme", theme);
}

if (savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme(prefersDark ? "dark" : "light");
}

themeToggle.addEventListener("change", () => {
  const newTheme = themeToggle.checked ? "dark" : "light";
  setTheme(newTheme);
});
