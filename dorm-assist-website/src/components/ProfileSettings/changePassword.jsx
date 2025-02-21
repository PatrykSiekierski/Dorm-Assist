import axios from "axios";
import { useForm } from "react-hook-form";
import { PasswordForm, RepeatPasswordForm } from "../Utils/formsElements";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    const body = {
      password: data.oldPassword,
      dataToChange: data.newPassword,
    };

    registerNewAccount(body);
  };

  async function registerNewAccount(body) {
    const token = localStorage.getItem("token");
    try {
      const putData = await axios({
        method: "put",
        url: "http://localhost:8080/users/change/password",
        data: body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(putData);
      reset();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
      <div className="register-form__element">
        <PasswordForm
          id={"oldPassword"}
          register={register}
          errors={errors}
          elementName={"oldPassword"}
          labelName={"Stare hasło:"}
        />
      </div>
      <div className="register-form__element">
        <PasswordForm
          id={"newPassword"}
          register={register}
          errors={errors}
          elementName={"newPassword"}
          labelName={"Nowe hasło:"}
        />
      </div>
      <div className="register-form__element">
        <RepeatPasswordForm
          register={register}
          errors={errors}
          watch={watch}
          elementName={"repeatNewPassword"}
          labelName={"Powtórz nowe Hasło:"}
        />
      </div>
      <input type="submit" className="button" />
    </form>
  );
}
