import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ProtectedRoute from "../components/common/ProtectedRoute";
import PublicOnlyRoute from "../components/common/PublicOnlyRoute";
import { ROUTES } from "../constants/routes";
import { GlobalPageLoader, RouteTransitionWrapper } from "../components/ui";

const Home = lazy(() => import("../pages/Home"));
const Login = lazy(() => import("../pages/Login"));
const Signup = lazy(() => import("../pages/Signup"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Analytics = lazy(() => import("../pages/Analytics"));
const CreateProject = lazy(() => import("../pages/CreateProject"));
const ProjectPreview = lazy(() => import("../pages/ProjectPreview"));
const ProjectEditor = lazy(() => import("../pages/ProjectEditor"));

export default function AppRouter() {
  const location = useLocation();

  const withTransition = (element) => (
    <RouteTransitionWrapper>
      <Suspense fallback={<GlobalPageLoader />}>{element}</Suspense>
    </RouteTransitionWrapper>
  );

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path={ROUTES.HOME} element={withTransition(<Home />)} />
        <Route
          path={ROUTES.LOGIN}
          element={withTransition(
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          )}
        />
        <Route
          path={ROUTES.SIGNUP}
          element={withTransition(
            <PublicOnlyRoute>
              <Signup />
            </PublicOnlyRoute>
          )}
        />
        <Route
          path={ROUTES.FORGOT_PASSWORD}
          element={withTransition(
            <PublicOnlyRoute>
              <ForgotPassword />
            </PublicOnlyRoute>
          )}
        />

        <Route
          path={ROUTES.DASHBOARD}
          element={withTransition(
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          )}
        />
        <Route
          path={ROUTES.ANALYTICS}
          element={withTransition(
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          )}
        />
        <Route
          path={ROUTES.CREATE_PROJECT}
          element={withTransition(
            <ProtectedRoute>
              <CreateProject />
            </ProtectedRoute>
          )}
        />
        <Route
          path={ROUTES.PROJECT_PREVIEW}
          element={withTransition(
            <ProtectedRoute>
              <ProjectPreview />
            </ProtectedRoute>
          )}
        />
        <Route
          path={ROUTES.PROJECT_EDITOR}
          element={withTransition(
            <ProtectedRoute>
              <ProjectEditor />
            </ProtectedRoute>
          )}
        />

        <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
      </Routes>
    </AnimatePresence>
  );
}
