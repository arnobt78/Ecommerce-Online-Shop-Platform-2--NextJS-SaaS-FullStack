/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  // Allow local IP for dev asset requests (fixes Safari crash)
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.2.87:3000",
    "http://192.168.2.87",
  ],
};

export default nextConfig;
