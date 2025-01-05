import { useForm } from "react-hook-form";
import axios from "axios";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    loginAndGetToken(data);
  };

  async function loginAndGetToken(body) {
    console.log(body);

    try {
      const tokenData = await axios({
        method: "post",
        url: "http://localhost:8080/users/authenticate",
        data: body,
      });

      const token = tokenData.data;
      localStorage.setItem("token", token);
      // console.log("Token: " + token);

      // const newErrors = { email: "", username: "" };
      // if (postUsers.data.status === "error") {
      //   if (postUsers.data.message.includes("email")) {
      //     newErrors.email = postUsers.data.message; // Assign email error
      //   }
      //   if (postUsers.data.message.includes("username")) {
      //     newErrors.username = postUsers.data.message; // Assign username error
      //   }
      // }
      // setApiErrors(newErrors);
    } catch (e) {
      console.log(e);
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
          <input type="submit" className="button" />
        </form>
      </div>
      <div className="register-page__left">
        <p>right</p>
      </div>
    </div>
  );
}
