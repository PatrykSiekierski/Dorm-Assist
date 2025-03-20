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
  return await fetchData("http://localhost:8080/form/admin/getsample");
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

export async function deleteUser(username) {
  try {
    const send = await axios({
      method: "delete",
      url: "http://localhost:8080/users/admin/deletetarget",
      data: username,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(send);
  } catch (error) {
    console.error("Error sending data: ", error);
  }
}

export async function addSampleReport() {
  try {
    const send = await axios({
      method: "post",
      url: "http://localhost:8080/example/report/add",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(send);
    console.log(send.data);
  } catch (error) {
    console.error("Error sending data: ", error);
  }
}

export async function getSampleReports() {
  try {
    const send = await axios({
      method: "get",
      url: "http://localhost:8080/example/report/getall",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(send);
    // console.log(send.data);
    if (send.data == undefined || send.data == "") return [];
    return send.data;
  } catch (error) {
    console.error("Error sending data: ", error);
  }
}

export async function deleteSampleReport(exampleReport) {
  try {
    const send = await axios({
      method: "delete",
      url: "http://localhost:8080/example/report/delete",
      data: exampleReport,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(send);
  } catch (error) {
    console.error("Error sending data: ", error);
  }
}

export async function addSampleUser() {
  try {
    const send = await axios({
      method: "post",
      url: "http://localhost:8080/example/user/add",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(send);
    console.log(send.data);
  } catch (error) {
    console.error("Error sending data: ", error);
  }
}

export async function getSampleUsers() {
  try {
    const send = await axios({
      method: "get",
      url: "http://localhost:8080/example/user/getall",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log(send);
    // console.log(send.data);
    return send.data;
  } catch (error) {
    console.error("Error sending data: ", error);
  }
}

export async function deleteSampleUser(exampleUser) {
  const token = localStorage.getItem("token");

  console.log(exampleUser);
  try {
    const send = await axios({
      method: "delete",
      url: "http://localhost:8080/example/user/delete",
      data: exampleUser,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(send);
  } catch (error) {
    console.error("Error sending data: ", error);
  }
}
