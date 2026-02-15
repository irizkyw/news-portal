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
          <div className="space-y-6" data-oid="m-wy6aw">
            <div
              className="flex items-center justify-between"
              data-oid="qx6w0ip"
            >
              <h1 className="text-3xl font-bold" data-oid="4v-zegv">
                Dashboard Overview
              </h1>
            </div>
            <DashboardStats data-oid="14wp14l" />

            {/* Traffic Chart Placeholder */}
            <Card data-oid="u1d.zgr">
              <CardHeader data-oid="mpe07:l">
                <CardTitle data-oid=":bpfhl3">Weekly Traffic</CardTitle>
              </CardHeader>
              <CardContent data-oid="u:qv19w">
                <div
                  className="h-64 flex items-center justify-center bg-muted/20 rounded-lg"
                  data-oid="4m3phwb"
                >
                  <div className="text-center" data-oid="12a208d">
                    <p
                      className="text-muted-foreground mb-2"
                      data-oid="7s1m4yh"
                    >
                      Traffic Chart
                    </p>
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="8utkht8"
                    >
                      Chart library would be integrated here
                    </p>
                    <div
                      className="mt-4 flex justify-center space-x-4 text-xs"
                      data-oid="k-ze-zl"
                    >
                      {weeklyTrafficData.map((data, index) => (
                        <div
                          key={index}
                          className="text-center"
                          data-oid="ftd65ax"
                        >
                          <div className="font-semibold" data-oid="xw00rtu">
                            {data.day}
                          </div>
                          <div
                            className="text-muted-foreground"
                            data-oid="tmk6_6h"
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
            data-oid="8e_izpd"
          />
        );

      case "create":
        return <CreatePostForm data-oid="b7jlr3e" />;

      case "analytics":
        return (
          <div className="space-y-6" data-oid="zci_yvh">
            <h1 className="text-3xl font-bold" data-oid="_:.-nyu">
              Analytics
            </h1>
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              data-oid="cfa7bau"
            >
              <Card data-oid="ls_7rpr">
                <CardHeader data-oid="flfcqxv">
                  <CardTitle data-oid="d6mbx92">Page Views</CardTitle>
                </CardHeader>
                <CardContent data-oid="ule5qtl">
                  <div
                    className="h-48 flex items-center justify-center bg-muted/20 rounded-lg"
                    data-oid="hp6a7s4"
                  >
                    <p className="text-muted-foreground" data-oid="g043c5-">
                      Page Views Chart
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card data-oid="rsqb5ft">
                <CardHeader data-oid="cw68k.q">
                  <CardTitle data-oid="q6xayjq">User Engagement</CardTitle>
                </CardHeader>
                <CardContent data-oid=":ffsecn">
                  <div
                    className="h-48 flex items-center justify-center bg-muted/20 rounded-lg"
                    data-oid="kcfcu2j"
                  >
                    <p className="text-muted-foreground" data-oid="-d4vrxf">
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
          <div className="space-y-6" data-oid="87uo.zs">
            <h1 className="text-3xl font-bold" data-oid="5a-4h0.">
              Users
            </h1>
            <Card data-oid="ikjb7.o">
              <CardContent className="p-6" data-oid="ga6tr.7">
                <div className="text-center py-12" data-oid="68oapue">
                  <p className="text-muted-foreground" data-oid=".7u5wk.">
                    User management interface would be here
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "settings":
        return (
          <div className="space-y-6" data-oid="ftqoh2d">
            <h1 className="text-3xl font-bold" data-oid="xk-_mri">
              Settings
            </h1>
            <Card data-oid="ok9unhj">
              <CardContent className="p-6" data-oid="-c0i7o-">
                <div className="text-center py-12" data-oid="55rh9mp">
                  <p className="text-muted-foreground" data-oid="9-bhias">
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
    <div className="flex h-screen bg-background" data-oid="_6m6z:.">
      <DashboardSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeItem={activeItem}
        onItemClick={setActiveItem}
        data-oid="cuo28ik"
      />

      <main className="flex-1 overflow-auto" data-oid="fik5vu-">
        <div className="p-6" data-oid="cq1dhhz">
          {renderContent()}
        </div>
      </main>
    </div>
  );
}
