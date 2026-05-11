import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import AuthLayout from "../components/auth/AuthLayout";
import { ROUTES } from "../constants/routes";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { authService } from "../services/authService";
import { getApiErrorMessage } from "../utils/apiError";
import { validateSignupForm } from "../utils/validation/authValidation";
import SEOHeadManager from "../components/seo/SEOHeadManager";

export default function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateSignupForm(form);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const session = await authService.signup(form);
      if (!session) {
        showToast({ type: "error", message: "Unexpected response from server. Please try again." });
        return;
      }
      login(session);
      showToast({ type: "success", message: "Account created successfully." });
      navigate(ROUTES.DASHBOARD, { replace: true });
    } catch (error) {
      showToast({ type: "error", message: getApiErrorMessage(error, "Signup failed. Please try again.") });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHeadManager title="Create account" description="Create a PromptCraft AI account to start generating websites." path={ROUTES.SIGNUP} />
      <AuthLayout
      title="Create your account"
      subtitle="Start building premium AI websites with a modern workflow."
      footerContent={
        <p>
          Already have an account?{" "}
          <Link to={ROUTES.LOGIN} className="text-brand-200 transition hover:text-brand-100">
            Sign in
          </Link>
        </p>
      }
    >
      <AuthForm
        mode="signup"
        values={form}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel="Create Account"
      />
    </AuthLayout>
    </>
  );
}
