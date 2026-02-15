import React from "react";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  FileText,
  Users,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { dashboardStats } from "@/data/mockData";

export function DashboardStats() {
  const stats = [
    {
      title: "Total Views",
      value: dashboardStats.totalViews.toLocaleString(),
      change: dashboardStats.viewsChange,
      icon: Eye,
    },
    {
      title: "Total Articles",
      value: dashboardStats.totalArticles.toString(),
      change: dashboardStats.articlesChange,
      icon: FileText,
    },
    {
      title: "New Subscribers",
      value: dashboardStats.newSubscribers.toLocaleString(),
      change: dashboardStats.subscribersChange,
      icon: Users,
    },
    {
      title: "Bounce Rate",
      value: `${dashboardStats.bounceRate}%`,
      change: dashboardStats.bounceRateChange,
      icon: Activity,
    },
  ];

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      data-oid="0hvv_px"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.change > 0;
        const isNegative = stat.change < 0;

        return (
          <Card key={index} data-oid="dk34:08">
            <CardHeader
              className="flex flex-row items-center justify-between space-y-0 pb-2"
              data-oid="dc3-e7n"
            >
              <CardTitle
                className="text-sm font-medium text-muted-foreground"
                data-oid="y8xqr0s"
              >
                {stat.title}
              </CardTitle>
              <Icon
                className="h-4 w-4 text-muted-foreground"
                data-oid="w44:-t-"
              />
            </CardHeader>
            <CardContent data-oid="aef4wqa">
              <div className="text-2xl font-bold" data-oid="m2:7ql1">
                {stat.value}
              </div>
              <div
                className="flex items-center space-x-1 text-xs text-muted-foreground"
                data-oid="blfg4::"
              >
                {isPositive && (
                  <TrendingUp
                    className="h-3 w-3 text-green-500"
                    data-oid="rl9epld"
                  />
                )}
                {isNegative && (
                  <TrendingDown
                    className="h-3 w-3 text-red-500"
                    data-oid="qbgu7_c"
                  />
                )}
                <span
                  className={
                    isPositive
                      ? "text-green-500"
                      : isNegative
                        ? "text-red-500"
                        : "text-muted-foreground"
                  }
                  data-oid="i.pbl8f"
                >
                  {isPositive ? "+" : ""}
                  {stat.change}%
                </span>
                <span data-oid="5gdloks">from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
