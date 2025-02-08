import axios from "axios";

const token = localStorage.getItem("token");

export async function getReports() {
  return await fetchData("http://localhost:8080/form/admin/get");
}

export async function getUsers() {
  return await fetchData("http://localhost:8080/users/admin/get");
}

async function fetchData(link) {
  try {
    const response = await axios({
      method: "get",
      url: link,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data ?? [];
  } catch (error) {
    console.error("Error fetching data: ", error);
    return [];
  }
}
