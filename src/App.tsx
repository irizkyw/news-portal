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
import "../styles/globals.css";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate("/");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    navigate("/");
  };

  const isAdminRoute =
    location.pathname.startsWith("/admin") ||
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

          <Route
            path="/admin"
            element={<AdminDashboard data-oid="6dq6av6" />}
            data-oid="u7j5ng0"
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

          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} data-oid="8oquhlb" />}
            data-oid="njhl3d4"
          />

          <Route
            path="/register"
            element={
              <RegisterPage onRegister={handleRegister} data-oid="xleb_5j" />
            }
            data-oid="qfsks6."
          />

          <Route
            path="/preview"
            element={<PreviewPage data-oid="g8hmdnt" />}
            data-oid="1lw0gmc"
          />
        </Routes>

        {!isAdminRoute && <Footer data-oid="kav0wws" />}
      </div>
    </div>
  );
}

export default App;
