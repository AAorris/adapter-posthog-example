import type { ReadonlyRequestCookies } from "flags";
import type { PostHogEntities } from "@flags-sdk/adapter-posthog";

/**
 * Get info used by postHog
 */
export default function identify({
  cookies,
  headers,
}: {
  cookies: ReadonlyRequestCookies;
  headers: Headers;
}): Promise<PostHogEntities> {
  const userId = cookies.get("userId")?.value;

  if (!userId) {
    return Promise.resolve({
      // (Not a real way to get a distinct ID — put something production ready here instead )
      distinctId:
        (headers.get("x-vercel-ip-as-number") ?? "") +
        Math.random()
          .toString(36)
          .substring(2, 15)
          .split("")
          .reduce((a, b) => {
            const newA = (a << 5) - a + b.charCodeAt(0);
            return newA & newA;
          }, 0)
          .toString(),
    });
  }

  return Promise.resolve({ distinctId: userId });
}
