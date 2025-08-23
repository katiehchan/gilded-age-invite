function buildHeader(activePath) {
  const navLinks = [
    ['index.html', 'Home'],
    ['event.html', 'Event'],
    ['location.html', 'Location'],
    ['attire.html', 'Attire'],
    ['rsvp.html', 'RSVP'],
    ['faq.html', 'FAQ']
  ];

  return `
  <header class="site-header">
    <div class="container">
      <nav class="nav">
        <div class="brand">
          <div class="brand-title">Gilded Soirée</div>
          <div class="brand-sub">Est. 1895</div>
        </div>
        <div class="nav-links">
          ${navLinks.map(([href, label]) => `
            <a href="${href}" ${activePath.endsWith(href) ? 'aria-current="page" class="active"' : ''}>${label}</a>
          `).join('')}
        </div>
      </nav>
    </div>
  </header>`;
}

function buildFooter() {
  const hosts = window.EVENT_DATA?.hosts || 'Your Hosts';
  const rsvpBy = window.EVENT_DATA?.rsvpBy || '';
  return `
    <footer class="site-footer">
      <div class="container">
        <div class="hr-ornament"></div>
        <p class="center small">Hosted by ${hosts}${rsvpBy ? ` • Kindly reply by ${rsvpBy}` : ''}</p>
        <p class="center small">© ${new Date().getFullYear()} The Gilded Soirée</p>
      </div>
    </footer>
  `;
}

function mountChrome(activePath) {
  document.body.insertAdjacentHTML('afterbegin', buildHeader(activePath));
  document.body.insertAdjacentHTML('beforeend', buildFooter());
}

window.addEventListener('DOMContentLoaded', () => {
  const current = location.pathname.split('/').pop() || 'index.html';
  mountChrome(current);
  if (window.EVENT_DATA?.title) {
    document.title = `${window.EVENT_DATA.title} — ${document.title || 'Invitation'}`;
  }
});
