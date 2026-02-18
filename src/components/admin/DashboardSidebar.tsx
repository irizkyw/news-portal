import React from "react";
import {
  BarChart3,
  FileText,
  Users,
  Settings,
  Home,
  PlusCircle,
  Eye,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bookmark, // Import Bookmark icon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "../auth/AuthContext"; // Import useAuth

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeItem: string;
  onItemClick: (item: string) => void;
}

const menuItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "articles", label: "Articles", icon: FileText },
  { id: "bookmarks", label: "Bookmarks", icon: Bookmark }, // Added Bookmarks
  { id: "users", label: "Users", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar({
  collapsed,
  onToggle,
  activeItem,
  onItemClick,
}: DashboardSidebarProps) {
  const { logout } = useAuth(); // Use useAuth to get logout function

  return (
    <div
      className={cn(
        "relative bg-card border-r transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 border-b"
      >
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <div
              className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center"
            >
              <span
                className="text-primary-foreground font-bold text-lg"
              >
                N
              </span>
            </div>
            <span className="font-bold text-xl">
              NewsFlow
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="h-8 w-8 p-0"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;

          return (
            <Button
              key={item.id}
              variant={isActive ? "secondary" : "ghost"}
              className={cn("w-full justify-start", collapsed && "px-2")}
              onClick={() => onItemClick(item.id)}
            >
              <Icon className="h-4 w-4" />
              {!collapsed && (
                <span className="ml-2">
                  {item.label}
                </span>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-16 left-4 right-4">
        <Button
          variant="outline"
          className={cn("w-full justify-start", collapsed && "px-2")}
          onClick={logout}
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && (
            <span className="ml-2">
              Logout
            </span>
          )}
        </Button>
      </div>
      
      {/* View Site Link */}
      <div className="absolute bottom-4 left-4 right-4">
        <Button
          variant="outline"
          className={cn("w-full justify-start", collapsed && "px-2")}
          onClick={() => window.open("/", "_blank")}
        >
          <Eye className="h-4 w-4" />
          {!collapsed && (
            <span className="ml-2">
              View Site
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
