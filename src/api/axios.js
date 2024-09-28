import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

export default axios.create({
  baseURL: baseURL,
});

export { baseURL };
