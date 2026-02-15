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
      data-oid="rfctn7h"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.change > 0;
        const isNegative = stat.change < 0;

        return (
          <Card key={index} data-oid="6ut0u4k">
            <CardHeader
              className="flex flex-row items-center justify-between space-y-0 pb-2"
              data-oid="4i1rt-m"
            >
              <CardTitle
                className="text-sm font-medium text-muted-foreground"
                data-oid="n8rd5i3"
              >
                {stat.title}
              </CardTitle>
              <Icon
                className="h-4 w-4 text-muted-foreground"
                data-oid="shy6xob"
              />
            </CardHeader>
            <CardContent data-oid="av3lrs5">
              <div className="text-2xl font-bold" data-oid="o_m87la">
                {stat.value}
              </div>
              <div
                className="flex items-center space-x-1 text-xs text-muted-foreground"
                data-oid="c2sx6k8"
              >
                {isPositive && (
                  <TrendingUp
                    className="h-3 w-3 text-green-500"
                    data-oid="2p457on"
                  />
                )}
                {isNegative && (
                  <TrendingDown
                    className="h-3 w-3 text-red-500"
                    data-oid="8tjivze"
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
                  data-oid="0d.z4f1"
                >
                  {isPositive ? "+" : ""}
                  {stat.change}%
                </span>
                <span data-oid="qj4ikjl">from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
