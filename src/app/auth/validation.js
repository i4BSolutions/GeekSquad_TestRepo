export const validateLoginForm = (formData) => {
  const errors = { email: "", password: "" };
  let isValid = true;

  // Email validation
  if (!formData.email) {
    errors.email = "Email is required.";
    isValid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Invalid email address.";
    isValid = false;
  }

  // Password validation
  if (!formData.password) {
    errors.password = "Password is required.";
    isValid = false;
  }

  return { isValid, errors };
};
