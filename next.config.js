import { withContentlayer } from "next-contentlayer";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
      },
    ],
  },
  modularizeImports: {
    // TODO: https://github.com/iconoir-icons/iconoir/issues/243
    // "iconoir-react": {
    //   transform: "iconoir-react/dist/esm/server/{{member}}",
    //   preventFullImport: true,
    // },
    "@icons-pack": {
      transform: "@icons-pack/react-simple-icons/icons/{{member}}",
      preventFullImport: true,
    },
  },
};

export default withContentlayer(nextConfig);
