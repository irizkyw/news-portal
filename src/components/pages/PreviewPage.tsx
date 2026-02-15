import React from "react";
import { Clock, Eye, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewsCard } from "@/components/news/NewsCard";
import { articles, categories, authors } from "@/data/mockData";
import { Newsletter } from "@/components/news/Newsletter";

export function PreviewPage() {
  const articleData = JSON.parse(
    localStorage.getItem("previewArticle") || "{}",
  );

  const article = {
    ...articleData,
    category: categories.find((c) => c.slug === articleData.category),
    author: authors.find((a) => a.id === "1"), // Mock author
  };

  if (!article) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold">Article not found</h1>
      </div>
    );
  }

  const relatedArticles = articles
    .filter(
      (a) => a.id !== article.id && a.category.id === article.category?.id,
    )
    .slice(0, 3);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Article */}
          <article className="lg:col-span-3">
            {/* Article Header */}
            <div className="mb-8">
              <Badge className={article.category?.color} variant="secondary">
                {article.category?.name}
              </Badge>
              <h1 className="text-4xl font-bold mt-4 mb-6 font-serif leading-tight">
                {article.title}
              </h1>

              {/* Article Meta */}
              <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={article.author?.avatar} />

                    <AvatarFallback>
                      {article.author?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{article.author?.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(new Date().toISOString())}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>{article.readTime || 5} min read</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{formatViews(article.views || 0)} views</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {article.featuredImage && (
              <div className="mb-8">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                />
              </div>
            )}

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none font-serif"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Article Actions */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t">
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Bookmark className="h-4 w-4 mr-2" />
                  Save
                </Button>
              </div>
              <div className="flex items-center space-x-2">
                {article.tags?.split(",").map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={article.author?.avatar} />

                    <AvatarFallback>
                      {article.author?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold text-lg">
                      {article.author?.name}
                    </h3>
                    <p className="text-muted-foreground mt-1">
                      {article.author?.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Related Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedArticles.map((relatedArticle) => (
                  <div
                    key={relatedArticle.id}
                    className="border-b last:border-b-0 pb-4 last:pb-0"
                  >
                    <NewsCard article={relatedArticle} variant="compact" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Popular This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {articles
                  .filter((a) => a.isPopular)
                  .slice(0, 3)
                  .map((popularArticle, index) => (
                    <div
                      key={popularArticle.id}
                      className="flex items-start space-x-3"
                    >
                      <span className="text-2xl font-bold text-muted-foreground">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="font-semibold text-sm line-clamp-2 hover:text-primary cursor-pointer">
                          <a href={`/news/${popularArticle.slug}`}>
                            {popularArticle.title}
                          </a>
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {formatViews(popularArticle.views)} views
                        </p>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
      <Newsletter />
    </main>
  );
}
