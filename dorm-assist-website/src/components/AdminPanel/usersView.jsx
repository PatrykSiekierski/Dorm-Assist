import axios from "axios";
import { useEffect, useState } from "react";
import { deleteUser, getUsers } from "./api";

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
      <AddSampleUser />
      {users.map((user) => (
        <UserElement key={user.id} user={user} setUsers={setUsers} />
      ))}
    </div>
  );
}

function AddSampleUser() {
  return (
    <div className="report-viewer__add-sample">
      <div>
        <p>Dodaj przykładowego użytkownika do testów.</p>
      </div>
      <button>Dodaj</button>
    </div>
  );
}

function UserElement({ user, setUsers }) {
  function deleteTarget() {
    setUsers((prev) => prev.filter((item) => item != user));
    deleteUser(user.username);
  }

  return (
    <div className="report-viewer__panel__user">
      <div>
        <p>{user.username}</p>
        <p>{user.email}</p>
        <p>{user.roomNumber}</p>
      </div>
      <button onClick={deleteTarget}>Usuń</button>
    </div>
  );
}
