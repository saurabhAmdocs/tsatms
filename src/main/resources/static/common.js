const PAGES = {
  CUSTOMER: '/customer.html',
  SERVICE_DESK: '/desk.html',
  NETWORK_ENGINEER: '/engineer.html',
  NETWORK_MANAGER: '/manager.html'
};

function session() {
  return {
    token: sessionStorage.getItem('token') || '',
    username: sessionStorage.getItem('username') || '',
    role: sessionStorage.getItem('role') || ''
  };
}

async function api(url, opt = {}) {
  const token = session().token;
  opt.headers = Object.assign({'Content-Type': 'application/json'}, opt.headers || {}, token ? {Authorization: 'Bearer ' + token} : {});
  const response = await fetch(url, opt);
  const text = await response.text();
  let data;
  try { data = JSON.parse(text); } catch (e) { data = text; }
  if (!response.ok) {
    if (response.status === 401 && token) {
      sessionStorage.clear();
      location.href = '/';
    }
    throw Error((data && data.error) || text);
  }
  return data;
}

function requireRole(role) {
  const current = session();
  if (!current.token || !current.role) {
    location.href = '/';
    return false;
  }
  if (current.role !== role) {
    location.href = PAGES[current.role] || '/';
    return false;
  }
  const who = document.getElementById('who');
  if (who) who.textContent = current.username;
  return true;
}

async function logout() {
  try { await api('/api/auth/logout', {method: 'POST'}); } catch (e) {}
  sessionStorage.clear();
  location.href = '/';
}

function esc(value) {
  return String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[ch]));
}

function table(rows, columns) {
  if (!rows || !rows.length) return '<p class="empty">No records.</p>';
  const head = columns.map(column => '<th>' + esc(column.label) + '</th>').join('');
  const body = rows.map(row => '<tr>' + columns.map(column => '<td>' + (column.raw ? column.value(row) : esc(column.value(row))) + '</td>').join('') + '</tr>').join('');
  return '<table><thead><tr>' + head + '</tr></thead><tbody>' + body + '</tbody></table>';
}

function records(rows) {
  if (!Array.isArray(rows) || !rows.length) return '<p class="empty">No records.</p>';
  return table(rows, Object.keys(rows[0]).map(key => ({label: key, value: row => row[key]})));
}

function note(id, text, ok) {
  const el = document.getElementById(id);
  el.textContent = text;
  el.className = ok ? 'ok' : 'err';
}

async function showHistory(id) {
  const box = document.getElementById('history');
  box.innerHTML = '<h3>History for ticket ' + Number(id) + '</h3>' + records(await api('/api/tickets/' + Number(id) + '/history'));
}

const TICKET_COLUMNS = [
  {label: 'ID', value: row => row.id},
  {label: 'Number', value: row => row.ticketNumber},
  {label: 'Service', value: row => row.service},
  {label: 'Category', value: row => row.category},
  {label: 'Priority', value: row => row.priority},
  {label: 'Status', value: row => row.status},
  {label: 'Engineer', value: row => row.engineer},
  {label: 'SLA', value: row => row.slaStatus},
  {label: '', raw: true, value: row => '<button class="secondary" onclick="showHistory(' + Number(row.id) + ')">History</button>'}
];
