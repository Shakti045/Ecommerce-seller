// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//       domains: ["res.cloudinary.com"]
//     }
//   }
  
//   module.exports = nextConfig

//   // next.config.js

/** @type {import('next').NextConfig} */
    const nextConfig = {
    images: {
    domains: ["res.cloudinary.com"]
     },
  async headers() {

      return [
          {
              source: "/api/:path*",
              headers: [
                  { key: "Access-Control-Allow-Credentials", value: "true" },
                  { key: "Access-Control-Allow-Origin", value: "https://ecommerce-app-using-next-js.vercel.app" }, 
                  { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                  { key: "Access-Control-Allow-Headers", value: "Content-Type,Authorization" },
                  
              ]
          }
      ]
  }
}

module.exports = nextConfig
