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
          data-oid="699ljd3"
        >
          {category.name}
        </Link>
      ))}
    </>
  );

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      data-oid="y1-mxh5"
    >
      <div className="container mx-auto px-4" data-oid="v1ndgdl">
        <div
          className="flex h-16 items-center justify-between"
          data-oid="fma:qz2"
        >
          {/* Logo */}
          <div className="flex items-center space-x-4" data-oid="4184wn-">
            <Link
              to="/"
              className="flex items-center space-x-2"
              data-oid="u3mcwea"
            >
              <div
                className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center"
                data-oid="j3dav_d"
              >
                <span
                  className="text-primary-foreground font-bold text-lg"
                  data-oid="fplvr:u"
                >
                  N
                </span>
              </div>
              <span className="font-bold text-xl" data-oid="7iw50oy">
                NewsFlow
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-6"
            data-oid="zymfhl5"
          >
            <NavLinks data-oid="c1nasjh" />
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4" data-oid="1b1ppdx">
            {/* Search */}
            <div className="relative hidden sm:block" data-oid="vkks_be">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                data-oid="2l:s:08"
              />

              <Input
                placeholder="Search news..."
                className="pl-10 w-64"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchSubmit}
                data-oid="2-9jaof"
              />
            </div>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="h-9 w-9 p-0"
              data-oid="i3ch1dj"
            >
              {darkMode ? (
                <Sun className="h-4 w-4" data-oid=".fqd5l9" />
              ) : (
                <Moon className="h-4 w-4" data-oid="s9:u9o2" />
              )}
            </Button>

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu data-oid="4tbe6y0">
                <DropdownMenuTrigger asChild data-oid="hsijjps">
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                    data-oid="b5c5dxl"
                  >
                    <Avatar className="h-9 w-9" data-oid="ws5s5q2">
                      <AvatarImage
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                        data-oid="504ya8d"
                      />

                      <AvatarFallback data-oid="vtvqi-x">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56"
                  align="end"
                  data-oid="l:n6200"
                >
                  <DropdownMenuItem data-oid="dz-65jv">
                    <User className="mr-2 h-4 w-4" data-oid="gg0bxxy" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator data-oid="gfrtcn1" />
                  <DropdownMenuItem data-oid="ay.:_wj">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout} data-oid="p76b6-g">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" data-oid="zctbcj-">
                <Button variant="default" size="sm" data-oid="lgh5b_d">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet data-oid="0foe45a">
              <SheetTrigger asChild data-oid="_hv0vke">
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden h-9 w-9 p-0"
                  data-oid="4lgqszs"
                >
                  <Menu className="h-4 w-4" data-oid="sfjpddb" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80" data-oid="yz5wla3">
                <div
                  className="flex flex-col space-y-4 mt-6"
                  data-oid="k114vbr"
                >
                  {/* Mobile Search */}
                  <div className="relative" data-oid="r4v-82f">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                      data-oid=":9qwalj"
                    />

                    <Input
                      placeholder="Search news..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onKeyDown={handleSearchSubmit}
                      data-oid="q:qxaj:"
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-3" data-oid="lnq6en3">
                    <NavLinks data-oid="0wviiab" />
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
