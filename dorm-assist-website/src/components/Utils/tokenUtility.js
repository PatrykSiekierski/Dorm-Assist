import { jwtDecode } from "jwt-decode";

export function getUserRole() {
  const token = localStorage.getItem("token");
  if (token == null) return;
  const decoded = jwtDecode(token);
  return decoded.role;
}

export function clearToken() {
  if (localStorage.getItem("token")) {
    localStorage.removeItem("token");
    console.log("token cleared");
  }
}

export function isTokenValid() {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const now = Math.floor(Date.now() / 1000);
    return decoded.exp > now;
  } catch (error) {
    return false;
  }
}
