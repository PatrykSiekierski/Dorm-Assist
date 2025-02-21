import axios from "axios";
import { useForm } from "react-hook-form";
import { PasswordForm, UsernameForm } from "../Utils/formsElements";
import { useState } from "react";

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
      dataToChange: data.newUsername,
    };

    registerNewAccount(body);
  };

  async function registerNewAccount(body) {
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
      console.log(putData);

      const newErrors = { username: "" };
      if (putData.data.status === "error") {
        if (putData.data.message.includes("username")) {
          newErrors.username = putData.data.message;
        }
      } else {
        reset();
      }
      setApiErrors(newErrors);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
      <div className="register-form__element">
        <PasswordForm
          id={"password"}
          register={register}
          errors={errors}
          elementName={"password"}
          labelName={"Podaj hasło:"}
        />
      </div>
      <div className="register-form__element">
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
