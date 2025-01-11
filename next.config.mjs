// import { withSentryConfig } from "@sentry/nextjs";
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
//   experimental: {
//     ppr: "incremental",
//     after: true,
//   },
//   devIndicators: {
//     appIsrStatus: true,
//     buildActivity: true,
//     buildActivityPosition: "bottom-right",
//   },
};

export default nextConfig;
