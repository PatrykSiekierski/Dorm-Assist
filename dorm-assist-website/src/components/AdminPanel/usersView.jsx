import axios from "axios";
import { useEffect, useState } from "react";
import { getUsers } from "./api";

export default function UsersView({ reloadTrigger }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setUsers([]);
    async function fetchData() {
      let data = await getUsers();
      setUsers(data);
    }

    fetchData();
  }, [reloadTrigger]);

  return (
    <div className="report-viewer__panel__users">
      {users.map((user) => (
        <UserElement key={user.id} user={user} />
      ))}
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
