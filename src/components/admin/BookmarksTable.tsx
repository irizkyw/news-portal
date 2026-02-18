import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getBookmarks, toggleBookmark } from "../../services/api";
import { Article } from "../../types";
import { Trash2, ExternalLink, Bookmark as BookmarkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export function BookmarksTable() {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookmarks = async () => {
    try {
      setLoading(true);
      const data = await getBookmarks();
      setBookmarks(data);
    } catch (error) {
      console.error("Failed to fetch bookmarks:", error);
      toast.error("Failed to load bookmarks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await toggleBookmark(id);
      setBookmarks((prev) => prev.filter((a) => a.id !== id));
      toast.success("Article removed from bookmarks");
    } catch (error) {
      toast.error("Failed to remove bookmark");
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading your bookmarks...</div>;
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl font-bold flex items-center">
          <BookmarkIcon className="mr-2 h-6 w-6 text-primary fill-current" />
          My Saved Articles
        </CardTitle>
      </CardHeader>
      <CardContent>
        {bookmarks.length === 0 ? (
          <div className="text-center py-12 bg-muted/10 rounded-lg border-2 border-dashed">
            <p className="text-muted-foreground">You haven't saved any articles yet.</p>
            <Link to="/">
              <Button variant="link" className="mt-2">Explore Latest News</Button>
            </Link>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[400px]">Article</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Saved Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookmarks.map((article) => (
                <TableRow key={article.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <img 
                        src={article.featuredImage} 
                        alt={article.title} 
                        className="h-12 w-20 object-cover rounded-md shadow-sm"
                      />
                      <div className="flex flex-col">
                        <span className="font-semibold line-clamp-1">{article.title}</span>
                        <span className="text-xs text-muted-foreground">by {article.author?.name}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {article.category && (
                      <Badge variant="secondary" className={article.category.color}>
                        {article.category.name}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {article.createdAt ? new Date(article.createdAt).toLocaleDateString() : 'N/A'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end space-x-2">
                      <Link to={`/posts/${article.slug}`}>
                        <Button variant="ghost" size="icon" title="View Article">
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleRemove(article.id!)}
                        title="Remove Bookmark"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
}
