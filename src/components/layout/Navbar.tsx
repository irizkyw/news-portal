import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Search, Menu, Moon, Sun, User } from "lucide-react";
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

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  isLoggedIn: boolean;
  onLogout: () => void;
}

export function Navbar({
  darkMode,
  toggleDarkMode,
  isLoggedIn,
  onLogout,
}: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();

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
          data-oid="_efwyv2"
        >
          {category.name}
        </Link>
      ))}
    </>
  );

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      data-oid="_git10a"
    >
      <div className="container mx-auto px-4" data-oid="049ilbj">
        <div
          className="flex h-16 items-center justify-between"
          data-oid="v0qhdxo"
        >
          {/* Logo */}
          <div className="flex items-center space-x-4" data-oid="nbgrkaa">
            <Link
              to="/"
              className="flex items-center space-x-2"
              data-oid="22ndhx0"
            >
              <div
                className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center"
                data-oid="cwjzd1c"
              >
                <span
                  className="text-primary-foreground font-bold text-lg"
                  data-oid="nk7y3of"
                >
                  N
                </span>
              </div>
              <span className="font-bold text-xl" data-oid="zn.-v2o">
                NewsFlow
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-6"
            data-oid="2k0:4ic"
          >
            <NavLinks data-oid="sesgl4n" />
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4" data-oid="s:9-bll">
            {/* Search */}
            <div className="relative hidden sm:block" data-oid="nn6s3pz">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                data-oid=".2tfwn5"
              />

              <Input
                placeholder="Search news..."
                className="pl-10 w-64"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchSubmit}
                data-oid="eah7dqp"
              />
            </div>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="h-9 w-9 p-0"
              data-oid="8y0m3nm"
            >
              {darkMode ? (
                <Sun className="h-4 w-4" data-oid="32w_jug" />
              ) : (
                <Moon className="h-4 w-4" data-oid="j-m-9oi" />
              )}
            </Button>

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu data-oid="msmpzi5">
                <DropdownMenuTrigger asChild data-oid="n2mopwk">
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                    data-oid="i-omjot"
                  >
                    <Avatar className="h-9 w-9" data-oid="fs6ff83">
                      <AvatarImage
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                        data-oid="s_0kcep"
                      />

                      <AvatarFallback data-oid="ebxacza">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56"
                  align="end"
                  data-oid="p4gzon_"
                >
                  <DropdownMenuItem data-oid="q:wku3-">
                    <User className="mr-2 h-4 w-4" data-oid="w-mrwft" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator data-oid="mzuizge" />
                  <DropdownMenuItem data-oid="toi:qbq">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout} data-oid="wmur5a5">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" data-oid="hy6g3:z">
                <Button variant="default" size="sm" data-oid="r1vjdlv">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet data-oid="o5c9sow">
              <SheetTrigger asChild data-oid="i:7iyiy">
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden h-9 w-9 p-0"
                  data-oid="vls146k"
                >
                  <Menu className="h-4 w-4" data-oid="_zoco2c" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80" data-oid="2yiv4km">
                <div
                  className="flex flex-col space-y-4 mt-6"
                  data-oid="gho_5w-"
                >
                  {/* Mobile Search */}
                  <div className="relative" data-oid="emoof17">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                      data-oid="ytj7egk"
                    />

                    <Input
                      placeholder="Search news..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onKeyDown={handleSearchSubmit}
                      data-oid="ra7zt39"
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-3" data-oid="yxfsh2r">
                    <NavLinks data-oid="tynoy76" />
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
