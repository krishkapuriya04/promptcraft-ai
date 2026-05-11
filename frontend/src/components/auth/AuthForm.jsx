import { useState } from "react";
import Button from "../common/Button";

function AuthInput({
  id,
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  rightSlot,
  autoComplete,
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-slate-200">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`h-11 w-full rounded-xl border bg-slate-950/60 px-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-brand-300 ${
            error ? "border-rose-400/70" : "border-white/15"
          }`}
        />
        {rightSlot ? <div className="absolute inset-y-0 right-2 flex items-center">{rightSlot}</div> : null}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-rose-300">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default function AuthForm({
  mode,
  values,
  errors,
  onChange,
  onSubmit,
  isSubmitting,
  submitLabel,
  secondaryAction,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-4">
      {mode === "signup" ? (
        <AuthInput
          id="name"
          label="Full name"
          value={values.name || ""}
          onChange={(event) => onChange("name", event.target.value)}
          placeholder="Avery Jordan"
          autoComplete="name"
          error={errors.name}
        />
      ) : null}

      <AuthInput
        id="email"
        label="Email"
        type="email"
        value={values.email || ""}
        onChange={(event) => onChange("email", event.target.value)}
        placeholder="you@company.com"
        autoComplete="email"
        error={errors.email}
      />

      {mode !== "forgotPassword" ? (
        <AuthInput
          id="password"
          label="Password"
          type={showPassword ? "text" : "password"}
          value={values.password || ""}
          onChange={(event) => onChange("password", event.target.value)}
          placeholder="Enter a secure password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          error={errors.password}
          rightSlot={
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="rounded-md px-2 py-1 text-xs text-slate-300 transition hover:bg-white/10"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          }
        />
      ) : null}

      <Button type="submit" isLoading={isSubmitting} disabled={isSubmitting} className="h-11 w-full" size="lg">
        {submitLabel}
      </Button>

      {secondaryAction}
    </form>
  );
}
