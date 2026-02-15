import React, { useState } from "react";
import { DashboardSidebar } from "@/components/admin/DashboardSidebar";
import { DashboardStats } from "@/components/admin/DashboardStats";
import { ArticlesTable } from "@/components/admin/ArticlesTable";
import { CreatePostForm } from "@/components/admin/CreatePostForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { weeklyTrafficData } from "@/data/mockData";

export function AdminDashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("overview");

  const renderContent = () => {
    switch (activeItem) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            </div>
            <DashboardStats />

            {/* Traffic Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Weekly Traffic</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  <div className="text-center">
                    <p className="text-muted-foreground mb-2">Traffic Chart</p>
                    <p className="text-sm text-muted-foreground">
                      Chart library would be integrated here
                    </p>
                    <div className="mt-4 flex justify-center space-x-4 text-xs">
                      {weeklyTrafficData.map((data, index) => (
                        <div key={index} className="text-center">
                          <div className="font-semibold">{data.day}</div>
                          <div className="text-muted-foreground">
                            {data.views.toLocaleString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "articles":
        return <ArticlesTable onCreateNew={() => setActiveItem("create")} />;

      case "create":
        return <CreatePostForm />;

      case "analytics":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Analytics</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Page Views</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground">Page Views Chart</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>User Engagement</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 flex items-center justify-center bg-muted/20 rounded-lg">
                    <p className="text-muted-foreground">Engagement Chart</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "users":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Users</h1>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    User management interface would be here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6">
            <h1 className="text-3xl font-bold">Settings</h1>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Settings interface would be here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeItem={activeItem}
        onItemClick={setActiveItem}
      />

      <main className="flex-1 overflow-auto">
        <div className="p-6">{renderContent()}</div>
      </main>
    </div>
  );
}
