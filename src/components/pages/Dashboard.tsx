import React, { useState, useEffect, useCallback } from "react";
import { DashboardSidebar } from "../admin/DashboardSidebar";
import { DashboardStats } from "../admin/DashboardStats";
import { ArticlesTable } from "../admin/ArticlesTable";
import { CreatePostForm } from "../admin/CreatePostForm";
import { BookmarksTable } from "../admin/BookmarksTable"; // Import BookmarksTable
import { UserManagementTable } from "../admin/UserManagementTable";
import { UserEditForm, type UserFormData } from "../admin/UserEditForm";
import { ProfileSettingsPage } from "../pages/ProfileSettingsPage";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { toast, Toaster } from "sonner";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import {
  createUser,
  updateUser,
  createPost,
  updatePost,
  getCategories, // Add getCategories
} from "../../services/api";
import type { User, Article } from "../../types"; // Remove WeeklyTraffic from import

export function Dashboard() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation(); // Initialize useLocation
  const [activeItem, setActiveItem] = useState(location.state?.activeItem || "overview");
  const { user: currentUser } = useAuth();
  const navigate = useNavigate();

  // State for User Management
  const [editingUser, setEditingUser] = useState<User | undefined>(undefined);
  const [showUserForm, setShowUserForm] = useState(false);
  const [isSavingUser, setIsSavingUser] = useState(false);

  // State for Article Management
  const [editingArticle, setEditingArticle] = useState<Article | undefined>(undefined);
  const [showArticleForm, setShowArticleForm] = useState(false);
  const [isSavingArticle, setIsSavingArticle] = useState(false);



  const [categoryCount, setCategoryCount] = useState<number>(0); // New state for category count

  const fetchCategoryCount = useCallback(async () => {
    try {
      const categories = await getCategories();
      setCategoryCount(categories.length);
    } catch (error) {
      console.error("Error fetching category count:", error);
      toast.error("Failed to load category count.");
    }
  }, []);

  // --- User Handlers ---
  const handleSaveUser = async (formData: UserFormData) => {
    setIsSavingUser(true);
    try {
      if (editingUser && editingUser.id) { // Update existing user
        await updateUser(editingUser.id, formData);
        toast.success("User updated successfully!");
      } else { // Create new user
        // For new user creation, password is required by backend, but form doesn't have it.
        // This is a simplification; a real app might have separate create user form or auto-generate password.
        // For now, assume password is handled elsewhere or not strictly required for this form path.
        // Or, we need to pass a dummy password to satisfy backend `CreateUserRequest` which requires it.
        // For now, I'll pass a dummy password, this needs to be addressed properly in a full app.
        await createUser({ ...formData, password: "temp_password_123" }); // TEMP password
        toast.success("User created successfully!");
      }
      setShowUserForm(false);
      setEditingUser(undefined); // Clear editing user
    } catch (error) {
      console.error("Failed to save user:", error);
      toast.error(`Failed to ${editingUser && editingUser.id ? 'update' : 'create'} user.`);
    } finally {
      setIsSavingUser(false);
    }
  };


  // --- Article Handlers ---
  const handleSaveArticle = async (articleData: Partial<Article>) => {
    setIsSavingArticle(true);
    try {
      if (editingArticle && editingArticle.id) { // Check for editingArticle AND its ID
        await updatePost(editingArticle.id, articleData);
        toast.success("Article updated successfully!");
      } else {
        await createPost(articleData);
        toast.success("Article created successfully!");
      }
      setShowArticleForm(false);
      setEditingArticle(undefined);
    } catch (error: any) {
      toast.error(`Failed to ${editingArticle && editingArticle.id ? 'update' : 'create'} article: ${error.message}`);
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

  const handleDuplicateArticle = (article: Article) => {
    const duplicatedArticle: Article = {
      ...article,
      id: undefined, // Clear ID to indicate a new post
      title: article.title + " (Copy)",
      slug: undefined, // Let backend generate a new unique slug
      status: "pending", // Set to pending or draft for duplicated post
      publishedAt: undefined, // Clear published date
    };
    setEditingArticle(duplicatedArticle);
    setShowArticleForm(true);
  };

  useEffect(() => {
    if (activeItem === "overview") {
      fetchCategoryCount(); // Call new fetch function
    }
  }, [activeItem, fetchCategoryCount]);

  const renderContent = () => {
    // Access checks
    const isAdmin = currentUser?.role === "admin";
    const isEditor = currentUser?.role === "editor";
    const isUser = currentUser?.role === "user";
    const hasAdminOrEditorAccess = isAdmin || isEditor;
    const hasAdminAccess = isAdmin;

    // If user is a regular user, always show profile settings
    if (isUser) {
      return <ProfileSettingsPage />;
    }

    // Deny access if not authorized for current activeItem (for Admin/Editor roles)
    const AccessDeniedMessage = (sectionName: string) => (
      <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
        <h1 className="text-4xl font-bold text-red-600">Access Denied</h1>
        <p className="text-lg text-muted-foreground">You do not have the necessary permissions to view the {sectionName} section.</p>
        <Button onClick={() => setActiveItem("overview")}>Go to Overview</Button>
      </div>
    );

    switch (activeItem) {
      case "overview":
        if (!hasAdminOrEditorAccess) {
          return AccessDeniedMessage("Overview");
        }
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Dashboard Overview</h1>
            </div>
            <DashboardStats />
            {/* New Card for Category Count */}
            <Card>
              <CardHeader><CardTitle>Total Categories</CardTitle></CardHeader>
              <CardContent>
                <div className="h-24 flex items-center justify-center bg-muted/20 rounded-lg">
                  <span className="text-5xl font-bold text-primary">{categoryCount}</span>
                </div>
              </CardContent>
            </Card>
            {/* Removed Weekly Traffic Card */}
          </div>
        );

      case "articles":
        if (!hasAdminOrEditorAccess) {
          return AccessDeniedMessage("Articles");
        }
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
            onDuplicate={handleDuplicateArticle}
          />
        );

      case "users":
        if (!hasAdminAccess) { // Only admin can access user management
          return AccessDeniedMessage("User Management");
        }
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">User Management</h1>
              <Button onClick={() => { setEditingUser(undefined); setShowUserForm(true); }}>
                <PlusCircle className="mr-2 h-4 w-4" /> Add New User
              </Button>
            </div>
            {showUserForm ? (
              <UserEditForm
                user={editingUser}
                onSave={handleSaveUser}
                onCancel={() => setShowUserForm(false)}
                isSaving={isSavingUser}
              />
            ) : (
              <UserManagementTable
                onEditUser={(user) => { setEditingUser(user); setShowUserForm(true); }}
              />
            )}
          </div>
        );
      
      case "bookmarks":
        return <BookmarksTable />;
      
      case "settings":
        // Profile settings should be accessible to all logged-in users
        return <ProfileSettingsPage />;

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
