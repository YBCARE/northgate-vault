import { escapeHtml, daysSince } from './utils.js'
import { STATUSES, ASSET_TYPES, MOVEMENT_TYPES, STATUS_LABELS, ASSET_TYPE_LABELS, formatLocation } from './constants.js'

const BASE_STYLE = `
  :root {
    --navy: #0a1f44; --navy-deep: #071529; --accent: #1a5f9e; --alert: #c8102e;
    --section: #f4f6f8; --body: #2c3e50; --border: #dde2e8;
  }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: 'Inter', Arial, Helvetica, sans-serif; color: var(--body); background: var(--section); }
  a { color: var(--accent); }
  h1, h2, h3 { color: var(--navy); margin: 0 0 12px; }
  header.topbar {
    background: var(--navy-deep); color: #fff; padding: 0 24px; display: flex; align-items: center;
    justify-content: space-between; height: 60px;
  }
  header.topbar .brand { font-weight: 700; letter-spacing: 0.5px; font-size: 15px; }
  header.topbar nav a { color: rgba(255,255,255,0.75); text-decoration: none; margin-right: 20px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.4px; }
  header.topbar nav a.active, header.topbar nav a:hover { color: #fff; }
  header.topbar form { margin: 0; }
  header.topbar button.logout { background: none; border: 1px solid rgba(255,255,255,0.3); color: #fff; padding: 7px 14px; font-size: 12px; cursor: pointer; }
  main.wrap { max-width: 1100px; margin: 0 auto; padding: 32px 24px 64px; }
  .card { background: #fff; border: 1px solid var(--border); padding: 24px; margin-bottom: 20px; }
  .flash { padding: 12px 16px; margin-bottom: 20px; font-size: 14px; border-left: 4px solid var(--accent); background: #eaf1f8; }
  .flash.error { border-left-color: var(--alert); background: #fbe9ec; color: #7a0f22; }
  label { display: block; font-size: 13px; font-weight: 600; color: var(--navy); margin: 14px 0 5px; }
  input, select, textarea {
    width: 100%; padding: 10px 12px; border: 1px solid var(--border); font-size: 14px; font-family: inherit; background: #fff;
  }
  textarea { resize: vertical; }
  .btn {
    display: inline-block; background: var(--navy); color: #fff; border: none; padding: 11px 22px;
    font-size: 13px; font-weight: 700; letter-spacing: 0.4px; text-transform: uppercase; cursor: pointer; text-decoration: none;
  }
  .btn:hover { background: var(--navy-deep); }
  .btn.outline { background: #fff; color: var(--navy); border: 1px solid var(--navy); }
  .btn.outline:hover { background: var(--navy); color: #fff; }
  .btn.danger { background: var(--alert); }
  .btn.small { padding: 7px 14px; font-size: 12px; }
  table { width: 100%; border-collapse: collapse; }
  th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid var(--border); font-size: 14px; }
  th { font-size: 11px; text-transform: uppercase; letter-spacing: 0.5px; color: #6b7a95; }
  tr:hover td { background: #fafbfc; }
  .badge { display: inline-block; padding: 3px 9px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.3px; background: var(--section); color: var(--navy); border: 1px solid var(--border); }
  .badge.closed { background: #eee; color: #888; }
  .badge.vehicle { background: #fbe9ec; color: var(--alert); border-color: #f3c6cd; }
  .filters { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 20px; align-items: end; }
  .filters > div { flex: 1; min-width: 140px; }
  .filters label { margin-top: 0; }
  .item-row { display: grid; grid-template-columns: 1.2fr 2fr 1fr 1fr auto; gap: 10px; margin-bottom: 10px; align-items: end; }
  .item-row label { margin-top: 0; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 0 20px; }
  .section-title { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px; color: var(--accent); margin: 28px 0 8px; }
  .timeline { list-style: none; margin: 0; padding: 0; }
  .timeline li { padding: 12px 0; border-bottom: 1px solid var(--border); }
  .timeline .meta { font-size: 12px; color: #6b7a95; }
  .actions-row { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 8px; }
  .login-wrap { min-height: 100vh; display: flex; align-items: center; justify-content: center; background: var(--navy-deep); }
  .login-card { background: #fff; padding: 40px; width: 100%; max-width: 360px; }
`

