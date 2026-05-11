const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSignupForm(values) {
  const errors = {};
  const name = values.name?.trim() || "";
  if (!name) errors.name = "Name is required.";
  else if (name.length < 2) errors.name = "Name must be at least 2 characters.";
  if (!values.email?.trim()) errors.email = "Email is required.";
  else if (!EMAIL_REGEX.test(values.email)) errors.email = "Enter a valid email.";

  if (!values.password) {
    errors.password = "Password is required.";
  } else {
    if (values.password.length < 8) {
      errors.password = "Password must be at least 8 characters.";
    } else if (!/[A-Z]/.test(values.password) || !/[a-z]/.test(values.password) || !/\d/.test(values.password)) {
      errors.password = "Use uppercase, lowercase, and a number.";
    }
  }
  return errors;
}

export function validateLoginForm(values) {
  const errors = {};
  if (!values.email?.trim()) errors.email = "Email is required.";
  else if (!EMAIL_REGEX.test(values.email)) errors.email = "Enter a valid email.";
  if (!values.password) errors.password = "Password is required.";
  return errors;
}

export function validateForgotPasswordForm(values) {
  const errors = {};
  if (!values.email?.trim()) errors.email = "Email is required.";
  else if (!EMAIL_REGEX.test(values.email)) errors.email = "Enter a valid email.";
  return errors;
}
