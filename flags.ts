import { flag } from "flags/next";
import { postHogAdapter } from "@flags-sdk/adapter-posthog";
import { identify } from "./identify";

export const showTestBanner = flag({
  key: "show-test-banner",
  adapter: postHogAdapter.isFeatureEnabled(),
  defaultValue: false,
  identify,
});

export const myFlag = flag({
  key: "demo-cta.is-enabled",
  adapter: postHogAdapter.isFeatureEnabled(),
  identify,
  defaultValue: false,
});

export const myFlagVariant = flag({
  key: "demo-cta.variant",
  adapter: postHogAdapter.featureFlagValue(),
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

export const demoCtaFlag = flag<CtaTheme>({
  key: "demo-cta.payload",
  adapter: postHogAdapter.featureFlagPayload((v) => v as unknown as CtaTheme),
  identify,
  defaultValue: {
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
