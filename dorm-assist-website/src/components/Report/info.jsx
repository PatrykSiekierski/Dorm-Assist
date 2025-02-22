import { useState } from "react";
import Form from "./form";
import "../../styles/Report/_info.scss";

export default function Info() {
  return (
    <section id="info-section">
      <div className="grid-form border">
        <div id="icon-side">
          <img src="src/assets/form-icon.svg" alt="form icon" />
          <h2>Dlaczego o to pytamy?</h2>
          <p>
            Dzięki tym informacjom możemy zawęzić krąg podejrzeń co poszło nie
            tak i szybciej udzielić pomocy.
          </p>
        </div>
        <div className="form-side">
          <h2>Zgłoś problem:</h2>
          <Form />
        </div>
      </div>
    </section>
  );
}
