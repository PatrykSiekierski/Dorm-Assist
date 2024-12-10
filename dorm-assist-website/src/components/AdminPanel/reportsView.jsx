import axios from "axios";

export default function ReportsView() {
  return (
    <div className="report-viewer__panel__report">
      <ReportElement />
      <ReportElement />
      <ReportElement />
      <ReportElement />
      <ReportElement />
      <ReportElement />
      <ReportElement />
      <ReportElement />
      <ReportElement />
      <ReportElement />
      <ReportElement />
      <ReportElement />
      <ReportElement />
      <ReportElement />
      <ReportElement />
      <ReportElement />
    </div>
  );
}

function ReportElement() {
  return (
    <div className="report-viewer__panel__report__element">
      <p>Pokoj</p>
      <div className="report-viewer__panel__report__element__right">
        <p>data</p>
        <p>Rozwiń v</p>
      </div>
    </div>
  );
}
