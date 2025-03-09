import axios from "axios";
import { useEffect, useState } from "react";
import {
  addSampleUser,
  deleteSampleUser,
  deleteUser,
  getSampleUsers,
  getUsers,
} from "./api";

export default function UsersView({ reloadTrigger, reloadData }) {
  const [sampleUsers, setSampleUsers] = useState([]);

  //Load sample users on selecting section and realoading.
  useEffect(() => {
    setSampleUsers([]);
    async function fetchData() {
      let request = await getSampleUsers();
      setSampleUsers(request);
    }

    fetchData();
  }, [reloadTrigger]);

  return (
    <div className="report-viewer__panel__users">
      <AddSampleUser reloadData={reloadData} />
      {sampleUsers.map((user) => (
        <UserElement key={user.id} user={user} setUsers={setSampleUsers} />
      ))}
    </div>
  );
}

function AddSampleUser({ reloadData }) {
  const tryAddingSampleUser = async () => {
    try {
      await addSampleUser();
      reloadData();
    } catch (error) {
      console.error("Could not add sample user:", error);
    }
  };

  return (
    <div className="report-viewer__add-sample">
      <div>
        <p>Dodaj przykładowego użytkownika do testów.</p>
      </div>
      <button onClick={tryAddingSampleUser}>Dodaj</button>
    </div>
  );
}

function UserElement({ user, setUsers }) {
  function deleteTarget() {
    setUsers((prev) => prev.filter((item) => item != user));
    deleteSampleUser(user);
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
