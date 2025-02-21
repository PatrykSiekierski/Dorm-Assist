export const emailConditions = {
  required: true,
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]{2,}$/i,
  },
};

export const usernameConditions = {
  required: true,
  minLength: 6,
};

export const passwordConditions = {
  required: true,
  maxLength: 20,
  minLength: 8,
  validate: (value) => {
    const hasNumber = /\d/;
    const hasUpperCase = /[A-Z]/;
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/;
    return (
      (hasNumber.test(value) &&
        hasUpperCase.test(value) &&
        hasSymbol.test(value)) ||
      "Hasło musi zawierać przynajmniej jedną cyfre, jedną dużą literę i jeden symbol."
    );
  },
};

export function repeatPasswordConditions(watch) {
  return {
    required: true,
    validate: (val) => {
      if (watch("password") != val) {
        return "Hasła nie są identyczne";
      }
    },
  };
}
