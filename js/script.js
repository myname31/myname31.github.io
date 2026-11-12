// ZanSky AFTERDARK — edit profile, projects and skills in this file.
const CONFIG = {
  githubUser: "myname31",
  // Isi URL yang ingin ditampilkan. Biarkan "" jika tidak ingin menampilkannya.
  socials: {
    github: "https://github.com/myname31",
    instagram: "https://www.instagram.com/albuchori__",
    tiktok: "",
    youtube: "",
    facebook: "",
    x: "",
    linkedin: "",
    telegram: "https://t.me/MeUsep",
    discord: "",
    threads: "",
    whatsapp: "",
    twitch: "",
    pinterest: "",
    reddit: "",
    medium: "",
    behance: "",
    dribbble: "",
    website: ""
  },
  projects: [
    { name: "WhatsApp Automation", description: "Bot development, message automation, and useful chat-based tools.", tags: ["NODE.JS", "BAILEYS", "AUTOMATION"], url: "https://github.com/myname31" },
    { name: "Centralized REST API", description: "Endpoint orchestration and lightweight services built with JavaScript.", tags: ["EXPRESS", "REST API", "NODE.JS"], url: "https://github.com/myname31" },
    { name: "Lyrics Repository", description: "A focused collection and project for working with song lyrics data.", tags: ["JAVASCRIPT", "OPEN SOURCE"], url: "https://github.com/myname31/lyrics" }
  ],
  skills: [
    { name: "JavaScript", detail: "OFTEN USED / CONTINUOUSLY LEARNING", level: 62 },
    { name: "Node.js", detail: "USED IN PERSONAL PROJECTS", level: 55 },
    { name: "HTML", detail: "FUNDAMENTALS", level: 22 },
    { name: "CSS", detail: "FUNDAMENTALS", level: 18 }
  ]
};

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

