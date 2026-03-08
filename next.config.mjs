/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      unoptimized: true,
      remotePatterns: [
        {
          hostname: "raw.githubusercontent.com",
        },
      ],
    },
  };
  
  export default nextConfig;
  