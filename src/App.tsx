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
    <div className={darkMode ? "dark" : ""} data-oid="l24ww34">
      <div
        className="min-h-screen bg-background text-foreground"
        data-oid="nvi_zh3"
      >
        {!isAdminRoute && (
          <Navbar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            data-oid="a3c7wdn"
          />
        )}

        <Routes data-oid="3yj98au">
          <Route
            path="/"
            element={<HomePage data-oid="p:66g0n" />}
            data-oid="cil-31k"
          />

          <Route
            path="/news/:slug"
            element={<ArticlePage data-oid="6iox5e3" />}
            data-oid="r656oz:"
          />

          <Route
            path="/admin"
            element={<AdminDashboard data-oid="2yr880z" />}
            data-oid="f.x642d"
          />

          <Route
            path="/search"
            element={<SearchResultsPage data-oid="b590dz0" />}
            data-oid="k3qjc7v"
          />

          <Route
            path="/category/:slug"
            element={<CategoryPage data-oid="_smr4bs" />}
            data-oid="5z5smvi"
          />

          <Route
            path="/tag/:tag"
            element={<TagPage data-oid="07458xh" />}
            data-oid="r:gzs__"
          />

          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} data-oid="kocsh7l" />}
            data-oid="70jwcxz"
          />

          <Route
            path="/register"
            element={
              <RegisterPage onRegister={handleRegister} data-oid="4kz0nyu" />
            }
            data-oid="9ogb86g"
          />

          <Route
            path="/preview"
            element={<PreviewPage data-oid="sm1_d5h" />}
            data-oid="fs2gd:b"
          />
        </Routes>

        {!isAdminRoute && <Footer data-oid="dz8iun2" />}
      </div>
    </div>
  );
}

export default App;
