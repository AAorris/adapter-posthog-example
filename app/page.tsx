import { myFlag, myFlagVariant, myFlagPayload, myRemoteConfig } from "@/flags";
import type { JsonType } from "@flags-sdk/adapter-posthog";

export default async function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main>
        <h1>Hello PostHog Adapter</h1>
        <Section flag={myFlag}>isFeatureEnabled</Section>
        <Section flag={myFlagVariant}>featureVariant</Section>
        <Section flag={myFlagPayload}>featurePayload</Section>
        <Section flag={myRemoteConfig}>remoteConfig</Section>
      </main>
    </div>
  );
}

async function Section({
  children,
  flag,
}: {
  children: React.ReactNode;
  flag: () => Promise<JsonType>;
}) {
  const value = await flag();
  return (
    <section>
      <h2>{children}</h2>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </section>
  );
}
