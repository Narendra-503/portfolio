document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) window.lucide.createIcons();
  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];
  const body = document.body;
  const navbar = $("#navbar");
  const menuBtn = $("#menuBtn");
  const navMenu = $("#navMenu");
  const progress = $("#scrollProgress");
  const navItems = $$(".nav-item");
  const toTop = $("#toTop");
  const year = $("#year");
  if (year) year.textContent = new Date().getFullYear();

  try { if (localStorage.getItem("nr-portfolio-theme") === "light") body.classList.add("light"); } catch (_) {}
  $("#themeBtn")?.addEventListener("click", () => {
    body.classList.toggle("light");
    try { localStorage.setItem("nr-portfolio-theme", body.classList.contains("light") ? "light" : "dark"); } catch (_) {}
  });

  menuBtn?.addEventListener("click", () => {
    const open = navMenu.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Toggle menu");
    menuBtn.innerHTML = open ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    if (window.lucide) window.lucide.createIcons();
  });
  // App-style navigation: show exactly one page section at a time (no long-page scrolling).
  const sections = $$('main section[id]');
  const findMe = $('.find-me');
  const navContact = $('.nav-contact');
  function showPage(pageId, updateHash = true) {
    const validPage = sections.some(section => section.id === pageId) ? pageId : 'home';
    sections.forEach(section => {
      const isCurrent = section.id === validPage;
      section.classList.toggle('page-hidden', !isCurrent);
      section.hidden = !isCurrent;
      section.setAttribute('aria-hidden', String(!isCurrent));
      if (isCurrent) section.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    });
    // Social/contact panel belongs only to the Contact view.
    if (findMe) {
      const isContact = validPage === 'contact';
      findMe.classList.toggle('page-hidden', !isContact);
      findMe.hidden = !isContact;
      findMe.setAttribute('aria-hidden', String(!isContact));
    }
    navItems.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${validPage}`));
    navMenu?.classList.remove('open');
    menuBtn?.setAttribute('aria-expanded', 'false');
    window.scrollTo(0, 0);
    if (updateHash && window.location.hash !== `#${validPage}`) history.pushState(null, '', `#${validPage}`);
    if (progress) progress.style.width = '0';
    navbar?.classList.remove('scrolled');
    toTop?.classList.remove('show');
    if (window.lucide) window.lucide.createIcons();
  }
  // Intercept section links (nav, CTA and in-page links) and switch the view.
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const pageId = link.getAttribute('href').slice(1);
    if (sections.some(section => section.id === pageId)) {
      event.preventDefault();
      showPage(pageId);
    }
  });
  window.addEventListener('popstate', () => showPage(window.location.hash.slice(1) || 'home', false));
  window.addEventListener('hashchange', () => showPage(window.location.hash.slice(1) || 'home', false));
  showPage(window.location.hash.slice(1) || 'home', false);
  toTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  $$(".reveal").forEach((el, i) => {
    el.style.transitionDelay = `${Math.min((i % 5) * 55, 220)}ms`;
    revealObserver.observe(el);
  });

  const roles = ["Data Analyst", "Python Developer", "Python Full Stack Developer"];
  const roleEl = $("#roleText");
  let role = 0, char = roles[0].length, deleting = true;
  function typeRole() {
    if (!roleEl) return;
    const current = roles[role];
    if (deleting) {
      char--;
      roleEl.textContent = current.slice(0, Math.max(0, char));
      if (char <= 0) { deleting = false; role = (role + 1) % roles.length; }
    } else {
      char++;
      roleEl.textContent = roles[role].slice(0, char);
      if (char >= roles[role].length) { deleting = true; setTimeout(typeRole, 1200); return; }
    }
    setTimeout(typeRole, deleting ? 40 : 72);
  }
  setTimeout(typeRole, 1500);

  // Subtle mouse-driven tilt for the hero card.
  const card = $("#profileCard");
  const canTilt = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (card && canTilt) {
    card.addEventListener("mousemove", event => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotateY(${x * 8}deg) rotateX(${-y * 7}deg) translateY(-2px)`;
    });
    card.addEventListener("mouseleave", () => { card.style.transform = "rotateY(0) rotateX(0)"; });
  }

  // Skills filter.
  $$(".skill-tab").forEach(button => button.addEventListener("click", () => {
    $$(".skill-tab").forEach(tab => tab.classList.toggle("active", tab === button));
    const filter = button.dataset.filter;
    $$(".skill-card").forEach(card => {
      const visible = filter === "all" || card.dataset.type === filter;
      card.classList.toggle("hidden", !visible);
      if (visible) card.classList.add("visible");
    });
  }));

  // Project category filter.
  $$(".project-filter").forEach(button => button.addEventListener("click", () => {
    $$(".project-filter").forEach(tab => tab.classList.toggle("active", tab === button));
    const filter = button.dataset.projectFilter;
    $$(".project-card").forEach(card => {
      card.classList.toggle("hidden", filter !== "all" && card.dataset.projectType !== filter);
    });
  }));

  // The form opens an email draft instead of claiming to send through a backend.
  $("#contactForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const message = $("#message").value.trim();
    const note = $("#formNote");
    if (!name || !email || !message) {
      note.textContent = "Please complete each field before preparing your email.";
      return;
    }
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const bodyText = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    note.textContent = "Opening your email application with a prepared draft…";
    window.location.href = `mailto:narendrareddy07012005@gmail.com?subject=${subject}&body=${bodyText}`;
  });
});