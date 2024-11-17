import { useState } from "react";
import "../../styles/Report/_form.scss";

export default function Form() {
  return (
    <form action="" className="form-holder">
      <div className="form-segment">
        <label htmlFor="room">Number pokoju:</label>
        <input type="text" id="room" placeholder="303A" />
      </div>
      {/* <label htmlFor="problem">Opisz krótko problem:</label>
        <input type="text" id="problem" placeholder="" /> */}
      <div className="form-segment">
        <label htmlFor="system">System operacyjny: </label>
        <select id="system">
          <option value="windows">Windows</option>
          <option value="macos">MacOs</option>
          <option value="linux">Linux</option>
          <option value="android">Android</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="form-segment">
        <label htmlFor="self">Czy gniazdko jest poprawnie zamątowane?</label>
        <CheckBox />
        {/* <input type="checkbox" id="self" /> */}
      </div>
      <div className="form-segment">
        <label htmlFor="self">Czy Interent działał wcześniej?</label>
        <CheckBox />
        {/* <input type="checkbox" id="self" /> */}
      </div>
      <div className="form-segment description-segment">
        <label htmlFor="opis">Opisz krótko problem:</label>
        <textarea
          id="opis"
          placeholder="Gniazdko nie ma wejścia Ethernet."
        ></textarea>
      </div>
      <button id="submit-button">Submit</button>
    </form>
  );
}

function CheckBox() {
  const [option, setOption] = useState("no");

  return (
    <div className="form-checkboxes">
      <span
        id="form-chechbox-no"
        className={`option ${option == "no" ? "selected" : ""}`}
        onClick={() => {
          setOption("no");
        }}
      >
        Nie
      </span>
      <span
        id="form-chechbox-yes"
        className={`option ${option == "yes" ? "selected" : ""}`}
        onClick={() => {
          setOption("yes");
        }}
      >
        Tak
      </span>
    </div>
  );
}
