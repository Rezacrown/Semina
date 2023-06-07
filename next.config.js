/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  headers: [
    { key: "Access-Control-Allow-Credentials", value: "true" },
    { key: "Access-Control-Allow-Origin", value: "*" },
    {
      key: "Access-Control-Allow-Methods",
      value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
    },
    {
      key: "Access-Control-Allow-Headers",
      value: "X-CSRF-Token,X-Requested-With,content-type",
    },
  ],
  // async rewrites() {
  //   return [
  //     {
  //       // matching all routes starting with /api
  //       source: "/api/:path*",
  //       destination: "https://rizkyreza.cyclic.app/api/v1/",
  //     },
  //   ];
  // },
};

module.exports = nextConfig
