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
    <div className="space-y-4" data-oid="q7iajy7">
      {/* Header */}
      <div className="flex items-center justify-between" data-oid="lcpsb.j">
        <h2 className="text-2xl font-bold" data-oid="lbgny97">
          Manage Articles
        </h2>
        <Button onClick={onCreateNew} data-oid="v93m5qf">
          <Plus className="h-4 w-4 mr-2" data-oid="xw-ly4j" />
          Create New Post
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4" data-oid="8p0qfbw">
        <div className="relative flex-1 max-w-sm" data-oid="9z:pkz6">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
            data-oid="h8g692z"
          />

          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-oid="ikjxjsw"
          />
        </div>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          data-oid=".56wr9h"
        >
          <SelectTrigger className="w-48" data-oid="x-x9w3v">
            <Filter className="h-4 w-4 mr-2" data-oid="i2d2n_r" />
            <SelectValue placeholder="Filter by category" data-oid="h199yhr" />
          </SelectTrigger>
          <SelectContent data-oid="-w8zono">
            <SelectItem value="all" data-oid="-zid9em">
              All Categories
            </SelectItem>
            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.slug}
                data-oid="ajlryce"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg" data-oid="ic3ezmi">
        <Table data-oid="e6cgdos">
          <TableHeader data-oid="sfvnccy">
            <TableRow data-oid="gkzv7_4">
              <TableHead data-oid="xkohgpd">Title</TableHead>
              <TableHead data-oid="to_4_7v">Status</TableHead>
              <TableHead data-oid="qgsfh3l">Category</TableHead>
              <TableHead data-oid="ng:k8qm">Author</TableHead>
              <TableHead data-oid="pc1uyr4">Date</TableHead>
              <TableHead data-oid="g312z-7">Views</TableHead>
              <TableHead className="w-12" data-oid="5adx0u0"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody data-oid="fpe4r1x">
            {currentItems.map((article) => (
              <TableRow key={article.id} data-oid="q6puil7">
                <TableCell data-oid="fri:fkf">
                  <div className="max-w-xs" data-oid="bbvzq.:">
                    <p className="font-medium truncate" data-oid="fgv4o_m">
                      {article.title}
                    </p>
                    <p
                      className="text-sm text-muted-foreground truncate"
                      data-oid="eoqd01q"
                    >
                      {article.excerpt}
                    </p>
                  </div>
                </TableCell>
                <TableCell data-oid="4pf3uwv">
                  <Badge
                    variant={
                      article.status === "published" ? "default" : "secondary"
                    }
                    data-oid="zchpc-v"
                  >
                    {article.status}
                  </Badge>
                </TableCell>
                <TableCell data-oid="tefgtm0">
                  <Badge
                    className={article.category.color}
                    variant="secondary"
                    data-oid="u16rmlo"
                  >
                    {article.category.name}
                  </Badge>
                </TableCell>
                <TableCell data-oid="k7uz5rm">
                  <div
                    className="flex items-center space-x-2"
                    data-oid="g:u.y8a"
                  >
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="h-6 w-6 rounded-full"
                      data-oid="z-b71.0"
                    />

                    <span className="text-sm" data-oid="eh_1908">
                      {article.author.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm" data-oid="0832p35">
                  {formatDate(article.publishedAt)}
                </TableCell>
                <TableCell className="text-sm" data-oid="v86uwdj">
                  {article.views.toLocaleString()}
                </TableCell>
                <TableCell data-oid="4.wves0">
                  <DropdownMenu data-oid="kw0wq_q">
                    <DropdownMenuTrigger asChild data-oid="50.dgnp">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        data-oid="fr23neg"
                      >
                        <MoreHorizontal
                          className="h-4 w-4"
                          data-oid=".zzj:7y"
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" data-oid="qph-n82">
                      <DropdownMenuItem data-oid="zq9dbs6">
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem data-oid="f4.:71z">
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem data-oid="gyv2bv2">
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        data-oid="lhk.g:0"
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
        data-oid=".9q2c8q"
      >
        <span className="text-sm text-muted-foreground" data-oid="x6azrwa">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          data-oid="kw2yoab"
        >
          Previous
        </Button>
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          data-oid="9otf4ie"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
