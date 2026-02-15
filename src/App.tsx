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
    <div className={darkMode ? "dark" : ""} data-oid="pbdhp2t">
      <div
        className="min-h-screen bg-background text-foreground"
        data-oid="y37jzqz"
      >
        {!isAdminRoute && (
          <Navbar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
            data-oid="y:qryq0"
          />
        )}

        <Routes data-oid="32a4vxx">
          <Route
            path="/"
            element={<HomePage data-oid=".5.4umz" />}
            data-oid="83plrr6"
          />

          <Route
            path="/news/:slug"
            element={<ArticlePage data-oid="ykkm5-." />}
            data-oid="yarktxd"
          />

          <Route
            path="/admin"
            element={<AdminDashboard data-oid="o30n3gv" />}
            data-oid="5wnc.0p"
          />

          <Route
            path="/search"
            element={<SearchResultsPage data-oid="gn3_hvm" />}
            data-oid="wozhsak"
          />

          <Route
            path="/category/:slug"
            element={<CategoryPage data-oid="choc1uz" />}
            data-oid="ko9zcqg"
          />

          <Route
            path="/tag/:tag"
            element={<TagPage data-oid="1nayuat" />}
            data-oid="xbech7-"
          />

          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} data-oid="4mcq:3_" />}
            data-oid="np7w0-o"
          />

          <Route
            path="/register"
            element={
              <RegisterPage onRegister={handleRegister} data-oid="xlg2mkb" />
            }
            data-oid="vgnkv:7"
          />

          <Route
            path="/preview"
            element={<PreviewPage data-oid="yss9kli" />}
            data-oid="kapywx3"
          />
        </Routes>

        {!isAdminRoute && <Footer data-oid="v3l21yz" />}
      </div>
    </div>
  );
}

export default App;
