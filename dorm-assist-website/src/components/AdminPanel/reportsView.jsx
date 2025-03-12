import axios from "axios";
import { useEffect, useState } from "react";
import {
  addSampleReport,
  getReports,
  getSampleReports,
  solvedReport,
} from "./api";

export default function ReportsView({ reloadTrigger, reloadData }) {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    setReports([]);
    async function fetchData() {
      let data = await getSampleReports();
      setReports(data);
    }

    fetchData();
  }, [reloadTrigger]);

  console.log(reports);
  const unSolvedReports = reports.filter((report) => !report.solved && report);
  const solvedReports = reports.filter((report) => report.solved && report);

  return (
    <div className="report-viewer__panel__report">
      <AddSampleReport reloadData={reloadData} />
      {unSolvedReports.map((report) => (
        <ReportElement
          key={report.id}
          report={report}
          setReports={setReports}
        />
      ))}
      {solvedReports.map((report) => (
        <ReportElement
          key={report.id}
          report={report}
          setReports={setReports}
        />
      ))}
    </div>
  );
}

function AddSampleReport({ reloadData }) {
  const tryAddingSampleReport = async () => {
    try {
      await addSampleReport();
      reloadData();
    } catch (error) {
      console.error("Could not add sample reports:", error);
    }
  };

  return (
    <div className="report-viewer__add-sample">
      <div>
        <p>Dodaj przykładowe zgłoszenie do testów.</p>
      </div>
      <button onClick={tryAddingSampleReport}>Dodaj</button>
    </div>
  );
}

function ReportElement({ report, setReports }) {
  const [areDetailsvisible, setAreDetailsvisible] = useState();

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
    if (areDetailsvisible == null) setAreDetailsvisible(true);
    setAreDetailsvisible(!areDetailsvisible);
  }

  function onChange(event) {
    let isChecked = event.target.checked;

    setReports((prev) =>
      prev.map((element) =>
        element.id !== report.id ? element : { ...element, solved: isChecked }
      )
    );
    let newValue = { ...report, solved: isChecked };
    solvedReport(newValue);
  }

  return (
    <div
      className={`report-viewer__panel__report__element-container ${
        report.solved && "report-viewer__solved"
      }`}
    >
      <div
        className={`report-viewer__panel__report__element ${
          report.solved && "report-viewer__solved"
        }`}
      >
        <p>{report.exampleUserData.roomNumber}</p>
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
          areDetailsvisible ? "report-viewer__visible" : ""
        }${
          !areDetailsvisible && areDetailsvisible != null
            ? "report-viewer__hidden"
            : ""
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
              // readOnly={true}
              onChange={(e) => onChange(e)}
              checked={report.solved}
            />
            <p>Wykonane:</p>
          </div>
        </div>
      </div>
    </div>
  );
}
