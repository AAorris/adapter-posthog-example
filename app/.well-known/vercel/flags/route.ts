import { verifyAccess } from "flags";
import { getProviderData } from "flags/next";
import * as flags from "../../../../flags";

export async function GET(request: Request) {
  const access = await verifyAccess(
    request.headers.get("authorization") as string
  );
  if (!access) return new Response(null, { status: 401 });

  const providerData = getProviderData(flags);
  return new Response(JSON.stringify(providerData));
}
