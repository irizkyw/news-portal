import React, { useState } from "react";
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
import { categories } from "@/data/mockData";

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
  const navigate = useNavigate();

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
          data-oid="97yl.71"
        >
          {category.name}
        </Link>
      ))}
    </>
  );

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      data-oid="88nj:gu"
    >
      <div className="container mx-auto px-4" data-oid="8onz.4k">
        <div
          className="flex h-16 items-center justify-between"
          data-oid="d9jfmoa"
        >
          {/* Logo */}
          <div className="flex items-center space-x-4" data-oid="ih-p7ue">
            <Link
              to="/"
              className="flex items-center space-x-2"
              data-oid="m:w1ahm"
            >
              <div
                className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center"
                data-oid="ikm-uq0"
              >
                <span
                  className="text-primary-foreground font-bold text-lg"
                  data-oid="6:2l8eb"
                >
                  N
                </span>
              </div>
              <span className="font-bold text-xl" data-oid="8_f_sfz">
                NewsFlow
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-6"
            data-oid="zy0erwl"
          >
            <NavLinks data-oid=".h6-wgx" />
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4" data-oid="0yqxpp.">
            {/* Search */}
            <div className="relative hidden sm:block" data-oid="yvvf5r4">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                data-oid="6480pqb"
              />

              <Input
                placeholder="Search news..."
                className="pl-10 w-64"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchSubmit}
                data-oid="sz0kola"
              />
            </div>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="h-9 w-9 p-0"
              data-oid="7q1rwdt"
            >
              {darkMode ? (
                <Sun className="h-4 w-4" data-oid=".ra1osu" />
              ) : (
                <Moon className="h-4 w-4" data-oid="umw9fy3" />
              )}
            </Button>

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu data-oid="pju2ypt">
                <DropdownMenuTrigger asChild data-oid="u-j05uo">
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                    data-oid="e5auo1o"
                  >
                    <Avatar className="h-9 w-9" data-oid="o3noicn">
                      <AvatarImage
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                        data-oid="5-e:rn0"
                      />

                      <AvatarFallback data-oid="8g0z-bd">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56"
                  align="end"
                  data-oid="n_grz8k"
                >
                  <DropdownMenuItem data-oid="i68yz93">
                    <User className="mr-2 h-4 w-4" data-oid="eg.s_85" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator data-oid="maiy8gh" />
                  <DropdownMenuItem data-oid="syd9:24">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout} data-oid="5ui78z6">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" data-oid=":-t9t5f">
                <Button variant="default" size="sm" data-oid="_1-hpo4">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet data-oid="bix-3nc">
              <SheetTrigger asChild data-oid="xzr1n.1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden h-9 w-9 p-0"
                  data-oid="joyhvsy"
                >
                  <Menu className="h-4 w-4" data-oid="vf0j6sy" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80" data-oid="p.8_s8f">
                <div
                  className="flex flex-col space-y-4 mt-6"
                  data-oid="rrq87qe"
                >
                  {/* Mobile Search */}
                  <div className="relative" data-oid="4cm37kj">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                      data-oid="iei-c:k"
                    />

                    <Input
                      placeholder="Search news..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onKeyDown={handleSearchSubmit}
                      data-oid="09t8j7m"
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-3" data-oid="k8_3::t">
                    <NavLinks data-oid="iy7sc_j" />
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
