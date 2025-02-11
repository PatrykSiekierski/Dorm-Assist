import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
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

      // console.log(tokenData.headers.get("Content-Type"));
      console.log("hehehehhehehe");
      if (!tokenData.headers.get("Content-Type").includes("html")) {
        const token = tokenData.data;
        localStorage.setItem("token", token);
        console.log("Token: " + token);
        navigate("/");
      }
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

// import Navbar from "../components/Universal/navbar";
// import Footer from "../components/Universal/footer";
// import LoginContainer from "../components/LoginAndRegister/loginContainer";

// export default function Login() {
//   return (
//     <>
//       {/* <Navbar /> */}
//       <main>
//         <LoginContainer page="login" />
//       </main>
//       <Footer />
//     </>
//   );
// }
