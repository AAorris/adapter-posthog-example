import type { NextConfig } from "next";
import withVercelToolbarFn from "@vercel/toolbar/plugins/next";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withVercelToolbarFn()(nextConfig);
