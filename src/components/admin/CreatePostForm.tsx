import React, { useState, useEffect } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import { Save, Eye, Upload } from "lucide-react";
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
import { categories } from "@/data/mockData";

function Editor({ value, onChange }) {
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["clean"],
      ],
    },
    formats: [
      "header",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "bullet",
      "link",
      "image",
    ],

    placeholder: "Start writing your content here...",
  });

  useEffect(() => {
    if (quill) {
      quill.on("text-change", (delta, oldDelta, source) => {
        if (source === "user") {
          onChange(quill.root.innerHTML);
        }
      });

      if (value && value !== quill.root.innerHTML) {
        quill.root.innerHTML = value;
      }
    }
  }, [quill, value, onChange]);

  return <div ref={quillRef} data-oid="p-c7smx" />;
}

export function CreatePostForm() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    featuredImage: "",
    status: "draft",
    tags: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tags = formData.tags.split(",").map((tag) => tag.trim());
    const newArticle = {
      ...formData,
      tags,
    };
    console.log("Form submitted:", newArticle);
    // Handle form submission
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handlePreview = () => {
    localStorage.setItem("previewArticle", JSON.stringify(formData));
    window.open("/preview", "_blank");
  };

  return (
    <div className="space-y-6" data-oid="0l1ozd6">
      <div className="flex items-center justify-between" data-oid="_h:nd6x">
        <h2 className="text-2xl font-bold" data-oid="pxvav8d">
          Create New Post
        </h2>
        <div className="flex items-center space-x-2" data-oid="2crlkqb">
          <Button variant="outline" onClick={handlePreview} data-oid="56xfki_">
            <Eye className="h-4 w-4 mr-2" data-oid="zs:yxxu" />
            Preview
          </Button>
          <Button onClick={handleSubmit} data-oid=":m7_pza">
            <Save className="h-4 w-4 mr-2" data-oid="z0pnri-" />
            Save Post
          </Button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        data-oid="pvizy9s"
      >
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6" data-oid="-l0tjwq">
          <Card data-oid="khpili.">
            <CardHeader data-oid="fqmxgga">
              <CardTitle data-oid="wxkm..n">Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="b.q72:s">
              <div data-oid="hhbfgdd">
                <Label htmlFor="title" data-oid="eylgv02">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter post title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="text-lg font-semibold"
                  data-oid="j_68zdn"
                />
              </div>

              <div data-oid="1qudpfx">
                <Label htmlFor="excerpt" data-oid="lydtyjz">
                  Excerpt
                </Label>
                <Textarea
                  id="excerpt"
                  placeholder="Brief description of the post..."
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  rows={3}
                  data-oid="-mh.ljo"
                />
              </div>

              <div data-oid="xcuiak3">
                <Label data-oid="w_5gxhg">Content</Label>
                <div className="bg-background" data-oid="r5izggd">
                  <Editor
                    value={formData.content}
                    onChange={handleContentChange}
                    data-oid="h5b2d2w"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6" data-oid=".09wl7p">
          <Card data-oid=":p5f77k">
            <CardHeader data-oid="mhna8lp">
              <CardTitle data-oid=":5..8b7">Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="8pyhlwc">
              <div data-oid="kxkwiug">
                <Label htmlFor="category" data-oid="goxo345">
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                  data-oid="q7j6zy7"
                >
                  <SelectTrigger data-oid="arbhzwb">
                    <SelectValue
                      placeholder="Select category"
                      data-oid="._f9se2"
                    />
                  </SelectTrigger>
                  <SelectContent data-oid="83o3smv">
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.slug}
                        data-oid="dg5f6mv"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div data-oid="37n46jd">
                <Label htmlFor="tags" data-oid="b99vzse">
                  Tags
                </Label>
                <Input
                  id="tags"
                  placeholder="Enter tags, comma-separated"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  data-oid="nl5mbw."
                />
              </div>

              <div data-oid="5q79-b8">
                <Label htmlFor="status" data-oid="c39z9y.">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                  data-oid="2t0qv1o"
                >
                  <SelectTrigger data-oid="4bj33rm">
                    <SelectValue data-oid="ro7l00s" />
                  </SelectTrigger>
                  <SelectContent data-oid="k577sw8">
                    <SelectItem value="draft" data-oid="jxi5_4t">
                      Draft
                    </SelectItem>
                    <SelectItem value="published" data-oid="nd:1-mf">
                      Published
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card data-oid="mx152gk">
            <CardHeader data-oid="j46ec62">
              <CardTitle data-oid="nu8.fp5">Featured Image</CardTitle>
            </CardHeader>
            <CardContent data-oid="q:nm6rs">
              <div className="space-y-4" data-oid=":xzcnpw">
                {formData.featuredImage ? (
                  <div className="relative" data-oid="kh12wjn">
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="w-full h-32 object-cover rounded-lg"
                      data-oid="9xs1fo1"
                    />

                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleInputChange("featuredImage", "")}
                      data-oid="viesz8j"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center"
                    data-oid="jnphqyz"
                  >
                    <Upload
                      className="h-8 w-8 mx-auto mb-2 text-muted-foreground"
                      data-oid="xsk8jv1"
                    />

                    <p
                      className="text-sm text-muted-foreground mb-2"
                      data-oid="7ibs:6p"
                    >
                      Click to upload or drag and drop
                    </p>
                    <Button variant="outline" size="sm" data-oid="-cfz0rx">
                      Choose File
                    </Button>
                  </div>
                )}

                <div data-oid="_1nnavu">
                  <Label htmlFor="imageUrl" data-oid="7pd1n5_">
                    Or enter image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={formData.featuredImage}
                    onChange={(e) =>
                      handleInputChange("featuredImage", e.target.value)
                    }
                    data-oid="39qz2jt"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-oid="iu0-o:e">
            <CardHeader data-oid="bdf7jat">
              <CardTitle data-oid="l2t9u7p">SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="t7kx1-s">
              <div data-oid="7bg38l3">
                <Label htmlFor="slug" data-oid="n-d__g.">
                  URL Slug
                </Label>
                <Input
                  id="slug"
                  placeholder="post-url-slug"
                  value={formData.title
                    .toLowerCase()
                    .replace(/\s+/g, "-")
                    .replace(/[^\w-]/g, "")}
                  readOnly
                  className="bg-muted"
                  data-oid="d9:7c7:"
                />
              </div>

              <div data-oid="y0u9vgq">
                <Label htmlFor="metaDescription" data-oid="y6d0._5">
                  Meta Description
                </Label>
                <Textarea
                  id="metaDescription"
                  placeholder="SEO description..."
                  rows={3}
                  data-oid="6kexx2h"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