const NAV_ITEMS = [
  { href: '/admin/dashboard', label: 'Dashboard' },
  { href: '/admin/consignments/new', label: 'New Consignment' },
]

function flashHtml(flash, flashType) {
  if (!flash) return ''
  return `<div class="flash${flashType === 'error' ? ' error' : ''}">${escapeHtml(flash)}</div>`
}

export function layout({ title, activeHref, bodyHtml, flash, flashType }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${escapeHtml(title)} | Northgate Vault Admin</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>${BASE_STYLE}</style>
</head>
<body>
<header class="topbar">
  <span class="brand">NORTHGATE VAULT — ADMIN</span>
  <nav style="display:flex;align-items:center;">
    ${NAV_ITEMS.map((item) => `<a href="${item.href}" class="${activeHref === item.href ? 'active' : ''}">${item.label}</a>`).join('')}
    <form id="logout-form"><button type="button" class="logout" onclick="adminLogout()">Log Out</button></form>
  </nav>
</header>
<main class="wrap">
  ${flashHtml(flash, flashType)}
  ${bodyHtml}
</main>
<script>
async function adminLogout() {
  await fetch('/api/admin/logout', { method: 'POST' });
  window.location.href = '/admin/login';
}
async function postJSON(url, method, body) {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}
function withFlash(path, message, type) {
  const url = new URL(path, window.location.origin);
  url.searchParams.set('flash', message);
  if (type) url.searchParams.set('flashType', type);
  window.location.href = url.toString();
}
</script>
</body>
</html>`
}

export function loginPage({ error }) {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Admin Login | Northgate Vault</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
<style>${BASE_STYLE}</style>
</head>
<body>
<div class="login-wrap">
  <div class="login-card">
    <h1 style="font-size:20px;">Northgate Vault Admin</h1>
    <p style="font-size:13px;color:#6b7a95;margin:0 0 8px;">Sign in with the administrator password.</p>
    ${error ? `<div class="flash error">${escapeHtml(error)}</div>` : ''}
    <form id="login-form">
      <label for="password">Password</label>
      <input type="password" id="password" name="password" required autofocus />
      <button class="btn" type="submit" style="width:100%;margin-top:20px;">Sign In</button>
    </form>
  </div>
</div>
<script>
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const password = document.getElementById('password').value;
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  if (res.ok) {
    window.location.href = '/admin/dashboard';
  } else {
    const data = await res.json().catch(() => ({}));
    window.location.href = '/admin/login?error=' + encodeURIComponent(data.error || 'Incorrect password.');
  }
});
</script>
</body>
</html>`
}

function statusOptions(selected) {
  return STATUSES.map((s) => `<option value="${s}" ${s === selected ? 'selected' : ''}>${STATUS_LABELS[s]}</option>`).join('')
}

function movementOptions(selected) {
  return MOVEMENT_TYPES.map((m) => `<option value="${m}" ${m === selected ? 'selected' : ''}>${m === 'one_way' ? 'One-Way Transfer' : 'Custody / Storage'}</option>`).join('')
}

function assetTypeOptions(selected) {
  return ASSET_TYPES.map((a) => `<option value="${a}" ${a === selected ? 'selected' : ''}>${ASSET_TYPE_LABELS[a]}</option>`).join('')
}

