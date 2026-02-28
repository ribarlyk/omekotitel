import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    GRAPHQL_URL: process.env.GRAPHQL_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "omekotitel.bg",
        port: "",
        pathname: "/pub/media/**",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/graphql",
        destination: "https://omekotitel.bg/graphql",
      },
    ];
  },
  turbopack: {
    rules: {
      "*.graphql": {
        loaders: ["graphql-tag/loader"],
        as: "*.js",
      },
    },
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "graphql-tag/loader",
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
