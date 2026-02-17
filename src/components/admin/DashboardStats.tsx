import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Eye,
  FileText,
  Users,
  Activity,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getDashboardStats } from "../../services/api";
import type { DashboardStats as DashboardStatsType } from "../../types";

export function DashboardStats() {
  const [stats, setStats] = useState<DashboardStatsType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        setError("Failed to fetch dashboard stats.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!stats) {
    return <p>No stats available.</p>;
  }

  const statsData = [
    {
      title: "Total Views",
      value: stats.totalViews.toLocaleString(),
      change: stats.viewsChange,
      icon: Eye,
    },
    {
      title: "Total Articles",
      value: stats.totalArticles.toString(),
      change: stats.articlesChange,
      icon: FileText,
    },
    {
      title: "New Subscribers",
      value: stats.newSubscribers.toLocaleString(),
      change: stats.subscribersChange,
      icon: Users,
    },
    {
      title: "Bounce Rate",
      value: `${stats.bounceRate}%`,
      change: stats.bounceRateChange,
      icon: Activity,
    },
  ];

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {statsData.map((stat, index) => {
        const Icon = stat.icon;
        const isPositive = stat.change > 0;
        const isNegative = stat.change < 0;

        return (
          <Card key={index}>
            <CardHeader
              className="flex flex-row items-center justify-between space-y-0 pb-2"
            >
              <CardTitle
                className="text-sm font-medium text-muted-foreground"
              >
                {stat.title}
              </CardTitle>
              <Icon
                className="h-4 w-4 text-muted-foreground"
              />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {stat.value}
              </div>
              <div
                className="flex items-center space-x-1 text-xs text-muted-foreground"
              >
                {isPositive && (
                  <TrendingUp
                    className="h-3 w-3 text-green-500"
                  />
                )}
                {isNegative && (
                  <TrendingDown
                    className="h-3 w-3 text-red-500"
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
                >
                  {isPositive ? "+" : ""}
                  {stat.change}%
                </span>
                <span>from last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
