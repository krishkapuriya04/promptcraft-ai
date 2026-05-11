const variantClasses = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-500 focus-visible:ring-brand-400/50 shadow-lg shadow-brand-900/20",
  secondary:
    "bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white/30 border border-white/20",
  ghost:
    "bg-transparent text-slate-200 hover:bg-white/10 focus-visible:ring-white/20 border border-transparent",
};

const sizeClasses = {
  sm: "px-3 py-2 text-sm",
  md: "px-4 py-2.5 text-sm",
  lg: "px-5 py-3 text-base",
};

export default function Button({
  children,
  type = "button",
  onClick,
  className = "",
  disabled = false,
  isLoading = false,
  variant = "primary",
  size = "md",
}) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`inline-flex items-center justify-center gap-2 rounded-xl font-semibold transition duration-200 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {isLoading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}
