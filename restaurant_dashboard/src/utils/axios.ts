const axios = require("axios").default;

const baseURL = "http://localhost:3000";

export default axios.create({
  baseURL,
  withCredentials: true,
});
