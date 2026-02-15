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
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        {!isAdminRoute && (
          <Navbar
            darkMode={darkMode}
            toggleDarkMode={toggleDarkMode}
            isLoggedIn={isLoggedIn}
            onLogout={handleLogout}
          />
        )}

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news/:slug" element={<ArticlePage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path="/category/:slug" element={<CategoryPage />} />
          <Route path="/tag/:tag" element={<TagPage />} />
          <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
          <Route
            path="/register"
            element={<RegisterPage onRegister={handleRegister} />}
          />
          <Route path="/preview" element={<PreviewPage />} />
        </Routes>

        {!isAdminRoute && <Footer />}
      </div>
    </div>
  );
}

export default App;
