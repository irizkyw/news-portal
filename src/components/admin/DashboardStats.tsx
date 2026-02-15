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
      data-oid="jiof9g9"
    >
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.change > 0;
        const isNegative = stat.change < 0;

        return (
          <Card key={index} data-oid=":5fepxk">
            <CardHeader
              className="flex flex-row items-center justify-between space-y-0 pb-2"
              data-oid="j85kccl"
            >
              <CardTitle
                className="text-sm font-medium text-muted-foreground"
                data-oid="jr44_x6"
              >
                {stat.title}
              </CardTitle>
              <Icon
                className="h-4 w-4 text-muted-foreground"
                data-oid="0i_-eer"
              />
            </CardHeader>
            <CardContent data-oid="db83m_k">
              <div className="text-2xl font-bold" data-oid="2bctoec">
                {stat.value}
              </div>
              <div
                className="flex items-center space-x-1 text-xs text-muted-foreground"
                data-oid="5cp:7ck"
              >
                {isPositive && (
                  <TrendingUp
                    className="h-3 w-3 text-green-500"
                    data-oid="rmyzvwo"
                  />
                )}
                {isNegative && (
                  <TrendingDown
                    className="h-3 w-3 text-red-500"
                    data-oid="5_qop1-"
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
                  data-oid="8wkcfpp"
                >
                  {isPositive ? "+" : ""}
                  {stat.change}%
                </span>
                <span data-oid="554-ndq">from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
