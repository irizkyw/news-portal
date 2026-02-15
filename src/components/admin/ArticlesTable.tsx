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
    <div className="space-y-4" data-oid=".xm926v">
      {/* Header */}
      <div className="flex items-center justify-between" data-oid="3noi7cu">
        <h2 className="text-2xl font-bold" data-oid="ok40kld">
          Manage Articles
        </h2>
        <Button onClick={onCreateNew} data-oid="6ct-7xb">
          <Plus className="h-4 w-4 mr-2" data-oid="d344:uz" />
          Create New Post
        </Button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4" data-oid="w:7qx5_">
        <div className="relative flex-1 max-w-sm" data-oid="sz4b392">
          <Search
            className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
            data-oid="k2eq-cz"
          />

          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-oid="pernq8-"
          />
        </div>
        <Select
          value={selectedCategory}
          onValueChange={setSelectedCategory}
          data-oid="tdtmalk"
        >
          <SelectTrigger className="w-48" data-oid="c:l:0li">
            <Filter className="h-4 w-4 mr-2" data-oid="mzy_-b9" />
            <SelectValue placeholder="Filter by category" data-oid="1.9sa6y" />
          </SelectTrigger>
          <SelectContent data-oid="ew07z74">
            <SelectItem value="all" data-oid="3py7hj6">
              All Categories
            </SelectItem>
            {categories.map((category) => (
              <SelectItem
                key={category.id}
                value={category.slug}
                data-oid="f0idz16"
              >
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="border rounded-lg" data-oid="51qz8c:">
        <Table data-oid="6zvzhpp">
          <TableHeader data-oid="i8l56lj">
            <TableRow data-oid=".g7:b51">
              <TableHead data-oid="y44z9ml">Title</TableHead>
              <TableHead data-oid=":cyg-b-">Status</TableHead>
              <TableHead data-oid="_zdtbau">Category</TableHead>
              <TableHead data-oid="59-fa6f">Author</TableHead>
              <TableHead data-oid="5gwknvc">Date</TableHead>
              <TableHead data-oid="8uv7yj9">Views</TableHead>
              <TableHead className="w-12" data-oid="80ztb6c"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody data-oid="2bisjf3">
            {currentItems.map((article) => (
              <TableRow key={article.id} data-oid=":7xfpgk">
                <TableCell data-oid="yswg1o:">
                  <div className="max-w-xs" data-oid="scl_b89">
                    <p className="font-medium truncate" data-oid="o2on:sv">
                      {article.title}
                    </p>
                    <p
                      className="text-sm text-muted-foreground truncate"
                      data-oid="dh-o6n1"
                    >
                      {article.excerpt}
                    </p>
                  </div>
                </TableCell>
                <TableCell data-oid=":sutt3n">
                  <Badge
                    variant={
                      article.status === "published" ? "default" : "secondary"
                    }
                    data-oid="6-xxu41"
                  >
                    {article.status}
                  </Badge>
                </TableCell>
                <TableCell data-oid="hxionzn">
                  <Badge
                    className={article.category.color}
                    variant="secondary"
                    data-oid="7w1:w20"
                  >
                    {article.category.name}
                  </Badge>
                </TableCell>
                <TableCell data-oid="e8mtij_">
                  <div
                    className="flex items-center space-x-2"
                    data-oid="a-p26k2"
                  >
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="h-6 w-6 rounded-full"
                      data-oid="lrxej1z"
                    />

                    <span className="text-sm" data-oid="j2mvoyq">
                      {article.author.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm" data-oid="3-jl6a1">
                  {formatDate(article.publishedAt)}
                </TableCell>
                <TableCell className="text-sm" data-oid="pnbqmf5">
                  {article.views.toLocaleString()}
                </TableCell>
                <TableCell data-oid="3mxzvz1">
                  <DropdownMenu data-oid="hfb3b.b">
                    <DropdownMenuTrigger asChild data-oid="xzwiss9">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        data-oid="5z3oads"
                      >
                        <MoreHorizontal
                          className="h-4 w-4"
                          data-oid="kv_6cy4"
                        />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" data-oid="7_0c91v">
                      <DropdownMenuItem data-oid="gyge_af">
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem data-oid="lkbemfg">
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem data-oid="ejwrz54">
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        data-oid="7wrmk_z"
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
        data-oid=".qua54i"
      >
        <span className="text-sm text-muted-foreground" data-oid="pc8vp4:">
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          variant="outline"
          size="sm"
          data-oid="gkmv36h"
        >
          Previous
        </Button>
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="outline"
          size="sm"
          data-oid="z2_o.j-"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
