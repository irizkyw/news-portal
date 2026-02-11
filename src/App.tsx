import React, { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HomePage } from "@/components/pages/HomePage";
import { ArticlePage } from "@/components/pages/ArticlePage";
import { AdminDashboard } from "@/components/pages/AdminDashboard";
import "../styles/globals.css";

type Page = "home" | "article" | "admin";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [currentSlug, setCurrentSlug] = useState("");

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  // Simple routing system
  const navigateTo = (page: Page, slug?: string) => {
    setCurrentPage(page);
    if (slug) {
      setCurrentSlug(slug);
      window.history.pushState({}, "", `/news/${slug}`);
    } else if (page === "admin") {
      window.history.pushState({}, "", "/admin");
    } else {
      window.history.pushState({}, "", "/");
    }
  };

  // Handle browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith("/admin")) {
        setCurrentPage("admin");
      } else if (path.startsWith("/news/")) {
        setCurrentPage("article");
        setCurrentSlug(path.split("/")[2] || "");
      } else {
        setCurrentPage("home");
      }
    };

    window.addEventListener("popstate", handlePopState);

    // Set initial route
    handlePopState();

    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  // Admin dashboard doesn't need navbar/footer
  if (currentPage === "admin") {
    return (
      <div className={darkMode ? "dark" : ""}>
        <AdminDashboard />
      </div>
    );
  }

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-background text-foreground">
        <Navbar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          onNavigate={navigateTo}
        />

        {currentPage === "home" && <HomePage onNavigate={navigateTo} />}
        {currentPage === "article" && (
          <ArticlePage slug={currentSlug} onNavigate={navigateTo} />
        )}

        <Footer />
      </div>
    </div>
  );
}

export default App;
