import axios from "axios";
import { useEffect, useState } from "react";

export default function ReportsView() {
  const [reports, setReports] = useState([]);

  async function fetchReports() {
    try {
      const fetching = await axios
        .get("http://localhost:8080/api/form/get")
        .then(function (response) {
          setReports(response.data);
          //   return response;
        });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchReports();
  }, []);

  //   console.log(reports);

  return (
    <div className="report-viewer__panel__report">
      {reports.map((report) => (
        <ReportElement
          key={report.id}
          roomNumber={report.roomNumber}
          createdAt={report.createdAt}
          isSolved={report.isSolved}
        />
      ))}
      {/* <ReportElement /> */}
      {/* <ReportElement />
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
      <ReportElement /> */}
    </div>
  );
}

function ReportElement({ roomNumber, createdAt, isSolved }) {
  const [areDetailsShown, setAreDetailsShown] = useState(false);

  let date;
  let time;
  if (createdAt != null) {
    date = createdAt.slice(0, 10);
    time = createdAt.slice(11, 19);
  } else {
    date = "Data";
    time = "Czas";
  }

  function toggleDetails() {
    setAreDetailsShown(!areDetailsShown);
  }

  return (
    <div className="report-viewer__panel__report__element-container">
      <div
        className={`report-viewer__panel__report__element ${
          isSolved && "report-viewer__solved"
        }`}
      >
        <p>{roomNumber}</p>
        <div className="report-viewer__panel__report__element__right">
          <p>{date + " " + time}</p>
          <button
            className="report-viewer__button"
            onClick={() => toggleDetails()}
          >
            Rozwiń v
          </button>
        </div>
      </div>
      <div
        className={`report-viewer__panel__report__element__details ${
          !areDetailsShown ? "report-viewer__hidden" : ""
        }`}
      >
        <p>details</p>
      </div>
    </div>
  );
}
