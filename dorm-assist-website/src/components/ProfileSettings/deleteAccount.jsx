import axios from "axios";
import { PasswordForm } from "../Utils/formsElements";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { clearToken } from "../Utils/tokenUtility";

export default function DeleteAccount() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    deleteAnAccount(data.password);
  };

  async function deleteAnAccount(body) {
    const token = localStorage.getItem("token");
    try {
      console.log("Body: ", body);
      const putData = await axios({
        method: "delete",
        url: "http://localhost:8080/users/change/delete",
        data: body,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(putData);
      clearToken();
      navigate("/");
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
          labelName={"Hasło:"}
        />
      </div>
      <input type="submit" className="button" />
    </form>
  );
}
