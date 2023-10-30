export function isJson(str?: unknown): str is string {
  try {
    if (!str || typeof str !== 'string') {
      return false;
    }

    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
