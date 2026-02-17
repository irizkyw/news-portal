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
      data-oid="e25vaxw"
    >
      {/* Header */}
      <div
        className="flex items-center justify-between p-4 border-b"
        data-oid="g9fb504"
      >
        {!collapsed && (
          <div className="flex items-center space-x-2" data-oid="bmx4281">
            <div
              className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center"
              data-oid="o-6pgz2"
            >
              <span
                className="text-primary-foreground font-bold text-lg"
                data-oid="-b8::_1"
              >
                N
              </span>
            </div>
            <span className="font-bold text-xl" data-oid="gn08gty">
              NewsFlow
            </span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="h-8 w-8 p-0"
          data-oid="w_rd827"
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" data-oid="09.3cqx" />
          ) : (
            <ChevronLeft className="h-4 w-4" data-oid="i2pvlkj" />
          )}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2" data-oid="4xs8d7f">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant={activeItem === item.id ? "secondary" : "ghost"}
              className={cn("w-full justify-start", collapsed && "px-2")}
              onClick={() => onItemClick(item.id)}
              data-oid=":ltn4u1"
            >
              <Icon className="h-4 w-4" data-oid="2ol5qq." />
              {!collapsed && (
                <span className="ml-2" data-oid="1btixbp">
                  {item.label}
                </span>
              )}
            </Button>
          );
        })}
      </nav>

      {/* View Site Link */}
      <div className="absolute bottom-4 left-4 right-4" data-oid="v_qb5l5">
        <Button
          variant="outline"
          className={cn("w-full justify-start", collapsed && "px-2")}
          onClick={() => window.open("/", "_blank")}
          data-oid="f7te55-"
        >
          <Eye className="h-4 w-4" data-oid="ewsi9l2" />
          {!collapsed && (
            <span className="ml-2" data-oid="ghaf3co">
              View Site
            </span>
          )}
        </Button>
      </div>
    </div>
  );
}
