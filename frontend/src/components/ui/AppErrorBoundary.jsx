import { Component } from "react";
import Button from "../common/Button";

const isDev = import.meta.env.DEV;

export default class AppErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    if (isDev) {
      console.error("[AppErrorBoundary]", error, info);
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.assign("/");
  };

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (!hasError) return children;

    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 px-6 py-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-300">Something went wrong</p>
        <h1 className="mt-3 text-2xl font-semibold text-white">We hit an unexpected error</h1>
        <p className="mt-2 max-w-md text-sm text-slate-400">
          Your work is likely safe. Try reloading the app. If this keeps happening, contact support with the time this
          occurred.
        </p>
        {isDev && error?.message ? (
          <pre className="mt-6 max-h-40 max-w-2xl overflow-auto rounded-lg border border-white/10 bg-black/40 p-3 text-left text-xs text-rose-200">
            {error.message}
          </pre>
        ) : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button type="button" onClick={() => window.location.reload()}>
            Reload page
          </Button>
          <Button type="button" variant="ghost" onClick={this.handleReset}>
            Go home
          </Button>
        </div>
      </div>
    );
  }
}
