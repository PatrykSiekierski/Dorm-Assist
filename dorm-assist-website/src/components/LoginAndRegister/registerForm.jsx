import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

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
        url: "http://localhost:8080/users/create",
        data: body,
      });

      const newErrors = { email: "", username: "" };
      if (postUsers.data.status === "error") {
        if (postUsers.data.message.includes("email")) {
          newErrors.email = postUsers.data.message; // Assign email error
        }
        if (postUsers.data.message.includes("username")) {
          newErrors.username = postUsers.data.message; // Assign username error
        }
      }
      setApiErrors(newErrors);
    } catch (e) {
      console.log(e);
    }
  }

  // const [message, setMessage] = useState("");

  return (
    <>
      <div className="register-page">
        <div className="register-page__left">
          <p>Register form</p>
          <form onSubmit={handleSubmit(onSubmit)} className="register-form">
            <div className="register-form__element">
              <label htmlFor="email">Adres e-mail</label>
              <input
                id="email"
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}$/i,
                  },
                })}
              />
              {errors.email && errors.email.type === "required" && (
                <span className="error-message">To pole jest obowiązkowe</span>
              )}
              {errors.email && errors.email.type === "pattern" && (
                <span className="error-message">
                  Podany adres email jest nie prawidłowy
                </span>
              )}
              {apiErrors.email && (
                <span className="error-message">{apiErrors.email}</span>
              )}
            </div>
            <div className="register-form__element">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                {...register("username", {
                  required: true,
                  minLength: 6,
                })}
              />
              {errors.username && errors.username.type === "required" && (
                <span className="error-message">To pole jest obowiązkowe</span>
              )}
              {errors.username && errors.username.type === "minLength" && (
                <span className="error-message">
                  Minimalna długość to 6 znaków.
                </span>
              )}
              {apiErrors.username && (
                <span className="error-message">{apiErrors.username}</span>
              )}
            </div>
            <div className="register-form__element">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                {...register("password", {
                  required: true,
                  maxLength: 20,
                  minLength: 8,
                  validate: (value) => {
                    const hasNumber = /\d/; // Check for at least one number
                    const hasUpperCase = /[A-Z]/; // Check for at least one uppercase letter
                    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/; // Check for at least one symbol
                    return (
                      (hasNumber.test(value) &&
                        hasUpperCase.test(value) &&
                        hasSymbol.test(value)) ||
                      "Hasło musi zawierać przynajmniej jedną cyfre, jedną dużą literę i jeden symbol."
                    );
                  },
                })}
              />
              {errors.password && errors.password.type === "required" && (
                <span className="error-message">To pole jest obowiązkowe</span>
              )}
              {errors.password && errors.password.type === "maxLength" && (
                <span className="error-message">Maksymalna długość to 20.</span>
              )}
              {errors.password && errors.password.type === "minLength" && (
                <span className="error-message">Minimalna długość to 8.</span>
              )}
              {errors.password && errors.password.message && (
                <span className="error-message">{errors.password.message}</span>
              )}
            </div>
            <div className="register-form__element">
              <label htmlFor="repeatedPassword">Repeat password</label>
              <input
                id="repeatedPassword"
                type="password"
                {...register("repeatedPassword", {
                  required: true,
                  validate: (val) => {
                    if (watch("password") != val) {
                      return "Your passwords do no match";
                    }
                  },
                })}
              />
              {errors.repeatedPassword &&
                errors.repeatedPassword.type === "required" && (
                  <span className="error-message">
                    To pole jest obowiązkowe
                  </span>
                )}
              {errors.repeatedPassword && errors.repeatedPassword.message && (
                <span className="error-message">
                  {errors.repeatedPassword.message}
                </span>
              )}
            </div>
            <div className="register-form__element">
              <label htmlFor="roomNumber">Room Number</label>
              <input
                id="roomNumber"
                {...register("roomNumber", {
                  required: true,
                  pattern: {
                    value: /^[0-9]{1,3}[a-zA-Z]?$/,
                  },
                })}
              />
              {errors.roomNumber && errors.roomNumber.type === "required" && (
                <span className="error-message">To pole jest obowiązkowe</span>
              )}
              {errors.roomNumber && errors.roomNumber.type === "pattern" && (
                <span className="error-message">
                  Number pokoju występuje w formacie <br></br>
                  np.: 120b, 312, 21B
                </span>
              )}
            </div>
            {/* <div className="message none"> */}
            {/* <p>{message}</p> */}
            {/* </div> */}
            <input type="submit" className="button" />
          </form>
        </div>
        <div className="register-page__right">
          <p>right</p>
        </div>
      </div>
    </>
  );
}
