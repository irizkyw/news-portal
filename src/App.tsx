import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "./components/layout/Navbar";
import { Footer } from "./components/layout/Footer";
import { HomePage } from "./components/pages/HomePage";
import { ArticlePage } from "./components/pages/ArticlePage";
import { AdminDashboard } from "./components/pages/AdminDashboard";
import { SearchResultsPage } from "./components/pages/SearchResultsPage";
import { CategoryPage } from "./components/pages/CategoryPage";
import { TagPage } from "./components/pages/TagPage";
import { LoginPage } from "./components/pages/LoginPage";
import { RegisterPage } from "./components/pages/RegisterPage";
import { PreviewPage } from "./components/pages/PreviewPage";
import { ProfileSettingsPage } from "./components/pages/ProfileSettingsPage"; // Import ProfileSettingsPage
import { ErrorPage } from "./components/pages/ErrorPage"; // Import ErrorPage
import { ForgotPasswordPage } from "./components/pages/ForgotPasswordPage"; // Import ForgotPasswordPage
import { ProtectedRoute, AuthRedirect } from "./components/auth/AuthComponents"; // Import Auth Components
import { AuthContextProvider, useAuth } from "./components/auth/AuthContext"; // Import AuthContext
import "../styles/globals.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isLoggedIn, login, logout } = useAuth(); // Use AuthContext

  // Check for dark mode preference on mount
  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  };

  const isAdminRoute =
    location.pathname.startsWith("/dashboard") ||
    location.pathname.startsWith("/preview");

  return (
    <div className={darkMode ? "dark" : ""} data-oid="soee9rz">
      <div
        className="min-h-screen bg-background text-foreground"
        data-oid="qb05cro"
      >
        {!isAdminRoute && (
          <Navbar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            isLoggedIn={isLoggedIn}
            onLogout={logout}
            data-oid=":agavcx"
          />
        )}

        <Routes data-oid="dx0685-">
          <Route
            path="/"
            element={<HomePage data-oid="e958:s7" />}
            data-oid=":80nn._"
          />

          <Route
            path="/news/:slug"
            element={<ArticlePage data-oid="q7aa:sy" />}
            data-oid="7-lstiq"
          />

          {/* Protected Dashboard Route */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedRoles={["admin", "editor"]}>
                <AdminDashboard data-oid="6dq6av6" />
              </ProtectedRoute>
            }
            data-oid="u7j5ng0"
          />

          {/* Protected Profile Settings Route */}
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute allowedRoles={["admin", "editor", "user"]}>
                <ProfileSettingsPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/search"
            element={<SearchResultsPage data-oid="-nuniwi" />}
            data-oid="qla::9d"
          />

          <Route
            path="/category/:slug"
            element={<CategoryPage data-oid="doicpa6" />}
            data-oid="jdc_6wi"
          />

          <Route
            path="/tag/:tag"
            element={<TagPage data-oid="27azxn8" />}
            data-oid="pm46xlw"
          />

          {/* Redirect if already logged in */}
          <Route
            path="/login"
            element={
              <AuthRedirect>
                <LoginPage onLogin={login} data-oid="8oquhlb" />
              </AuthRedirect>
            }
            data-oid="njhl3d4"
          />

          <Route
            path="/register"
            element={
              <AuthRedirect>
                <RegisterPage data-oid="xleb_5j" />
              </AuthRedirect>
            }
            data-oid="qfsks6."
          />

          <Route
            path="/preview"
            element={<PreviewPage data-oid="g8hmdnt" />}
            data-oid="1lw0gmc"
          />

          {/* Forgot Password Route */}
          <Route
            path="/forgot-password"
            element={
              <AuthRedirect>
                <ForgotPasswordPage />
              </AuthRedirect>
            }
          />

          {/* Error Routes */}
          <Route path="/error/:statusCode" element={<ErrorPage />} />
          <Route path="*" element={<ErrorPage />} /> {/* Catch-all 404 */}
        </Routes>

        {!isAdminRoute && <Footer data-oid="kav0wws" />}
      </div>
    </div>
  );
}

// Export the App component wrapped with AuthContextProvider
export default function WrappedApp() {
  return (
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  );
}
