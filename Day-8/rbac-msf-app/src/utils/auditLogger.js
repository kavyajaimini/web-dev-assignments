export function logAudit(action, user) {
  const logs = JSON.parse(localStorage.getItem('auditLogs') || '[]');
  logs.push({ id: Date.now(), action, user: user.name, date: new Date().toISOString() });
  localStorage.setItem('auditLogs', JSON.stringify(logs));
}

export function getAuditLogs() {
  return JSON.parse(localStorage.getItem('auditLogs') || '[]');
}
