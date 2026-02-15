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
          <div className="space-y-6" data-oid="7n7mxqd">
            <div
              className="flex items-center justify-between"
              data-oid="ne3fjhv"
            >
              <h1 className="text-3xl font-bold" data-oid="gx2qstw">
                Dashboard Overview
              </h1>
            </div>
            <DashboardStats data-oid="rdhe3_j" />

            {/* Traffic Chart Placeholder */}
            <Card data-oid="jhhdnou">
              <CardHeader data-oid="8a0dgxm">
                <CardTitle data-oid="2.b5lj1">Weekly Traffic</CardTitle>
              </CardHeader>
              <CardContent data-oid="q3usf55">
                <div
                  className="h-64 flex items-center justify-center bg-muted/20 rounded-lg"
                  data-oid="phvsl7m"
                >
                  <div className="text-center" data-oid="q5ot.68">
                    <p
                      className="text-muted-foreground mb-2"
                      data-oid=":sn1_j7"
                    >
                      Traffic Chart
                    </p>
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="3.9uqee"
                    >
                      Chart library would be integrated here
                    </p>
                    <div
                      className="mt-4 flex justify-center space-x-4 text-xs"
                      data-oid="nx22taz"
                    >
                      {weeklyTrafficData.map((data, index) => (
                        <div
                          key={index}
                          className="text-center"
                          data-oid=":ahj4yk"
                        >
                          <div className="font-semibold" data-oid="e00e419">
                            {data.day}
                          </div>
                          <div
                            className="text-muted-foreground"
                            data-oid="o2h1.m8"
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
            data-oid=".a361:."
          />
        );

      case "create":
        return <CreatePostForm data-oid="6u-u59a" />;

      case "analytics":
        return (
          <div className="space-y-6" data-oid="kb9evsy">
            <h1 className="text-3xl font-bold" data-oid=":rnj7lg">
              Analytics
            </h1>
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              data-oid="otmcqee"
            >
              <Card data-oid="q8l.q9c">
                <CardHeader data-oid="hdghnx.">
                  <CardTitle data-oid="b-mh-dn">Page Views</CardTitle>
                </CardHeader>
                <CardContent data-oid="c3kvl-5">
                  <div
                    className="h-48 flex items-center justify-center bg-muted/20 rounded-lg"
                    data-oid="h_in18m"
                  >
                    <p className="text-muted-foreground" data-oid="fxndlqu">
                      Page Views Chart
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card data-oid="uh6egik">
                <CardHeader data-oid="a3b.wo_">
                  <CardTitle data-oid="a1rfgh1">User Engagement</CardTitle>
                </CardHeader>
                <CardContent data-oid="fsqek1u">
                  <div
                    className="h-48 flex items-center justify-center bg-muted/20 rounded-lg"
                    data-oid="z.-kbe."
                  >
                    <p className="text-muted-foreground" data-oid="n6j:cw-">
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
          <div className="space-y-6" data-oid="s56qgbj">
            <h1 className="text-3xl font-bold" data-oid="vwcn0r6">
              Users
            </h1>
            <Card data-oid="b9fpq9f">
              <CardContent className="p-6" data-oid="han-b3l">
                <div className="text-center py-12" data-oid="alb2pgq">
                  <p className="text-muted-foreground" data-oid="7t400oa">
                    User management interface would be here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6" data-oid="qicao4c">
            <h1 className="text-3xl font-bold" data-oid="fieipiw">
              Settings
            </h1>
            <Card data-oid="j8hrixs">
              <CardContent className="p-6" data-oid=":r5w8uk">
                <div className="text-center py-12" data-oid="okr0_yb">
                  <p className="text-muted-foreground" data-oid="9vd0ptn">
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
    <div className="flex h-screen bg-background" data-oid="vwktyb9">
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeItem={activeItem}
        onItemClick={setActiveItem}
        data-oid="-bzxdia"
      />

      <main className="flex-1 overflow-auto" data-oid="hca.k0d">
        <div className="p-6" data-oid="qjenrih">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
