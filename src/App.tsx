import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "@/components/pages/HomePage";
import { ArticlePage } from "@/components/pages/ArticlePage";
import { AdminDashboard } from "@/components/pages/AdminDashboard";
import { SearchResultsPage } from "@/components/pages/SearchResultsPage";
import { CategoryPage } from "@/components/pages/CategoryPage";
import { TagPage } from "@/components/pages/TagPage";
import { LoginPage } from "@/components/pages/LoginPage";
import { RegisterPage } from "@/components/pages/RegisterPage";
import { PreviewPage } from "@/components/pages/PreviewPage";
import { ProfileSettingsPage } from "./components/pages/ProfileSettingsPage"; // Import ProfileSettingsPage
import { ErrorPage } from "./components/pages/ErrorPage"; // Import ErrorPage
import { ForgotPasswordPage } from "./components/pages/ForgotPasswordPage"; // Import ForgotPasswordPage
import { ProtectedRoute, AuthRedirect } from "./components/auth/AuthComponents"; // Import Auth Components
import "../styles/globals.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check for dark mode preference and auth token on mount
  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }

    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
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

  const handleLogin = (token: string) => { // Accept token as argument
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true);
    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/login");
  };

  // handleRegister is no longer needed in App.tsx as RegisterPage handles its own navigation
  // const handleRegister = () => {
  //   setIsLoggedIn(true);
  //   navigate("/");
  // };

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
            onLogout={handleLogout}
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
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <AdminDashboard data-oid="6dq6av6" />
              </ProtectedRoute>
            }
            data-oid="u7j5ng0"
          />

          {/* Protected Profile Settings Route */}
          <Route
            path="/dashboard/profile"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
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
              <AuthRedirect isLoggedIn={isLoggedIn}>
                <LoginPage onLogin={handleLogin} data-oid="8oquhlb" />
              </AuthRedirect>
            }
            data-oid="njhl3d4"
          />

          <Route
            path="/register"
            element={
              <AuthRedirect isLoggedIn={isLoggedIn}>
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
              <AuthRedirect isLoggedIn={isLoggedIn}>
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

export default App;
