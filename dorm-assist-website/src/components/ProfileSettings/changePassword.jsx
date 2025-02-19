import { useForm } from "react-hook-form";

export default function ChangePassword() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Submit password change: ", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">
      <div className="register-form__element">
        <label htmlFor="old-password">Stare hasło:</label>
        <input
          id="old-password"
          {...register("oldPassword", {
            required: true,
          })}
        />
      </div>
      <div className="register-form__element">
        <label htmlFor="new-password">Nowe Hasło:</label>
        <input
          id="new-password"
          {...register("newPassword", {
            required: true,
            pattern: {
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
            },
          })}
        />
      </div>
      <div className="register-form__element">
        <label htmlFor="repeat-new-password">Powtórz nowe Hasło:</label>
        <input
          id="repeat-new-password"
          {...register("repeatNewPassword", {
            required: true,
            validate: (val) => {
              if (watch("newPassword") != val) {
                return "Hasła nie pasują do siebie";
              }
            },
          })}
        />
        {errors.repeatNewPassword &&
          errors.repeatNewPassword.type === "required" && (
            <span className="error-message">To pole jest obowiązkowe</span>
          )}
        {errors.repeatNewPassword && errors.repeatNewPassword.message && (
          <span className="error-message">
            {errors.repeatNewPassword.message}
          </span>
        )}
      </div>
      <input type="submit" className="button" />
    </form>
  );
}
