import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow LAN devices to hit the dev server (e.g. testing on real phones)
  allowedDevOrigins: [
    "192.168.0.102",
    "192.168.0.0/16",
    "10.0.0.0/8",
    "172.16.0.0/12",
  ],
};

export default nextConfig;
