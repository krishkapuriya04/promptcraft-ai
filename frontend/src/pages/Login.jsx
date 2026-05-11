import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthForm from "../components/auth/AuthForm";
import AuthLayout from "../components/auth/AuthLayout";
import { ROUTES } from "../constants/routes";
import { useAuth } from "../hooks/useAuth";
import { useToast } from "../hooks/useToast";
import { authService } from "../services/authService";
import { getApiErrorMessage } from "../utils/apiError";
import { validateLoginForm } from "../utils/validation/authValidation";
import SEOHeadManager from "../components/seo/SEOHeadManager";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const redirectPath = location.state?.from?.pathname || ROUTES.DASHBOARD;

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateLoginForm(form);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const session = await authService.login(form);
      if (!session) {
        showToast({ type: "error", message: "Unexpected response from server. Please try again." });
        return;
      }
      login(session);
      showToast({ type: "success", message: "Welcome back! Login successful." });
      navigate(redirectPath, { replace: true });
    } catch (error) {
      showToast({ type: "error", message: getApiErrorMessage(error, "Login failed. Please try again.") });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <SEOHeadManager
        title="Sign in"
        description="Secure sign-in to your PromptCraft AI workspace."
        path={ROUTES.LOGIN}
      />
      <AuthLayout
      title="Welcome back"
      subtitle="Sign in to continue building AI-powered websites with PromptCraft."
      footerContent={
        <p className="flex items-center justify-between gap-2">
          <Link to={ROUTES.FORGOT_PASSWORD} className="text-brand-200 transition hover:text-brand-100">
            Forgot password?
          </Link>
          <span>
            New here?{" "}
            <Link to={ROUTES.SIGNUP} className="text-brand-200 transition hover:text-brand-100">
              Create account
            </Link>
          </span>
        </p>
      }
    >
      <AuthForm
        mode="login"
        values={form}
        errors={errors}
        onChange={handleChange}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
        submitLabel="Sign In"
      />
    </AuthLayout>
    </>
  );
}
