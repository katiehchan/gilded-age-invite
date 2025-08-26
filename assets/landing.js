(function () {
  // Only run on / or /index.html
  if (!/\/(?:index\.html)?$/.test(window.location.pathname)) return;

  const phrase = 'You are cordially invited to:';

  function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

  async function typewrite(node, text, speed = 40) {
    node.textContent = '';
    for (let i = 0; i < text.length; i++) {
      node.textContent += text[i];
      await sleep(speed);
    }
    // Remove the typewriter class to stop the blinking cursor
    node.classList.remove('typewriter');
  }

  function renderDetails() {
    const d = window.EVENT_DATA || {};
    const titleEl = document.querySelector('.event-title');
    const subtitleEl = document.querySelector('.event-subtitle');
    const metaEl = document.querySelector('.event-meta');

    if (titleEl) titleEl.textContent = d.title || 'An Elegant Affair';
    if (subtitleEl) subtitleEl.textContent = d.subtitle || '';

    if (metaEl) {
      metaEl.innerHTML = `
        <div><strong>Date</strong><br>${d.date || ''}</div>
        <div><strong>Time</strong><br>${d.time || ''}</div>
        <div><strong>Venue</strong><br>${d.venue || ''}</div>
        <div><strong>Address</strong><br>${d.address || ''}</div>
      `;
    }

    const cta = document.querySelector('.cta-row');
    if (cta) {
      cta.innerHTML = `
        ${d.rsvpLink ? `<a class="btn btn-primary" href="${d.rsvpLink}" target="_blank" rel="noopener">RSVP</a>` : ''}
        <a class="btn" href="event.html">Event Details</a>
        <a class="btn" href="location.html">Location</a>
        <a class="btn" href="attire.html">Attire</a>
        <a class="btn" href="faq.html">FAQ</a>
      `;
    }

    const details = document.querySelector('.event-details');
    if (details) details.classList.add('show');
  }

  async function init() {
    const skip = new URLSearchParams(location.search).get('skip');
    const inviteEl = document.getElementById('invite-line');
    if (!inviteEl) return renderDetails();

    if (skip === '1') {
      inviteEl.textContent = phrase;
      renderDetails();
      return;
    }

    await sleep(300);
    await typewrite(inviteEl, phrase, 44);
    await sleep(300);
    renderDetails();
  }

  window.addEventListener('DOMContentLoaded', init);
})();