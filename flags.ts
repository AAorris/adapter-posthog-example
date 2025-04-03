import { flag } from "flags/next";
import { postHogAdapter } from "@flags-sdk/adapter-posthog";
import identify from "./identify";

export const myFlag = flag({
  key: "show-test-banner",
  adapter: postHogAdapter.isFeatureEnabled(),
  identify,
});

export const myFlagVariant = flag({
  key: "show-test-banner",
  adapter: postHogAdapter.featureFlagValue(),
  identify,
});

export const myFlagPayload = flag({
  key: "show-test-banner",
  adapter: postHogAdapter.featureFlagPayload((v) => v),
  defaultValue: {},
  identify,
});

export const myRemoteConfig = flag({
  key: "remote-config",
  adapter: postHogAdapter.featureFlagPayload((v) => v),
  identify,
});
