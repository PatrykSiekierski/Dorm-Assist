import {
  emailConditions,
  usernameConditions,
  passwordConditions,
  repeatPasswordConditions,
} from "./formConditions";

export function EmailForm({ register, errors, apiErrors, labelName }) {
  return (
    <>
      <label htmlFor="email">{labelName}</label>
      <input
        id="email"
        name={labelName}
        {...register("email", emailConditions)}
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
    </>
  );
}

export function UsernameForm({ register, errors, apiErrors, labelName }) {
  return (
    <>
      <label htmlFor="username">{labelName}</label>
      <input
        id="username"
        name={labelName}
        {...register("username", usernameConditions)}
      />
      {errors.username && errors.username.type === "required" && (
        <span className="error-message">To pole jest obowiązkowe</span>
      )}
      {errors.username && errors.username.type === "minLength" && (
        <span className="error-message">Minimalna długość to 6 znaków.</span>
      )}
      {apiErrors.username && (
        <span className="error-message">{apiErrors.username}</span>
      )}
    </>
  );
}

export function PasswordForm({ id, register, errors, elementName, labelName }) {
  return (
    <>
      <label htmlFor="password">{labelName}</label>
      <input
        id={id}
        type="password"
        name={labelName}
        {...register(elementName, passwordConditions)}
      />
      {errors[elementName] && errors[elementName].type === "required" && (
        <span className="error-message">To pole jest obowiązkowe</span>
      )}
      {errors[elementName] && errors[elementName].type === "maxLength" && (
        <span className="error-message">Maksymalna długość to 20.</span>
      )}
      {errors[elementName] && errors[elementName].type === "minLength" && (
        <span className="error-message">Minimalna długość to 8.</span>
      )}
      {errors[elementName] && errors[elementName].message && (
        <span className="error-message">{errors[elementName].message}</span>
      )}
    </>
  );
}

export function RepeatPasswordForm({
  register,
  errors,
  watch,
  elementName,
  labelName,
}) {
  return (
    <>
      <label htmlFor="repeatedPassword">{labelName}</label>
      <input
        id="repeatedPassword"
        type="password"
        name={labelName}
        {...register(elementName, repeatPasswordConditions(watch))}
      />
      {errors[elementName] && errors[elementName].type === "required" && (
        <span className="error-message">To pole jest obowiązkowe</span>
      )}
      {errors[elementName] && errors[elementName].message && (
        <span className="error-message">{errors[elementName].message}</span>
      )}
    </>
  );
}
