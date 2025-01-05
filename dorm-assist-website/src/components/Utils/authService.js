import axios from "axios";

export async function isAdmin(token) {
  try {
    const response = await axios.get("http://localhost:8080/users/admin/get", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
}
