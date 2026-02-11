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
      data-oid="7ymijo3"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.change > 0;
        const isNegative = stat.change < 0;

        return (
          <Card key={index} data-oid="_o:b:dv">
            <CardHeader
              className="flex flex-row items-center justify-between space-y-0 pb-2"
              data-oid="wwxfd3f"
            >
              <CardTitle
                className="text-sm font-medium text-muted-foreground"
                data-oid="rrk9ztc"
              >
                {stat.title}
              </CardTitle>
              <Icon
                className="h-4 w-4 text-muted-foreground"
                data-oid="2b-f83q"
              />
            </CardHeader>
            <CardContent data-oid="uj-mk-k">
              <div className="text-2xl font-bold" data-oid="uq9zizq">
                {stat.value}
              </div>
              <div
                className="flex items-center space-x-1 text-xs text-muted-foreground"
                data-oid="9rjxlmr"
              >
                {isPositive && (
                  <TrendingUp
                    className="h-3 w-3 text-green-500"
                    data-oid="3o5f35d"
                  />
                )}
                {isNegative && (
                  <TrendingDown
                    className="h-3 w-3 text-red-500"
                    data-oid="zn0l9x8"
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
                  data-oid="pen71v5"
                >
                  {isPositive ? "+" : ""}
                  {stat.change}%
                </span>
                <span data-oid="lboqrio">from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
