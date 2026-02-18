import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Search,
  Menu,
  Moon,
  Sun,
  User,
  LogOut,
  LayoutDashboard,
  Settings,
} from "lucide-react"; // Import Settings icon
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getCategories } from "@/services/api";
import type { Category } from "@/types";
import { useAuth } from "../auth/AuthContext"; // Import useAuth

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  const { isLoggedIn, logout, user: currentUser } = useAuth(); // Use useAuth directly

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  const NavLinks = () => (
    <>
      {categories.slice(0, 4).map((category) => (
        <Link
          key={category.id}
          to={`/category/${category.slug}`}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          {category.name}
        </Link>
      ))}
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">
                  N
                </span>
              </div>
              <span className="font-bold text-xl">NewsFlow</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLinks />
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder="Search news..."
                className="pl-10 w-64"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchSubmit}
              />
            </div>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="h-9 w-9 p-0"
            >
              {darkMode ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarImage
                        src={
                          currentUser?.avatar ||
                          `https://ui-avatars.com/api/?name=${currentUser?.name || "U"}&background=random`
                        }
                      />

                      <AvatarFallback>
                        {currentUser?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  {(currentUser?.role === "admin" ||
                    currentUser?.role === "editor") && (
                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem
                    onClick={() =>
                      navigate("/dashboard", {
                        state: { activeItem: "settings" },
                      })
                    }
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login">
                <Button variant="default" size="sm">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden h-9 w-9 p-0"
                >
                  <Menu className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-4 mt-6">
                  {/* Mobile Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />

                    <Input
                      placeholder="Search news..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onKeyDown={handleSearchSubmit}
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-3">
                    <NavLinks />
                    {isLoggedIn && (
                      <>
                        {(currentUser?.role === "admin" ||
                          currentUser?.role === "editor") && (
                          <Link
                            to="/dashboard"
                            className="text-sm font-medium hover:text-foreground transition-colors"
                          >
                            Dashboard
                          </Link>
                        )}
                        <Link
                          to="/dashboard"
                          state={{ activeItem: "settings" }}
                          className="text-sm font-medium hover:text-foreground transition-colors"
                        >
                          Profile
                        </Link>
                        <Button
                          variant="ghost"
                          className="w-full justify-start text-sm font-medium hover:text-foreground transition-colors p-0"
                          onClick={logout}
                        >
                          Logout
                        </Button>
                      </>
                    )}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
