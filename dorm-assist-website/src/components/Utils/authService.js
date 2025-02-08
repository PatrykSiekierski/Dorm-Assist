import axios from "axios";

export async function isAdmin(token) {
  const tokenn = localStorage.getItem("token");
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:8080/users/admin/verify",
      headers: {
        Authorization: `Bearer ${tokenn}`,
      },
    });
    console.log(tokenn);
    return response.data === true;
  } catch (error) {
    return false;
  }
}
