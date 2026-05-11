import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";
import { useAuth } from "../../hooks/useAuth";
import Button from "./Button";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <header className="border-b border-white/10 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3">
        <Link to={ROUTES.HOME} className="text-xl font-bold text-white">
          PromptCraft AI
        </Link>
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link to={ROUTES.DASHBOARD} className="text-sm font-medium text-slate-200 hover:text-white">
                Dashboard
              </Link>
              <Link to={ROUTES.ANALYTICS} className="text-sm font-medium text-slate-200 hover:text-white">
                Analytics
              </Link>
              <Button onClick={logout} className="bg-slate-900 hover:bg-slate-800">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to={ROUTES.LOGIN} className="text-sm font-medium text-slate-200 hover:text-white">
                Login
              </Link>
              <Link to={ROUTES.SIGNUP}>
                <Button>Get Started</Button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
