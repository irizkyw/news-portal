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
          <div className="space-y-6" data-oid="h42q24.">
            <div
              className="flex items-center justify-between"
              data-oid=".w02nkc"
            >
              <h1 className="text-3xl font-bold" data-oid="k.249qm">
                Dashboard Overview
              </h1>
            </div>
            <DashboardStats data-oid="cxmv:cu" />

            {/* Traffic Chart Placeholder */}
            <Card data-oid="k-bke4k">
              <CardHeader data-oid="vjz9dtb">
                <CardTitle data-oid="-vsmep2">Weekly Traffic</CardTitle>
              </CardHeader>
              <CardContent data-oid="5bbp5hf">
                <div
                  className="h-64 flex items-center justify-center bg-muted/20 rounded-lg"
                  data-oid="5fp73hm"
                >
                  <div className="text-center" data-oid="u142nho">
                    <p
                      className="text-muted-foreground mb-2"
                      data-oid="gf8q.:k"
                    >
                      Traffic Chart
                    </p>
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="amicwm2"
                    >
                      Chart library would be integrated here
                    </p>
                    <div
                      className="mt-4 flex justify-center space-x-4 text-xs"
                      data-oid="q0mu5_q"
                    >
                      {weeklyTrafficData.map((data, index) => (
                        <div
                          key={index}
                          className="text-center"
                          data-oid="f90b:70"
                        >
                          <div className="font-semibold" data-oid="hr-gmgp">
                            {data.day}
                          </div>
                          <div
                            className="text-muted-foreground"
                            data-oid="blei3:5"
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
            data-oid="s:kp.o1"
          />
        );

      case "create":
        return <CreatePostForm data-oid="a494k:p" />;

      case "analytics":
        return (
          <div className="space-y-6" data-oid="lj.dlsx">
            <h1 className="text-3xl font-bold" data-oid=".dk9hjr">
              Analytics
            </h1>
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              data-oid="lo0_y1b"
            >
              <Card data-oid="x17i34f">
                <CardHeader data-oid="cg9pf2a">
                  <CardTitle data-oid="rnf534u">Page Views</CardTitle>
                </CardHeader>
                <CardContent data-oid="fdb3cpv">
                  <div
                    className="h-48 flex items-center justify-center bg-muted/20 rounded-lg"
                    data-oid="zik5784"
                  >
                    <p className="text-muted-foreground" data-oid="upq7240">
                      Page Views Chart
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card data-oid="p:wvks:">
                <CardHeader data-oid="z3m10j9">
                  <CardTitle data-oid="xqtsp_v">User Engagement</CardTitle>
                </CardHeader>
                <CardContent data-oid="7.we_re">
                  <div
                    className="h-48 flex items-center justify-center bg-muted/20 rounded-lg"
                    data-oid="24y9tco"
                  >
                    <p className="text-muted-foreground" data-oid="5med-.k">
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
          <div className="space-y-6" data-oid="me:_y9t">
            <h1 className="text-3xl font-bold" data-oid="j2pdv3e">
              Users
            </h1>
            <Card data-oid="7hfy-fy">
              <CardContent className="p-6" data-oid="-i6e:yo">
                <div className="text-center py-12" data-oid="o:635i6">
                  <p className="text-muted-foreground" data-oid="as6l8dj">
                    User management interface would be here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6" data-oid="tc4sr53">
            <h1 className="text-3xl font-bold" data-oid="4bbs6i_">
              Settings
            </h1>
            <Card data-oid="27380m2">
              <CardContent className="p-6" data-oid="ue86lxe">
                <div className="text-center py-12" data-oid="t2z.v0g">
                  <p className="text-muted-foreground" data-oid="se1jeis">
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
    <div className="flex h-screen bg-background" data-oid="92gya3y">
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeItem={activeItem}
        onItemClick={setActiveItem}
        data-oid="ticf.v5"
      />

      <main className="flex-1 overflow-auto" data-oid="gh85zo:">
        <div className="p-6" data-oid="bzen6ce">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
