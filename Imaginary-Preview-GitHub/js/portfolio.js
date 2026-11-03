/* IMAGINARY — Portfolio: Category dropdown + two-column company grid
   (Figma 3273:677 closed, 3273:1017 Category open) */
(() => {
  // Order as in the open Category panel (3273:1073)
  const CATEGORIES = [
    "Apparel & Accessories",
    "Health & Wellness",
    "Beauty & Personal Care",
    "Consumer Internet",
    "Food & Beverage",
    "Home",
    "Luxury",
    "Pet",
    "4-Wall",
    "Software and Enablement",
  ];

  // Names, images and crops follow the Figma grid (3336:471), plus the featured
  // companies that weren't in it (using their featured photos).
  // `exited` marks the company as Exited on its card.
  // `crop` = left/top/width/height in % of the thumbnail window.
  // Categories are a best-guess mapping: Figma doesn't define one.
  const C = (name, img, cats, extra = {}) => ({ name, img, cats, ...extra });
  const COMPANIES = [
    C("10beauty", "grid/p0.jpg", ["Beauty & Personal Care"]),
    C("alec’s ice cream", "grid/p1.jpg", ["Food & Beverage"]),
    C("AYOH", "grid/p2.jpg", ["Food & Beverage"]),
    C("BATH HOUSE", "grid/p3.jpg", ["Health & Wellness", "4-Wall"], { crop: [-24.52, -4.25, 144.54, 120.55] }),
    C("BERO", "grid/p4.jpg", ["Food & Beverage"]),
    C("BLACK CROW AI", "grid/p5.jpg", ["Software and Enablement"], { crop: [0, -5.23, 100, 187.5] }),
    C("BUILDER", "grid/p6.jpg", ["Software and Enablement"]),
    C("CAFETERIA", "grid/p7.jpg", ["Consumer Internet"]),
    C("CANN", "grid/p8.jpg", ["Food & Beverage"]),
    C("CEREBELLY", "grid/p9.jpg", ["Food & Beverage", "Health & Wellness"]),
    C("DAILY HARVEST", "grid/p10.jpg", ["Food & Beverage"], { exited: true, crop: [-4.36, -4.6, 108.53, 109.12] }),
    C("DAVID", "grid/p11.jpg", ["Food & Beverage", "Health & Wellness"], { crop: [-32.06, -72.29, 163.8, 292.5] }),
    C("DUOS", "grid/p12.png", ["Health & Wellness"], { exited: true }),
    C("EON", null, ["Software and Enablement"]),
    C("FARFETCH", "grid/p13.jpg", ["Luxury", "Apparel & Accessories"], { exited: true }),
    C("GENIUS AI", "grid/p14.jpg", ["Software and Enablement"]),
    C("GLOSSIER", "grid/p15.png", ["Beauty & Personal Care"], { crop: [-3.12, -87.98, 100, 206.35] }),
    C("GOOD AMERICAN", "grid/p16.jpg", ["Apparel & Accessories"]),
    C("GOOSE HOLDINGS", "grid/p17.jpg", ["4-Wall"]),
    C("HALF MAGIC", "grid/p18.jpg", ["Beauty & Personal Care"]),
    C("HOOK MEDIA", "grid/p19.jpg", ["Consumer Internet"]),
    C("HUM NUTRITION", "grid/p20.jpg", ["Health & Wellness"]),
    C("KHY", "grid/p21.jpg", ["Apparel & Accessories"], { crop: [-3.94, -6.64, 107.87, 168.55] }),
    C("KOREAN BROS", "grid/p22.jpg", ["Food & Beverage"], { crop: [-16.19, -10.29, 132.38, 120.57] }),
    C("LORE", "grid/p23.jpg", ["Beauty & Personal Care"], { crop: [0, -34.52, 100, 156.25] }),
    C("LUCKY BEVERAGE", "grid/p24.jpg", ["Food & Beverage"]),
    C("MEJURI", "grid/p25.jpg", ["Apparel & Accessories", "Luxury"]),
    C("MILÁ", "grid/p26.jpg", ["Food & Beverage"]),
    C("nanos", "grid/p27.jpg", ["Pet"]),
    C("NÉCESSAIRE", "grid/p28.jpg", ["Beauty & Personal Care"]),
    C("NORDIC KNOTS", "grid/p29.png", ["Home"]),
    C("NUORDER", "grid/p30.jpg", ["Software and Enablement"], { exited: true, crop: [-11.01, -17.2, 119.88, 117.37] }),
    C("PEPPER (POMEGRANATE TECH)", "grid/p31.jpg", ["Software and Enablement"], { crop: [0.02, -7.93, 146.54, 117.75] }),
    C("point of view", "grid/p32.jpg", ["Health & Wellness"]),
    C("reale actives", "grid/p33.jpg", ["Beauty & Personal Care"], { crop: [-18.21, -14.73, 132.7, 124.6] }),
    C("reformation", "grid/p34.jpg", ["Apparel & Accessories"], { exited: true }),
    C("RETRO (LONE PALM LABS)", "grid/p35.png", ["Consumer Internet"]),
    C("santo taco", "grid/p36.jpg", ["Food & Beverage", "4-Wall"]),
    C("shiftsmart", "grid/p37.jpg", ["Software and Enablement"], { crop: [0, -0.64, 100, 109.52] }),
    C("SKIMS", "grid/p38.png", ["Apparel & Accessories"]),
    C("smalls", "grid/p39.jpg", ["Pet"]),
    C("SUNDAYS", "grid/p40.jpg", ["Pet"]),
    C("SWORL", "grid/p41.jpg", ["Food & Beverage"]),
    C("thefeed.com", "grid/p42.jpg", ["Health & Wellness"]),
    C("thirty madison (keeps)", "grid/p43.jpg", ["Health & Wellness"], { exited: true }),
    C("universal standard", "grid/p44.jpg", ["Apparel & Accessories"]),
    C("WESTMAN ATELIER", "grid/p45.jpg", ["Beauty & Personal Care"], { crop: [-3.97, -10.41, 108, 129.79] }),
  ];

  // Version B shows the companies as full-bleed tiles with the logo over the photo.
  // Logo files (assets/logos/tiles) are black on transparent and shown white by CSS;
  // `ar` corrects the few source files that are stored stretched.
  const LOGOS = {
    "10beauty": "10beauty.svg",
    "alec’s ice cream": "alecs.png",
    "AYOH": "ayoh.svg",
    "BATH HOUSE": "bathhouse.png",
    "BERO": "bero.png",
    "BLACK CROW AI": "black-crow-ai.svg",
    "BUILDER": "builder.svg",
    "CAFETERIA": "cafeteria.svg",
    "CANN": "cann.png",
    "CEREBELLY": "cerebelly.svg",
    "DAILY HARVEST": "daily-harvest.svg",
    "DAVID": "david.png",
    "DUOS": "duos.png",
    "EON": "eon.svg",
    "FARFETCH": "farfetch.svg",
    "GENIUS AI": "../genius-ai.svg",
    "GLOSSIER": "glossier.png",
    "GOOD AMERICAN": "good-american.svg",
    "HALF MAGIC": "half-magic.svg",
    "HOOK MEDIA": "hook-media.svg",
    "HUM NUTRITION": "hum.png",
    "KHY": "khy.svg",
    "KOREAN BROS": "korean-bros.png",
    "LORE": "lore.svg",
    "LUCKY BEVERAGE": "lucky-beverage.png",
    "MEJURI": "mejuri.png",
    "MILÁ": "mila-v2.png",
    "nanos": "nanos.png",
    "NÉCESSAIRE": "../necessaire.svg",
    "NORDIC KNOTS": "nordic.png",
    "NUORDER": "nuorder.svg",
    "PEPPER (POMEGRANATE TECH)": "pepper.svg",
    "point of view": { src: "pov.png", ar: 6.21 },
    "reale actives": "reale.png",
    "reformation": "reformation.svg",
    "RETRO (LONE PALM LABS)": "retro.png",
    "santo taco": "santo-taco.svg",
    "shiftsmart": "shiftsmart.png",
    "SKIMS": "skims.png",
    "smalls": "smalls.svg",
    "SUNDAYS": "sundays.png",
    "SWORL": "sworl.svg",
    "thefeed.com": { src: "thefeed.png", ar: 5.1 },
    "thirty madison (keeps)": "keeps.svg",
    "universal standard": "universal-standard.svg",
    "WESTMAN ATELIER": "westman.png",
  };
  const stacked = document.documentElement.dataset.version === "old";

  const grid = document.querySelector(".p-grid");
  const list = document.querySelector(".p-list");
  // the Category bar: its own section above the featured strips in
  // version B, inside the list in version A
  const bar = document.querySelector(".p-filterbar") || list;
  const featured = document.querySelector(".p-featured");
  const reduce = window.Imaginary?.reduceMotion;
  const esc = (s) => s.replace(/&/g, "&amp;");
  // grid images live in assets/grid (from Figma 3336:471)
  const src = (img) => (img.includes("/") ? `assets/${img}` : `assets/thumbs/${img}`);

  /* ---------- Grid ---------- */
  grid.innerHTML = COMPANIES.map((co, i) => {
    let img = "";
    if (co.img) {
      if (co.crop) {
        const [l, t, w, h] = co.crop;
        img = `<img src="${src(co.img)}" alt="" loading="lazy" decoding="async" style="left:${l}%;top:${t}%;width:${w}%;height:${h}%">`;
      } else {
        const pos = co.pos ? ` style="object-position:${co.pos}"` : "";
        img = `<img class="cover" src="${src(co.img)}" alt="" loading="lazy" decoding="async"${pos}>`;
      }
    }
    let mark = "";
    if (stacked) {
      const l = LOGOS[co.name];
      const logo = typeof l === "string" ? { src: l } : l;
      mark = logo
        ? `<div class="p-card__logo"${logo.ar ? ` data-ar="${logo.ar}"` : ""}><img src="assets/logos/tiles/${logo.src}" alt="${esc(co.name)}" decoding="async"></div>`
        : `<p class="p-card__wordmark">${esc(co.name)}</p>`;
      // version B: a small diagonal ribbon in the corner of exited companies
      if (co.exited) mark += '<span class="p-card__ribbon">Exited</span>';
    }
    // version A: a grey "Exited" line under the name
    const status = !stacked && co.exited ? '<p class="p-card__status">Exited</p>' : "";
    return `<article class="p-card" data-i="${i}">
      <div class="p-card__thumb">${img}${mark}</div>
      <p class="p-card__name">${esc(co.name)}</p>${status}
    </article>`;
  }).join("") + '<p class="p-empty" hidden>No companies match these filters yet</p>';
  const cards = [...grid.querySelectorAll(".p-card")];

  // Size each logo by its proportions so wide wordmarks and square marks read
  // at a similar visual weight: width grows with the square root of the aspect.
  const sizeLogo = (box) => {
    const im = box.querySelector("img");
    const ar = +box.dataset.ar || im.naturalWidth / im.naturalHeight;
    if (!ar) return;
    const w = Math.min(15, 4.4 * Math.sqrt(ar));
    box.style.width = `${w}rem`;
    box.style.height = `${w / ar}rem`;
  };
  grid.querySelectorAll(".p-card__logo").forEach((box) => {
    const im = box.querySelector("img");
    if (im.complete && im.naturalWidth) sizeLogo(box);
    else im.addEventListener("load", () => sizeLogo(box), { once: true });
  });
  const empty = grid.querySelector(".p-empty");
  cards.forEach((c) => c.addEventListener("animationend", () => c.classList.remove("is-entering")));

  /* ---------- Dropdown panels ---------- */
  const chipX = '<img class="chip__x" src="assets/icons/chip-x.svg" alt="" width="9.975" height="9.975">';
  const fill = (el, items, key) => {
    el.innerHTML = items.map((v) =>
      `<button class="chip" type="button" aria-pressed="false" data-key="${key}" data-value="${esc(v)}"><span>${esc(v)}</span>${chipX}</button>`
    ).join("");
  };
  fill(document.querySelector("#panel-category .p-chips"), CATEGORIES, "category");

  const toggles = [...document.querySelectorAll(".p-toggle")];
  const panels = { category: document.getElementById("panel-category") };

  function openPanel(name) {
    for (const t of toggles) {
      const on = t.dataset.panel === name;
      t.setAttribute("aria-expanded", String(on));
      panels[t.dataset.panel].classList.toggle("is-open", on);
    }
    bar.classList.toggle("has-open", !!name);
  }
  toggles.forEach((t) => t.addEventListener("click", () => {
    openPanel(t.getAttribute("aria-expanded") === "true" ? null : t.dataset.panel);
  }));

  /* ---------- Filtering (one category at a time) ---------- */
  const filter = { category: null };

  function apply() {
    document.querySelectorAll(".chip").forEach((c) => {
      const on = filter[c.dataset.key] === c.dataset.value;
      c.classList.toggle("is-active", on);
      c.setAttribute("aria-pressed", String(on));
    });
    // a small "(1)" next to a toggle shows its filter is set, even when closed
    toggles.forEach((t) => {
      let n = t.querySelector(".p-toggle__count");
      const set = filter[t.dataset.panel];
      if (set && !n) {
        n = document.createElement("span");
        n.className = "p-toggle__count";
        n.textContent = "(1)";
        t.insertBefore(n, t.querySelector(".p-toggle__chev"));
      }
      if (!set && n) n.remove();
    });

    let shown = 0;
    cards.forEach((card) => {
      const co = COMPANIES[+card.dataset.i];
      const okCat = !filter.category || co.cats.includes(filter.category);
      const match = okCat;
      card.hidden = !match;
      card.classList.remove("is-entering");
      if (match) {
        if (!reduce) {
          void card.offsetWidth; // restart the entrance animation
          card.style.setProperty("--d", `${Math.min(shown, 10) * 0.04}s`);
          card.classList.add("is-entering");
        }
        shown++;
      }
    });
    empty.hidden = shown > 0;
    // version B: while a filter is set, the matching tiles follow the bar directly
    if (bar !== list && featured) featured.hidden = !!filter.category;

    // if the filters have scrolled away, bring them back into view
    const top = bar.getBoundingClientRect().top;
    if (top < 0) window.scrollTo({ top: window.scrollY + top, behavior: reduce ? "auto" : "smooth" });
  }

  bar.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const { key, value } = chip.dataset; // dataset decodes &amp; back to &
    filter[key] = filter[key] === value ? null : value;
    apply();
  });
})();
