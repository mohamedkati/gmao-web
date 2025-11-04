import axios from "axios";

const apiClientBase = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // cookies HttpOnly envoyés automatiquement
});

export default apiClientBase;