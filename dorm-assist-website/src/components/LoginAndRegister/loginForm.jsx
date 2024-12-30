import { useForm } from "react-hook-form";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

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
          <input type="submit" />
        </form>
      </div>
      <div className="register-page__left">
        <p>right</p>
      </div>
    </div>
  );
}
