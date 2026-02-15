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
    <div className="space-y-4" data-oid="0zoegzi">
      {/* Header */}
      <div className="flex items-center justify-between" data-oid="qmv1uz3">
        <h2 className="text-2xl font-bold" data-oid="rrh5gt3">
          Manage Articles
        </h2>
        <Button onClick={onCreateNew} data-oid="cbv02x4">
          <Plus className="h-4 w-4 mr-2" data-oid="5befvd3" />
          Create New Post
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4" data-oid="5g.2qx9">
        <div className="relative flex-1 max-w-sm" data-oid="pk59a95">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
            data-oid="u-r_fy8"
          />

          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-oid="91:5dg4"
          />
        </div>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          data-oid="yfcdytu"
        >
          <SelectTrigger className="w-48" data-oid="7xwqils">
            <Filter className="h-4 w-4 mr-2" data-oid="9q9cu0o" />
            <SelectValue placeholder="Filter by category" data-oid="up.c3kh" />
          </SelectTrigger>
          <SelectContent data-oid="85mhpr-">
            <SelectItem value="all" data-oid="7cmthdi">
              All Categories
            </SelectItem>
            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.slug}
                data-oid="u1rabv4"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg" data-oid="p4p6pfy">
        <Table data-oid="ts1xh58">
          <TableHeader data-oid="nhk5t7w">
            <TableRow data-oid="lar5754">
              <TableHead data-oid="otys6go">Title</TableHead>
              <TableHead data-oid="bmtnluj">Status</TableHead>
              <TableHead data-oid="2qj1.86">Category</TableHead>
              <TableHead data-oid="zbx24fi">Author</TableHead>
              <TableHead data-oid=".fd3s0i">Date</TableHead>
              <TableHead data-oid="zyx2d4b">Views</TableHead>
              <TableHead className="w-12" data-oid="m6d4nqo"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody data-oid="q98ozk3">
            {currentItems.map((article) => (
              <TableRow key={article.id} data-oid="kgkmfni">
                <TableCell data-oid="vf5kl02">
                  <div className="max-w-xs" data-oid="na4496v">
                    <p className="font-medium truncate" data-oid="z9c4wc7">
                      {article.title}
                    </p>
                    <p
                      className="text-sm text-muted-foreground truncate"
                      data-oid="kih-qet"
                    >
                      {article.excerpt}
                    </p>
                  </div>
                </TableCell>
                <TableCell data-oid="chlquu0">
                  <Badge
                    variant={
                      article.status === "published" ? "default" : "secondary"
                    }
                    data-oid="g7b4ivj"
                  >
                    {article.status}
                  </Badge>
                </TableCell>
                <TableCell data-oid="bh.7u:s">
                  <Badge
                    className={article.category.color}
                    variant="secondary"
                    data-oid="wy:f39r"
                  >
                    {article.category.name}
                  </Badge>
                </TableCell>
                <TableCell data-oid="wcpngop">
                  <div
                    className="flex items-center space-x-2"
                    data-oid="d8m7h5m"
                  >
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="h-6 w-6 rounded-full"
                      data-oid="a:t4d.j"
                    />

                    <span className="text-sm" data-oid="2f6:72w">
                      {article.author.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm" data-oid="9_tj2_v">
                  {formatDate(article.publishedAt)}
                </TableCell>
                <TableCell className="text-sm" data-oid="16zk2ej">
                  {article.views.toLocaleString()}
                </TableCell>
                <TableCell data-oid="vliy6ds">
                  <DropdownMenu data-oid="-aq_az2">
                    <DropdownMenuTrigger asChild data-oid="fxme6oh">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        data-oid="w1888h6"
                      >
                        <MoreHorizontal
                          className="h-4 w-4"
                          data-oid="zm16vgo"
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" data-oid="9qt.-vp">
                      <DropdownMenuItem data-oid="xgugmir">
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem data-oid="0fi77.b">
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem data-oid="6kdc7cq">
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        data-oid="wuktc88"
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
        data-oid="l3wyfjh"
      >
        <span className="text-sm text-muted-foreground" data-oid="t8rt3ie">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          data-oid="93e.vn7"
        >
          Previous
        </Button>
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          data-oid="d.5mwx0"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
