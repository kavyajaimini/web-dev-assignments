// Example permissions and roles for CASL
export const roles = [
  {
    name: 'HR',
    permissions: ['manage_users', 'view_dashboard'],
  },
  {
    name: 'Employee',
    permissions: ['view_dashboard', 'submit_form'],
  },
];

export const defaultPermissions = {
  HR: ['manage_users', 'view_dashboard'],
  Employee: ['view_dashboard', 'submit_form'],
};
