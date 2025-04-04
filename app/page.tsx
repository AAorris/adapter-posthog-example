import { FlagValues } from "flags/react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  demoCtaExperiment,
  demoCtaFlag,
  myFlag,
  showTestBanner,
  myFlagVariant,
} from "@/flags";
import { Code, Flag, Zap } from "lucide-react";
import { Login } from "./components/login";
import { TabNavigation } from "./components/product-tabs";
import { ThemedButton } from "./components/themed-button";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
}) {
  const { tab } = await searchParams;
  const showTestBannerValue = await showTestBanner();
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
            <TabsList className="grid grid-cols-3">
              <TabsTrigger data-attr="is-feature-enabled" value="feature">
                <Flag className="h-4 w-4 mr-2" />
                isFeatureEnabled
              </TabsTrigger>
              <TabsTrigger data-attr="feature-flag-value" value="variant">
                <Code className="h-4 w-4 mr-2" />
                featureFlagValue
              </TabsTrigger>
              <TabsTrigger data-attr="feature-flag-payload" value="payload">
                <Zap className="h-4 w-4 mr-2" />
                featureFlagPayload
              </TabsTrigger>
            </TabsList>

            <TabsContent value="feature" className="mt-0">
              <FlagSection
                flag={myFlag}
                title="isFeatureEnabled"
                description="Check if a feature is enabled"
              />
            </TabsContent>

            <TabsContent value="variant" className="mt-0">
              <FlagSection
                flag={myFlagVariant}
                title="featureVariant"
                description="Get the active variant for a feature"
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
        <Suspense fallback={<div key="flagValues" />}>
          <div key="flagValues">
            <FlagValues
              values={{
                [myFlag.key]: await myFlag(),
                [myFlagVariant.key]: await myFlagVariant(),
                [showTestBanner.key]: await showTestBanner(),
                [demoCtaFlag.key]: await demoCtaFlag(),
                [demoCtaExperiment.key]: await demoCtaExperiment(),
              }}
            />
          </div>
        </Suspense>
      </main>
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
  flag: () => Promise<unknown>;
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
