/* IMAGINARY — Portfolio: Category / Status dropdowns + two-column company grid
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
  const STATUSES = ["Current", "Exited"];

  // Names, images, crops and Exited flags follow the Figma grid (3273:1032),
  // plus the featured companies that weren't in it (using their featured photos).
  // `crop` = left/top/width/height in % of the thumbnail window.
  // Categories are a best-guess mapping: Figma doesn't define one.
  const C = (name, img, cats, extra = {}) => ({ name, img, cats, ...extra });
  const COMPANIES = [
    C("10beauty", "t0.jpg", ["Beauty & Personal Care"]),
    C("alec’s ice cream", "t1.jpg", ["Food & Beverage"]),
    C("AYOH", "t2.jpg", ["Food & Beverage"]),
    C("BATH HOUSE", "t3.jpg", ["Health & Wellness", "4-Wall"], { crop: [-64.02, -53.09, 228.05, 190.2] }),
    C("BERO", "featured/bero.jpg", ["Food & Beverage"]),
    C("BLACK CROW AI", "t4.jpg", ["Software and Enablement"], { crop: [0, -5.23, 100, 187.5] }),
    C("BUILDER", "t5.jpg", ["Software and Enablement"]),
    C("CAFETERIA", "t6.jpg", ["Consumer Internet"]),
    C("CANN", "t7.jpg", ["Food & Beverage"]),
    C("CEREBELLY", "t8.png", ["Food & Beverage", "Health & Wellness"]),
    C("DAILY HARVEST", "t9.jpg", ["Food & Beverage"], { exited: true }),
    C("DAVID", "featured/david.png", ["Food & Beverage", "Health & Wellness"], { pos: "88% 50%" }),
    C("DUOS", "t10.png", ["Health & Wellness"], { exited: true }),
    C("EON", null, ["Software and Enablement"]),
    C("FARFETCH", "t11.jpg", ["Luxury", "Apparel & Accessories"], { exited: true }),
    C("GENIUS AI", "featured/glossgenius.jpg", ["Software and Enablement"]),
    C("GLOSSIER", "t12.png", ["Beauty & Personal Care"], { crop: [-0.45, -35.33, 100, 206.35] }),
    C("GOOD AMERICAN", "t13.jpg", ["Apparel & Accessories"]),
    C("GOOSE HOLDINGS", "t14.jpg", ["4-Wall"]),
    C("HALF MAGIC", "t15.png", ["Beauty & Personal Care"]),
    C("HOOK MEDIA", "t16.png", ["Consumer Internet"]),
    C("HUM NUTRITION", "t17.png", ["Health & Wellness"]),
    C("KHY", "t18.jpg", ["Apparel & Accessories"], { crop: [-3.94, -6.64, 107.87, 168.55] }),
    C("KOREAN BROS", "t19.png", ["Food & Beverage"], { crop: [-16.19, -10.29, 132.38, 120.57] }),
    C("LORE", "t20.jpg", ["Beauty & Personal Care"], { crop: [0, -34.52, 100, 156.25] }),
    C("LUCKY BEVERAGE", "t21.jpg", ["Food & Beverage"]),
    C("MEJURI", "t22.jpg", ["Apparel & Accessories", "Luxury"]),
    C("MILÁ", "t23.jpg", ["Food & Beverage"]),
    C("nanos", "t24.jpg", ["Pet"]),
    C("NÉCESSAIRE", "t25.jpg", ["Beauty & Personal Care"]),
    C("NORDIC KNOTS", "featured/nordic.jpg", ["Home"]),
    C("NUORDER", "t26.png", ["Software and Enablement"], { exited: true, crop: [-11.01, -17.2, 119.88, 117.37] }),
    C("PEPPER (POMEGRANATE TECH)", null, ["Software and Enablement"]),
    C("point of view", "t27.jpg", ["Health & Wellness"]),
    C("reale actives", "t28.jpg", ["Beauty & Personal Care"], { crop: [-18.21, -14.73, 132.7, 124.6] }),
    C("reformation", "t29.png", ["Apparel & Accessories"], { exited: true }),
    C("RETRO (LONE PALM LABS)", "t30.png", ["Consumer Internet"]),
    C("santo taco", "t31.jpg", ["Food & Beverage", "4-Wall"]),
    C("shiftsmart", "t32.jpg", ["Software and Enablement"], { crop: [0, -0.64, 100, 109.52] }),
    C("SKIMS", "featured/skims.jpg", ["Apparel & Accessories"]),
    C("smalls", "t33.png", ["Pet"]),
    C("SUNDAYS", "featured/sundays.png", ["Pet"]),
    C("SWORL", "t34.jpg", ["Food & Beverage"]),
    C("thefeed.com", "t35.png", ["Health & Wellness"]),
    C("thirty madison (keeps)", "t36.jpg", ["Health & Wellness"], { exited: true }),
    C("universal standard", "t37.jpg", ["Apparel & Accessories"]),
    C("WESTMAN ATELIER", "featured/westman.jpg", ["Beauty & Personal Care"]),
  ];

  const grid = document.querySelector(".p-grid");
  const list = document.querySelector(".p-list");
  const reduce = window.Imaginary?.reduceMotion;
  const esc = (s) => s.replace(/&/g, "&amp;");
  // grid thumbnails live in assets/thumbs; featured companies reuse their featured photo
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
    return `<article class="p-card" data-i="${i}">
      <div class="p-card__thumb">${img}</div>
      <p class="p-card__name">${esc(co.name)}</p>
    </article>`;
  }).join("") + '<p class="p-empty" hidden>No companies match these filters yet</p>';
  const cards = [...grid.querySelectorAll(".p-card")];
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
  fill(document.querySelector("#panel-status .p-chips"), STATUSES, "status");

  const toggles = [...document.querySelectorAll(".p-toggle")];
  const panels = { category: document.getElementById("panel-category"), status: document.getElementById("panel-status") };

  function openPanel(name) {
    for (const t of toggles) {
      const on = t.dataset.panel === name;
      t.setAttribute("aria-expanded", String(on));
      panels[t.dataset.panel].classList.toggle("is-open", on);
    }
    list.classList.toggle("has-open", !!name);
  }
  toggles.forEach((t) => t.addEventListener("click", () => {
    openPanel(t.getAttribute("aria-expanded") === "true" ? null : t.dataset.panel);
  }));

  /* ---------- Filtering (one category + one status, combined) ---------- */
  const filter = { category: null, status: null };

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
      const okStatus = !filter.status || (filter.status === "Exited" ? !!co.exited : !co.exited);
      const match = okCat && okStatus;
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

    // if the top of the list has scrolled away, bring it back into view
    const top = list.getBoundingClientRect().top;
    if (top < 0) window.scrollTo({ top: window.scrollY + top, behavior: reduce ? "auto" : "smooth" });
  }

  list.addEventListener("click", (e) => {
    const chip = e.target.closest(".chip");
    if (!chip) return;
    const { key, value } = chip.dataset; // dataset decodes &amp; back to &
    filter[key] = filter[key] === value ? null : value;
    apply();
  });
})();
