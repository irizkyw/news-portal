import React, { useState, useEffect, useCallback } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Save, Eye, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCategories } from "../../services/api";
import type { Article, Category } from "../../types";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const postFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(10, "Content is too short"),
  categoryId: z.string().min(1, "Category is required"),
  featuredImage: z.string().url("Must be a valid URL").or(z.literal("")).optional(),
  status: z.enum(["draft", "published", "pending"]), // Added pending status
  tags: z.string().optional(),
  isFeatured: z.boolean().default(false),
  isPopular: z.boolean().default(false),
});

type PostFormData = z.infer<typeof postFormSchema>;

interface PostFormProps {
  article?: Article;
  onSave: (data: Partial<Article>) => void;
  onCancel: () => void;
  isSaving: boolean;
}

import React, { useState, useEffect, useCallback, forwardRef } from "react"; // Import forwardRef
// ... other imports

// Modify Editor function component
const Editor = forwardRef(({ value, onChange }: { value: string, onChange: (value: string) => void }, ref) => {
  const { quill, quillRef } = useQuill({
    modules: { toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    },
    placeholder: "Start writing your content here...",
  });

  useEffect(() => {
    if (quill) {
      if (value && quill.root.innerHTML !== value) {
        quill.root.innerHTML = value;
      }
      quill.on("text-change", (delta, oldDelta, source) => {
        if (source === "user") {
          onChange(quill.root.innerHTML);
        }
      });
    }
  }, [quill, value, onChange]);

  // Pass the forwarded ref to the underlying div
  // Combine internal quillRef with the forwarded ref
  const combinedRef = useCallback((node: HTMLDivElement | null) => {
    quillRef.current = node; // For useQuill's internal ref
    if (ref) { // For react-hook-form's ref
      if (typeof ref === 'function') {
        ref(node);
      } else {
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }
    }
  }, [quillRef, ref]);

  return <div ref={combinedRef} style={{ minHeight: '300px' }} />;
});

export function CreatePostForm({ article, onSave, onCancel, isSaving }: PostFormProps) {
  const { user } = useAuth();
  const navigate = useNavigate(); // Initialize useNavigate
  const [categories, setCategories] = useState<Category[]>([]);
  const {
    register,
    handleSubmit,
    control,
    reset,
    getValues, // Get getValues from useForm
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postFormSchema),
  });

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (article) {
      reset({
        title: article.title || "",
        excerpt: article.excerpt || "",
        content: article.content || "",
        categoryId: article.category?.id || "",
        featuredImage: article.featuredImage || "",
        status: article.status || "draft",
        tags: article.tags?.join(", ") || "",
        isFeatured: article.isFeatured || false,
        isPopular: article.isPopular || false,
      });
    } else {
      reset({
        title: "",
        excerpt: "",
        content: "",
        categoryId: "",
        featuredImage: "",
        status: "pending", // Default to pending for new posts
        tags: "",
        isFeatured: false,
        isPopular: false,
      });
    }
  }, [article, reset]);

  const onSubmit = (data: PostFormData) => {
    const finalData: Partial<Article> = {
      ...data,
      title: data.title.trim(), // Trim title
      excerpt: data.excerpt.trim(), // Trim excerpt
      tags: data.tags?.split(",").map((tag) => tag.trim()).filter(Boolean),
      authorId: user?.id, // Pass author ID as string
    };
    onSave(finalData);
  };

  const handlePreview = useCallback(() => {
    const formData = getValues();
    const previewData: Article = {
      ...article, // Keep existing article data for context if editing
      ...formData,
      id: article?.id || "preview-id", // Provide a dummy ID for preview
      slug: formData.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''), // Generate a slug for preview
      publishedAt: new Date().toISOString(),
      readTime: 0, // Placeholder
      views: 0, // Placeholder
      author: user || undefined, // Use current user as author
      category: categories.find(cat => cat.id === formData.categoryId) || undefined,
      tags: formData.tags?.split(",").map((tag) => tag.trim()).filter(Boolean) || [],
    };
    navigate("/posts/preview", { state: { article: previewData } });
  }, [article, getValues, user, categories, navigate]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          {article ? "Edit Post" : "Create New Post"}
        </h2>
        <div className="flex items-center space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            <X className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button type="button" variant="secondary" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button type="submit" disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? "Saving..." : "Save Post"}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Post Content</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register("title")} />
                {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea id="excerpt" {...register("excerpt")} />
                {errors.excerpt && <p className="text-red-500 text-xs mt-1">{errors.excerpt.message}</p>}
              </div>
              <div>
                <Label>Content</Label>
                <Controller
                  name="content"
                  control={control}
                  render={({ field }) => <Editor {...field} />}
                />
                {errors.content && <p className="text-red-500 text-xs mt-1">{errors.content.message}</p>}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle>Post Settings</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Category</Label>
                <Controller
                  name="categoryId"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger ref={field.ref}><SelectValue placeholder="Select category" /></SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.categoryId && <p className="text-red-500 text-xs mt-1">{errors.categoryId.message}</p>}
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input id="tags" {...register("tags")} />
              </div>
              <div>
                <Label>Status</Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  {...register("isFeatured")}
                  className="h-4 w-4"
                />
                <Label htmlFor="isFeatured">Featured Post</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPopular"
                  {...register("isPopular")}
                  className="h-4 w-4"
                />
                <Label htmlFor="isPopular">Popular Post</Label>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Featured Image</CardTitle></CardHeader>
            <CardContent>
              <Label htmlFor="imageUrl">Image URL</Label>
              <Input id="imageUrl" {...register("featuredImage")} />
              {errors.featuredImage && <p className="text-red-500 text-xs mt-1">{errors.featuredImage.message}</p>}
            </CardContent>
          </Card>
        </div>
      </div>
    </form>
  );
}
