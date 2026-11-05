import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fully static site: `next build` writes HTML, CSS, JS and assets to `out/`.
  output: "export",
  // Emit `/about/index.html` (instead of `/about.html`) so every route is a directory.
  trailingSlash: true,
  // There is no image optimisation server in a static export.
  images: { unoptimized: true },
};

export default nextConfig;
