import axios from "axios";

const baseURL = "http://localhost:3200";

export default axios.create({
  baseURL: baseURL,
});

export { baseURL };
