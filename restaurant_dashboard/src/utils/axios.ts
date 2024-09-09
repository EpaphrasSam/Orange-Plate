const axios = require("axios").default;

const baseURL = "https://orange-plate.onrender.com";

export default axios.create({
  baseURL,
  withCredentials: true,
});
