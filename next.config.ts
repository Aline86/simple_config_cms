import type { NextConfig } from "next";
const isDev = process.env.NODE_ENV === "development";
const cspHeader =
  [
    "default-src 'self'",
    // Images : ajout de tous les domaines nécessaires
    "img-src 'self' https://res.cloudinary.com https://picsum.photos https://i.ytimg.com https://img.youtube.com data: blob:",
    // Scripts : ajout de YouTube et autres
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://upload-widget.cloudinary.com https://www.google-analytics.com https://play.google.com https://vercel.live https://www.youtube.com https://s.ytimg.com",
    // Styles
    "style-src 'self' 'unsafe-inline'",
    "style-src-elem 'self' 'unsafe-inline'",
    "style-src-attr 'self' 'unsafe-inline'",
    // Connect : API calls
    "connect-src 'self' https://welcomepoitiers.fr https://*.welcomepoitiers.fr https://upload-widget.cloudinary.com https://api.cloudinary.com https://res.cloudinary.com https://www.google-analytics.com https://play.google.com https://www.youtube.com https://vercel.live",
    // Media : CRITIQUE pour les vidéos
    "media-src 'self' https://res.cloudinary.com https://www.youtube.com https://www.youtube-nocookie.com blob: data: https: http:",
    // Frames : iframes YouTube, Vimeo, Cloudinary
    `frame-src 'self' https://upload-widget.cloudinary.com https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com https://www.dailymotion.com ${isDev ? "http://localhost:3000" : "https://simple-config-cms.vercel.app"}`,
    // Fonts
    "font-src 'self' data: https://fonts.gstatic.com",
    // Sécurité
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ]
    .filter(Boolean)
    .join("; ") + ";";
/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  cacheComponents: true,

  serverExternalPackages: ["@prisma/client", "isomorphic-dompurify"],
  outputFileTracingIncludes: {
    "/**": ["./prisma/generated/client/**/*"],
  },
  async headers() {
    return [
      {
        source: "/(.*)",

        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader.replace(/\n/g, ""),
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          // Modifié : Plus permissif pour les vidéos
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none", // ← Changé de "credentialless"
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "unsafe-none", // ← Changé de "same-origin-allow-popups"
          },
          {
            key: "Access-Control-Allow-Origin",
            value: process.env.NEXT_PUBLIC_APP_URL ?? "*",
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
            value: cspHeader, // ← Important : ajout du ";" final
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.youtube.com",
      },
      { protocol: "https", hostname: "res.cloudinary.com", pathname: "/**" },
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
      { protocol: "https", hostname: "img.youtube.com", pathname: "/**" },
      { protocol: "https", hostname: "i.ytimg.com", pathname: "/**" }, // Ajouté pour thumbnails YouTube
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
