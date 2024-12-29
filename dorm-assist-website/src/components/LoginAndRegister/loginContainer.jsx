import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

export default function LoginContainer({ page }) {
  return (
    <div className="border login-container">
      <p>Login Container</p>
      {page == "login" ? <LoginForm /> : <RegisterForm />}
    </div>
  );
}
