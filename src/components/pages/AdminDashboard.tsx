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
          <div className="space-y-6" data-oid="usa3qv5">
            <div
              className="flex items-center justify-between"
              data-oid="97s6ptg"
            >
              <h1 className="text-3xl font-bold" data-oid="i1g27nw">
                Dashboard Overview
              </h1>
            </div>
            <DashboardStats data-oid="qz-1q.j" />

            {/* Traffic Chart Placeholder */}
            <Card data-oid="cq6ugum">
              <CardHeader data-oid="03-pidb">
                <CardTitle data-oid="j1-cwt3">Weekly Traffic</CardTitle>
              </CardHeader>
              <CardContent data-oid="8926fcd">
                <div
                  className="h-64 flex items-center justify-center bg-muted/20 rounded-lg"
                  data-oid="k:7.-sa"
                >
                  <div className="text-center" data-oid="r6ms1ke">
                    <p
                      className="text-muted-foreground mb-2"
                      data-oid="ulpolk3"
                    >
                      Traffic Chart
                    </p>
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="tosm:6."
                    >
                      Chart library would be integrated here
                    </p>
                    <div
                      className="mt-4 flex justify-center space-x-4 text-xs"
                      data-oid="7zv3v44"
                    >
                      {weeklyTrafficData.map((data, index) => (
                        <div
                          key={index}
                          className="text-center"
                          data-oid="-bpe_nj"
                        >
                          <div className="font-semibold" data-oid="2leejqs">
                            {data.day}
                          </div>
                          <div
                            className="text-muted-foreground"
                            data-oid="l4lyi0p"
                          >
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
        return (
          <ArticlesTable
            onCreateNew={() => setActiveItem("create")}
            data-oid="-8blii3"
          />
        );

      case "create":
        return <CreatePostForm data-oid="u..8039" />;

      case "analytics":
        return (
          <div className="space-y-6" data-oid="h2xqe5l">
            <h1 className="text-3xl font-bold" data-oid="6-a7:.u">
              Analytics
            </h1>
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              data-oid="rv4v9mx"
            >
              <Card data-oid="kqf06_4">
                <CardHeader data-oid="jwdun:i">
                  <CardTitle data-oid="02foxdp">Page Views</CardTitle>
                </CardHeader>
                <CardContent data-oid="agdwqpu">
                  <div
                    className="h-48 flex items-center justify-center bg-muted/20 rounded-lg"
                    data-oid="j81gneu"
                  >
                    <p className="text-muted-foreground" data-oid="k-c::0z">
                      Page Views Chart
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card data-oid="ml0e40s">
                <CardHeader data-oid="qr9-91v">
                  <CardTitle data-oid="_2lrova">User Engagement</CardTitle>
                </CardHeader>
                <CardContent data-oid="4b:5sd6">
                  <div
                    className="h-48 flex items-center justify-center bg-muted/20 rounded-lg"
                    data-oid="2ihu1:x"
                  >
                    <p className="text-muted-foreground" data-oid="a2zlvyu">
                      Engagement Chart
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        );

      case "users":
        return (
          <div className="space-y-6" data-oid="fey8vy_">
            <h1 className="text-3xl font-bold" data-oid="r_o.r05">
              Users
            </h1>
            <Card data-oid="kp53-wm">
              <CardContent className="p-6" data-oid="4gldvra">
                <div className="text-center py-12" data-oid="qc9jp2u">
                  <p className="text-muted-foreground" data-oid="ftb1vhy">
                    User management interface would be here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6" data-oid="b82vhdb">
            <h1 className="text-3xl font-bold" data-oid="yhxfiik">
              Settings
            </h1>
            <Card data-oid=":ypv8fr">
              <CardContent className="p-6" data-oid="i31.q59">
                <div className="text-center py-12" data-oid="-0de4se">
                  <p className="text-muted-foreground" data-oid="fgorlv4">
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
    <div className="flex h-screen bg-background" data-oid="r8un582">
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeItem={activeItem}
        onItemClick={setActiveItem}
        data-oid="x2amvw-"
      />

      <main className="flex-1 overflow-auto" data-oid="txlgjbz">
        <div className="p-6" data-oid="p9w:b92">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
