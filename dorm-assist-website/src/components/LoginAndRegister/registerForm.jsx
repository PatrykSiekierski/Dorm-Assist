import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  EmailForm,
  PasswordForm,
  RegisterUsernameForm,
  RepeatPasswordForm,
  RoomNumberForm,
} from "../Utils/formsElements";

export default function RegisterForm() {
  const [apiErrors, setApiErrors] = useState({ email: "", username: "" });
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const body = {
      email: data.email,
      username: data.username,
      password: data.password,
      roomNumber: data.roomNumber,
    };

    registerNewAccount(body);
  };

  async function registerNewAccount(body) {
    // console.log(body);

    try {
      const postUsers = await axios({
        method: "post",
        url: "http://localhost:8080/registration/create",
        data: body,
      });

      console.log(postUsers);

      const newErrors = { email: "", username: "" };
      if (postUsers.data) {
        if (postUsers.data.includes("email")) {
          newErrors.email = "Ten email jest już zajęty";
          console.log("Email zły");
          console.log(newErrors);
        }
        if (postUsers.data.includes("username")) {
          newErrors.username = "Ta nazwa użytkownika jest już zajęta";
          console.log("username zły");
          console.log(newErrors);
        }
      }
      setApiErrors(newErrors);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
      <div className="register-form__element">
        <EmailForm
          register={register}
          errors={errors}
          apiErrors={apiErrors}
          labelName={"Adres E-mail"}
        />
      </div>
      <div className="register-form__element">
        <RegisterUsernameForm
          register={register}
          errors={errors}
          apiErrors={apiErrors}
          labelName={"Nazwa użytkownika:"}
        />
      </div>
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
        <RepeatPasswordForm
          register={register}
          errors={errors}
          watch={watch}
          elementName={"repeatPassword"}
          labelName={"Powtórz hasło:"}
        />
      </div>
      <div className="register-form__element">
        <RoomNumberForm
          register={register}
          errors={errors}
          labelName={"Number pokoju:"}
        />
      </div>
      <div className="register-form__element"></div>
      <input type="submit" className="button" />
    </form>
  );
}
