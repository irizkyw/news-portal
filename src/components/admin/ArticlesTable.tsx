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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || article.category.slug === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredArticles.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <div className="space-y-4" data-oid="x997ah3">
      {/* Header */}
      <div className="flex items-center justify-between" data-oid="3se39pk">
        <h2 className="text-2xl font-bold" data-oid="_btd.zm">
          Manage Articles
        </h2>
        <Button onClick={onCreateNew} data-oid="rorwmzx">
          <Plus className="h-4 w-4 mr-2" data-oid="eci6:mp" />
          Create New Post
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4" data-oid="40298.y">
        <div className="relative flex-1 max-w-sm" data-oid="ugvtwpf">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
            data-oid="tt3y9ff"
          />

          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-oid="vt.hclj"
          />
        </div>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          data-oid="q6l0f_z"
        >
          <SelectTrigger className="w-48" data-oid="r.r3516">
            <Filter className="h-4 w-4 mr-2" data-oid="snfs5qa" />
            <SelectValue placeholder="Filter by category" data-oid="i.7880:" />
          </SelectTrigger>
          <SelectContent data-oid="d52891l">
            <SelectItem value="all" data-oid="gqp4wjq">
              All Categories
            </SelectItem>
            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.slug}
                data-oid="zr_vtgc"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg" data-oid="rjxvj3s">
        <Table data-oid="undrnbe">
          <TableHeader data-oid="-4vv9xg">
            <TableRow data-oid="po_lb4k">
              <TableHead data-oid="m6csvcf">Title</TableHead>
              <TableHead data-oid="h8:k_9:">Status</TableHead>
              <TableHead data-oid="ar9jzgi">Category</TableHead>
              <TableHead data-oid="xzry2ea">Author</TableHead>
              <TableHead data-oid="8n:a69g">Date</TableHead>
              <TableHead data-oid="0om3g6r">Views</TableHead>
              <TableHead className="w-12" data-oid=":1w8jz5"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody data-oid="1wu:5qv">
            {currentItems.map((article) => (
              <TableRow key={article.id} data-oid="1ybxdu9">
                <TableCell data-oid="ol-hvl5">
                  <div className="max-w-xs" data-oid="h:to3qe">
                    <p className="font-medium truncate" data-oid="bb-sv8e">
                      {article.title}
                    </p>
                    <p
                      className="text-sm text-muted-foreground truncate"
                      data-oid="ie39y19"
                    >
                      {article.excerpt}
                    </p>
                  </div>
                </TableCell>
                <TableCell data-oid=":4f3o:u">
                  <Badge
                    variant={
                      article.status === "published" ? "default" : "secondary"
                    }
                    data-oid="fi696pw"
                  >
                    {article.status}
                  </Badge>
                </TableCell>
                <TableCell data-oid="17ar.o4">
                  <Badge
                    className={article.category.color}
                    variant="secondary"
                    data-oid="zgx_jp:"
                  >
                    {article.category.name}
                  </Badge>
                </TableCell>
                <TableCell data-oid="9m7z52d">
                  <div
                    className="flex items-center space-x-2"
                    data-oid="x.p_-t5"
                  >
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="h-6 w-6 rounded-full"
                      data-oid="0fa9gvx"
                    />

                    <span className="text-sm" data-oid="3p0j859">
                      {article.author.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm" data-oid="8jff6f7">
                  {formatDate(article.publishedAt)}
                </TableCell>
                <TableCell className="text-sm" data-oid="8v1av5x">
                  {article.views.toLocaleString()}
                </TableCell>
                <TableCell data-oid="nre2ivh">
                  <DropdownMenu data-oid="_9.d_3-">
                    <DropdownMenuTrigger asChild data-oid=":hd7le3">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        data-oid="84rp2f3"
                      >
                        <MoreHorizontal
                          className="h-4 w-4"
                          data-oid="3rc:5eb"
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" data-oid="qvt730u">
                      <DropdownMenuItem data-oid="u.obu6v">
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem data-oid="lufcd2x">
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem data-oid="r-ke_lq">
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        data-oid="v1ma8j-"
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
      {/* Pagination */}
      <div
        className="flex justify-end items-center space-x-4"
        data-oid="pd0qkvu"
      >
        <span className="text-sm text-muted-foreground" data-oid="..1u2nn">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          data-oid="xazlkyj"
        >
          Previous
        </Button>
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          data-oid="64piy93"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
