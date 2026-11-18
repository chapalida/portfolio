console.log('script loaded');
fetch('content.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    renderHome(data);
    renderSection(data.project, 'project-intro', 'project-dropdown');
    renderSection(data.experience, 'experience-intro', 'experience-dropdown');
  })
  .catch(error => console.error('Error loading JSON:', error));


// ---------- Rendering ---------- (Claude AI)
function renderHome(data) {
  const el = document.getElementById('home-content');
  if (!el || !data.home) return;
  data.home.forEach(text => {
    const p = document.createElement('p');
    p.textContent = text;
    el.appendChild(p);
  });
}

function renderSection(section, introId, dropdownId) {
  if (!section) return;

  const intro = document.getElementById(introId);
  if (intro) intro.textContent = section.intro || '';

  const dropdownEl = document.getElementById(dropdownId);
  if (!dropdownEl || !section.dropdown) return;

  section.dropdown.forEach(group => {
    const details = document.createElement('details');
    details.className = `dropdown ${group.layout || ''}`;
    details.open = true;

    const summary = document.createElement('summary');
    summary.textContent = group.label;
    details.appendChild(summary);

    group.cards.forEach(card => {
      const div = document.createElement('div');
      div.className = 'card';

      const h3 = document.createElement('h3');
      h3.textContent = card.title;

      const p = document.createElement('p');
      p.textContent = card.text;

      div.append(h3, p);
      details.appendChild(div);
    });

    dropdownEl.appendChild(details);
  });
}


// Showing paragraphs
function showView(id) {
  const target = document.getElementById(id);
  if (!target) return;

  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  target.classList.add('active');
}
document.querySelectorAll('[data-view]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const id = link.dataset.view;
    showView(id);
    history.replaceState(null, '', `#${id}`);
  });
});

showView(location.hash.slice(1) || 'home');

// source: https://dev.to/john_phillips/working-with-json-data-in-an-html-environment-3opg