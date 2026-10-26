(() => {
  const items = [...document.querySelectorAll('.privacy-toc-link')];
  const sections = items.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if (!items.length || !sections.length) return;
  const activate = (id) => items.forEach(link => {
    const on = link.getAttribute('href') === '#' + id;
    link.classList.toggle('active', on);
    if (on) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(e => e.isIntersecting).sort((a,b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible.length) activate(visible[0].target.id);
    }, {rootMargin:'-105px 0px -60% 0px', threshold:0});
    sections.forEach(section => observer.observe(section));
  }
  items.forEach(link => link.addEventListener('click', () => activate(link.hash.slice(1))));
  activate((location.hash || '#section-1').slice(1));
})();
