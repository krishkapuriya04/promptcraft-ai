/**
 * Normalizes auth API success bodies. Supports top-level { token, user } and legacy { data: { token, user } }.
 */
export function extractAuthSession(body) {
  if (!body || typeof body !== "object") return null;
  const token = body.token ?? body.data?.token;
  const user = body.user ?? body.data?.user;
  if (typeof token === "string" && token.length > 0 && user && typeof user === "object") {
    return { token, user };
  }
  return null;
}
