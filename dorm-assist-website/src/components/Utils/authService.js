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

export async function loginAndGetToken(username, password) {
  const body = {
    username: username,
    password: password,
  };

  try {
    const tokenData = await axios({
      method: "post",
      url: "http://localhost:8080/users/authenticate",
      data: body,
    });

    if (!tokenData.headers.get("Content-Type").includes("html")) {
      const token = tokenData.data;
      localStorage.setItem("token", token);
      console.log("Token: " + token);

      return tokenData;
    }
    return null;
  } catch (e) {
    console.log(e);
  }
  return null;
}
