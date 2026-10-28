(() => {
  'use strict';
  const BASE = 'https://cfo-craft-backend.onrender.com/api/careers/cv';
  const $ = (id) => document.getElementById(id);
  const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  const provided = new URLSearchParams(window.location.search).get('application');
  if (provided && uuid.test(provided)) $('application-id').value = provided;
  const message = (text, error = false) => {
    $('review-status').hidden = false;
    $('review-status').className = error ? 'review-status error' : 'review-status';
    $('review-status').textContent = text;
  };
  $('request-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = $('application-id').value.trim();
    if (!uuid.test(id)) { message('Enter a valid Application ID.', true); return; }
    const button = $('request-button'); button.disabled = true;
    try {
      const resp = await fetch(`${BASE}/request-code`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({application_id:id}), credentials:'omit' });
      const data = await resp.json();
      if (!resp.ok) throw new Error(data.message || 'Could not send verification code.');
      $('download-form').hidden = false;
      message(data.message || 'Check the owner email inbox for a code.');
    } catch (err) { message(err.message || 'Network error.', true); }
    finally { button.disabled = false; }
  });
  $('download-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = $('application-id').value.trim(), code = $('verification-code').value.trim();
    if (!uuid.test(id) || !/^\d{8}$/.test(code)) { message('Enter a valid Application ID and 8-digit code.', true); return; }
    const button = $('download-button'); button.disabled = true;
    try {
      const resp = await fetch(`${BASE}/download`, { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({application_id:id,code}), credentials:'omit' });
      if (!resp.ok) { const err = await resp.json().catch(()=>({})); throw new Error(err.message || 'Code invalid or expired.'); }
      if (!String(resp.headers.get('Content-Type') || '').includes('application/pdf')) throw new Error('Unexpected response.');
      const blob = await resp.blob();
      const disposition = resp.headers.get('Content-Disposition') || '';
      const match = disposition.match(/filename="([^"\\]+)"/);
      const fileName = match ? match[1] : `CFO-CRAFT-CV-${id}.pdf`;
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement('a'); a.href = objectUrl; a.download = fileName; document.body.appendChild(a); a.click(); a.remove();
      setTimeout(()=>URL.revokeObjectURL(objectUrl),60000);
      $('verification-code').value='';
      message('PDF download started. This one-time code cannot be reused.');
    } catch(err) { message(err.message || 'Could not download CV.', true); }
    finally { button.disabled=false; }
  });
})();
