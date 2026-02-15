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
      data-oid="736ckuw"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 border-b"
        data-oid="wnzuxp1"
      >
        {!collapsed && (
          <div className="flex items-center space-x-2" data-oid="i9t8-qn">
            <div
              className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center"
              data-oid="zygo1qo"
            >
              <span
                className="text-primary-foreground font-bold text-lg"
                data-oid="c3sbeyl"
              >
                N
              </span>
            </div>
            <span className="font-bold text-xl" data-oid="aitntmt">
              NewsFlow
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="h-8 w-8 p-0"
          data-oid="8:_2fpj"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" data-oid="3mppyv1" />
          ) : (
            <ChevronLeft className="h-4 w-4" data-oid="1.40qlq" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2" data-oid="3y.ar39">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeItem === item.id ? "secondary" : "ghost"}
              className={cn("w-full justify-start", collapsed && "px-2")}
              onClick={() => onItemClick(item.id)}
              data-oid=":n07n5y"
            >
              <Icon className="h-4 w-4" data-oid="_56q32x" />
              {!collapsed && (
                <span className="ml-2" data-oid="v-r4m.b">
                  {item.label}
                </span>
              )}
            </Button>
          );
        })}
      </nav>

      {/* View Site Link */}
      <div className="absolute bottom-4 left-4 right-4" data-oid="ng3.ku0">
        <Button
          variant="outline"
          className={cn("w-full justify-start", collapsed && "px-2")}
          onClick={() => window.open("/", "_blank")}
          data-oid="7zd2wgb"
        >
          <Eye className="h-4 w-4" data-oid="ooe.x0m" />
          {!collapsed && (
            <span className="ml-2" data-oid="ccif6ej">
              View Site
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
