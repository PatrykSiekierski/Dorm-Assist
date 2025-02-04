import { useForm } from "react-hook-form";
import axios from "axios";
// import Navbar from "../components/Universal/navbar";
import { useNavigate } from "react-router-dom";
import Navbar from "../Universal/navbar";
// import Navbar from "../Universal/navbar";

export default function LoginForm() {
  // const { register, handleSubmit } = useForm();
  // const navigate = useNavigate();
  // const onSubmit = (data) => {
  //   loginAndGetToken(data);
  // };

  // async function loginAndGetToken(body) {
  //   console.log(body);

  //   try {
  //     const tokenData = await axios({
  //       method: "post",
  //       url: "http://localhost:8080/users/authenticate",
  //       data: body,
  //     });

  //     if (!tokenData.headers.get("Content-Type").includes("html")) {
  //       const token = tokenData.data;
  //       localStorage.setItem("token", token);
  //       console.log("Token: " + token);
  //     }

  //     navigate("/");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  return (
    <div className="login-container">
      <div className="login-functional">
        <div className="login-navigation">
          <h2>
            <a href="/">Home</a>
          </h2>
        </div>
        <div className="login-form">
          <form action="">
            <label htmlFor="">test</label>
            <input type="text" />
          </form>
        </div>
      </div>
      <div className="login-decorative">
        <div className="login-decorative__img-container"></div>
      </div>
    </div>
  );
}
