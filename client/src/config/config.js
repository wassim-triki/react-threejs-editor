// const config = {
//   development: {
//     backendUrl: "http://localhost:8080/api/v1/dalle",
//   },
//   production: {
//     backendUrl: "https://devswag.onrender.com/api/v1/dalle",
//   },
// };
const config = {};
if (import.meta.env.MODE === "development") {
  config.backendUrl = "http://localhost:8080/api/v1/dalle";
} else {
  config.backendUrl = import.meta.env.VITE_BACKEND_URL;
}

export default config;
