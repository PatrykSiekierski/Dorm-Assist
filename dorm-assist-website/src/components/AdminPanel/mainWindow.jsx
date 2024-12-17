import ReportsView from "./reportsView";
import UsersView from "./usersView";

export default function MainWindow({ selectedCategory }) {
  return (
    <div className="report-viewer__panel">
      <h2 className="report-viewer__panel__title">{selectedCategory}</h2>
      <div className="report-viewer__panel__content">
        {selectedCategory == "Zgłoszenia" && <ReportsView />}
        {selectedCategory == "Użytkownicy" && <UsersView />}
        {/* {selectedCategory == "Zgłoszenia" && <ReportsView />} */}
      </div>
    </div>
  );
}
