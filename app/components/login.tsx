import { cookies } from "next/headers";
import { Input } from "@/components/ui/input";
import { ThemedButton } from "./themed-button";
import { postHogAdapter } from "@flags-sdk/adapter-posthog";

export async function Login() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  return (
    <div className="flex flex-row gap-2 w-max mx-auto">
      <form
        action={async (data: FormData) => {
          "use server";
          const newUserId =
            (data.get("userId") as string | undefined) ||
            Math.random().toString(36).substring(2, 15);
          (await cookies()).set("userId", newUserId);
          postHogAdapter.client.capture({
            distinctId: newUserId,
            event: "login",
            properties: {},
          });
        }}
        className="flex flex-row gap-2"
      >
        <Input
          type="text"
          name="userId"
          placeholder="userId cookie..."
          defaultValue={userId}
        />
        <ThemedButton id="login">Log in</ThemedButton>
      </form>
      <form
        action={async () => {
          "use server";
          (await cookies()).delete("userId");
        }}
      >
        <ThemedButton id="logout" variant="outline">
          Log out
        </ThemedButton>
      </form>
    </div>
  );
}
