import { verifyAccess } from "flags";
import { unstable_cacheLife as cacheLife } from "next/cache";
import { getProviderData } from "@flags-sdk/posthog";

async function gotPostHogAdapterData() {
  "use cache";
  cacheLife("seconds");
  return getProviderData({
    host: process.env.POSTHOG_WEB_HOST as string,
    projectId: process.env.POSTHOG_PROJECT_ID as string,
    personalApiKey: process.env.POSTHOG_PERSONAL_API_KEY as string,
  });
}

export async function GET(request: Request) {
  const access = await verifyAccess(
    request.headers.get("authorization") as string
  );
  if (!access) return new Response(null, { status: 401 });
  const data = await gotPostHogAdapterData();
  if (Object.values(data.definitions).length === 0 && data.hints.length > 0) {
    return new Response(JSON.stringify(data), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "must-revalidate, no-cache, no-store",
      },
    });
  }
  return new Response(JSON.stringify(data), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "private, max-age=5",
    },
  });
}
