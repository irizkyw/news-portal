import React, { useState } from "react";
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

export function CreatePostForm() {
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    featuredImage: "",
    status: "draft",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Handle form submission
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6" data-oid="4lkual2">
      <div className="flex items-center justify-between" data-oid="03dp1q0">
        <h2 className="text-2xl font-bold" data-oid="6tnm1xz">
          Create New Post
        </h2>
        <div className="flex items-center space-x-2" data-oid="j_m8beg">
          <Button variant="outline" data-oid="rnyh0n6">
            <Eye className="h-4 w-4 mr-2" data-oid="m9sndmj" />
            Preview
          </Button>
          <Button onClick={handleSubmit} data-oid=".6mj72_">
            <Save className="h-4 w-4 mr-2" data-oid="hk.cdd." />
            Save Post
          </Button>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        data-oid="_fb_2km"
      >
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6" data-oid="flxo-gz">
          <Card data-oid="vk4.mnb">
            <CardHeader data-oid="ff7_zao">
              <CardTitle data-oid="jrr81-x">Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="s396xdz">
              <div data-oid="6w17shh">
                <Label htmlFor="title" data-oid="4dvmns_">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter post title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="text-lg font-semibold"
                  data-oid="ljpa6c7"
                />
              </div>

              <div data-oid="h781u3-">
                <Label htmlFor="excerpt" data-oid="psty8zp">
                  Excerpt
                </Label>
                <Textarea
                  id="excerpt"
                  placeholder="Brief description of the post..."
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange("excerpt", e.target.value)}
                  rows={3}
                  data-oid="5-lsb-_"
                />
              </div>

              <div data-oid="2ridsl-">
                <Label htmlFor="content" data-oid="x05rx8o">
                  Content
                </Label>
                <Textarea
                  id="content"
                  placeholder="Write your article content here..."
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  rows={15}
                  className="font-serif"
                  data-oid="qbjj.jn"
                />

                <p
                  className="text-sm text-muted-foreground mt-1"
                  data-oid="m-wo--9"
                >
                  Rich text editor would be integrated here in a real
                  application.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Settings */}
        <div className="space-y-6" data-oid="zszmt4u">
          <Card data-oid="7f9cqxh">
            <CardHeader data-oid="502y8w3">
              <CardTitle data-oid="psj3gw5">Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="zg945zw">
              <div data-oid="tofjp8k">
                <Label htmlFor="category" data-oid=".832_bb">
                  Category
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                  data-oid="31er24q"
                >
                  <SelectTrigger data-oid="nitewkt">
                    <SelectValue
                      placeholder="Select category"
                      data-oid="7pp:sri"
                    />
                  </SelectTrigger>
                  <SelectContent data-oid="sg8_30w">
                    {categories.map((category) => (
                      <SelectItem
                        key={category.id}
                        value={category.slug}
                        data-oid="ky2h63n"
                      >
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div data-oid="r9zcxj.">
                <Label htmlFor="status" data-oid="sw3e.qw">
                  Status
                </Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => handleInputChange("status", value)}
                  data-oid="alsdazy"
                >
                  <SelectTrigger data-oid="m8d9vjx">
                    <SelectValue data-oid="b9yqgqb" />
                  </SelectTrigger>
                  <SelectContent data-oid="z_vwp.6">
                    <SelectItem value="draft" data-oid="g1ihdp5">
                      Draft
                    </SelectItem>
                    <SelectItem value="published" data-oid="v26rtqc">
                      Published
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card data-oid="4z9wh8k">
            <CardHeader data-oid="o4cskgo">
              <CardTitle data-oid="tt29:l:">Featured Image</CardTitle>
            </CardHeader>
            <CardContent data-oid="nh096rx">
              <div className="space-y-4" data-oid="m7zd81i">
                {formData.featuredImage ? (
                  <div className="relative" data-oid="70b_iim">
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="w-full h-32 object-cover rounded-lg"
                      data-oid="_h:t3jq"
                    />

                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => handleInputChange("featuredImage", "")}
                      data-oid="z8s16zh"
                    >
                      Remove
                    </Button>
                  </div>
                ) : (
                  <div
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center"
                    data-oid="tqe3.0y"
                  >
                    <Upload
                      className="h-8 w-8 mx-auto mb-2 text-muted-foreground"
                      data-oid="w_:9qtl"
                    />

                    <p
                      className="text-sm text-muted-foreground mb-2"
                      data-oid="h16ngwp"
                    >
                      Click to upload or drag and drop
                    </p>
                    <Button variant="outline" size="sm" data-oid="2xqtz2q">
                      Choose File
                    </Button>
                  </div>
                )}

                <div data-oid="c92l3im">
                  <Label htmlFor="imageUrl" data-oid="loarg7r">
                    Or enter image URL
                  </Label>
                  <Input
                    id="imageUrl"
                    placeholder="https://example.com/image.jpg"
                    value={formData.featuredImage}
                    onChange={(e) =>
                      handleInputChange("featuredImage", e.target.value)
                    }
                    data-oid="jz8p4pu"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card data-oid="ik1gglq">
            <CardHeader data-oid="h-8gb40">
              <CardTitle data-oid="-qo0ig_">SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="gc-t1xv">
              <div data-oid="f1o-38q">
                <Label htmlFor="slug" data-oid="64n4tvq">
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
                  data-oid="v0r1s93"
                />
              </div>

              <div data-oid="1rsufe4">
                <Label htmlFor="metaDescription" data-oid="1o4vas1">
                  Meta Description
                </Label>
                <Textarea
                  id="metaDescription"
                  placeholder="SEO description..."
                  rows={3}
                  data-oid="t5et3hw"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}
