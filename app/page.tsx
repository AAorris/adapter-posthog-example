import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { demoCtaFlag, showTestBanner } from "@/flags";
import { Flag, Zap } from "lucide-react";
import { Login } from "./components/login";
import { TabNavigation } from "./components/product-tabs";
import { ThemedButton } from "./components/themed-button";
import { FlagValues } from "flags/react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const [showTestBannerValue, demoCtaFlagValue] = await Promise.all([
    showTestBanner(),
    demoCtaFlag(),
  ]);
  return (
    <div>
      {showTestBannerValue ? (
        <div className="bg-black w-full h-10 text-white grid place-items-center">
          Introducing... a banner with no layout shift
        </div>
      ) : null}
      <main className="container mx-auto py-10 px-4 max-w-4xl">
        <div className="flex flex-col items-center justify-center space-y-6 text-center">
          <div className="space-y-2">
            <Badge variant="outline" className="px-3 py-1">
              PostHog x Flags SDK Demo
            </Badge>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              PostHog Adapter
            </h1>
            <p className="text-muted-foreground max-w-[700px] mx-auto">
              Explore feature flags, variants, payloads, and remote
              configurations with the PostHog adapter
            </p>
          </div>

          <LoginSection />

          <TabNavigation initialTab={tab ?? "feature"}>
            <TabsList className="grid grid-cols-2">
              <TabsTrigger data-attr="is-feature-enabled" value="feature">
                <Flag className="h-4 w-4 mr-2" />
                isFeatureEnabled
              </TabsTrigger>
              <TabsTrigger data-attr="feature-flag-payload" value="payload">
                <Zap className="h-4 w-4 mr-2" />
                featureFlagPayload
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feature" className="mt-0">
              <FlagSection
                flag={showTestBanner}
                title="isFeatureEnabled"
                description="Check if a feature is enabled (Shows a banner)"
              />
            </TabsContent>

            <TabsContent value="payload" className="mt-0">
              <FlagSection
                flag={demoCtaFlag}
                title="featurePayload"
                description="Retrieve payload data for a feature"
              />
            </TabsContent>
          </TabNavigation>
          <CTASection />
        </div>
      </main>
      <FlagValues
        values={{
          [demoCtaFlag.key]: demoCtaFlagValue,
          [showTestBanner.key]: showTestBannerValue,
        }}
      />
    </div>
  );
}

async function FlagSection({
  title,
  description,
  flag,
}: {
  title: string;
  description: string;
  flag: { (): Promise<unknown>; key: string };
}) {
  const value = await flag();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <pre className="bg-muted p-4 rounded-md overflow-auto max-h-[300px] w-full text-left">
          <code className="text-sm">{JSON.stringify(value, null, 2)}</code>
        </pre>
      </CardContent>
      <FlagValues values={{ [flag.key]: value }} />
    </Card>
  );
}

function LoginSection() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User Authentication</CardTitle>
        <CardDescription>
          Log in to test user-specific feature flags
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Login />
      </CardContent>
    </Card>
  );
}

function CTASection() {
  return (
    <div className="bg-primary/5 rounded-lg p-6 w-full text-center">
      <h3 className="text-xl font-medium mb-4">
        Ready to deploy your own feature flags?
      </h3>
      <ThemedButton id="get-started" href="https://flags-sdk.dev">
        Start using Flags SDK
      </ThemedButton>
    </div>
  );
}
