import { useNavigate } from "react-router-dom";
import LoginForm from "./loginForm";

export default function LoginContainer({ page }) {
  const navigate = useNavigate();

  function goToRegisterPage() {
    navigate("/register");
  }

  return (
    <section id="info-section">
      <div className="grid-form border">
        <div id="icon-side">
          {/* <img src="src/assets/form-icon.svg" alt="form icon" /> */}
          <h2>Nie masz konta?</h2>
          <p>Stwórz nowe konto:</p>
          <button className="button" onClick={goToRegisterPage}>
            Zarejestruj
          </button>
        </div>
        <div className="form-side">
          <h2>Logowanie:</h2>
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
