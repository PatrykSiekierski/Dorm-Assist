import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginAndGetToken } from "../Utils/authService";
import { PasswordForm, UsernameForm } from "../Utils/formsElements";

export default function LoginForm() {
  const navigate = useNavigate();
  const [credentialsState, setCredentialsState] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    handleLogin(data);
  };

  async function handleLogin(data) {
    const tokenData = await loginAndGetToken(data.username, data.password);

    if (tokenData != null) {
      reset();
      navigate("/");
      setCredentialsState(false);
    } else {
      setCredentialsState(true);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="login-form">
      <div className="login-form__element">
        <UsernameForm
          register={register}
          errors={errors}
          labelName={"Nazwa użytkownika"}
        />
      </div>
      <div className="login-form__element">
        <PasswordForm
          id={"password"}
          register={register}
          errors={errors}
          elementName={"password"}
          labelName={"Hasło"}
        />
      </div>
      {credentialsState ? (
        <h3 className="error-message">Złe dane logowania</h3>
      ) : (
        ""
      )}
      <input type="submit" className="button" />
    </form>
  );
}
