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
    <div className="space-y-4" data-oid="i-itqr-">
      {/* Header */}
      <div className="flex items-center justify-between" data-oid="mo7iq5e">
        <h2 className="text-2xl font-bold" data-oid="-aop1hx">
          Manage Articles
        </h2>
        <Button onClick={onCreateNew} data-oid="iuhp.lw">
          <Plus className="h-4 w-4 mr-2" data-oid="ptufa3s" />
          Create New Post
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4" data-oid="24k3nd3">
        <div className="relative flex-1 max-w-sm" data-oid="jn7aqv3">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
            data-oid="zhkoo0c"
          />

          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-oid="jq1zab0"
          />
        </div>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          data-oid="e0xk7ar"
        >
          <SelectTrigger className="w-48" data-oid="uf4579i">
            <Filter className="h-4 w-4 mr-2" data-oid="ix90071" />
            <SelectValue placeholder="Filter by category" data-oid="ej800x4" />
          </SelectTrigger>
          <SelectContent data-oid="2yhsr23">
            <SelectItem value="all" data-oid="swzx21b">
              All Categories
            </SelectItem>
            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.slug}
                data-oid="c304zq4"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg" data-oid="712mxga">
        <Table data-oid="_e_m:z2">
          <TableHeader data-oid="pkpe7kj">
            <TableRow data-oid="vl0k98u">
              <TableHead data-oid=":twbar_">Title</TableHead>
              <TableHead data-oid="tmfz-0l">Status</TableHead>
              <TableHead data-oid="6yjf23y">Category</TableHead>
              <TableHead data-oid="k-8sx4j">Author</TableHead>
              <TableHead data-oid="vod4alp">Date</TableHead>
              <TableHead data-oid="mxbrc:.">Views</TableHead>
              <TableHead className="w-12" data-oid="gn5b19p"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody data-oid="21dcl.8">
            {currentItems.map((article) => (
              <TableRow key={article.id} data-oid="zvtu:84">
                <TableCell data-oid="66xnohs">
                  <div className="max-w-xs" data-oid="uji.utb">
                    <p className="font-medium truncate" data-oid="v9vxo91">
                      {article.title}
                    </p>
                    <p
                      className="text-sm text-muted-foreground truncate"
                      data-oid="z9xz.--"
                    >
                      {article.excerpt}
                    </p>
                  </div>
                </TableCell>
                <TableCell data-oid="21rmlv4">
                  <Badge
                    variant={
                      article.status === "published" ? "default" : "secondary"
                    }
                    data-oid="_o-vbc_"
                  >
                    {article.status}
                  </Badge>
                </TableCell>
                <TableCell data-oid="i0-7icq">
                  <Badge
                    className={article.category.color}
                    variant="secondary"
                    data-oid="gvm:1b-"
                  >
                    {article.category.name}
                  </Badge>
                </TableCell>
                <TableCell data-oid="92ix_h:">
                  <div
                    className="flex items-center space-x-2"
                    data-oid="v9k3:yn"
                  >
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="h-6 w-6 rounded-full"
                      data-oid="07z32b7"
                    />

                    <span className="text-sm" data-oid="0ny2lfo">
                      {article.author.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm" data-oid="95rsio7">
                  {formatDate(article.publishedAt)}
                </TableCell>
                <TableCell className="text-sm" data-oid="x9sxirr">
                  {article.views.toLocaleString()}
                </TableCell>
                <TableCell data-oid="_.h.a.z">
                  <DropdownMenu data-oid="bfrwrqe">
                    <DropdownMenuTrigger asChild data-oid="g29xlbh">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        data-oid="pelyvig"
                      >
                        <MoreHorizontal
                          className="h-4 w-4"
                          data-oid="coj5_:q"
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" data-oid="yj:kqu8">
                      <DropdownMenuItem data-oid="npo336p">
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem data-oid="4c9q7::">
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem data-oid="27jjyc7">
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        data-oid="msi.z-b"
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
        data-oid="9e2z:-p"
      >
        <span className="text-sm text-muted-foreground" data-oid="mhcz-b9">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          data-oid="h80v-o:"
        >
          Previous
        </Button>
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          data-oid="si_twil"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
