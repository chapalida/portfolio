fetch('content.json')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    // Optional: only set the name if the element exists
    const nameEl = document.getElementById('user-name');
    if (nameEl) nameEl.textContent = data.name;

    // Introduction paragraphs
    const homeEl = document.getElementById('home-content');
    data.home.forEach(text => {
      const p = document.createElement('p');
      p.textContent = text;
      homeEl.appendChild(p);
    });
  })
  .catch(error => console.error('Error loading JSON:', error));