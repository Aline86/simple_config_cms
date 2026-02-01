import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY", // or "SAMEORIGIN" if you want to allow embedding in your own site
          },
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NEXT_PUBLIC_APP_URL ?? "",
          },
          {
            key: "Access-Control-Allow-Credentials",
            value: "true",
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "Content-Type, Authorization, X-CSRF-Token, X-Requested-With",
          },
          {
            key: "Access-Control-Expose-Headers",
            value: "X-Auth-Token, X-CSRF-Token, Authorization",
          },
          {
            key: "Access-Control-Max-Age",
            value: "86400",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' https://www.google-analytics.com https://play.google.com https://vercel.live;",
              "style-src-elem 'self' 'unsafe-inline';",
              "style-src-attr 'self' 'unsafe-inline';", // Nouvelle ligne

              `connect-src 'self'  https://www.google-analytics.com https://play.google.com https://www.youtube.com https://vercel.live;`,
              "frame-src https://www.youtube.com;",
              "object-src 'none';",
              "base-uri 'self';",
            ]
              .filter(Boolean)
              .join(" "),
          },
          // ... autres headers
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: false,
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};

export default nextConfig;
