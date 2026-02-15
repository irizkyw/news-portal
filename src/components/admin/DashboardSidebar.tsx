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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface DashboardSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeItem: string;
  onItemClick: (item: string) => void;
}

const menuItems = [
  { id: "overview", label: "Overview", icon: Home },
  { id: "articles", label: "Articles", icon: FileText },
  { id: "create", label: "Create Post", icon: PlusCircle },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "users", label: "Users", icon: Users },
  { id: "settings", label: "Settings", icon: Settings },
];

export function DashboardSidebar({
  collapsed,
  onToggle,
  activeItem,
  onItemClick,
}: DashboardSidebarProps) {
  return (
    <div
      className={cn(
        "relative bg-card border-r transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
      data-oid="r2nqfri"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 border-b"
        data-oid="p4rqtnr"
      >
        {!collapsed && (
          <div className="flex items-center space-x-2" data-oid="hkhj8sw">
            <div
              className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center"
              data-oid="kq:75to"
            >
              <span
                className="text-primary-foreground font-bold text-lg"
                data-oid="7ydo_6b"
              >
                N
              </span>
            </div>
            <span className="font-bold text-xl" data-oid="36_rsx2">
              NewsFlow
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="h-8 w-8 p-0"
          data-oid="axe5x2z"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" data-oid="mqhd4co" />
          ) : (
            <ChevronLeft className="h-4 w-4" data-oid="ycvrn4x" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2" data-oid="84r_2m3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeItem === item.id ? "secondary" : "ghost"}
              className={cn("w-full justify-start", collapsed && "px-2")}
              onClick={() => onItemClick(item.id)}
              data-oid="m5ehdop"
            >
              <Icon className="h-4 w-4" data-oid="5dly.n2" />
              {!collapsed && (
                <span className="ml-2" data-oid="vbrg5m-">
                  {item.label}
                </span>
              )}
            </Button>
          );
        })}
      </nav>

      {/* View Site Link */}
      <div className="absolute bottom-4 left-4 right-4" data-oid="dy:jxj5">
        <Button
          variant="outline"
          className={cn("w-full justify-start", collapsed && "px-2")}
          onClick={() => window.open("/", "_blank")}
          data-oid="hmz4ju."
        >
          <Eye className="h-4 w-4" data-oid="q1h4z7g" />
          {!collapsed && (
            <span className="ml-2" data-oid="lsj0.kj">
              View Site
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
