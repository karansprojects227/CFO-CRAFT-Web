/* Dynamic Careers page, shared with Apply via roles.js. */
(() => {
  'use strict';
  const roles = Array.isArray(window.CFO_CAREER_ROLES)
    ? window.CFO_CAREER_ROLES.filter(r => r.status === 'open' && r.slug && r.title)
    : [];
  const list = document.getElementById('roles-list');
  const empty = document.getElementById('empty');
  const count = document.getElementById('count');
  if (!list) return;

  const node = (tag, className, value) => {
    const item = document.createElement(tag);
    if (className) item.className = className;
    if (value !== undefined) item.textContent = String(value);
    return item;
  };
  const icons = {
    Type: '<rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5h8v2M3 12h18"/>',
    Location: '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    Experience: '<path d="M12 2v3M4 5l2 2M20 5l-2 2"/><circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2"/>'
  };
  const fact = (label, value) => {
    const wrap = node('div','cfo-career-fact');
    const icon = node('span', 'cfo-career-fact-icon');
    icon.setAttribute('aria-hidden', 'true');
    icon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${icons[label]}</svg>`;
    const body = node('div','cfo-career-fact-body');
    body.append(node('dt','',label === 'Type' ? 'Employment' : label),node('dd','',value));
    wrap.append(icon,body);
    return wrap;
  };

  list.replaceChildren();
  if (empty) empty.hidden = roles.length > 0;
  if (count) count.textContent = `${roles.length} open role${roles.length === 1 ? '' : 's'}`;

  roles.forEach((role, index) => {
    const card = node('li','about-job-role cfo-career-card');
    const top = node('div','cfo-career-top');
    const main = node('div','cfo-career-main');
    main.append(
      node('span','cfo-career-kicker', `OPEN POSITION  /  ${String(index + 1).padStart(2,'0')}`),
      node('h3','cfo-career-title',role.title),
      node('p','cfo-career-desc',role.description || '')
    );
    const action = node('div','cfo-career-action');
    const button = node('a','btn-secondary cfo-career-apply','Apply now');
    button.href = `../careers/apply.html?role=${encodeURIComponent(role.slug)}`;
    button.setAttribute('aria-label', `Apply for ${role.title}`);
    button.append(node('span','cfo-career-arrow','→'));
    action.append(button);
    top.append(main,action);

    const details = node('dl','cfo-career-facts');
    if (role.type) details.append(fact('Type',role.type));
    if (role.location) {
      // Preserve source details; format bracketed internal note separately, not as a location name.
      const location = String(role.location);
      const match = location.match(/^(.+?)\s*\[([^\]]+)\]\s*$/);
      const locFact = fact('Location', match ? match[1] : location);
      if (match) {
        locFact.querySelector('.cfo-career-fact-body').append(
          node('small','cfo-career-fact-note', match[2].trim().replace(/^confirm\b/i,'Arrangement to confirm:'))
        );
      }
      details.append(locFact);
    }
    if (role.experience) details.append(fact('Experience',role.experience));
    card.append(top,details);
    list.append(card);
  });
})();
