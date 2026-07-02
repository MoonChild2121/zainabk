/**
 * Tiny in-memory sliding-window rate limiter.
 *
 * Good enough for a single-instance portfolio: it caps how often one IP can
 * hit an action. It does NOT survive a redeploy and is not shared across
 * multiple server instances — for that you'd swap in Redis/Upstash. For this
 * site it's a pragmatic bot/spam speed bump, not a security boundary.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  allowed: boolean;
  /** Seconds until the window resets (only meaningful when blocked). */
  retryAfter: number;
};

/**
 * Records a hit for `key` and reports whether it's within the allowed budget.
 *
 * @param key      Identifier to throttle on (e.g. client IP).
 * @param limit    Max hits permitted per window.
 * @param windowMs Window length in milliseconds.
 */
export function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): RateLimitResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  if (bucket.count >= limit) {
    return {
      allowed: false,
      retryAfter: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return { allowed: true, retryAfter: 0 };
}
