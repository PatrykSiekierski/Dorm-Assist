import axios from "axios";

const token = localStorage.getItem("token");

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

export async function getReports() {
  return await fetchData("http://localhost:8080/form/admin/get");
}

export async function getUsers() {
  return await fetchData("http://localhost:8080/users/admin/get");
}

export async function solvedReport(newValue) {
  try {
    const update = await axios({
      method: "put",
      url: "http://localhost:8080/form/admin/update/solved",
      data: newValue,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error fetching data: ", error);
    return false;
  }
}

export async function sendReport(report) {
  try {
    const send = await axios({
      method: "post",
      url: "http://localhost:8080/form/admin/post",
      data: report,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(send);
  } catch (error) {
    console.error("Error sending data: ", error);
  }
}
