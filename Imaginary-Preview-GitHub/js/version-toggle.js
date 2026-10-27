/* Version switch: jumps between the current prototype and the original-logo
   copy (/old-logo/), staying on the same page and at the same scroll position. */
(() => {
  const isOld = document.documentElement.dataset.version === "old";
  const file = location.pathname.split("/").pop() || "index.html";
  const KEY = "imaginary-version-scroll";

  // Old pages use <base href="../">, so links there resolve from the site root.
  const hrefCurrent = file;
  const hrefOld = isOld ? `old-logo/${file}` : `old-logo/${file}`;

  const nav = document.createElement("nav");
  nav.className = "version-toggle";
  nav.setAttribute("aria-label", "Prototype version");
  nav.innerHTML =
    `<a href="${hrefCurrent}" aria-current="${!isOld}" aria-label="Version A: new logo" title="New logo">A</a>` +
    `<a href="${hrefOld}" aria-current="${isOld}" aria-label="Version B: old logo" title="Old logo">B</a>`;
  document.body.appendChild(nav);

  nav.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    if (a.getAttribute("aria-current") === "true") { e.preventDefault(); return; }
    try { sessionStorage.setItem(KEY, String(window.scrollY)); } catch (_) {}
  });

  // Arriving from the other version: return to the same spot
  let y = null;
  try { y = sessionStorage.getItem(KEY); sessionStorage.removeItem(KEY); } catch (_) {}
  if (y !== null) {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    const go = () => window.scrollTo(0, +y);
    go();
    window.addEventListener("load", go, { once: true });
  }
})();
