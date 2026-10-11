/* Dependency-free filtering and local shortlisting. No network calls. */
'use strict';
function matchesEntry(entry, filters) {
  const query = String(filters.query || '').trim().toLocaleLowerCase();
  const words = query.split(/\s+/).filter(Boolean);
  const haystack = [entry.title, entry.description, entry.category, entry.url,
    ...(entry.notes || []), ...(entry.files || []), ...(entry.agent_types || []),
    ...(entry.surfaces || [])].join(' ').toLocaleLowerCase();
  return words.every(word => haystack.includes(word)) &&
    (!filters.priority || entry.priority === filters.priority) &&
    (!filters.category || entry.category === filters.category) &&
    (!filters.surface || entry.surfaces.includes(filters.surface)) &&
    (!filters.role || entry.agent_types.includes(filters.role)) &&
    (!filters.shortlist || (filters.selected || []).includes(entry.id));
}
function selectionBundle(entries, selected) {
  return {schema_version: 1, purpose: 'Source shortlist for an agent plan; no configuration installed.',
    exported_at: new Date().toISOString(), entries: entries.filter(row => selected.includes(row.id))};
}
if (typeof module !== 'undefined' && module.exports) module.exports = {matchesEntry, selectionBundle};
if (typeof document !== 'undefined') {
  const data = JSON.parse(document.getElementById('library-data').textContent);
  const controls = Object.fromEntries(['query','surface','role','priority','category','shortlist'].map(id => [id, document.getElementById(id)]));
  const cards = [...document.querySelectorAll('[data-entry-id]')];
  const byId = new Map(data.entries.map(row => [row.id, row]));
  const storageKey = 'codex-agent-library-shortlist-v1';
  let selected = [];
  try { const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (Array.isArray(stored)) selected = stored.filter(id => byId.has(id));
  } catch (_) { /* File URLs and private mode may block persistence. */ }
  function update() {
    const filters = Object.fromEntries(Object.entries(controls).map(([key, control]) => [key, control.type === 'checkbox' ? control.checked : control.value]));
    filters.selected = selected;
    let count = 0;
    cards.forEach(card => { const show = matchesEntry(byId.get(card.dataset.entryId), filters); card.hidden = !show; if (show) count++; });
    document.getElementById('result-count').textContent = count + ' of ' + data.entries.length + ' sources';
    document.getElementById('empty-results').hidden = count > 0;
    document.getElementById('selection-count').textContent = selected.length + ' saved';
    document.getElementById('export-selection').disabled = selected.length === 0;
  }
  Object.values(controls).forEach(control => control.addEventListener('input', update));
  document.querySelectorAll('[data-select-id]').forEach(box => {
    box.checked = selected.includes(box.dataset.selectId);
    box.addEventListener('change', () => {
      selected = box.checked ? [...new Set([...selected, box.dataset.selectId])] : selected.filter(id => id !== box.dataset.selectId);
      try { localStorage.setItem(storageKey, JSON.stringify(selected)); } catch (_) {}
      update();
    });
  });
  document.getElementById('reset-filters').addEventListener('click', () => {
    Object.values(controls).forEach(control => { if (control.type === 'checkbox') control.checked = false; else control.value = ''; }); update();
  });
  document.querySelectorAll('[data-role-filter]').forEach(button => button.addEventListener('click', () => {
    Object.values(controls).forEach(control => { if (control.type === 'checkbox') control.checked = false; else control.value = ''; });
    controls.role.value = button.dataset.roleFilter; update(); location.hash = 'sources';
  }));
  document.getElementById('export-selection').addEventListener('click', () => {
    const blob = new Blob([JSON.stringify(selectionBundle(data.entries, selected), null, 2)], {type: 'application/json'});
    const url = URL.createObjectURL(blob), anchor = document.createElement('a');
    anchor.href = url; anchor.download = 'agent-research-shortlist.json'; anchor.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  document.getElementById('print-library').addEventListener('click', () => window.print());
  document.querySelectorAll('details').forEach(node => node.dataset.initialOpen = node.open ? 'true' : 'false');
  window.addEventListener('beforeprint', () => document.querySelectorAll('details').forEach(node => node.open = true));
  window.addEventListener('afterprint', () => document.querySelectorAll('details').forEach(node => node.open = node.dataset.initialOpen === 'true'));
  update();
}