export function dashboardPage({ consignments, filters, flash, flashType }) {
  const rows = consignments.map((c) => `
    <tr onclick="window.location.href='/admin/consignments/${c.id}'" style="cursor:pointer;">
      <td>${escapeHtml(c.reference_number)}</td>
      <td>${escapeHtml(c.client_name)}${c.organization ? `<br><span style="color:#6b7a95;font-size:12px;">${escapeHtml(c.organization)}</span>` : ''}</td>
      <td><span class="badge">${STATUS_LABELS[c.current_status] || c.current_status}</span></td>
      <td>${c.movement_type === 'custody' ? 'Custody / Storage' : 'One-Way'}</td>
      <td>${c.item_count}${c.has_vehicle ? ' <span class="badge vehicle">Vehicle</span>' : ''}</td>
      <td>${new Date(c.updated_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })}</td>
      <td>${c.is_closed ? '<span class="badge closed">Closed</span>' : '<span class="badge">Open</span>'}</td>
    </tr>
  `).join('')

  const body = `
    <div style="display:flex;justify-content:space-between;align-items:center;">
      <h1>Consignments</h1>
      <a href="/admin/consignments/new" class="btn">+ New Consignment</a>
    </div>
    <form class="card filters" method="get" action="/admin/dashboard">
      <div>
        <label for="search">Search</label>
        <input type="text" id="search" name="search" placeholder="Reference, client, organization" value="${escapeHtml(filters.search || '')}" />
      </div>
      <div>
        <label for="status">Status</label>
        <select id="status" name="status">
          <option value="">All statuses</option>
          ${statusOptions(filters.status)}
        </select>
      </div>
      <div>
        <label for="movement_type">Movement Type</label>
        <select id="movement_type" name="movement_type">
          <option value="">All types</option>
          ${movementOptions(filters.movementType)}
        </select>
      </div>
      <div>
        <label for="open_state">State</label>
        <select id="open_state" name="open_state">
          <option value="" ${!filters.openState ? 'selected' : ''}>All</option>
          <option value="open" ${filters.openState === 'open' ? 'selected' : ''}>Open</option>
          <option value="closed" ${filters.openState === 'closed' ? 'selected' : ''}>Closed</option>
        </select>
      </div>
      <div><button class="btn" type="submit">Filter</button></div>
    </form>
    <div class="card" style="padding:0;">
      <table>
        <thead><tr><th>Reference</th><th>Client</th><th>Status</th><th>Type</th><th>Items</th><th>Updated</th><th>State</th></tr></thead>
        <tbody>${rows || '<tr><td colspan="7" style="text-align:center;color:#6b7a95;padding:30px;">No consignments found.</td></tr>'}</tbody>
      </table>
    </div>
  `

  return layout({ title: 'Dashboard', activeHref: '/admin/dashboard', bodyHtml: body, flash, flashType })
}

function itemRowHtml(index, item = {}) {
  return `
    <div class="item-row" data-item-row>
      <div>
        <label>Asset Type</label>
        <select name="items[${index}][asset_type]">${assetTypeOptions(item.asset_type)}</select>
      </div>
      <div>
        <label>Description</label>
        <input type="text" name="items[${index}][description]" value="${escapeHtml(item.description || '')}" required />
      </div>
      <div>
        <label>Quantity</label>
        <input type="text" name="items[${index}][quantity]" value="${escapeHtml(item.quantity || '')}" />
      </div>
      <div>
        <label>Seal Number</label>
        <input type="text" name="items[${index}][seal_number]" value="${escapeHtml(item.seal_number || '')}" />
      </div>
      <div>
        <button type="button" class="btn outline small" onclick="this.closest('[data-item-row]').remove()">Remove</button>
      </div>
    </div>
  `
}

