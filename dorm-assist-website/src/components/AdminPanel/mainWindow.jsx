import ReportsView from "./reportsView";

export default function MainWindow({ selectedCategory }) {
  return (
    <div className="report-viewer__panel">
      <h2 className="report-viewer__panel__title">{selectedCategory}</h2>
      <div className="report-viewer__panel__content">
        <ReportsView />
      </div>
    </div>
  );
}
