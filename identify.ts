import { dedupe } from "flags/next";
import { cookies, headers } from "next/headers";
import type { PostHogEntities } from "@flags-sdk/adapter-posthog";

/**
 * Get info used by postHog
 */
export const identify = dedupe(
  async function identify(): Promise<PostHogEntities> {
    const cookieStore = await cookies();
    const headersList = await headers();
    const userId = cookieStore.get("userId")?.value;
    if (userId) {
      return { distinctId: userId };
    }
    const ip = headersList.get("x-real-ip");
    const distinctId = ip
      ? ip.split(".").join("")
      : Math.random().toString(36).substring(2, 15);
    return { distinctId };
  }
);
