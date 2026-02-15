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
      data-oid="gm1.hyr"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 border-b"
        data-oid="7xjsw:7"
      >
        {!collapsed && (
          <div className="flex items-center space-x-2" data-oid="-.wvbjx">
            <div
              className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center"
              data-oid=":xkdpn2"
            >
              <span
                className="text-primary-foreground font-bold text-lg"
                data-oid="nhzt_ym"
              >
                N
              </span>
            </div>
            <span className="font-bold text-xl" data-oid="2ebn0-1">
              NewsFlow
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="h-8 w-8 p-0"
          data-oid="e4e3dhr"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" data-oid="m-vfm0e" />
          ) : (
            <ChevronLeft className="h-4 w-4" data-oid=":-xfif2" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2" data-oid="bp90j7f">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeItem === item.id ? "secondary" : "ghost"}
              className={cn("w-full justify-start", collapsed && "px-2")}
              onClick={() => onItemClick(item.id)}
              data-oid="h3q4vzi"
            >
              <Icon className="h-4 w-4" data-oid="6ii7.nb" />
              {!collapsed && (
                <span className="ml-2" data-oid="j5pr5w7">
                  {item.label}
                </span>
              )}
            </Button>
          );
        })}
      </nav>

      {/* View Site Link */}
      <div className="absolute bottom-4 left-4 right-4" data-oid="oo45g7q">
        <Button
          variant="outline"
          className={cn("w-full justify-start", collapsed && "px-2")}
          onClick={() => window.open("/", "_blank")}
          data-oid="teu09vu"
        >
          <Eye className="h-4 w-4" data-oid="852up:." />
          {!collapsed && (
            <span className="ml-2" data-oid="ft2shcs">
              View Site
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
