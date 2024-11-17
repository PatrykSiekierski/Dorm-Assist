import { useState } from "react";
import Form from "./form";
import "../../styles/Report/_info.scss";

export default function Info() {
  return (
    <article id="info-article">
      {/* <h1 className="center-text">Wypełnij informacje</h1> */}
      <div className="grid-form border">
        <div id="icon-side">
          <img src="src/assets/form-icon.svg" alt="form icon" />
          <h2>Dlaczego o to pytamy?</h2>
          <p>
            Dzięki tym informacjom możemy zawęzić krąg podejrzeń co poszło nie
            tak i szybciej udzielić pomocy.
          </p>
          {/* <h2>Czy można zostawić wszystko puste?</h2>
          <p>
            Jedynie pokój trzeba faktycznie wypełnić, inaczej nie będziemy
            wiedzieć gdzie przyjść, ale ostatecznie damy radę nawet bez
            informacji, tylko dłużej
          </p> */}
        </div>
        <div className="form-side">
          <h2>Wypełnij informacje</h2>
          <Form />
        </div>
      </div>
    </article>
  );
}
