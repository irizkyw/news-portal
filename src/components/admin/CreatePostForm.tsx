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

  return <div ref={quillRef} data-oid="_:aazw5" />;
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
    <div className="space-y-6" data-oid="itxhx_.">
      <div className="flex items-center justify-between" data-oid="mj89y4j">
        <h2 className="text-2xl font-bold" data-oid="t5sjx.5">
          Create New Post
        </h2>
        <div className="flex items-center space-x-2" data-oid="jzbcrqp">
          <Button variant="outline" onClick={handlePreview} data-oid="drscdns">
            <Eye className="h-4 w-4 mr-2" data-oid="7flhljl" />
            Preview
          </Button>
          <Button onClick={handleSubmit} data-oid="w2koqw7">
            <Save className="h-4 w-4 mr-2" data-oid="8cm82qp" />
            Save Post
          </Button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        data-oid="ry2c4jx"
      >
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6" data-oid="gmvfawt">
          <Card data-oid="58pv2pw">
            <CardHeader data-oid="kqw1fsv">
              <CardTitle data-oid="dkt7rip">Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="-v1zu41">
              <div data-oid="63cb053">
                <Label htmlFor="title" data-oid="7byj2ko">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter post title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="text-lg font-semibold"
                  data-oid="tnkhe0m"
                />
              </div>

              <div data-oid="rjd3e51">
                <Label htmlFor="excerpt" data-oid="mh-svdl">
                  Excerpt
                </Label>
                <Textarea
                  id="excerpt"
                  placeholder="Brief description of the post..."
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  rows={3}
                  data-oid="q5qwcmn"
                />
              </div>

              <div data-oid="grs3lvo">
                <Label data-oid="tc15fsf">Content</Label>
                <div className="bg-background" data-oid="__khkam">
                  <Editor
                    value={formData.content}
                    onChange={handleContentChange}
                    data-oid="qgh0i-a"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6" data-oid="jv0pusb">
          <Card data-oid="dt7d5fh">
            <CardHeader data-oid="01q.q2q">
              <CardTitle data-oid="i.75jy7">Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="m_q_d5s">
              <div data-oid="ritkpj5">
                <Label htmlFor="category" data-oid=":1c4zy9">
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                  data-oid="8x1hahl"
                >
                  <SelectTrigger data-oid="4rhc0bn">
                    <SelectValue
                      placeholder="Select category"
                      data-oid="duy2d2s"
                    />
                  </SelectTrigger>
                  <SelectContent data-oid="0q6v2_a">
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.slug}
                        data-oid=".hid5_o"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div data-oid="ikvpwss">
                <Label htmlFor="tags" data-oid="vv9pak3">
                  Tags
                </Label>
                <Input
                  id="tags"
                  placeholder="Enter tags, comma-separated"
                  value={formData.tags}
                  onChange={(e) => handleInputChange("tags", e.target.value)}
                  data-oid="odlyjn1"
                />
              </div>

              <div data-oid="ehqvl86">
                <Label htmlFor="status" data-oid="p0a_x_k">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                  data-oid="ewchp8b"
                >
                  <SelectTrigger data-oid="9._luh-">
                    <SelectValue data-oid="vglda4_" />
                  </SelectTrigger>
                  <SelectContent data-oid=":m5g8s4">
                    <SelectItem value="draft" data-oid="n.0nk6:">
                      Draft
                    </SelectItem>
                    <SelectItem value="published" data-oid="0skvgc2">
                      Published
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card data-oid="w-yzgaw">
            <CardHeader data-oid=".zb7elu">
              <CardTitle data-oid="o.lnc:g">Featured Image</CardTitle>
            </CardHeader>
            <CardContent data-oid="on7uvmn">
              <div className="space-y-4" data-oid="z2rdk:m">
                {formData.featuredImage ? (
                  <div className="relative" data-oid="mmfbna-">
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="w-full h-32 object-cover rounded-lg"
                      data-oid="k2eibv_"
                    />

                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleInputChange("featuredImage", "")}
                      data-oid="5ylht5g"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center"
                    data-oid="xnj.0oe"
                  >
                    <Upload
                      className="h-8 w-8 mx-auto mb-2 text-muted-foreground"
                      data-oid="of-5z.i"
                    />

                    <p
                      className="text-sm text-muted-foreground mb-2"
                      data-oid="8lj52:3"
                    >
                      Click to upload or drag and drop
                    </p>
                    <Button variant="outline" size="sm" data-oid="52iyxqv">
                      Choose File
                    </Button>
                  </div>
                )}

                <div data-oid="a8ke:ii">
                  <Label htmlFor="imageUrl" data-oid=".9z_s-p">
                    Or enter image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={formData.featuredImage}
                    onChange={(e) =>
                      handleInputChange("featuredImage", e.target.value)
                    }
                    data-oid="ul9ye-."
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-oid="f:-uyxv">
            <CardHeader data-oid="2rniavh">
              <CardTitle data-oid=".hx5on6">SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="752np68">
              <div data-oid="oqa-gc_">
                <Label htmlFor="slug" data-oid="xy_prw0">
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
                  data-oid=":-8uars"
                />
              </div>

              <div data-oid="nafwrc7">
                <Label htmlFor="metaDescription" data-oid="f_r:vd4">
                  Meta Description
                </Label>
                <Textarea
                  id="metaDescription"
                  placeholder="SEO description..."
                  rows={3}
                  data-oid="skrz.4_"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