export function createPage({ flash, flashType }) {
  const body = `
    <h1>New Consignment</h1>
    <form id="create-form" class="card">
      <div class="grid-2">
        <div>
          <label>Client Name</label>
          <input type="text" name="client_name" required />
        </div>
        <div>
          <label>Client Email</label>
          <input type="email" name="client_email" required />
        </div>
      </div>
      <div class="grid-2">
        <div>
          <label>Organization</label>
          <input type="text" name="organization" />
        </div>
        <div>
          <label>Movement Type</label>
          <select name="movement_type" required>${movementOptions()}</select>
        </div>
      </div>
      <div class="grid-2">
        <div>
          <label>Reference Number <span style="font-weight:400;color:#6b7a95;">(optional — auto-generated if blank)</span></label>
          <input type="text" name="reference_number" placeholder="NGV-0000000" />
        </div>
        <div></div>
      </div>

      <p class="section-title">Origin & Destination</p>
      <div class="grid-2">
        <div>
          <label>Origin City</label>
          <input type="text" name="origin_city" />
        </div>
        <div>
          <label>Origin Country</label>
          <input type="text" name="origin_country" />
        </div>
      </div>
      <div class="grid-2">
        <div>
          <label>Destination City</label>
          <input type="text" name="destination_city" />
        </div>
        <div>
          <label>Destination Country</label>
          <input type="text" name="destination_country" />
        </div>
      </div>

      <label>Internal Notes</label>
      <textarea name="notes" rows="3"></textarea>

      <p class="section-title">Items</p>
      <div id="items-container">${itemRowHtml(0)}</div>
      <button type="button" class="btn outline small" id="add-item" style="margin-top:4px;">+ Add Item</button>

      <div style="margin-top:24px;">
        <button type="submit" class="btn">Create Consignment</button>
      </div>
    </form>
  `

  const script = `
<script>
let itemIndex = 1;
const itemRowTemplate = ${'`' + itemRowHtml('__INDEX__') + '`'};
document.getElementById('add-item').addEventListener('click', () => {
  const container = document.getElementById('items-container');
  const template = document.createElement('template');
  template.innerHTML = itemRowTemplate.replace(/__INDEX__/g, itemIndex++);
  container.appendChild(template.content.firstElementChild);
});

document.getElementById('create-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const payload = { items: [] };
  const itemsByIndex = {};

  for (const [key, value] of formData.entries()) {
    const itemMatch = key.match(/^items\\[(\\d+)\\]\\[(\\w+)\\]$/);
    if (itemMatch) {
      const [, idx, field] = itemMatch;
      itemsByIndex[idx] = itemsByIndex[idx] || {};
      itemsByIndex[idx][field] = value;
    } else {
      payload[key] = value;
    }
  }
  payload.items = Object.values(itemsByIndex).filter((i) => i.description && i.description.trim());

  const { ok, data } = await postJSON('/api/admin/consignments', 'POST', payload);
  if (ok) {
    withFlash('/admin/consignments/' + data.consignment.id, 'Consignment created.');
  } else {
    withFlash('/admin/consignments/new', data.error || 'Could not create consignment.', 'error');
  }
});
</script>`

  return layout({ title: 'New Consignment', activeHref: '/admin/consignments/new', bodyHtml: body + script, flash, flashType })
}

