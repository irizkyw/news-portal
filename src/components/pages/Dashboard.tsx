import React, { useState, useEffect, useCallback } from "react";
import { DashboardSidebar } from "../admin/DashboardSidebar";
import { DashboardStats } from "../admin/DashboardStats";
import { ArticlesTable } from "../admin/ArticlesTable";
import { CreatePostForm } from "../admin/CreatePostForm";
import { UserManagementTable } from "../admin/UserManagementTable";
import { UserEditForm, type UserFormData } from "../admin/UserEditForm";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { toast, Toaster } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getWeeklyTrafficData,
  createPost,
  updatePost,
  getPosts,
} from "../../services/api";
import type { User, WeeklyTraffic, Article } from "../../types";

export function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState("overview");
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  // State for User Management
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [showUserForm, setShowUserForm] = useState(false);
  const [isFetchingUsers, setIsFetchingUsers] = useState(false);
  const [isSavingUser, setIsSavingUser] = useState(false);

  // State for Article Management
  const [articles, setArticles] = useState<Article[]>([]);
  const [editingArticle, setEditingArticle] = useState<Article | undefined>(undefined);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [isFetchingArticles, setIsFetchingArticles] = useState(false);
  const [isSavingArticle, setIsSavingArticle] = useState(false);

  // State for Traffic Data
  const [trafficData, setTrafficData] = useState<WeeklyTraffic[]>([]);
  const [isFetchingTraffic, setIsFetchingTraffic] = useState(false);
  const [trafficError, setTrafficError] = useState<string | null>(null);

  // Generic fetcher to be reused
  const fetchArticles = useCallback(async () => {
    setIsFetchingArticles(true);
    try {
      const data = await getPosts();
      setArticles(data);
    } catch (error) {
      toast.error("Failed to load articles.");
    } finally {
      setIsFetchingArticles(false);
    }
  }, []);

  // Fetch Users
  const fetchUsers = async () => {
    setIsFetchingUsers(true);
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Failed to load users.");
    } finally {
      setIsFetchingUsers(false);
    }
  };

  // Fetch Traffic Data
  const fetchTrafficData = async () => {
    setIsFetchingTraffic(true);
    setTrafficError(null);
    try {
      const data = await getWeeklyTrafficData();
      setTrafficData(data);
    } catch (error) {
      console.error("Error fetching traffic data:", error);
      setTrafficError("Failed to load traffic data.");
    } finally {
      setIsFetchingTraffic(false);
    }
  };

  // --- User Handlers ---
  const handleSaveUser = async (formData: UserFormData) => {
    // ... existing user saving logic
  };
  const handleDeleteUser = async (userId: string) => {
    // ... existing user deletion logic
  };

  // --- Article Handlers ---
  const handleSaveArticle = async (articleData: Partial<Article>) => {
    setIsSavingArticle(true);
    try {
      if (editingArticle) {
        await updatePost(editingArticle.id, articleData);
        toast.success("Article updated successfully!");
      } else {
        await createPost(articleData);
        toast.success("Article created successfully!");
      }
      setShowArticleForm(false);
      setEditingArticle(undefined);
      fetchArticles(); // Refresh the list
    } catch (error) {
      toast.error(`Failed to ${editingArticle ? 'update' : 'create'} article.`);
    } finally {
      setIsSavingArticle(false);
    }
  };
  
  const handleEditArticle = (article: Article) => {
    setEditingArticle(article);
    setShowArticleForm(true);
  };
  
  const handleCancelArticleForm = () => {
    setShowArticleForm(false);
    setEditingArticle(undefined);
  };

  useEffect(() => {
    if (activeItem === "users") fetchUsers();
    if (activeItem === "overview") fetchTrafficData();
    if (activeItem === "articles") fetchArticles();
  }, [activeItem, fetchArticles]);

  const renderContent = () => {
    // Check if the user has access to restricted sections
    const hasAdminOrEditorAccess = currentUser && (currentUser.role === "admin" || currentUser.role === "editor");

    if (!hasAdminOrEditorAccess && (activeItem === "articles" || activeItem === "users")) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
          <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
          <p className="text-lg text-muted-foreground">You do not have the necessary permissions to view this section.</p>
          <Button onClick={() => setActiveItem("overview")}>Go to Overview</Button>
        </div>
      );
    }

    switch (activeItem) {
      case "overview":
        // ... overview content remains the same
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            </div>
            <DashboardStats />
            <Card>
              <CardHeader><CardTitle>Weekly Traffic</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center bg-muted/20 rounded-lg">
                  {isFetchingTraffic ? <p>Loading traffic data...</p> : trafficError ? <p className="text-red-500">{trafficError}</p> : 
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">Traffic Chart</p>
                      <p className="text-sm text-muted-foreground">Chart library would be integrated here</p>
                      <div className="mt-4 flex justify-center space-x-4 text-xs">
                        {trafficData.map((data, index) => (
                          <div key={index} className="text-center">
                            <div className="font-semibold">{data.day}</div>
                            <div className="text-muted-foreground">{data.views.toLocaleString()}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  }
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case "articles":
        return showArticleForm ? (
          <CreatePostForm
            article={editingArticle}
            onSave={handleSaveArticle}
            onCancel={handleCancelArticleForm}
            isSaving={isSavingArticle}
          />
        ) : (
          <ArticlesTable
            onEdit={handleEditArticle}
            onCreateNew={() => { setEditingArticle(undefined); setShowArticleForm(true); }}
          />
        );

      case "users":
        // ... users content remains the same
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">User Management</h1>
              <Button onClick={() => { setEditingUser(undefined); setShowUserForm(true); }}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New User
              </Button>
            </div>
            {isFetchingUsers ? <p>Loading users...</p> : showUserForm ? (
              <UserEditForm
                user={editingUser}
                onSave={handleSaveUser}
                onCancel={() => setShowUserForm(false)}
                isSaving={isSavingUser}
              />
            ) : (
              <UserManagementTable
                users={users}
                onEditUser={(user) => { setEditingUser(user); setShowUserForm(true); }}
                onDeleteUser={handleDeleteUser}
              />
            )}
          </div>
        );
      
      // ... other cases like analytics, settings

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Toaster richColors />
      {(currentUser?.role === "admin" || currentUser?.role === "editor") && (
        <DashboardSidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeItem={activeItem}
          onItemClick={setActiveItem}
        />
      )}
      <main className="flex-1 overflow-auto">
        <div className="p-6">{renderContent()}</div>
      </main>
    </div>
  );
}
