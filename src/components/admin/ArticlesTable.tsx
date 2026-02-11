import React, { useState } from "react";
import { MoreHorizontal, Search, Filter, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { articles, categories } from "@/data/mockData";

interface ArticlesTableProps {
  onCreateNew: () => void;
}

export function ArticlesTable({ onCreateNew }: ArticlesTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || article.category.slug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-4" data-oid="bd3l-ue">
      {/* Header */}
      <div className="flex items-center justify-between" data-oid="4e-u144">
        <h2 className="text-2xl font-bold" data-oid="cpk8dan">
          Manage Articles
        </h2>
        <Button onClick={onCreateNew} data-oid=".:yhxd4">
          <Plus className="h-4 w-4 mr-2" data-oid="9x70v59" />
          Create New Post
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4" data-oid="5lr74if">
        <div className="relative flex-1 max-w-sm" data-oid="am84xuc">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
            data-oid="w_sql7g"
          />

          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-oid="_950w4a"
          />
        </div>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          data-oid="hq50.vh"
        >
          <SelectTrigger className="w-48" data-oid="y.3mrb9">
            <Filter className="h-4 w-4 mr-2" data-oid="z-g0xc8" />
            <SelectValue placeholder="Filter by category" data-oid="kul_5vu" />
          </SelectTrigger>
          <SelectContent data-oid="ud6t:o.">
            <SelectItem value="all" data-oid="dfzun25">
              All Categories
            </SelectItem>
            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.slug}
                data-oid="9:xt9cs"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg" data-oid="lwu:zwl">
        <Table data-oid="kfdhz7q">
          <TableHeader data-oid="sver_m.">
            <TableRow data-oid="mw07mpd">
              <TableHead data-oid="49kem-7">Title</TableHead>
              <TableHead data-oid="jv286p4">Status</TableHead>
              <TableHead data-oid="46w22l:">Category</TableHead>
              <TableHead data-oid="yo6z7zz">Author</TableHead>
              <TableHead data-oid="7a.7jbk">Date</TableHead>
              <TableHead data-oid="asvmme:">Views</TableHead>
              <TableHead className="w-12" data-oid="m4x80f:"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody data-oid="wu:803o">
            {filteredArticles.map((article) => (
              <TableRow key={article.id} data-oid="6onl5ga">
                <TableCell data-oid="l:m68c0">
                  <div className="max-w-xs" data-oid="paocg02">
                    <p className="font-medium truncate" data-oid="nxf-ku7">
                      {article.title}
                    </p>
                    <p
                      className="text-sm text-muted-foreground truncate"
                      data-oid="w33tgaj"
                    >
                      {article.excerpt}
                    </p>
                  </div>
                </TableCell>
                <TableCell data-oid="wtidwle">
                  <Badge
                    variant={
                      article.status === "published" ? "default" : "secondary"
                    }
                    data-oid="vl0sa1i"
                  >
                    {article.status}
                  </Badge>
                </TableCell>
                <TableCell data-oid="6l:ihjd">
                  <Badge
                    className={article.category.color}
                    variant="secondary"
                    data-oid="_n.zzit"
                  >
                    {article.category.name}
                  </Badge>
                </TableCell>
                <TableCell data-oid="-0dvt1:">
                  <div
                    className="flex items-center space-x-2"
                    data-oid="cd1q7fb"
                  >
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="h-6 w-6 rounded-full"
                      data-oid="kjcadnh"
                    />

                    <span className="text-sm" data-oid="26174u1">
                      {article.author.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm" data-oid="nv:pa-d">
                  {formatDate(article.publishedAt)}
                </TableCell>
                <TableCell className="text-sm" data-oid="0o.v2:3">
                  {article.views.toLocaleString()}
                </TableCell>
                <TableCell data-oid="gb-e6.v">
                  <DropdownMenu data-oid="zvh0v87">
                    <DropdownMenuTrigger asChild data-oid="a6umql4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        data-oid="up9eqj:"
                      >
                        <MoreHorizontal
                          className="h-4 w-4"
                          data-oid="als402o"
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" data-oid="xs1f.c9">
                      <DropdownMenuItem data-oid="hdbwlgx">
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem data-oid="4a1tays">
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem data-oid="_ae.24o">
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        data-oid="gl3mted"
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
