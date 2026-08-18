const publications = [
  {
    title: "KRUTRIM RAG: A Fully Offline Hybrid Retrieval-Augmented Generation Architecture for Enterprise Knowledge Retrieval and Question Answering",
    authors: ["Aesha Patel", "Kancharla Siri Lasya Reddy", "Meet Patel"],
    venue: "Preprint, Zenodo (Under Review), 2026",
    image: "assets/krutrim-thumb.png",
    keywords: ["Retrieval-Augmented Generation", "Knowledge Graphs", "Hybrid Retrieval"],
    links: [
      { label: "Paper", url: "https://zenodo.org/records/21989951" },
      { label: "Code", url: "https://github.com/aesha1456/KRUTRIM-RAG" }
    ]
  }
];

const escapeHTML = (value) =>
  String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#039;",
    '"': "&quot;"
  }[character]));

const escapeAttribute = (value) => escapeHTML(value).replace(/`/g, "&#096;");

const formatAuthors = (authors) => authors
  .map((author) => {
    const safeAuthor = escapeHTML(author);
    return safeAuthor.replace(/Aesha Patel/g, '<strong class="me">Aesha Patel</strong>');
  })
  .join(", ");

const renderPublications = () => {
  const container = document.getElementById("publication-list");
  if (!container) return;

  const html = publications.map((publication, index) => `
    <article class="pub-card" id="pub-P${index + 1}">
      ${publication.image ? `
        <div class="pub-thumb">
          <img src="${escapeAttribute(publication.image)}" alt="" loading="lazy">
        </div>
      ` : ""}

      <div class="pub-card-body">
        <div class="pub-keywords pub-keywords-top">
          ${(publication.keywords || []).map((keyword) => `
            <span class="pub-keyword">${escapeHTML(keyword)}</span>
          `).join("")}
        </div>

        <h3 class="pub-title">
          <span class="pub-title-number">[P${index + 1}]</span>
          ${escapeHTML(publication.title)}
        </h3>

        <p class="pub-authors">${formatAuthors(publication.authors)}</p>
        <p class="pub-venue">${escapeHTML(publication.venue)}</p>

        <div class="pub-links">
          ${publication.links.map((link) => `
            <a class="pub-link" href="${escapeAttribute(link.url)}" target="" rel="noopener noreferrer">
              ${escapeHTML(link.label)}
            </a>
          `).join("")}
        </div>
      </div>
    </article>
  `).join("");

  container.innerHTML = html || '<p class="pub-note">No publications yet.</p>';
};

const setupPdfDownload = () => {
  const button = document.getElementById("download-page-pdf");
  if (!button) return;

  button.addEventListener("click", () => {
    const originalTitle = document.title;
    document.title = "Aesha_Patel_CV";
    window.print();
    document.title = originalTitle;
  });
};

const setupMobileMenu = () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelectorAll(".nav-links a");

  menuToggle?.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      menuToggle?.setAttribute("aria-expanded", "false");
    });
  });
};

const setupActiveNav = () => {
  const sections = [...document.querySelectorAll("section[id]")];
  const navLinks = [...document.querySelectorAll(".nav-links a")];

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const id = entry.target.getAttribute("id");

      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
      });
    });
  }, { rootMargin: "-30% 0px -60% 0px", threshold: 0.1 });

  sections.forEach((section) => observer.observe(section));
};

const setupCurrentYear = () => {
  const currentYear = document.getElementById("current-year");
  if (currentYear) currentYear.textContent = new Date().getFullYear();
};

const setupThemeToggle = () => {
  const root = document.documentElement;
  const toggleButton = document.getElementById("theme-toggle");
  if (!toggleButton) return;

  const storedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = storedTheme || (prefersDark ? "dark" : "light");

  root.setAttribute("data-theme", initialTheme);

  toggleButton.addEventListener("click", () => {
    const currentTheme = root.getAttribute("data-theme");
    const nextTheme = currentTheme === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  setupThemeToggle();
  setupMobileMenu();
  setupPdfDownload();
  setupActiveNav();
  setupCurrentYear();
  renderPublications();
});
