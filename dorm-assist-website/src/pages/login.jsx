import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginAndGetToken } from "../components/Utils/authService";
import { useState } from "react";

export default function LoginForm() {
  const [credentialsState, setCredentialsState] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
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
    <div className="register-page">
      <div className="register-page__left">
        <p>login Form</p>
        <form onSubmit={handleSubmit(onSubmit)} className="register-form">
          <div className="register-form__element">
            <label htmlFor="">Username</label>
            <input {...register("username")} />
          </div>
          <div className="register-form__element">
            <label htmlFor="">Password</label>
            <input {...register("password")} />
          </div>
          {credentialsState ? <h3>Złe dane logowania</h3> : ""}
          <input type="submit" className="button" />
        </form>
      </div>
      <div className="register-page__left">
        <p>right</p>
      </div>
    </div>
  );
}
