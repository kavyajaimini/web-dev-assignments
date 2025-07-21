// Simulated API for role management
export async function fetchRoles() {
  return [
    // Admin role removed
    { id: 2, name: 'Employee', permissions: ['view_dashboard'] },
  ];
}

export async function updateRole(role) {
  return { ...role };
}

export async function deleteRole(roleId) {
  return { success: true };
}
