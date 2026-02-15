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
      data-oid="yy5434j"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.change > 0;
        const isNegative = stat.change < 0;

        return (
          <Card key={index} data-oid="iht0t-8">
            <CardHeader
              className="flex flex-row items-center justify-between space-y-0 pb-2"
              data-oid="p689xu5"
            >
              <CardTitle
                className="text-sm font-medium text-muted-foreground"
                data-oid="fy6dp:h"
              >
                {stat.title}
              </CardTitle>
              <Icon
                className="h-4 w-4 text-muted-foreground"
                data-oid="62hhlgn"
              />
            </CardHeader>
            <CardContent data-oid="q3dz.d_">
              <div className="text-2xl font-bold" data-oid="2v60iqq">
                {stat.value}
              </div>
              <div
                className="flex items-center space-x-1 text-xs text-muted-foreground"
                data-oid="fsnqq-s"
              >
                {isPositive && (
                  <TrendingUp
                    className="h-3 w-3 text-green-500"
                    data-oid="5jywkip"
                  />
                )}
                {isNegative && (
                  <TrendingDown
                    className="h-3 w-3 text-red-500"
                    data-oid="mcza:-2"
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
                  data-oid="pyr883d"
                >
                  {isPositive ? "+" : ""}
                  {stat.change}%
                </span>
                <span data-oid="oiarh56">from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
