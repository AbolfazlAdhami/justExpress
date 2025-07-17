const axios = require("axios");
const apiBaseUrl = require("../constant/api-keys");

const axios_instance = axios.create({
  baseURL: apiBaseUrl,
});

module.exports = axios_instance;
