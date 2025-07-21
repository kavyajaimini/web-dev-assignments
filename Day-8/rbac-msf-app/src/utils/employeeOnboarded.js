export function isEmployeeOnboarded() {
  const all = JSON.parse(localStorage.getItem('employees') || '[]');
  return !!all.find(e => e.role === 'Employee');
}
