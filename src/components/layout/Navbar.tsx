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
          data-oid="4n6n2.r"
        >
          {category.name}
        </Link>
      ))}
    </>
  );

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      data-oid="::dh20t"
    >
      <div className="container mx-auto px-4" data-oid="u-vjcgp">
        <div
          className="flex h-16 items-center justify-between"
          data-oid="2j4el5g"
        >
          {/* Logo */}
          <div className="flex items-center space-x-4" data-oid="_zql_.8">
            <Link
              to="/"
              className="flex items-center space-x-2"
              data-oid="97hq9hf"
            >
              <div
                className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center"
                data-oid="8we.mdu"
              >
                <span
                  className="text-primary-foreground font-bold text-lg"
                  data-oid="el2igyw"
                >
                  N
                </span>
              </div>
              <span className="font-bold text-xl" data-oid=".848:aj">
                NewsFlow
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-6"
            data-oid="ujufpel"
          >
            <NavLinks data-oid="jxky8.z" />
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4" data-oid="4hbicmn">
            {/* Search */}
            <div className="relative hidden sm:block" data-oid="d5ebq9-">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                data-oid="suckm00"
              />

              <Input
                placeholder="Search news..."
                className="pl-10 w-64"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchSubmit}
                data-oid="r_mvmmr"
              />
            </div>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="h-9 w-9 p-0"
              data-oid="t8vfdkf"
            >
              {darkMode ? (
                <Sun className="h-4 w-4" data-oid="ddgc9ot" />
              ) : (
                <Moon className="h-4 w-4" data-oid=":ci3gjg" />
              )}
            </Button>

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu data-oid="0foos6n">
                <DropdownMenuTrigger asChild data-oid="df.o.vw">
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                    data-oid="jw0rsp3"
                  >
                    <Avatar className="h-9 w-9" data-oid="0_u5e32">
                      <AvatarImage
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                        data-oid=":_8:cf8"
                      />

                      <AvatarFallback data-oid="zfjs-js">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56"
                  align="end"
                  data-oid="38agt12"
                >
                  <DropdownMenuItem data-oid="hppji8:">
                    <User className="mr-2 h-4 w-4" data-oid="nx3gy8d" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator data-oid=":4.kv1s" />
                  <DropdownMenuItem data-oid="3oh1g26">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout} data-oid="6fhksl6">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" data-oid="l:g5--6">
                <Button variant="default" size="sm" data-oid="gc13vwj">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet data-oid="g_o5a7z">
              <SheetTrigger asChild data-oid="r-qe69a">
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden h-9 w-9 p-0"
                  data-oid="1rvlhi3"
                >
                  <Menu className="h-4 w-4" data-oid="3heq1mz" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80" data-oid="v5rbdu6">
                <div
                  className="flex flex-col space-y-4 mt-6"
                  data-oid="ddkkx28"
                >
                  {/* Mobile Search */}
                  <div className="relative" data-oid="q-jyvb_">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                      data-oid="e:teeif"
                    />

                    <Input
                      placeholder="Search news..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onKeyDown={handleSearchSubmit}
                      data-oid="jr38t:7"
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-3" data-oid="pgl8s4h">
                    <NavLinks data-oid="_.e692u" />
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
