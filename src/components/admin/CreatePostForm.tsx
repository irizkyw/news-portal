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

  return <div ref={quillRef} data-oid="y3cwzhn" />;
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
    <div className="space-y-6" data-oid="yacb6x4">
      <div className="flex items-center justify-between" data-oid="7whwltn">
        <h2 className="text-2xl font-bold" data-oid="gwrbra.">
          Create New Post
        </h2>
        <div className="flex items-center space-x-2" data-oid="soa_ipi">
          <Button variant="outline" onClick={handlePreview} data-oid="nbn2qma">
            <Eye className="h-4 w-4 mr-2" data-oid="0r9uk:_" />
            Preview
          </Button>
          <Button onClick={handleSubmit} data-oid="i8ej4bx">
            <Save className="h-4 w-4 mr-2" data-oid="b79xh2q" />
            Save Post
          </Button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        data-oid="7s5.rpa"
      >
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6" data-oid="5dd0tk4">
          <Card data-oid="uxzz4xm">
            <CardHeader data-oid="k4h_j0h">
              <CardTitle data-oid="2h2vg7f">Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="-t:jq16">
              <div data-oid="lmnnq_d">
                <Label htmlFor="title" data-oid="21iv2.y">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter post title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="text-lg font-semibold"
                  data-oid="6lbg8-h"
                />
              </div>

              <div data-oid="qtu.lfc">
                <Label htmlFor="excerpt" data-oid="__elpo0">
                  Excerpt
                </Label>
                <Textarea
                  id="excerpt"
                  placeholder="Brief description of the post..."
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  rows={3}
                  data-oid="24sktf9"
                />
              </div>

              <div data-oid="qj1ulji">
                <Label data-oid=".6ae0pa">Content</Label>
                <div className="bg-background" data-oid="o.ghwto">
                  <Editor
                    value={formData.content}
                    onChange={handleContentChange}
                    data-oid="-09p.o-"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6" data-oid="t2emg-s">
          <Card data-oid="8g488_k">
            <CardHeader data-oid="orlhsjx">
              <CardTitle data-oid="y3igea-">Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="ephdalr">
              <div data-oid="gdw277a">
                <Label htmlFor="category" data-oid="-qnftr_">
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                  data-oid="0-vet4m"
                >
                  <SelectTrigger data-oid="7lc_khh">
                    <SelectValue
                      placeholder="Select category"
                      data-oid="7gambry"
                    />
                  </SelectTrigger>
                  <SelectContent data-oid="4tw13ks">
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.slug}
                        data-oid="qt.n.xo"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div data-oid="nf-7v__">
                <Label htmlFor="tags" data-oid="wsc0t.v">
                  Tags
                </Label>
                <Input
                  id="tags"
                  placeholder="Enter tags, comma-separated"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  data-oid="8x.knhp"
                />
              </div>

              <div data-oid="88o:9gu">
                <Label htmlFor="status" data-oid="hlb39_5">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                  data-oid="cxkl.yy"
                >
                  <SelectTrigger data-oid="k6yhsl6">
                    <SelectValue data-oid="k-v3f:f" />
                  </SelectTrigger>
                  <SelectContent data-oid="gpqbrkq">
                    <SelectItem value="draft" data-oid="y_0-pm4">
                      Draft
                    </SelectItem>
                    <SelectItem value="published" data-oid="za4n43k">
                      Published
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card data-oid="i0jwxm0">
            <CardHeader data-oid="qxvj4q9">
              <CardTitle data-oid="n_u199d">Featured Image</CardTitle>
            </CardHeader>
            <CardContent data-oid="w-.okf3">
              <div className="space-y-4" data-oid="cc3v.pp">
                {formData.featuredImage ? (
                  <div className="relative" data-oid="o.x_mxz">
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="w-full h-32 object-cover rounded-lg"
                      data-oid="zji1f2_"
                    />

                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleInputChange("featuredImage", "")}
                      data-oid="g:l-jt5"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center"
                    data-oid="21e-.pk"
                  >
                    <Upload
                      className="h-8 w-8 mx-auto mb-2 text-muted-foreground"
                      data-oid="g9:wyx9"
                    />

                    <p
                      className="text-sm text-muted-foreground mb-2"
                      data-oid="_37mux0"
                    >
                      Click to upload or drag and drop
                    </p>
                    <Button variant="outline" size="sm" data-oid="pyb2ryb">
                      Choose File
                    </Button>
                  </div>
                )}

                <div data-oid="r434oh5">
                  <Label htmlFor="imageUrl" data-oid="7dudvvr">
                    Or enter image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={formData.featuredImage}
                    onChange={(e) =>
                      handleInputChange("featuredImage", e.target.value)
                    }
                    data-oid="97578y4"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-oid="_tbvydr">
            <CardHeader data-oid="z3lqecn">
              <CardTitle data-oid="a9i1cfm">SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="jshzek3">
              <div data-oid="a95jypt">
                <Label htmlFor="slug" data-oid="rru52e_">
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
                  data-oid="u6.vdfw"
                />
              </div>

              <div data-oid="b5:xwgi">
                <Label htmlFor="metaDescription" data-oid="tsntbbw">
                  Meta Description
                </Label>
                <Textarea
                  id="metaDescription"
                  placeholder="SEO description..."
                  rows={3}
                  data-oid=":yci-oc"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
