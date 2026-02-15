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
    <div className={darkMode ? "dark" : ""} data-oid="xyh6.:9">
      <div
        className="min-h-screen bg-background text-foreground"
        data-oid="skz:g-r"
      >
        {!isAdminRoute && (
          <Navbar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            data-oid="sdprwqd"
          />
        )}

        <Routes data-oid="xc.s__7">
          <Route
            path="/"
            element={<HomePage data-oid="-622sh." />}
            data-oid="9.9etu-"
          />
          <Route
            path="/news/:slug"
            element={<ArticlePage data-oid="8-for8j" />}
            data-oid="4dsrxxy"
          />
          <Route
            path="/admin"
            element={<AdminDashboard data-oid="bqmzux_" />}
            data-oid="qy8tztx"
          />
          <Route
            path="/search"
            element={<SearchResultsPage data-oid="36u0zch" />}
            data-oid="twd38:t"
          />
          <Route
            path="/category/:slug"
            element={<CategoryPage data-oid="_wa9-x4" />}
            data-oid="dw7acy0"
          />
          <Route
            path="/tag/:tag"
            element={<TagPage data-oid="ndlbd:n" />}
            data-oid="ktpp89n"
          />
          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} data-oid="-gcmf.z" />}
            data-oid="8nusju2"
          />
          <Route
            path="/register"
            element={
              <RegisterPage onRegister={handleRegister} data-oid="gfx_yw7" />
            }
            data-oid="w31hns0"
          />

          <Route
            path="/preview"
            element={<PreviewPage data-oid="mmfbhsz" />}
            data-oid="yn6hcdv"
          />
        </Routes>

        {!isAdminRoute && <Footer data-oid="pet_sn9" />}
      </div>
    </div>
  );
}

export default App;
