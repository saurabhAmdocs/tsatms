async function loadTicketsInto(id) {
  document.getElementById(id).innerHTML = table(await api('/api/tickets'), TICKET_COLUMNS);
}

async function loadNotifications() {
  document.getElementById('notes').innerHTML = records(await api('/api/notifications'));
}

async function refreshCustomer() {
  const services = await api('/api/services');
  document.getElementById('services').innerHTML = records(services);
  const select = document.getElementById('svc');
  select.innerHTML = services.map(service => '<option value="' + esc(service.SERVICE_ID || service.service_id) + '">' + esc(service.SERVICE_NAME || service.service_name) + '</option>').join('');
  await loadTicketsInto('tickets');
  await loadNotifications();
}

async function createCustomerTicket() {
  try {
    const data = await api('/api/tickets', {method: 'POST', body: JSON.stringify({
      serviceId: svc.value, category: category.value, description: desc.value, priority: priority.value, severity: priority.value
    })});
    note('createMsg', 'Ticket ' + data.ticketId + ' created.', true);
    await refreshCustomer();
  } catch (e) { note('createMsg', e.message, false); }
}

async function sendFeedback() {
  try {
    await api('/api/feedback', {method: 'POST', body: JSON.stringify({
      ticketId: ticketId.value, rating: rating.value, comments: comments.value
    })});
    note('feedbackMsg', 'Feedback submitted.', true);
  } catch (e) { note('feedbackMsg', e.message, false); }
}

async function loadSummary() {
  const data = await api('/api/dashboard/manager');
  const labels = {
    totalOpenTickets: 'Open tickets', criticalIncidents: 'Critical', slaAtRisk: 'SLA at risk',
    slaBreached: 'SLA breached', resolvedToday: 'Resolved today', averageResolutionTimeHours: 'Avg hours'
  };
  document.getElementById('summary').innerHTML = Object.keys(labels).map(key => {
    const value = data[key] == null ? 0 : data[key];
    const shown = key === 'averageResolutionTimeHours' ? Number(value).toFixed(1) : value;
    return '<div class="metric">' + esc(labels[key]) + '<b>' + esc(shown) + '</b></div>';
  }).join('');
}

async function createDeskTicket() {
  try {
    const data = await api('/api/tickets', {method: 'POST', body: JSON.stringify({
      customerId: cust.value, serviceId: svc.value, category: category.value, description: desc.value, priority: priority.value, severity: priority.value
    })});
    note('createMsg', 'Ticket ' + data.ticketId + ' created.', true);
    await loadTicketsInto('tickets');
  } catch (e) { note('createMsg', e.message, false); }
}

async function recommend() {
  const params = new URLSearchParams();
  if (skill.value) params.set('specialization', skill.value);
  if (region.value) params.set('region', region.value);
  document.getElementById('engineers').innerHTML = records(await api('/api/engineers/recommend?' + params.toString()));
}

async function assignEngineer() {
  try {
    await api('/api/tickets/' + assignTicket.value + '/assign', {method: 'POST', body: JSON.stringify({engineerId: engineerId.value})});
    note('assignMsg', 'Engineer assigned.', true);
    await loadTicketsInto('tickets');
  } catch (e) { note('assignMsg', e.message, false); }
}

async function updateStatus() {
  try {
    await api('/api/tickets/' + updateId.value + '/status', {method: 'PUT', body: JSON.stringify({status: status.value, remarks: remarks.value})});
    note('updateMsg', 'Status updated.', true);
    await loadTicketsInto('tickets');
  } catch (e) { note('updateMsg', e.message, false); }
}

async function updatePriority() {
  try {
    await api('/api/tickets/' + updateId.value + '/priority', {method: 'PUT', body: JSON.stringify({priority: newPriority.value})});
    note('updateMsg', 'Priority updated.', true);
    await loadTicketsInto('tickets');
  } catch (e) { note('updateMsg', e.message, false); }
}

async function escalateTicket() {
  try {
    await api('/api/tickets/' + escId.value + '/escalate', {method: 'POST', body: JSON.stringify({
      fromLevel: fromLevel.value, toLevel: toLevel.value, reason: reason.value
    })});
    note('actionMsg', 'Ticket escalated.', true);
    await loadTicketsInto('tickets');
  } catch (e) { note('actionMsg', e.message, false); }
}

async function downloadReport(name) {
  const response = await fetch('/api/reports/' + name, {headers: {Authorization: 'Bearer ' + session().token}});
  if (!response.ok) {
    note('actionMsg', await response.text(), false);
    return;
  }
  const blob = await response.blob();
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = name + '.csv';
  link.click();
}

async function engineerStatus() {
  try {
    await api('/api/tickets/' + statusId.value + '/status', {method: 'PUT', body: JSON.stringify({status: status.value, remarks: remarks.value})});
    note('statusMsg', 'Status updated.', true);
    await loadTicketsInto('tickets');
  } catch (e) { note('statusMsg', e.message, false); }
}

async function resolveTicket() {
  try {
    await api('/api/tickets/' + resolveId.value + '/resolve', {method: 'POST', body: JSON.stringify({
      rootCause: root.value, resolution: resolution.value, resolutionCode: code.value
    })});
    note('resolveMsg', 'Ticket resolved.', true);
    await loadTicketsInto('tickets');
  } catch (e) { note('resolveMsg', e.message, false); }
}

const page = location.pathname.split('/').pop();
if (page === 'customer.html' && requireRole('CUSTOMER')) refreshCustomer();
if (page === 'desk.html' && requireRole('SERVICE_DESK')) { loadSummary(); loadTicketsInto('tickets'); }
if (page === 'engineer.html' && requireRole('NETWORK_ENGINEER')) { loadTicketsInto('tickets'); loadNotifications(); }
if (page === 'manager.html' && requireRole('NETWORK_MANAGER')) { loadSummary(); loadTicketsInto('tickets'); }
