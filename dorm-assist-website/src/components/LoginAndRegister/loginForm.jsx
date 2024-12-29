import { useForm } from "react-hook-form";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <p>login Form</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("username")} />
        <input {...register("password")} />
        <input type="submit" />
      </form>
    </div>
  );
}
