const path = require("path");

const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
  images: {
    domains: ["cdn.sanity.io"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.youtube.com",
        pathname: "/vi/**",
      },
    ],
  },
  webpack: (config) => {
    config.resolve.alias["next/image"] = path.resolve(
      __dirname,
      "src/components/common/CompatImage.jsx"
    );
    return config;
  },
};

module.exports = nextConfig;
