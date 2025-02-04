import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

export default function LoginContainer({ page }) {
  return (
    <>{page == "login" ? <LoginForm /> : <RegisterForm />}</>
    // <div className="border login-container">
    // <p>Login Container</p>
    // </div>
  );
}
