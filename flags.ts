import { flag } from "flags/next";
import { postHogAdapter } from "@flags-sdk/posthog";
import { identify } from "./identify";

export const showTestBanner = flag({
  key: "show-test-banner",
  adapter: postHogAdapter.isFeatureEnabled(),
  defaultValue: false,
  identify,
});

export interface CtaTheme {
  variant:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size: "default" | "sm" | "lg" | "icon";
}

export const demoCtaFlag = flag<
  CtaTheme & { featureFlagValue: string | boolean }
>({
  key: "demo-cta",
  adapter: postHogAdapter.featureFlagPayload((payload, featureFlagValue) => ({
    featureFlagValue,
    ...(payload as unknown as CtaTheme),
  })),
  identify,
  defaultValue: {
    featureFlagValue: "fallback",
    variant: "default",
    size: "default",
  },
});

export const demoCtaExperiment = flag({
  key: "demo-cta-theme",
  adapter: postHogAdapter.featureFlagValue({
    sendFeatureFlagEvents: true,
  }),
  identify,
});
