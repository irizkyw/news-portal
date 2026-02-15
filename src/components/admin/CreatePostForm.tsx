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

  return <div ref={quillRef} data-oid="yv8gs8g" />;
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
    <div className="space-y-6" data-oid="1b2nhdk">
      <div className="flex items-center justify-between" data-oid="i1vbo9n">
        <h2 className="text-2xl font-bold" data-oid="mzr2uho">
          Create New Post
        </h2>
        <div className="flex items-center space-x-2" data-oid="nuu_6rq">
          <Button variant="outline" onClick={handlePreview} data-oid="yrp9rr6">
            <Eye className="h-4 w-4 mr-2" data-oid="xbbq.lk" />
            Preview
          </Button>
          <Button onClick={handleSubmit} data-oid="1dfp8f:">
            <Save className="h-4 w-4 mr-2" data-oid="u86mjbt" />
            Save Post
          </Button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        data-oid="_iood_4"
      >
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6" data-oid="393rzis">
          <Card data-oid="eva4lh-">
            <CardHeader data-oid="qnjy528">
              <CardTitle data-oid="3f8z9gp">Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="84dl1n2">
              <div data-oid="z2a5_g6">
                <Label htmlFor="title" data-oid="rtc5ln8">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter post title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="text-lg font-semibold"
                  data-oid="3z7owiu"
                />
              </div>

              <div data-oid="5t1cfnj">
                <Label htmlFor="excerpt" data-oid="fgc.6bz">
                  Excerpt
                </Label>
                <Textarea
                  id="excerpt"
                  placeholder="Brief description of the post..."
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  rows={3}
                  data-oid="uz7zw96"
                />
              </div>

              <div data-oid="iv:dgoi">
                <Label data-oid="_4.tv:5">Content</Label>
                <div className="bg-background" data-oid="8brid_x">
                  <Editor
                    value={formData.content}
                    onChange={handleContentChange}
                    data-oid="6a5lh-x"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6" data-oid="0tr-oe8">
          <Card data-oid="gbfq6.b">
            <CardHeader data-oid="ceh_6nm">
              <CardTitle data-oid="6zntqsk">Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="elt3od7">
              <div data-oid="n0ds0ne">
                <Label htmlFor="category" data-oid="g1y4hq5">
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                  data-oid="v-d1.vf"
                >
                  <SelectTrigger data-oid="p-2dz2r">
                    <SelectValue
                      placeholder="Select category"
                      data-oid="-jhbgq3"
                    />
                  </SelectTrigger>
                  <SelectContent data-oid="vc89j-z">
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.slug}
                        data-oid="l:t9bf3"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div data-oid="dp5l6tn">
                <Label htmlFor="tags" data-oid="kqkhstb">
                  Tags
                </Label>
                <Input
                  id="tags"
                  placeholder="Enter tags, comma-separated"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  data-oid="kyt217x"
                />
              </div>

              <div data-oid="le5-3fe">
                <Label htmlFor="status" data-oid="mjsfysu">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                  data-oid="7g_9dzn"
                >
                  <SelectTrigger data-oid="h8vjwv_">
                    <SelectValue data-oid=":w53hxk" />
                  </SelectTrigger>
                  <SelectContent data-oid="ajrv1x2">
                    <SelectItem value="draft" data-oid="2-04l0_">
                      Draft
                    </SelectItem>
                    <SelectItem value="published" data-oid="92.9tp0">
                      Published
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card data-oid="llgann5">
            <CardHeader data-oid="n.6-elg">
              <CardTitle data-oid="lzgjj1a">Featured Image</CardTitle>
            </CardHeader>
            <CardContent data-oid="dew2e40">
              <div className="space-y-4" data-oid="1quq7o7">
                {formData.featuredImage ? (
                  <div className="relative" data-oid="4dxzcv8">
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="w-full h-32 object-cover rounded-lg"
                      data-oid="izn4grr"
                    />

                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleInputChange("featuredImage", "")}
                      data-oid="t0l0rx-"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center"
                    data-oid="nzhec.2"
                  >
                    <Upload
                      className="h-8 w-8 mx-auto mb-2 text-muted-foreground"
                      data-oid="gf2b_hc"
                    />

                    <p
                      className="text-sm text-muted-foreground mb-2"
                      data-oid="g9hprvn"
                    >
                      Click to upload or drag and drop
                    </p>
                    <Button variant="outline" size="sm" data-oid="s0mzahd">
                      Choose File
                    </Button>
                  </div>
                )}

                <div data-oid="88q.2jy">
                  <Label htmlFor="imageUrl" data-oid="5:lb3g4">
                    Or enter image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={formData.featuredImage}
                    onChange={(e) =>
                      handleInputChange("featuredImage", e.target.value)
                    }
                    data-oid="8.swhrd"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-oid="13_vuva">
            <CardHeader data-oid="jgl.64g">
              <CardTitle data-oid="opyyi3v">SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="fr6x0rr">
              <div data-oid="tvnk-p3">
                <Label htmlFor="slug" data-oid="xq.jhjs">
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
                  data-oid="wx3ato:"
                />
              </div>

              <div data-oid="2s63qoy">
                <Label htmlFor="metaDescription" data-oid="7zu_fls">
                  Meta Description
                </Label>
                <Textarea
                  id="metaDescription"
                  placeholder="SEO description..."
                  rows={3}
                  data-oid="mdy.yi:"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
