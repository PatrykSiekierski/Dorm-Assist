import LoginForm from "./loginForm";
import RegisterForm from "./registerForm";

export default function LoginContainer({ page }) {
  return (
    <>
      <p>Login Container</p>
      {page == "login" ? <LoginForm /> : <RegisterForm />}
    </>
  );
}
