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
          data-oid="3_1ibvx"
        >
          {category.name}
        </Link>
      ))}
    </>
  );

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      data-oid="i3t8ksj"
    >
      <div className="container mx-auto px-4" data-oid="1t9:l:l">
        <div
          className="flex h-16 items-center justify-between"
          data-oid="6oai8q2"
        >
          {/* Logo */}
          <div className="flex items-center space-x-4" data-oid="5f4l-in">
            <Link
              to="/"
              className="flex items-center space-x-2"
              data-oid="y30b-w9"
            >
              <div
                className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center"
                data-oid="ugjy.j_"
              >
                <span
                  className="text-primary-foreground font-bold text-lg"
                  data-oid="bge16vj"
                >
                  N
                </span>
              </div>
              <span className="font-bold text-xl" data-oid="1o9shtx">
                NewsFlow
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-6"
            data-oid="2e6gff6"
          >
            <NavLinks data-oid="u.gdsci" />
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4" data-oid="-ab0zv5">
            {/* Search */}
            <div className="relative hidden sm:block" data-oid=".4uj66-">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                data-oid="lhe_g0w"
              />

              <Input
                placeholder="Search news..."
                className="pl-10 w-64"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchSubmit}
                data-oid="2jqz80z"
              />
            </div>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="h-9 w-9 p-0"
              data-oid="s7ajh:b"
            >
              {darkMode ? (
                <Sun className="h-4 w-4" data-oid="6z1xtez" />
              ) : (
                <Moon className="h-4 w-4" data-oid="mfu.xqe" />
              )}
            </Button>

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu data-oid="6h-0hn:">
                <DropdownMenuTrigger asChild data-oid="zfqzspg">
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                    data-oid="kntzn75"
                  >
                    <Avatar className="h-9 w-9" data-oid="c6fj2e9">
                      <AvatarImage
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                        data-oid="c49ro-o"
                      />

                      <AvatarFallback data-oid="f6j:q87">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56"
                  align="end"
                  data-oid="iir5dvp"
                >
                  <DropdownMenuItem data-oid="ur-fhyg">
                    <User className="mr-2 h-4 w-4" data-oid="1:8cnu7" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator data-oid="aidnhwe" />
                  <DropdownMenuItem data-oid="nfd.g2j">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onLogout} data-oid="x6kmz51">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/login" data-oid="op4__y:">
                <Button variant="default" size="sm" data-oid="oy6osy5">
                  Login
                </Button>
              </Link>
            )}

            {/* Mobile Menu */}
            <Sheet data-oid="t.e2frl">
              <SheetTrigger asChild data-oid=".x.vf0_">
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden h-9 w-9 p-0"
                  data-oid="0xb6daf"
                >
                  <Menu className="h-4 w-4" data-oid="-qc-xrt" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80" data-oid="7xdr7da">
                <div
                  className="flex flex-col space-y-4 mt-6"
                  data-oid="fubwrzj"
                >
                  {/* Mobile Search */}
                  <div className="relative" data-oid="mwqzeqd">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                      data-oid="as:epgr"
                    />

                    <Input
                      placeholder="Search news..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onKeyDown={handleSearchSubmit}
                      data-oid="e9axhjp"
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-3" data-oid="j93i57z">
                    <NavLinks data-oid="w6md6sf" />
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
