import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/ai-business-os" : "";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["*.loca.lt", "*.trycloudflare.com"],
  ...(isGithubPages
    ? {
        output: "export" as const,
        basePath,
        assetPrefix: basePath,
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
  async redirects() {
    if (isGithubPages) return [];
    return [
      {
        source: "/",
        destination: "/ru",
        permanent: false,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
