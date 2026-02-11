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
      data-oid="rs2:o0c"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 border-b"
        data-oid="k97d6_v"
      >
        {!collapsed && (
          <div className="flex items-center space-x-2" data-oid="4tk:9q4">
            <div
              className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center"
              data-oid="6av-kb-"
            >
              <span
                className="text-primary-foreground font-bold text-lg"
                data-oid="ymb7d3u"
              >
                N
              </span>
            </div>
            <span className="font-bold text-xl" data-oid="js_x0ll">
              NewsFlow
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="h-8 w-8 p-0"
          data-oid="mots1ky"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" data-oid="hxfod-3" />
          ) : (
            <ChevronLeft className="h-4 w-4" data-oid="5ph::kh" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2" data-oid="nrd5xyn">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeItem === item.id ? "secondary" : "ghost"}
              className={cn("w-full justify-start", collapsed && "px-2")}
              onClick={() => onItemClick(item.id)}
              data-oid="zhr6obk"
            >
              <Icon className="h-4 w-4" data-oid="fm7hi5g" />
              {!collapsed && (
                <span className="ml-2" data-oid="iur:u--">
                  {item.label}
                </span>
              )}
            </Button>
          );
        })}
      </nav>

      {/* View Site Link */}
      <div className="absolute bottom-4 left-4 right-4" data-oid="snjd_wa">
        <Button
          variant="outline"
          className={cn("w-full justify-start", collapsed && "px-2")}
          onClick={() => window.open("/", "_blank")}
          data-oid="g7evy0t"
        >
          <Eye className="h-4 w-4" data-oid="t3kd271" />
          {!collapsed && (
            <span className="ml-2" data-oid="rz7mv2p">
              View Site
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
