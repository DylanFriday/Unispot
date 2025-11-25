// Generic helper to open/close modals
function setupModal(openSelector, modalId) {
  const openBtn = document.querySelector(openSelector);
  const modal = document.getElementById(modalId);
  if (!openBtn || !modal) return;

  const closeModal = () => modal.classList.add('hidden');
  const openModal = () => modal.classList.remove('hidden');

  openBtn.addEventListener('click', openModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal || e.target.hasAttribute('data-close-modal')) {
      closeModal();
    }
  });
}

// Study Sheet – create cards from form
(function () {
  setupModal('#open-upload-sheet', 'sheet-modal');

  const form = document.getElementById('sheet-form');
  const grid = document.getElementById('sheet-grid');
  if (!form || !grid) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const title = data.get('title');
    const course = data.get('course');
    const type = data.get('type') || 'Study sheet';
    const price = data.get('price');
    const desc = data.get('description') || '';

    const article = document.createElement('article');
    article.className = 'card';
    article.innerHTML = `
      <header class="card-header">
        <h3>${title}</h3>
        <span class="status status-pending">Pending</span>
      </header>
      <p class="card-sub">Course: ${course} • ${type}</p>
      <p class="card-body">${desc}</p>
      <div class="card-meta">
        <span class="price">฿${price}</span>
        <span class="rating">★ New</span>
      </div>
      <footer class="card-footer">
        <button class="ghost-btn">Edit</button>
        <button class="ghost-btn">Delete</button>
      </footer>
    `;
    grid.prepend(article);
    form.reset();
    document.getElementById('sheet-modal').classList.add('hidden');
  });
})();

// Reviews – create review cards
(function () {
  setupModal('#open-review-modal', 'review-modal');

  const form = document.getElementById('review-form');
  const list = document.getElementById('review-list');
  if (!form || !list) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const course = data.get('course');
    const teacher = data.get('teacher');
    const rating = data.get('rating');
    const text = data.get('text');

    const card = document.createElement('article');
    card.className = 'card';
    card.innerHTML = `
      <header class="card-header">
        <div>
          <h3>${course} – ${teacher}</h3>
          <p class="card-sub">Student review</p>
        </div>
        <span class="rating-large">★ ${rating}</span>
      </header>
      <p class="card-body">${text}</p>
      <footer class="card-footer">
        <button class="ghost-btn">Upvote</button>
        <button class="ghost-btn">Report</button>
      </footer>
    `;
    list.prepend(card);
    form.reset();
    document.getElementById('review-modal').classList.add('hidden');
  });
})();

// Apartments – list & detail modals
(function () {
  setupModal('#open-apartment-modal', 'apartment-form-modal');

  const form = document.getElementById('apartment-form');
  const grid = document.getElementById('apartment-grid');
  const detailModal = document.getElementById('apartment-detail-modal');
  if (!grid || !detailModal) return;

  // Fill detail modal
  function openDetail(btn) {
    const get = (name, def = '–') => btn.dataset[name] || def;

    document.getElementById('detail-title').textContent = get('title');
    document.getElementById('detail-price').textContent = get('price');
    document.getElementById('detail-price-small').textContent = get('price');
    document.getElementById('detail-project').textContent = get('title');
    document.getElementById('detail-deposit').textContent = get('deposit');
    document.getElementById('detail-advance').textContent = get('advance');
    document.getElementById('detail-roomtype').textContent = get('roomtype');
    document.getElementById('detail-floor').textContent = get('floor');
    document.getElementById('detail-bedrooms').textContent = get('bedrooms');
    document.getElementById('detail-bathrooms').textContent = get('bathrooms');
    document.getElementById('detail-size').textContent = get('size');
    document.getElementById('detail-address').textContent = get('address');
    document.getElementById('detail-description').textContent = get(
      'description',
      ''
    ).trim();

    detailModal.classList.remove('hidden');
  }

  // Click on existing Details buttons
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-apartment-details');
    if (!btn) return;
    openDetail(btn);
  });

  // Close detail modal
  detailModal.addEventListener('click', (e) => {
    if (e.target === detailModal || e.target.hasAttribute('data-close-modal')) {
      detailModal.classList.add('hidden');
    }
  });

  // Create new listing
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const title = data.get('title');
      const rent = data.get('rent');
      const deposit = data.get('deposit') || 'Please ask';
      const advance = data.get('advance') || 'Please ask';
      const roomtype = data.get('roomtype') || '–';
      const floor = data.get('floor') || '–';
      const size = data.get('size') || '–';
      const address = data.get('address') || '–';
      const description = data.get('description') || '';

      const article = document.createElement('article');
      article.className = 'card';
      article.innerHTML = `
        <header class="card-header">
          <h3>${title}</h3>
          <span class="status status-approved">Available</span>
        </header>
        <p class="card-body">${description}</p>
        <ul class="apartment-meta">
          <li>Rent: <strong>฿${rent} / month</strong></li>
          <li>Deposit: <strong>${deposit}</strong>, Advance: <strong>${advance}</strong></li>
        </ul>
        <footer class="card-footer">
          <button
            class="ghost-btn btn-apartment-details"
            data-title="${title}"
            data-price="฿${rent} / month"
            data-address="${address}"
            data-roomtype="${roomtype}"
            data-floor="${floor}"
            data-bedrooms="${roomtype}"
            data-bathrooms="–"
            data-size="${size}"
            data-deposit="${deposit}"
            data-advance="${advance}"
            data-description="${description}">
            Details
          </button>
          <button class="primary-btn">Express Interest</button>
        </footer>
      `;
      grid.prepend(article);
      form.reset();
      document.getElementById('apartment-form-modal').classList.add('hidden');
    });
  }
})();
