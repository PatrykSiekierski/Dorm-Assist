import axios from "axios";
import { useEffect, useState } from "react";
import {
  addSampleReport,
  getReports,
  getSampleReports,
  solvedReport,
  solvedSampleReport,
} from "./api";

export default function ReportsView({ reloadTrigger, reloadData }) {
  const [reports, setReports] = useState([]);
  const [userReports, setUserReports] = useState([]);

  useEffect(() => {
    setReports([]);
    async function fetchSampleData() {
      let data = await getSampleReports();
      setReports(data);
    }

    async function fetchUserData() {
      let data = await getReports();
      setUserReports(data);
    }

    fetchUserData();
    fetchSampleData();
  }, [reloadTrigger]);

  console.log(reports);
  const unSolvedReports = reports.filter((report) => !report.solved && report);
  const solvedReports = reports.filter((report) => report.solved && report);
  const unSolvedUserReports = userReports.filter(
    (report) => !report.solved && report
  );
  const solvedUserReports = userReports.filter(
    (report) => report.solved && report
  );

  console.log(userReports);
  return (
    <div className="report-viewer__panel__report">
      <AddSampleReport reloadData={reloadData} />
      {reports.length == 0 ? (
        <div>
          <p>
            Aby dodawać przykładowe zgłoszenia musisz stworzyć przykładowych
            użytkowników w innej zakładce
          </p>
        </div>
      ) : (
        ""
      )}
      {unSolvedUserReports.map((report) => (
        <ReportElement
          key={report.id + "user"}
          report={report}
          setReports={setUserReports}
        />
      ))}
      {unSolvedReports.map((report) => (
        <ReportElement
          key={report.id}
          report={report}
          setReports={setReports}
        />
      ))}
      {solvedUserReports.map((report) => (
        <ReportElement
          key={report.id + "user"}
          report={report}
          setReports={setUserReports}
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
    if (report.exampleUserData) {
      solvedSampleReport(newValue);
    } else {
      solvedReport(newValue);
    }
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
        <div className="report-viewer__identifiers">
          {report.exampleUserData ? (
            <span>{report.exampleUserData.roomNumber}</span>
          ) : report.user ? (
            <span>{report.user.roomNumber}</span>
          ) : (
            <span>Brak</span>
          )}
          {report.exampleUserData ? (
            <span>{report.exampleUserData.username}</span>
          ) : report.user ? (
            <span>{report.user.username}</span>
          ) : (
            <span>Brak</span>
          )}
          {/* <span>{report.exampleUserData.username}</span> */}
        </div>
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
