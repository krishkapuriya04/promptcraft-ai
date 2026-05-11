import { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import AuthLayout from "../components/auth/AuthLayout";
import { ROUTES } from "../constants/routes";
import { useToast } from "../hooks/useToast";
import { authService } from "../services/authService";
import { getApiErrorMessage } from "../utils/apiError";
import { validateForgotPasswordForm } from "../utils/validation/authValidation";
import SEOHeadManager from "../components/seo/SEOHeadManager";

export default function ForgotPassword() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ email: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForgotPasswordForm(form);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await authService.forgotPassword(form);
      showToast({ type: "success", message: response.message });
    } catch (error) {
      showToast({ type: "error", message: getApiErrorMessage(error, "Unable to process request right now.") });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHeadManager
        title="Forgot password"
        description="Request a secure password reset for your PromptCraft AI account."
        path={ROUTES.FORGOT_PASSWORD}
      />
      <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we will send reset instructions."
      footerContent={
        <p>
          Remembered your password?{" "}
          <Link to={ROUTES.LOGIN} className="text-brand-200 transition hover:text-brand-100">
            Sign in
          </Link>
        </p>
      }
    >
      <AuthForm
        mode="forgotPassword"
        values={form}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel="Send Reset Link"
      />
    </AuthLayout>
    </>
  );
}