export function detailPage({ consignment, items, events, flash, flashType }) {
  const hasVehicle = items.some((i) => i.asset_type === 'vehicle')
  const custodyBlock = consignment.movement_type === 'custody' && consignment.custody_started_at
    ? `<p><strong>In custody since:</strong> ${new Date(consignment.custody_started_at).toLocaleDateString('en-US', { dateStyle: 'long' })} (${daysSince(consignment.custody_started_at)} days)</p>`
    : ''

  const itemsRows = items.map((item) => `
    <tr>
      <td>${ASSET_TYPE_LABELS[item.asset_type] || item.asset_type}${item.asset_type === 'vehicle' ? ' <span class="badge vehicle">Vehicle</span>' : ''}</td>
      <td>${escapeHtml(item.description)}</td>
      <td>${escapeHtml(item.quantity || '—')}</td>
      <td>${escapeHtml(item.seal_number || '—')}</td>
      <td><button class="btn outline small" onclick="removeItem(${item.id})">Remove</button></td>
    </tr>
  `).join('')

  const eventsList = events.map((ev) => `
    <li>
      <strong>${STATUS_LABELS[ev.status] || ev.status}</strong>
      ${ev.location_city || ev.location_country ? ` — ${escapeHtml(formatLocation(ev.location_city, ev.location_country))}` : ''}
      <div class="meta">${new Date(ev.occurred_at).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })} ${ev.email_sent ? '· email sent' : ''}</div>
      ${ev.note ? `<div style="margin-top:4px;font-size:13px;">${escapeHtml(ev.note)}</div>` : ''}
    </li>
  `).join('')

  const body = `
    <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;">
      <div>
        <h1>${escapeHtml(consignment.reference_number)} ${hasVehicle ? '<span class="badge vehicle">Vehicle</span>' : ''} ${consignment.is_closed ? '<span class="badge closed">Closed</span>' : ''}</h1>
        <p style="color:#6b7a95;margin:0;">${escapeHtml(consignment.client_name)}${consignment.organization ? ` · ${escapeHtml(consignment.organization)}` : ''} · ${escapeHtml(consignment.client_email)}</p>
      </div>
      <div class="actions-row">
        <a href="/admin/consignments/${consignment.id}/edit" class="btn outline small">Edit Details</a>
        <button class="btn outline small" onclick="resendEmail()">Resend Email</button>
        ${!consignment.is_closed ? `<button class="btn danger small" onclick="closeConsignment()">Close Consignment</button>` : ''}
      </div>
    </div>

    <div class="card">
      <p><strong>Current Status:</strong> ${STATUS_LABELS[consignment.current_status] || consignment.current_status}</p>
      <p><strong>Current Location:</strong> ${escapeHtml(formatLocation(consignment.current_location_city, consignment.current_location_country)) || 'Not yet assigned'}</p>
      <p><strong>Movement Type:</strong> ${consignment.movement_type === 'custody' ? 'Custody / Storage' : 'One-Way Transfer'}</p>
      ${custodyBlock}
      <p><strong>Origin:</strong> ${escapeHtml(formatLocation(consignment.origin_city, consignment.origin_country)) || '—'} &nbsp;→&nbsp; <strong>Destination:</strong> ${escapeHtml(formatLocation(consignment.destination_city, consignment.destination_country)) || '—'}</p>
      ${consignment.notes ? `<p><strong>Notes:</strong> ${escapeHtml(consignment.notes)}</p>` : ''}
    </div>

    <p class="section-title">Add Custody Event</p>
    <form id="event-form" class="card">
      <div class="grid-2">
        <div>
          <label>New Status</label>
          <select name="status" required>${statusOptions()}</select>
        </div>
        <div></div>
      </div>
      <div class="grid-2">
        <div>
          <label>Location City</label>
          <input type="text" name="location_city" />
        </div>
        <div>
          <label>Location Country</label>
          <input type="text" name="location_country" />
        </div>
      </div>
      <label>Note</label>
      <textarea name="note" rows="2"></textarea>
      <div style="margin-top:16px;"><button type="submit" class="btn">Record Update &amp; Notify Client</button></div>
    </form>

    <p class="section-title">Items</p>
    <div class="card" style="padding:0;">
      <table>
        <thead><tr><th>Asset Type</th><th>Description</th><th>Quantity</th><th>Seal Number</th><th></th></tr></thead>
        <tbody>${itemsRows || '<tr><td colspan="5" style="text-align:center;color:#6b7a95;padding:20px;">No items yet.</td></tr>'}</tbody>
      </table>
    </div>
    <form id="add-item-form" class="card">
      <div class="item-row" style="grid-template-columns:1.2fr 2fr 1fr 1fr auto;">
        <div><label>Asset Type</label><select name="asset_type">${assetTypeOptions()}</select></div>
        <div><label>Description</label><input type="text" name="description" required /></div>
        <div><label>Quantity</label><input type="text" name="quantity" /></div>
        <div><label>Seal Number</label><input type="text" name="seal_number" /></div>
        <div><button type="submit" class="btn small">Add</button></div>
      </div>
    </form>

    <p class="section-title">Event History</p>
    <div class="card">
      <ul class="timeline">${eventsList || '<li style="color:#6b7a95;">No events recorded yet.</li>'}</ul>
    </div>
  `

  const script = `
<script>
const consignmentId = ${consignment.id};

document.getElementById('event-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = Object.fromEntries(new FormData(e.target).entries());
  const { ok, data } = await postJSON('/api/admin/consignments/' + consignmentId + '/events', 'POST', payload);
  if (ok) {
    withFlash('/admin/consignments/' + consignmentId, data.emailWarning || 'Status updated and client notified.', data.emailWarning ? 'error' : undefined);
  } else {
    withFlash('/admin/consignments/' + consignmentId, data.error || 'Could not record update.', 'error');
  }
});

document.getElementById('add-item-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = Object.fromEntries(new FormData(e.target).entries());
  const { ok, data } = await postJSON('/api/admin/consignments/' + consignmentId + '/items', 'POST', payload);
  withFlash('/admin/consignments/' + consignmentId, ok ? 'Item added.' : (data.error || 'Could not add item.'), ok ? undefined : 'error');
});

async function removeItem(itemId) {
  if (!confirm('Remove this item?')) return;
  const { ok, data } = await postJSON('/api/admin/consignments/' + consignmentId + '/items/' + itemId, 'DELETE');
  withFlash('/admin/consignments/' + consignmentId, ok ? 'Item removed.' : (data.error || 'Could not remove item.'), ok ? undefined : 'error');
}

async function resendEmail() {
  const { ok, data } = await postJSON('/api/admin/consignments/' + consignmentId + '/resend-email', 'POST');
  withFlash('/admin/consignments/' + consignmentId, ok ? 'Status email resent.' : (data.error || 'Could not resend email.'), ok ? undefined : 'error');
}

async function closeConsignment() {
  if (!confirm('Close this consignment? This cannot be undone from here.')) return;
  const { ok, data } = await postJSON('/api/admin/consignments/' + consignmentId + '/close', 'POST');
  withFlash('/admin/consignments/' + consignmentId, ok ? 'Consignment closed.' : (data.error || 'Could not close consignment.'), ok ? undefined : 'error');
}
</script>`

  return layout({ title: consignment.reference_number, activeHref: '', bodyHtml: body + script, flash, flashType })
}

