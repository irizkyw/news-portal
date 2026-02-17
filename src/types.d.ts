// This file contains shared type definitions for the application.

// Allows importing SVG files
declare module "*.svg" {
  const content: string;
  export default content;
}

// Core user model
export interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "editor" | "user";
  avatar?: string;
  bio?: string;
  createdAt: string;
  updatedAt: string;
}

// Author is an alias for User
export type Author = User;

// Category model
export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

// Article/Post model
export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category?: Category;
  author?: Author;
  publishedAt?: string | null;
  readTime?: number | null;
  views?: number | null;
  status: "published" | "draft" | "pending";
  isFeatured: boolean;
  isPopular: boolean;
  tags?: string[];
}

// Statistics for the dashboard overview
export interface DashboardStats {
  totalViews: number;
  totalArticles: number;
  newSubscribers: number;
  bounceRate: number;
  viewsChange: number;
  articlesChange: number;
  subscribersChange: number;
  bounceRateChange: number;
}

// Data point for the weekly traffic chart
export interface WeeklyTraffic {
  day: string;
  views: number;
}

// Parameters for the getPosts API function
export interface GetPostsParams {
  sortBy?: "latest" | "popular" | "trending" | "views";
  limit?: number;
  isFeatured?: boolean;
  categorySlug?: string;
  tagName?: string;
  search?: string;
  status?: "all" | "published" | "draft" | "pending";
}
