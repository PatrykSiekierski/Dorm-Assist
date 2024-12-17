import axios from "axios";
import { useEffect, useState } from "react";

export default function UsersView() {
  const [users, setUsers] = useState([]);

  async function fetchReports() {
    try {
      const fetching = await axios
        .get("http://localhost:8080/users/get")
        .then(function (response) {
          setUsers(response.data);
          //   console.log(response);
          //   console.log(response.data);
          //   return response;
        });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchReports();
  }, []);
  console.log(users);

  return (
    <div className="report-viewer__panel__users">
      {users.map((user) => (
        <UserElement key={user.id} user={user} />
      ))}
      {/* <UserElement />
      <UserElement />
      <UserElement /> */}
    </div>
  );
}

function UserElement({ user }) {
  return (
    <div className="report-viewer__panel__user">
      <div>
        <p>{user.username}</p>
        <p>{user.email}</p>
      </div>
      <p>{user.dormId}</p>
    </div>
  );
}
