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

  return <div ref={quillRef} data-oid="_sy9k1q" />;
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
    <div className="space-y-6" data-oid="imt2m4k">
      <div className="flex items-center justify-between" data-oid="kz_cn1z">
        <h2 className="text-2xl font-bold" data-oid="uvoonbq">
          Create New Post
        </h2>
        <div className="flex items-center space-x-2" data-oid="sw7vdnn">
          <Button variant="outline" onClick={handlePreview} data-oid="cvb6bey">
            <Eye className="h-4 w-4 mr-2" data-oid="tr:_-lc" />
            Preview
          </Button>
          <Button onClick={handleSubmit} data-oid="xxyro_3">
            <Save className="h-4 w-4 mr-2" data-oid="7pr7e-e" />
            Save Post
          </Button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        data-oid="v2eg4mm"
      >
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6" data-oid="-j952t2">
          <Card data-oid="4kc4lv_">
            <CardHeader data-oid="tg9oomm">
              <CardTitle data-oid="8ajg5-q">Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="clkmp.3">
              <div data-oid="uz2bpc7">
                <Label htmlFor="title" data-oid="au58ju.">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter post title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="text-lg font-semibold"
                  data-oid="uiog6:b"
                />
              </div>

              <div data-oid="1ytdagi">
                <Label htmlFor="excerpt" data-oid="f8ruzui">
                  Excerpt
                </Label>
                <Textarea
                  id="excerpt"
                  placeholder="Brief description of the post..."
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  rows={3}
                  data-oid="y5g10y3"
                />
              </div>

              <div data-oid="a65tch9">
                <Label data-oid="fphbd-m">Content</Label>
                <div className="bg-background" data-oid="lc:32pf">
                  <Editor
                    value={formData.content}
                    onChange={handleContentChange}
                    data-oid="3m24z-c"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6" data-oid="arxsidd">
          <Card data-oid="i33zlua">
            <CardHeader data-oid="nd_gi7i">
              <CardTitle data-oid="q90-ajc">Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="70eu-24">
              <div data-oid="5u73_yn">
                <Label htmlFor="category" data-oid="561-0wt">
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                  data-oid="jjrbvgx"
                >
                  <SelectTrigger data-oid="a6djmaw">
                    <SelectValue
                      placeholder="Select category"
                      data-oid="_vfnga2"
                    />
                  </SelectTrigger>
                  <SelectContent data-oid="d:jyp3a">
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.slug}
                        data-oid="51x-jj0"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div data-oid="zyjq7._">
                <Label htmlFor="tags" data-oid="9a2.tg_">
                  Tags
                </Label>
                <Input
                  id="tags"
                  placeholder="Enter tags, comma-separated"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  data-oid="olhjn31"
                />
              </div>

              <div data-oid="43ctp8f">
                <Label htmlFor="status" data-oid="rr:dg:i">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                  data-oid="2t3:lbv"
                >
                  <SelectTrigger data-oid="0x2a.w4">
                    <SelectValue data-oid="ovu9r0m" />
                  </SelectTrigger>
                  <SelectContent data-oid="c-pdygz">
                    <SelectItem value="draft" data-oid="yy1r5or">
                      Draft
                    </SelectItem>
                    <SelectItem value="published" data-oid="j.77bhu">
                      Published
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card data-oid="l3ckl8q">
            <CardHeader data-oid="u-q3oq7">
              <CardTitle data-oid="ukxccdb">Featured Image</CardTitle>
            </CardHeader>
            <CardContent data-oid="ao2wmb7">
              <div className="space-y-4" data-oid="dzvev60">
                {formData.featuredImage ? (
                  <div className="relative" data-oid="ed359_u">
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="w-full h-32 object-cover rounded-lg"
                      data-oid=".fjx9:p"
                    />

                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleInputChange("featuredImage", "")}
                      data-oid="trp7tbk"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center"
                    data-oid="y78szj6"
                  >
                    <Upload
                      className="h-8 w-8 mx-auto mb-2 text-muted-foreground"
                      data-oid="uatt1.f"
                    />

                    <p
                      className="text-sm text-muted-foreground mb-2"
                      data-oid="6vrqq6y"
                    >
                      Click to upload or drag and drop
                    </p>
                    <Button variant="outline" size="sm" data-oid="r-gvyew">
                      Choose File
                    </Button>
                  </div>
                )}

                <div data-oid="mib0v:c">
                  <Label htmlFor="imageUrl" data-oid="qqg6_g:">
                    Or enter image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={formData.featuredImage}
                    onChange={(e) =>
                      handleInputChange("featuredImage", e.target.value)
                    }
                    data-oid="linmjjl"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-oid="3r:9lv5">
            <CardHeader data-oid="4czxqjj">
              <CardTitle data-oid="z7m04kc">SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="_apbvg0">
              <div data-oid="wqqy-ze">
                <Label htmlFor="slug" data-oid=".:dzr3g">
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
                  data-oid="i-v_fzy"
                />
              </div>

              <div data-oid="8ehvlk.">
                <Label htmlFor="metaDescription" data-oid="v.2o:sm">
                  Meta Description
                </Label>
                <Textarea
                  id="metaDescription"
                  placeholder="SEO description..."
                  rows={3}
                  data-oid="_vj7gvw"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
