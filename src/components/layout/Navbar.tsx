import React, { useState } from "react";
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
}

export function Navbar({ darkMode, toggleDarkMode }: NavbarProps) {
  const [isLoggedIn] = useState(false); // Mock login state

  const NavLinks = () => (
    <>
      {categories.slice(0, 4).map((category) => (
        <a
          key={category.id}
          href={`/category/${category.slug}`}
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          data-oid="o0wqe0m"
        >
          {category.name}
        </a>
      ))}
    </>
  );

  return (
    <header
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      data-oid="fs7u._7"
    >
      <div className="container mx-auto px-4" data-oid="26zrvj4">
        <div
          className="flex h-16 items-center justify-between"
          data-oid="rx06me3"
        >
          {/* Logo */}
          <div className="flex items-center space-x-4" data-oid="oiqmv4n">
            <a
              href="/"
              className="flex items-center space-x-2"
              data-oid="ta3yb3y"
            >
              <div
                className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center"
                data-oid="wiqdw1x"
              >
                <span
                  className="text-primary-foreground font-bold text-lg"
                  data-oid="zq7ds-_"
                >
                  N
                </span>
              </div>
              <span className="font-bold text-xl" data-oid="0k:nv3e">
                NewsFlow
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav
            className="hidden md:flex items-center space-x-6"
            data-oid="22cv28f"
          >
            <NavLinks data-oid="5500g43" />
          </nav>

          {/* Search and Actions */}
          <div className="flex items-center space-x-4" data-oid="st6x7y6">
            {/* Search */}
            <div className="relative hidden sm:block" data-oid="wkjbqys">
              <Search
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                data-oid="l_uqmnq"
              />

              <Input
                placeholder="Search news..."
                className="pl-10 w-64"
                data-oid="ti-whm-"
              />
            </div>

            {/* Dark Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="h-9 w-9 p-0"
              data-oid="8yw7e:a"
            >
              {darkMode ? (
                <Sun className="h-4 w-4" data-oid="2m_ma6e" />
              ) : (
                <Moon className="h-4 w-4" data-oid="wdxrh92" />
              )}
            </Button>

            {/* User Menu */}
            {isLoggedIn ? (
              <DropdownMenu data-oid="1qq6-5p">
                <DropdownMenuTrigger asChild data-oid="kdgby7o">
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                    data-oid="edj08ep"
                  >
                    <Avatar className="h-9 w-9" data-oid="l19q64m">
                      <AvatarImage
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                        data-oid=".c_:v18"
                      />

                      <AvatarFallback data-oid="ab5-mdw">JD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56"
                  align="end"
                  data-oid="pxyra:p"
                >
                  <DropdownMenuItem data-oid="p7qai:u">
                    <User className="mr-2 h-4 w-4" data-oid="2fiblq6" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator data-oid="s_wmvu4" />
                  <DropdownMenuItem data-oid="0xshbg5">
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuItem data-oid="9rwfanf">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button variant="default" size="sm" data-oid="a7opu09">
                Login
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet data-oid="eyv1a:w">
              <SheetTrigger asChild data-oid=":ws4zmr">
                <Button
                  variant="ghost"
                  size="sm"
                  className="md:hidden h-9 w-9 p-0"
                  data-oid="-k4r2tx"
                >
                  <Menu className="h-4 w-4" data-oid="ljyoyl6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80" data-oid="vc7-m6f">
                <div
                  className="flex flex-col space-y-4 mt-6"
                  data-oid="sktcrjx"
                >
                  {/* Mobile Search */}
                  <div className="relative" data-oid="_fmsvxe">
                    <Search
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
                      data-oid="s7au5cw"
                    />

                    <Input
                      placeholder="Search news..."
                      className="pl-10"
                      data-oid="4d88.ye"
                    />
                  </div>

                  {/* Mobile Navigation */}
                  <nav className="flex flex-col space-y-3" data-oid="6oo5-9b">
                    <NavLinks data-oid="m5.-d8-" />
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
