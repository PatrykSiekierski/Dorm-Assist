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
          report={report}
          // roomNumber={report.roomNumber}
          // createdAt={report.createdAt}
          // isSolved={report.isSolved}
        />
      ))}
    </div>
  );
}

function ReportElement({ report }) {
  //operatingSystem
  //wasInternetWorking
  //problemDescription
  //socketMounted
  const [areDetailsShown, setAreDetailsShown] = useState(false);

  let date;
  let time;
  if (report.createdAt != null) {
    date = report.createdAt.slice(0, 10);
    time = report.createdAt.slice(11, 19);
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
          report.isSolved && "report-viewer__solved"
        }`}
      >
        <p>{report.roomNumber}</p>
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
        className={`report-viewer__panel__report__details ${
          !areDetailsShown ? "report-viewer__hidden" : ""
        }`}
      >
        <div className="report-viewer__panel__report__details__base-info">
          <div className="report-viewer__panel__report__details__elements">
            <p>System</p>
            <span>{report.operatingSystem}</span>
          </div>
          <div className="report-viewer__panel__report__details__elements">
            <p>wasInternetWorking</p>
            <input
              type="checkbox"
              name="intWorking"
              id=""
              readOnly={true}
              checked={report.wasInternetWorking}
            />
          </div>
          <div className="report-viewer__panel__report__details__elements">
            <p>socketMounted</p>
            <input
              type="checkbox"
              name="socket"
              id=""
              readOnly={true}
              checked={report.socketMounted}
            />
          </div>
        </div>
        <div className="report-viewer__panel__report__details__secondary-info">
          <textarea
            name=""
            id=""
            readOnly={true}
            value={report.problemDescription}
          ></textarea>
          <div className="report-viewer__panel__report__details__submitting">
            <input
              type="checkbox"
              name="socket"
              id=""
              readOnly={true}
              checked={report.solved}
            />
            <p>Wykonane:</p>
          </div>
        </div>
      </div>
    </div>
  );
}
