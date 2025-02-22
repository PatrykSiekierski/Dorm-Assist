import RegisterForm from "./registerForm";

export default function RegisterContainer() {
  return (
    <section id="info-section">
      <div className="grid-form border">
        <div id="icon-side">
          <img src="src/assets/form-icon.svg" alt="form icon" />
          <h2>Masz już konto?</h2>
          <p>Przejdź do logowania przyciskiem poniżej!</p>
          <button className="button">Logowanie</button>
        </div>
        <div className="form-side">
          <h2>Rejestracja:</h2>
          <RegisterForm />
          {/* <Form /> */}
        </div>
      </div>
    </section>
  );
}
