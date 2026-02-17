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
import { updateUser } from "../../services/api"; // Import updateUser API

// Schema for profile form validation
const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  avatar: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  bio: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileSettingsPage() {
  const { user: currentUser, refreshUser } = useAuth(); // Get current user and refreshUser function

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

  // Reset form with current user data when currentUser changes
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

  const onSubmit = async (data: ProfileFormData) => {
    if (!currentUser?.id) {
      toast.error("User not logged in.");
      return;
    }
    console.log("Submitting data:", data);
    try {
      const updatedUser = await updateUser(currentUser.id, {
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        bio: data.bio,
      });
      console.log("API response (updatedUser):", updatedUser);
      toast.success("Profile updated successfully!");
      console.log("currentUser BEFORE refreshUser:", currentUser);
      await refreshUser(); // Refresh user data in context
      console.log("currentUser AFTER refreshUser:", currentUser); // Note: this will log the old value due to closure, check AuthContext console.log for actual updated user
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Failed to update profile.");
    }
  };

  // Placeholder for password change handler
  const onChangePassword = () => {
    toast.info("Password change functionality not yet implemented.");
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
      <h1 className="text-3xl font-bold">Profile Settings</h1>

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

      <Card>
        <CardHeader>
          <CardTitle>Security</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current-password">Current Password</Label>
            <Input id="current-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-password">New Password</Label>
            <Input id="new-password" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm-password">Confirm New Password</Label>
            <Input id="confirm-password" type="password" />
          </div>
          <Button variant="outline" onClick={onChangePassword}>
            Update Password
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