function startBoot() {
  const boot = $("#boot");
  const status = $("#boot-status");
  const messages = ["LOADING DIGITAL SPACE", "RENDERING PIXEL ENVIRONMENT", "ESTABLISHING CONNECTION"];
  let i = 0;
  const interval = setInterval(() => {
    if (status) status.textContent = messages[Math.min(i, messages.length - 1)];
    i++;
    if (i >= messages.length) {
      clearInterval(interval);
      setTimeout(() => boot?.classList.add("done"), 350);
    }
  }, 350);
}
function clock() {
  const node = $("#clock");
  const update = () => {
    const now = new Date();
    if (node) node.textContent = new Intl.DateTimeFormat("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "Asia/Jakarta" }).format(now);
  };
  update(); setInterval(update, 1000);
}
function revealOnScroll() {
  const items = $$(".reveal");
  if (!("IntersectionObserver" in window)) { items.forEach(x => x.classList.add("visible")); return; }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.12 });
  items.forEach(item => observer.observe(item));
}
function navigation() {
  const rail = $(".side-rail"), toggle = $("#menu-toggle");
  toggle?.addEventListener("click", () => {
    const open = rail.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
  });
  $$("#side-nav a").forEach(link => link.addEventListener("click", () => {
    rail.classList.remove("open"); toggle?.setAttribute("aria-expanded", "false");
  }));
  const sections = $$("main section[id]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        $$("#side-nav a").forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
      }
    }), { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(section => observer.observe(section));
  }
}
function pixelRain() {
  const canvas = $("#pixel-rain"), ctx = canvas?.getContext("2d");
  if (!canvas || !ctx || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let w, h, drops = [];
  const resize = () => {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    w = canvas.width = innerWidth * dpr; h = canvas.height = innerHeight * dpr;
    canvas.style.width = `${innerWidth}px`; canvas.style.height = `${innerHeight}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    drops = Array.from({ length: Math.floor(innerWidth / 24) }, () => ({ x: Math.random() * innerWidth, y: Math.random() * innerHeight, speed: .25 + Math.random() * .65, size: Math.random() > .7 ? 2 : 1, alpha: .08 + Math.random() * .22 }));
  };
  resize(); addEventListener("resize", resize);
  let frame = 0;
  const draw = () => {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    if (++frame % 2 === 0) drops.forEach(p => {
      ctx.fillStyle = `rgba(220,224,232,${p.alpha})`; ctx.fillRect(Math.floor(p.x / 4) * 4, p.y, p.size * 2, 5);
      p.y += p.speed;
      if (p.y > innerHeight) { p.y = -10; p.x = Math.random() * innerWidth; }
    });
    requestAnimationFrame(draw);
  };
  draw();
}
function customCursor() {
  const cursor = $(".cursor-dot");
  if (!cursor || matchMedia("(pointer: coarse)").matches) return;
  cursor.style.opacity = "1";
  let x = 0, y = 0, tx = 0, ty = 0;
  addEventListener("mousemove", e => { tx = e.clientX; ty = e.clientY; });
  const animate = () => { x += (tx - x) * .22; y += (ty - y) * .22; cursor.style.left = `${x}px`; cursor.style.top = `${y}px`; requestAnimationFrame(animate); };
  animate();
  $$("a,button").forEach(el => {
    el.addEventListener("mouseenter", () => cursor.style.transform = "translate(-50%,-50%) scale(2.6)");
    el.addEventListener("mouseleave", () => cursor.style.transform = "translate(-50%,-50%) scale(1)");
  });
}
async function loadGithub() {
  const message = $("#github-message");
  try {
    const response = await fetch(`https://api.github.com/users/${encodeURIComponent(CONFIG.githubUser)}`, { headers: { Accept: "application/vnd.github+json" } });
    if (!response.ok) throw new Error(`GitHub API returned ${response.status}`);
    const data = await response.json();
    const values = { repos: data.public_repos, followers: data.followers, following: data.following, created: data.created_at ? new Date(data.created_at).getFullYear() : "—" };
    Object.entries(values).forEach(([key, value]) => {
      const node = $(`[data-stat="${key}"]`);
      if (node) node.textContent = typeof value === "number" ? value.toLocaleString("id-ID") : value;
    });
    if (message) message.textContent = "CONNECTION ESTABLISHED / DATA UPDATED";
  } catch (error) {
    if (message) message.textContent = "GITHUB DATA TEMPORARILY UNAVAILABLE";
    console.warn("GitHub stats:", error);
  }
}
function renderProjects() {
  const list = $("#project-list");
  if (!list) return;
  const visuals = ["visual-bot", "visual-api", "visual-lyrics"];
  const symbols = ["⌘", "{ }", "▁▃▅▂▆"];
  list.innerHTML = CONFIG.projects.map((p, i) => `
    <a class="project-row reveal" href="${escapeHTML(p.url)}" target="_blank" rel="noreferrer">
      <div class="project-id">PRJ. ${String(i + 1).padStart(3, "0")}</div>
      <div class="project-main"><h3>${escapeHTML(p.name)}</h3><p>${escapeHTML(p.description)}</p>
      <div class="project-tags">${p.tags.map(tag => `<span>${escapeHTML(tag)}</span>`).join("")}</div></div>
      <div class="project-visual ${visuals[i % visuals.length]}"><span class="visual-symbol">${symbols[i % symbols.length]}</span><span class="visual-label">PROJECT / ${String(i + 1).padStart(2, "0")}</span></div>
      <span class="project-arrow">↗</span>
    </a>`).join("");
}
function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}
function terminal() {
  const panel = $("#terminal-panel"), toggle = $("#terminal-toggle"), close = $("#terminal-close");
  const form = $("#terminal-form"), input = $("#terminal-input"), output = $("#terminal-output");
  const show = () => { panel.hidden = false; toggle.querySelector(".terminal-plus").textContent = "−"; };
  const hide = () => { panel.hidden = true; toggle.querySelector(".terminal-plus").textContent = "+"; document.body.classList.remove("terminal-typing"); input.blur(); };
  input?.addEventListener("focus", () => document.body.classList.add("terminal-typing"));
  input?.addEventListener("blur", () => document.body.classList.remove("terminal-typing"));
  toggle?.addEventListener("click", () => {
    if (panel.hidden) { show(); }
    else if (document.activeElement === input) { input.blur(); }
    else { hide(); }
  });
  close?.addEventListener("click", hide);
  input?.addEventListener("keydown", e => { if (e.key === "Escape") { hide(); } });
  const commands = {
    help: "AVAILABLE: help, about, projects, github, contact, clear, date",
    about: "ZanSky — JavaScript developer from Indonesia. Always learning.",
    projects: "Featured: WhatsApp Automation / Centralized REST API / Lyrics Repository",
    github: `Opening github.com/${CONFIG.githubUser}`,
    contact: "Find me on GitHub: github.com/" + CONFIG.githubUser,
    date: new Date().toLocaleDateString("id-ID", { dateStyle: "full" })
  };
  form?.addEventListener("submit", e => {
    e.preventDefault();
    const cmd = input.value.trim().toLowerCase(); if (!cmd) return;
    const line = document.createElement("p"); line.textContent = `> ${cmd}`; output.append(line);
    if (cmd === "clear") output.innerHTML = "";
    else {
      const result = document.createElement("p");
      result.textContent = commands[cmd] || `Command not found: ${cmd}. Type "help".`;
      output.append(result);
      if (cmd === "github") window.open(`https://github.com/${CONFIG.githubUser}`, "_blank", "noopener");
      if (cmd === "contact") output.lastChild.textContent += " ↗";
    }
    input.value = ""; output.scrollTop = output.scrollHeight;
  });
}

