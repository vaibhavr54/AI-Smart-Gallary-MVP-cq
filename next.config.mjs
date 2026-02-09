// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   images: {
//     unoptimized: true,
//   },
// }

// export default nextConfig
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
