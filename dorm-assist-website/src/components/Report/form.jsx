import { useState } from "react";
import { sendReport } from "../AdminPanel/api";

export default function Form() {
  const [formData, setFormData] = useState({
    operatingSystem: "windows",
    socketMounted: true,
    wasInternetWorking: false,
    problemDescription: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleChangeChoiceBox = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    pushData();
    setFormData({
      operatingSystem: "windows",
      socketMounted: true,
      wasInternetWorking: false,
      problemDescription: "",
    });
    console.log(formData);
    console.log("Wysyła sie chyba");
  };

  const pushData = async () => {
    sendReport(formData);
  };

  return (
    <form action="" className="form-holder" onSubmit={handleSubmit}>
      <div className="form-segment">
        <label htmlFor="socketMounted">
          Czy gniazdko jest poprawnie zamątowane?
        </label>
        <CheckBox
          field="socketMounted"
          selected={formData.socketMounted}
          onChange={handleChangeChoiceBox}
        />
      </div>

      <div className="form-segment">
        <label htmlFor="wasInternetWorking">
          Czy Interent działał wcześniej?
        </label>
        <CheckBox
          field="wasInternetWorking"
          selected={formData.wasInternetWorking}
          onChange={handleChangeChoiceBox}
        />
      </div>

      <div className="form-segment">
        <label htmlFor="operatingSystem">System operacyjny: </label>
        <select id="operatingSystem" onChange={handleChange}>
          <option value="windows">Windows</option>
          <option value="macos">MacOs</option>
          <option value="linux">Linux</option>
          <option value="android">Android</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-segment description-segment">
        <label htmlFor="problemDescription">Opisz krótko problem:</label>
        <textarea
          id="problemDescription"
          placeholder="np. Gniazdko nie ma wejścia Ethernet."
          value={formData.problemDescription}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="submit" id="submit-button">
        Wyślij
      </button>
    </form>
  );
}

function CheckBox({ field, selected, onChange }) {
  return (
    <div className="form-checkboxes">
      <span
        id={field}
        className={`option ${selected == false ? "selected" : ""}`}
        onClick={() => {
          onChange(field, false);
        }}
      >
        Nie
      </span>
      <span
        id={field}
        className={`option ${selected == true ? "selected" : ""}`}
        onClick={() => {
          onChange(field, true);
        }}
      >
        Tak
      </span>
    </div>
  );
}