function birthdayClock() {
  const countdownNode = $("#birthday-countdown");
  if (!countdownNode) return;
  const birthMonth = 6, birthDay = 31;
  const update = () => {
    const now = new Date();
    const birthdayThisYear = new Date(now.getFullYear(), birthMonth, birthDay);
    let nextBirthday = birthdayThisYear;
    if (now >= birthdayThisYear) nextBirthday = new Date(now.getFullYear() + 1, birthMonth, birthDay);
    if (now.getMonth() === birthMonth && now.getDate() === birthDay) {
      countdownNode.textContent = "HAPPY BIRTHDAY — TODAY IS YOUR DAY";
      return;
    }
    const remaining = Math.max(0, nextBirthday.getTime() - now.getTime());
    const days = Math.floor(remaining / 86400000);
    const hours = Math.floor((remaining % 86400000) / 3600000);
    const minutes = Math.floor((remaining % 3600000) / 60000);
    const seconds = Math.floor((remaining % 60000) / 1000);
    countdownNode.textContent = `NEXT BIRTHDAY IN ${days}D ${String(hours).padStart(2,"0")}H ${String(minutes).padStart(2,"0")}M ${String(seconds).padStart(2,"0")}S`;
  };
  update();
  setInterval(update, 1000);
}

// Local custom soundtrack. Place your own file at assets/music/sound.mp3.
function ambientMusic() {
  const audio = $("#backgroundMusic");
  const button = $("#music-toggle");
  const state = $("#music-state");
  const volume = $("#music-volume");
  const volumeValue = $("#music-volume-value");
  const player = $("#music-player");
  if (!audio || !button || !state || !volume || !player) return;

  audio.volume = Number(volume.value || 0.35);
  audio.pause(); // Always start silent; playback requires an explicit visitor action.

  const setPlayingUI = (playing) => {
    button.setAttribute("aria-pressed", String(playing));
    button.setAttribute("aria-label", playing ? "Pause background music" : "Play background music");
    state.textContent = playing ? "MUSIC ON" : "MUSIC OFF";
    player.classList.toggle("is-playing", playing);
  };

  button.addEventListener("click", async () => {
    if (!audio.paused) {
      audio.pause();
      setPlayingUI(false);
      return;
    }
    state.textContent = "LOADING...";
    button.disabled = true;
    try {
      await audio.play();
      setPlayingUI(true);
    } catch (error) {
      setPlayingUI(false);
      state.textContent = "ADD SOUND.MP3";
      console.warn("Music playback failed. Check assets/music/sound.mp3", error);
    } finally {
      button.disabled = false;
    }
  });

  volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
    if (volumeValue) volumeValue.textContent = `${Math.round(audio.volume * 100)}%`;
  });
  audio.addEventListener("play", () => setPlayingUI(true));
  audio.addEventListener("pause", () => setPlayingUI(false));
  audio.addEventListener("ended", () => setPlayingUI(false));
  audio.addEventListener("error", () => {
    if (state.textContent === "LOADING...") state.textContent = "ADD SOUND.MP3";
    setPlayingUI(false);
  });
  setPlayingUI(false);
}

