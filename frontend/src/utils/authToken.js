export function parseToken(token) {
  try {
    const payloadPart = token.split(".")[1];
    if (!payloadPart) return null;
    const payload = JSON.parse(atob(payloadPart));
    return payload;
  } catch {
    return null;
  }
}

export function isTokenExpired(token) {
  const payload = parseToken(token);
  if (!payload?.exp) return true;
  return Date.now() >= payload.exp * 1000;
}
