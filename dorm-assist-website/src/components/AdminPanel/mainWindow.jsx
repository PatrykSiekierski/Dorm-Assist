import { useState } from "react";
import ReportsView from "./reportsView";
import UsersView from "./usersView";

export default function MainWindow({ selectedCategory }) {
  const [reloadTrigger, setReloadTrigger] = useState(false);

  // function reloadData() {
  // setReloadTrigger(!reloadTrigger);
  // }

  const reloadData = () => {
    setReloadTrigger(!reloadTrigger);
  };

  return (
    <div className="report-viewer__panel">
      <div className="report-viewer__panel__title">
        <h2>{selectedCategory}</h2>
        <button className="reload-button" onClick={reloadData}>
          Odśwież
        </button>
      </div>
      <hr />
      <div className="report-viewer__panel__content">
        {selectedCategory == "Zgłoszenia" && (
          <ReportsView reloadTrigger={reloadTrigger} reloadData={reloadData} />
        )}
        {selectedCategory == "Użytkownicy" && (
          <UsersView reloadTrigger={reloadTrigger} reloadData={reloadData} />
        )}
      </div>
    </div>
  );
}
