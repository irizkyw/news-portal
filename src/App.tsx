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
    <div className={darkMode ? "dark" : ""} data-oid="s82jr.t">
      <div
        className="min-h-screen bg-background text-foreground"
        data-oid="xjct47-"
      >
        {!isAdminRoute && (
          <Navbar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            data-oid="8t38_yu"
          />
        )}

        <Routes data-oid="z9xt4zw">
          <Route
            path="/"
            element={<HomePage data-oid="1mmzdyn" />}
            data-oid="rbod5tk"
          />

          <Route
            path="/news/:slug"
            element={<ArticlePage data-oid="rxj7e6d" />}
            data-oid="lhhrnmc"
          />

          <Route
            path="/admin"
            element={<AdminDashboard data-oid="bn4fqy_" />}
            data-oid="q_rd70d"
          />

          <Route
            path="/search"
            element={<SearchResultsPage data-oid="nnqyily" />}
            data-oid="8sus-19"
          />

          <Route
            path="/category/:slug"
            element={<CategoryPage data-oid="fy6sdb3" />}
            data-oid=":dt0lop"
          />

          <Route
            path="/tag/:tag"
            element={<TagPage data-oid="cyi_ov-" />}
            data-oid="t-25r46"
          />

          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} data-oid="cp468fs" />}
            data-oid="1io1x7m"
          />

          <Route
            path="/register"
            element={
              <RegisterPage onRegister={handleRegister} data-oid="aqmrhdq" />
            }
            data-oid="bzuk35m"
          />

          <Route
            path="/preview"
            element={<PreviewPage data-oid="zf_1gjl" />}
            data-oid="44uz9-8"
          />
        </Routes>

        {!isAdminRoute && <Footer data-oid="096ie4f" />}
      </div>
    </div>
  );
}

export default App;
