// BRAMA Events — script.js (Formspree integration + mailto fallback)
document.addEventListener('DOMContentLoaded', () => {
  // Footer year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Load products
  fetch('products.json')
    .then(r => r.json())
    .then(items => {
      const grid = document.getElementById('product-grid');
      if (!grid) return;
      grid.innerHTML = items.map(item => `
        <article class="product">
          <img src="${item.image}" alt="${item.alt}" loading="lazy" width="800" height="600">
          <div class="content">
            <h3>${item.title}</h3>
            <p class="muted">${item.desc}</p>
            <p class="price">${item.price}</p>
            <div class="tags">${(item.tags||[]).map(t => `<span class="tag">${t}</span>`).join('')}</div>
          </div>
        </article>
      `).join('');
    }).catch(() => {
      const grid = document.getElementById('product-grid');
      if (grid) grid.innerHTML = '<p class="muted">Could not load catalog. Check products.json</p>';
    });

  // Quote form
  const form = document.getElementById('quote-form');
  const status = document.getElementById('form-status');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const formspreeID = (form.getAttribute('action') || '').match(/formspree\.io\/f\/(.+)$/)?.[1];

      if (formspreeID && formspreeID !== 'FORM_ID') {
        // Send to Formspree
        try {
          const res = await fetch(form.action, {
            method: 'POST',
            headers: { 'Accept': 'application/json' },
            body: data
          });
          if (res.ok) {
            form.reset();
            if (status) status.textContent = 'Thanks! We received your request and will reply shortly.';
          } else {
            if (status) status.textContent = 'Oops, something went wrong. Please email hello@brama.events';
          }
        } catch (err) {
          if (status) status.textContent = 'Network error. Please email hello@brama.events';
        }
      } else {
        // Fallback to mailto if no Formspree ID set
        const subject = encodeURIComponent('Quote Request — BRAMA Events');
        const body = [...data.entries()].map(([k,v]) => `${k}: ${v}`).join('%0D%0A');
        const mailto = `mailto:hello@brama.events?subject=${subject}&body=${body}`;
        window.location.href = mailto;
        if (status) {
          status.textContent = 'Opening your email app… If nothing happens, email hello@brama.events';
        }
      }
    });
  }
});
