import axios from "axios";

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL || "";

export const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 30000,
});
