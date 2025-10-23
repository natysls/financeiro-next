import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8080" });

export async function login(username: unknown, password: unknown) {
  const res = await API.post("/auth/login", { username, password });
  const token = res.data.token;
  localStorage.setItem("token", token);
  return token;
}

export async function logout() {
  const token = localStorage.getItem("token");
  try {
    await API.post("/auth/logout"); // opcional: também chamar /auth/logout para invalidar no servidor
  } catch (e) { /* ignora erros */ }
  localStorage.removeItem("token");
}

// attach token in requests with interceptor (recommended)
API.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
export default API;
