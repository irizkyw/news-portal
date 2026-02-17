import React, { useState, useEffect } from "react";
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

const postFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  excerpt: z.string().min(1, "Excerpt is required"),
  content: z.string().min(10, "Content is too short"),
  categoryId: z.string().min(1, "Category is required"),
  featuredImage: z.string().url("Must be a valid URL").optional().or(z.literal('')),
  status: z.enum(["draft", "published"]),
  tags: z.string().optional(),
});

type PostFormData = z.infer<typeof postFormSchema>;

interface PostFormProps {
  article?: Article;
  onSave: (data: Partial<Article>) => void;
  onCancel: () => void;
  isSaving: boolean;
}

function Editor({ value, onChange }) {
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

  return <div ref={quillRef} style={{ minHeight: '300px' }} />;
}

export function CreatePostForm({ article, onSave, onCancel, isSaving }: PostFormProps) {
  const { user } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const {
    register,
    handleSubmit,
    control,
    reset,
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
        ...article,
        categoryId: article.category?.id || "",
        tags: article.tags?.join(", ") || "",
      });
    } else {
      reset({
        title: "",
        excerpt: "",
        content: "",
        categoryId: "",
        featuredImage: "",
        status: "draft",
        tags: "",
      });
    }
  }, [article, reset]);

  const onSubmit = (data: PostFormData) => {
    const finalData: Partial<Article> = {
      ...data,
      tags: data.tags?.split(",").map((tag) => tag.trim()).filter(Boolean),
      author: user, // Add author from context
    };
    onSave(finalData);
  };

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
                      <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
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
                      </SelectContent>
                    </Select>
                  )}
                />
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
