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
    console.log(body);

    try {
      const postUsers = await axios({
        method: "post",
        url: "http://localhost:8080/registration/create",
        data: body,
      });

      const newErrors = { email: "", username: "" };
      if (postUsers.data.status === "error") {
        if (postUsers.data.message.includes("email")) {
          newErrors.email = postUsers.data.message;
        }
        if (postUsers.data.message.includes("username")) {
          newErrors.username = postUsers.data.message;
        }
      }
      setApiErrors(newErrors);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="form-holder">
      <div className="form-segment">
        <EmailForm
          register={register}
          errors={errors}
          apiErrors={apiErrors}
          labelName={"Adres E-mail"}
        />
      </div>
      <div className="form-segment">
        <RegisterUsernameForm
          register={register}
          errors={errors}
          apiErrors={apiErrors}
          labelName={"Nazwa użytkownika:"}
        />
      </div>
      <div className="form-segment">
        <PasswordForm
          id={"password"}
          register={register}
          errors={errors}
          elementName={"password"}
          labelName={"Podaj hasło:"}
        />
      </div>
      <div className="form-segment">
        <RepeatPasswordForm
          register={register}
          errors={errors}
          watch={watch}
          elementName={"repeatPassword"}
          labelName={"Powtórz hasło:"}
        />
      </div>
      <div className="form-segment">
        <RoomNumberForm
          register={register}
          errors={errors}
          labelName={"Number pokoju:"}
        />
      </div>
      <div></div>
      <input type="submit" className="button" />
    </form>
  );
}
