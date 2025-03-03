import axios from "axios";
import { useForm } from "react-hook-form";
import { PasswordForm, UsernameForm } from "../Utils/formsElements";
import { useState } from "react";
import { loginAndGetToken } from "../Utils/authService";

export default function ChangeUsername() {
  const [apiErrors, setApiErrors] = useState({ username: "" });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const body = {
      password: data.password,
      dataToChange: data.username,
    };

    changeUsername(body);
  };

  async function changeUsername(body) {
    const token = localStorage.getItem("token");
    try {
      const putData = await axios({
        method: "put",
        url: "http://localhost:8080/users/change/username",
        data: body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const newErrors = { username: "" };
      if (putData.data.status === "error") {
        if (putData.data.message.includes("username")) {
          newErrors.username = putData.data.message;
        }
      } else if (putData.status === 200) {
        loginAndGetToken(body.dataToChange, body.password);
        reset();
      }
      setApiErrors(newErrors);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="profile-form">
      <div className="profile-form__element">
        <PasswordForm
          id={"password"}
          register={register}
          errors={errors}
          elementName={"password"}
          labelName={"Podaj hasło:"}
        />
      </div>
      <div className="profile-form__element">
        <UsernameForm
          register={register}
          errors={errors}
          apiErrors={apiErrors}
          labelName={"Nowa nazwa użytkownika:"}
        />
      </div>
      <input type="submit" className="button" />
    </form>
  );
}
