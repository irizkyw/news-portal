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
          <div className="space-y-6" data-oid="vpcz-44">
            <div
              className="flex items-center justify-between"
              data-oid="0_4gk8y"
            >
              <h1 className="text-3xl font-bold" data-oid="ra.s7j0">
                Dashboard Overview
              </h1>
            </div>
            <DashboardStats data-oid="qhlb_z-" />

            {/* Traffic Chart Placeholder */}
            <Card data-oid="kn4p33s">
              <CardHeader data-oid="d0755-6">
                <CardTitle data-oid="369u_1k">Weekly Traffic</CardTitle>
              </CardHeader>
              <CardContent data-oid="dn63tgl">
                <div
                  className="h-64 flex items-center justify-center bg-muted/20 rounded-lg"
                  data-oid="_nf-07r"
                >
                  <div className="text-center" data-oid="_lgnfxd">
                    <p
                      className="text-muted-foreground mb-2"
                      data-oid="ow:ypta"
                    >
                      Traffic Chart
                    </p>
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="kvz1m0y"
                    >
                      Chart library would be integrated here
                    </p>
                    <div
                      className="mt-4 flex justify-center space-x-4 text-xs"
                      data-oid="5n78_2o"
                    >
                      {weeklyTrafficData.map((data, index) => (
                        <div
                          key={index}
                          className="text-center"
                          data-oid="mqhzf7p"
                        >
                          <div className="font-semibold" data-oid="xqbvjit">
                            {data.day}
                          </div>
                          <div
                            className="text-muted-foreground"
                            data-oid="42rc4oy"
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
            data-oid="3t_k_xq"
          />
        );

      case "create":
        return <CreatePostForm data-oid="uln4a9z" />;

      case "analytics":
        return (
          <div className="space-y-6" data-oid="gaio0ty">
            <h1 className="text-3xl font-bold" data-oid="9wu1y8q">
              Analytics
            </h1>
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              data-oid="d0rys-w"
            >
              <Card data-oid="vtm1myr">
                <CardHeader data-oid="cqm7p1_">
                  <CardTitle data-oid="7ozoyid">Page Views</CardTitle>
                </CardHeader>
                <CardContent data-oid="r3cz6yk">
                  <div
                    className="h-48 flex items-center justify-center bg-muted/20 rounded-lg"
                    data-oid="id9qzba"
                  >
                    <p className="text-muted-foreground" data-oid="a4cqxhj">
                      Page Views Chart
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card data-oid="6pce4fz">
                <CardHeader data-oid="d9ggzbe">
                  <CardTitle data-oid="4nxrds:">User Engagement</CardTitle>
                </CardHeader>
                <CardContent data-oid=":jiftqt">
                  <div
                    className="h-48 flex items-center justify-center bg-muted/20 rounded-lg"
                    data-oid="f9zqbnf"
                  >
                    <p className="text-muted-foreground" data-oid="g-4:q2a">
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
          <div className="space-y-6" data-oid="9mg_y38">
            <h1 className="text-3xl font-bold" data-oid="z8u0ksr">
              Users
            </h1>
            <Card data-oid="uax2n8s">
              <CardContent className="p-6" data-oid="bxigswb">
                <div className="text-center py-12" data-oid="hijpegf">
                  <p className="text-muted-foreground" data-oid="3wd8_0l">
                    User management interface would be here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6" data-oid="-:nky8e">
            <h1 className="text-3xl font-bold" data-oid="tiipf9d">
              Settings
            </h1>
            <Card data-oid="rttiody">
              <CardContent className="p-6" data-oid="a:up8u9">
                <div className="text-center py-12" data-oid="c32a84h">
                  <p className="text-muted-foreground" data-oid="m0wcybo">
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
    <div className="flex h-screen bg-background" data-oid="kwbww:j">
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeItem={activeItem}
        onItemClick={setActiveItem}
        data-oid="960i509"
      />

      <main className="flex-1 overflow-auto" data-oid="8j-kx8p">
        <div className="p-6" data-oid="6yjlz5w">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