export function editPage({ consignment, flash, flashType }) {
  const body = `
    <h1>Edit ${escapeHtml(consignment.reference_number)}</h1>
    <form id="edit-form" class="card">
      <div class="grid-2">
        <div>
          <label>Client Name</label>
          <input type="text" name="client_name" value="${escapeHtml(consignment.client_name)}" required />
        </div>
        <div>
          <label>Client Email</label>
          <input type="email" name="client_email" value="${escapeHtml(consignment.client_email)}" required />
        </div>
      </div>
      <label>Organization</label>
      <input type="text" name="organization" value="${escapeHtml(consignment.organization || '')}" />

      <p class="section-title">Origin & Destination</p>
      <div class="grid-2">
        <div>
          <label>Origin City</label>
          <input type="text" name="origin_city" value="${escapeHtml(consignment.origin_city || '')}" />
        </div>
        <div>
          <label>Origin Country</label>
          <input type="text" name="origin_country" value="${escapeHtml(consignment.origin_country || '')}" />
        </div>
      </div>
      <div class="grid-2">
        <div>
          <label>Destination City</label>
          <input type="text" name="destination_city" value="${escapeHtml(consignment.destination_city || '')}" />
        </div>
        <div>
          <label>Destination Country</label>
          <input type="text" name="destination_country" value="${escapeHtml(consignment.destination_country || '')}" />
        </div>
      </div>

      <label>Internal Notes</label>
      <textarea name="notes" rows="3">${escapeHtml(consignment.notes || '')}</textarea>

      <div style="margin-top:24px;display:flex;gap:10px;">
        <button type="submit" class="btn">Save Changes</button>
        <a href="/admin/consignments/${consignment.id}" class="btn outline">Cancel</a>
      </div>
    </form>
  `

  const script = `
<script>
document.getElementById('edit-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const payload = Object.fromEntries(new FormData(e.target).entries());
  const { ok, data } = await postJSON('/api/admin/consignments/${consignment.id}', 'PATCH', payload);
  if (ok) {
    withFlash('/admin/consignments/${consignment.id}', 'Changes saved.');
  } else {
    withFlash('/admin/consignments/${consignment.id}/edit', data.error || 'Could not save changes.', 'error');
  }
});
</script>`

  return layout({ title: 'Edit Consignment', activeHref: '', bodyHtml: body + script, flash, flashType })
}
