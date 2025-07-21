let cache = {};

export function getCachedPermissions(userId) {
  return cache[userId];
}

export function setCachedPermissions(userId, permissions) {
  cache[userId] = permissions;
}

export function invalidatePermissions(userId) {
  delete cache[userId];
}
