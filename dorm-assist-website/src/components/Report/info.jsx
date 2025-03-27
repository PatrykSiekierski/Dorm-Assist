import { useEffect, useState } from "react";
import { isAdmin } from "../Utils/authService";
import Form from "./form";

export default function Info() {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    const verifyAdmin = async () => {
      const hasAdminAccess = await isAdmin();
      if (hasAdminAccess) {
        setVerified(true);
      } else {
        setVerified(false);
      }
    };

    verifyAdmin();
  }, []);

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
          {!verified ? (
            <p className="error-message">
              Aby zgłosić problem należy być zalogowanym.
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="form-side">
          <h2>Zgłoś problem:</h2>
          <Form />
        </div>
      </div>
    </section>
  );
}
