export function filterFieldsByPermission(schema, permissions) {
  const filtered = {};
  Object.entries(schema).forEach(([key, field]) => {
    if (!field.permission || permissions.includes(field.permission)) {
      filtered[key] = field;
    }
  });
  return filtered;
}