function footerYear() { const y = $("#year"); if (y) y.textContent = new Date().getFullYear(); }
const SOCIAL_PLATFORMS = {
  github: { name: "GitHub", note: "EXPLORE MY CODE", icon: '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.7c3-.3 6.1-1.5 6.1-6.7a5.2 5.2 0 0 0-1.4-3.6 4.8 4.8 0 0 0-.1-3.6S17.5 1.2 15 3.4a13.2 13.2 0 0 0-6 0C6.5 1.2 5.3 1.5 5.3 1.5a4.8 4.8 0 0 0-.1 3.6 5.2 5.2 0 0 0-1.4 3.6c0 5.2 3.1 6.4 6.1 6.7A3.4 3.4 0 0 0 9 18v4"/>' },
  instagram: { name: "Instagram", note: "FIND ME ON", icon: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>' },
  tiktok: { name: "TikTok", note: "WATCH ON", icon: '<path d="M14 3v11.2a4.2 4.2 0 1 1-3.4-4.1M14 3c.7 3 2.4 4.6 5 5"/>' },
  youtube: { name: "YouTube", note: "WATCH ON", icon: '<rect x="2.5" y="5" width="19" height="14" rx="4"/><path d="m10 9 5 3-5 3z" fill="currentColor" stroke="none"/>' },
  facebook: { name: "Facebook", note: "FIND ME ON", icon: '<path d="M14 21v-8h3l.5-4H14V7c0-1.2.4-2 2-2h2V1.5c-.8-.1-1.8-.2-3-.2-3 0-5 1.8-5 5.2V9H7v4h3v8z"/>' },
  x: { name: "X", note: "FOLLOW ON", icon: '<path d="M4 3h4.5L20 21h-4.5zM20 3 4 21"/>' },
  linkedin: { name: "LinkedIn", note: "CONNECT ON", icon: '<rect x="3" y="9" width="4" height="12"/><circle cx="5" cy="5" r="2"/><path d="M11 21V9h4v2c.7-1.4 2-2.3 4-2.3 2.5 0 3 1.8 3 4.3V21h-4v-7c0-1.5-.3-2.3-1.5-2.3S15 12.7 15 14v7z"/>' },
  telegram: { name: "Telegram", note: "MESSAGE ON", icon: '<path d="m3 11 18-7-5 17-4-6-4-3 11-8-14 10z"/>' },
  discord: { name: "Discord", note: "JOIN ON", icon: '<path d="M7 7c3-1.5 7-1.5 10 0l2 10c-2 2-4 2.5-5 2.5l-.8-1.5M7 7 5 17c2 2 4 2.5 5 2.5l.8-1.5M8 16c2.5 1.5 5.5 1.5 8 0"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/>' },
  threads: { name: "Threads", note: "FOLLOW ON", icon: '<path d="M18 8c-1-3-3-4-6-4-4 0-7 3-7 8s3 8 7 8c3 0 6-2 6-5 0-2-1-3-3-3-2 0-4 1-4 3 0 1 1 2 2 2 3 0 4-3 3-6-1-3-3-4-6-4"/>' },
  whatsapp: { name: "WhatsApp", note: "CHAT ON", icon: '<path d="M20 11.5a8 8 0 0 1-12 7L4 20l1.5-4A8 8 0 1 1 20 11.5Z"/><path d="M9 8.5c.5 2 2 3.5 4.5 4.5l1-1 2 1c-.5 2-2 2.5-4 1.5-3-1.5-5-4-5-6 0-1 1-2 2-2z"/>' },
  twitch: { name: "Twitch", note: "WATCH ON", icon: '<path d="M5 3h16v12l-5 5h-4l-3 2v-2H5zM9 8v5M15 8v5"/>' },
  pinterest: { name: "Pinterest", note: "FIND ME ON", icon: '<path d="M12 21c1-2 1.5-4 2-6 1 2 5 1 6-3 1-5-2-9-7-9-5 0-8 4-8 8 0 2 1 4 3 5l1-3c-1-1-1-2-1-3 0-3 2-5 5-5 3 0 5 2 5 5 0 3-1 5-3 5-1 0-2-1-2-2l1-4c0-1-1-2-2-2-2 0-3 2-3 4 0 1 0 2 1 3l-2 7"/>' },
  reddit: { name: "Reddit", note: "JOIN ME ON", icon: '<circle cx="12" cy="13" r="8"/><path d="m9 11 6 0M9 16c2 1.5 4 1.5 6 0M12 5l1-3 4 1"/><circle cx="9" cy="13" r=".8"/><circle cx="15" cy="13" r=".8"/>' },
  medium: { name: "Medium", note: "READ ON", icon: '<path d="M3 6h4l5 9 5-9h4v12h-4V9l-5 9-5-9v9H3z"/>' },
  behance: { name: "Behance", note: "VIEW ON", icon: '<path d="M3 7h7a3 3 0 0 1 0 6H3zm0 6h8a3 3 0 0 1 0 6H3zM14 8h6M14 14h7c0-2-1-3-3-3s-4 1-4 4 2 4 4 4c1 0 2-.5 3-1"/>' },
  dribbble: { name: "Dribbble", note: "EXPLORE ON", icon: '<circle cx="12" cy="12" r="9"/><path d="M5 6c4 3 7 7 9 13M3 12c5 0 11-2 15-6M7 19c2-4 7-7 14-6"/>' },
  website: { name: "Website", note: "VISIT MY SITE", icon: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>' }
};

function configureSocialLinks() {
  const entries = Object.entries(CONFIG.socials || {}).filter(([key, rawUrl]) => {
    const url = String(rawUrl || "").trim();
    return SOCIAL_PLATFORMS[key] && /^https?:\/\//i.test(url);
  });
  const makeIcon = platform => `<svg viewBox="0 0 24 24" aria-hidden="true">${platform.icon}</svg>`;
  const strip = $(".social-strip");
  if (strip) {
    strip.innerHTML = entries.map(([key, rawUrl]) => {
      const platform = SOCIAL_PLATFORMS[key];
      const url = String(rawUrl).trim();
      return `<a href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer" aria-label="${platform.name}">${makeIcon(platform)}<span>${platform.name.toUpperCase()}</span><b>↗</b></a>`;
    }).join("");
    strip.hidden = entries.length === 0;
  }
  const contact = $(".contact-socials");
  if (contact) {
    contact.innerHTML = entries.map(([key, rawUrl]) => {
      const platform = SOCIAL_PLATFORMS[key];
      const url = String(rawUrl).trim();
      return `<a class="contact-social" href="${escapeHTML(url)}" target="_blank" rel="noopener noreferrer" aria-label="${platform.name}">${makeIcon(platform)}<span><small>${platform.note}</small><b>${platform.name.toUpperCase()}</b></span><i>↗</i></a>`;
    }).join("");
    contact.hidden = entries.length === 0;
  }
  // The GitHub activity button follows the same configuration rule.
  const githubButton = $("[data-social-link=\"github\"]");
  if (githubButton) {
    const githubUrl = String(CONFIG.socials?.github || "").trim();
    if (/^https?:\/\//i.test(githubUrl)) githubButton.href = githubUrl;
    else githubButton.hidden = true;
  }
}

startBoot();
clock();
configureSocialLinks();
revealOnScroll();
navigation();
pixelRain();
customCursor();
loadGithub();
terminal();
footerYear();
birthdayClock();
ambientMusic();
