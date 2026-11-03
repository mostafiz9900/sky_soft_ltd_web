import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Let the dev server's JS load when the site is opened via the LAN IP (e.g. from a phone);
  // otherwise Next blocks dev resources and the page renders without any interactivity.
  allowedDevOrigins: ["40.40.40.18", "40.40.40.*"],
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
