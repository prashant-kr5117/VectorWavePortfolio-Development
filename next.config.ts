import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL("https://cdn.sanity.io/images/**")],
  },
  async redirects() {
    return [
      {
        source: "/team",
        destination: "/about",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
