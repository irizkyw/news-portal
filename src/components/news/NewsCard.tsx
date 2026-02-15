import React from "react";
import { Clock, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Article } from "@/data/mockData";

interface NewsCardProps {
  article: Article;
  variant?: "default" | "featured" | "compact";
}

export function NewsCard({ article, variant = "default" }: NewsCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
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

  if (variant === "featured") {
    return (
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="relative">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-64 md:h-80 object-cover"
          />

          <div className="absolute top-4 left-4">
            <Badge className={article.category.color}>
              {article.category.name}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold mb-3 line-clamp-2 hover:text-primary cursor-pointer">
            <a href={`/news/${article.slug}`}>{article.title}</a>
          </h2>
          <p className="text-muted-foreground mb-4 line-clamp-3">
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src={article.author.avatar} />
                <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="text-sm">
                <p className="font-medium">{article.author.name}</p>
                <p className="text-muted-foreground">
                  {formatDate(article.publishedAt)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Clock className="h-4 w-4" />
                <span>{article.readTime} min</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="h-4 w-4" />
                <span>{formatViews(article.views)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
        <div className="flex">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-24 h-24 object-cover flex-shrink-0"
          />

          <CardContent className="p-4 flex-1">
            <Badge
              className={`${article.category.color} mb-2`}
              variant="secondary"
            >
              {article.category.name}
            </Badge>
            <h3 className="font-semibold text-sm line-clamp-2 mb-2 hover:text-primary cursor-pointer">
              <a href={`/news/${article.slug}`}>{article.title}</a>
            </h3>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatDate(article.publishedAt)}</span>
              <span>{article.readTime} min read</span>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
      <div className="relative">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-48 object-cover"
        />

        <div className="absolute top-3 left-3">
          <Badge className={article.category.color}>
            {article.category.name}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary cursor-pointer">
          <a href={`/news/${article.slug}`}>{article.title}</a>
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={article.author.avatar} />
              <AvatarFallback className="text-xs">
                {article.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-xs">
              <p className="font-medium">{article.author.name}</p>
              <p className="text-muted-foreground">
                {formatDate(article.publishedAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Clock className="h-3 w-3" />
              <span>{article.readTime}m</span>
            </div>
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{formatViews(article.views)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
