import { useEffect, useState } from "react";
import axios from "axios";
import "../../styles/Report/_form.scss";

export default function Form() {
  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/api/form/get");
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error("Error fetching data", error);
  //   }
  // };

  const [formData, setFormData] = useState({
    roomNumber: "",
    operatingSystem: "windows",
    isSocketMounted: true,
    wasInternetWorking: false,
    problemDescription: "",
  });

  // function handleChange(event) {
  //   const { field, value } = event.target;
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     [field]: value,
  //   }));

  //   console.log(formData);
  // }

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    // console.log(formData);
  };

  const handleChangeChoiceBox = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
    // console.log(formData);
  };

  const fetchData = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/form/post",
        "post req z reacta testowy"
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchData();
  };

  console.log(formData);

  return (
    <form action="" className="form-holder" onSubmit={handleSubmit}>
      <div className="form-segment">
        <label htmlFor="roomNumber">Number pokoju:</label>
        <input
          type="text"
          id="roomNumber"
          placeholder="303A"
          value={formData.roomNumber}
          onChange={handleChange}
        />
      </div>
      {/* <label htmlFor="problem">Opisz krótko problem:</label>
        <input type="text" id="problem" placeholder="" /> */}
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
      <div className="form-segment">
        <label htmlFor="isSocketMounted">
          Czy gniazdko jest poprawnie zamątowane?
        </label>
        <CheckBox
          field="isSocketMounted"
          selected={formData.isSocketMounted}
          onChange={handleChangeChoiceBox}
        />
        {/* <input type="checkbox" id="self" /> */}
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
        {/* <input type="checkbox" id="self" /> */}
      </div>
      <div className="form-segment description-segment">
        <label htmlFor="problemDescription">Opisz krótko problem:</label>
        <textarea
          id="problemDescription"
          placeholder="Gniazdko nie ma wejścia Ethernet."
          value={formData.problemDescription}
          onChange={handleChange}
        ></textarea>
      </div>
      <button type="submit" id="submit-button">
        Submit
      </button>
    </form>
  );
}

function CheckBox({ field, selected, onChange }) {
  // const [option, setOption] = useState("no");

  return (
    <div className="form-checkboxes">
      <span
        id={field}
        className={`option ${selected == false ? "selected" : ""}`}
        onClick={() => {
          onChange(field, false);
          // setOption("no");
        }}
      >
        Nie
      </span>
      <span
        id={field}
        className={`option ${selected == true ? "selected" : ""}`}
        onClick={() => {
          onChange(field, true);
          // setOption("yes");
        }}
      >
        Tak
      </span>
    </div>
  );
}
