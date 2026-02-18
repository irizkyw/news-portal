import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { User, Mail, Link as LinkIcon } from "lucide-react"; // Import icons

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "../auth/AuthContext"; // Import useAuth
import { updateUser, changePassword } from "../../services/api"; // Import updateUser and changePassword API

// Schema for personal information form validation
const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  avatar: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  bio: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

// Schema for password change form validation
const passwordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters"),
  confirmPassword: z.string().min(1, "Confirm password is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "New password and confirmation do not match",
  path: ["confirmPassword"],
});

type PasswordFormData = z.infer<typeof passwordSchema>;

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookmarksTable } from "../admin/BookmarksTable"; // Import the new component
import { Article } from "@/types";
import { Trash2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

export function ProfileSettingsPage() {
  const { user: currentUser, refreshUser } = useAuth();
  // Removed local fetchBookmarks state since it's handled in BookmarksTable component

  // Form for Personal Information
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: currentUser?.name || "",
      email: currentUser?.email || "",
      avatar: currentUser?.avatar || "",
      bio: currentUser?.bio || "",
    },
  });

  // Form for Password Change
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    formState: { errors: passwordErrors, isSubmitting: isChangingPassword },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  // Reset personal info form with current user data when currentUser changes
  useEffect(() => {
    if (currentUser) {
      reset({
        name: currentUser.name || "",
        email: currentUser.email || "",
        avatar: currentUser.avatar || "",
        bio: currentUser.bio || "",
      });
    }
  }, [currentUser, reset]);

  // Handle saving personal information
  const onSubmit = async (data: ProfileFormData) => {
    if (!currentUser?.id) {
      toast.error("User not logged in.");
      return;
    }
    try {
      await updateUser(currentUser.id, {
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        bio: data.bio,
      });
      toast.success("Profile updated successfully!");
      await refreshUser(); // Refresh user data in context to update UI
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  // Handle password change
  const handlePasswordChange = async (data: PasswordFormData) => {
    try {
      await changePassword(data);
      toast.success("Password updated successfully!");
      resetPasswordForm(); // Clear password fields on success
    } catch (error: any) {
      console.error("Failed to change password:", error);
      toast.error(error.message || "Failed to change password.");
    }
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold">Account Settings</h1>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px] mb-6">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="saved">Saved Articles</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={
                        currentUser.avatar || 
                        `https://ui-avatars.com/api/?name=${currentUser.name || "U"}&background=random`
                      }
                    />
                    <AvatarFallback>{currentUser.name?.charAt(0) || "U"}</AvatarFallback>
                  </Avatar>
                  <div>
                    <Label htmlFor="avatar-url">Avatar URL</Label>
                    <Input id="avatar-url" type="url" {...register("avatar")} />
                    {errors.avatar && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.avatar.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" {...register("name")} />
                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" {...register("email")} readOnly />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" rows={4} {...register("bio")} />
                  {errors.bio && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.bio.message}
                    </p>
                  )}
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </form>

          <form onSubmit={handlePasswordSubmit(handlePasswordChange)} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <Input id="current-password" type="password" {...registerPassword("currentPassword")} />
                  {passwordErrors.currentPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {passwordErrors.currentPassword.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <Input id="new-password" type="password" {...registerPassword("newPassword")} />
                  {passwordErrors.newPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {passwordErrors.newPassword.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input id="confirm-password" type="password" {...registerPassword("confirmPassword")} />
                  {passwordErrors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">
                      {passwordErrors.confirmPassword.message}
                    </p>
                  )}
                </div>
                <Button type="submit" variant="outline" disabled={isChangingPassword}>
                  {isChangingPassword ? "Updating..." : "Update Password"}
                </Button>
              </CardContent>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="saved">
          <BookmarksTable />
        </TabsContent>
      </Tabs>
    </div>
  );
}
