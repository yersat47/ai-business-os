import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["*.loca.lt", "*.trycloudflare.com"],
  async redirects() {
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
