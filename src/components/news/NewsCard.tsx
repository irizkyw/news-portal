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
      <Card className="overflow-hidden border-0 shadow-lg" data-oid="h2z8_:0">
        <div className="relative" data-oid=".5l8tgb">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-64 md:h-80 object-cover"
            data-oid="z_v:i-2"
          />

          <div className="absolute top-4 left-4" data-oid="1nxxbb6">
            <Badge className={article.category.color} data-oid="5_50:97">
              {article.category.name}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6" data-oid="_0326nl">
          <h2
            className="text-2xl font-bold mb-3 line-clamp-2 hover:text-primary cursor-pointer"
            data-oid="_w9vi9o"
          >
            <a href={`/news/${article.slug}`} data-oid="f7676ex">
              {article.title}
            </a>
          </h2>
          <p
            className="text-muted-foreground mb-4 line-clamp-3"
            data-oid=":74aq86"
          >
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between" data-oid="0_iel_r">
            <div className="flex items-center space-x-3" data-oid="o71q2s2">
              <Avatar className="h-8 w-8" data-oid="qa9pwn2">
                <AvatarImage src={article.author.avatar} data-oid=":wc907r" />
                <AvatarFallback data-oid="bijon6z">
                  {article.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm" data-oid="7n-gw62">
                <p className="font-medium" data-oid="m1wjr2q">
                  {article.author.name}
                </p>
                <p className="text-muted-foreground" data-oid="59leq3:">
                  {formatDate(article.publishedAt)}
                </p>
              </div>
            </div>
            <div
              className="flex items-center space-x-4 text-sm text-muted-foreground"
              data-oid="tizv821"
            >
              <div className="flex items-center space-x-1" data-oid="9qqecm2">
                <Clock className="h-4 w-4" data-oid="0s79os0" />
                <span data-oid="dw4ejw5">{article.readTime} min</span>
              </div>
              <div className="flex items-center space-x-1" data-oid="m2e7wke">
                <Eye className="h-4 w-4" data-oid="v8:3a3s" />
                <span data-oid="08:qeo5">{formatViews(article.views)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (variant === "compact") {
    return (
      <Card
        className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow"
        data-oid="sju7j:e"
      >
        <div className="flex" data-oid="ywxfqok">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-24 h-24 object-cover flex-shrink-0"
            data-oid="3u0gehw"
          />

          <CardContent className="p-4 flex-1" data-oid=".zbay4z">
            <Badge
              className={`${article.category.color} mb-2`}
              variant="secondary"
              data-oid="4afyn01"
            >
              {article.category.name}
            </Badge>
            <h3
              className="font-semibold text-sm line-clamp-2 mb-2 hover:text-primary cursor-pointer"
              data-oid="a:8ri0f"
            >
              <a href={`/news/${article.slug}`} data-oid="k_rnsaf">
                {article.title}
              </a>
            </h3>
            <div
              className="flex items-center justify-between text-xs text-muted-foreground"
              data-oid="kacad2d"
            >
              <span data-oid="a_p9mk_">{formatDate(article.publishedAt)}</span>
              <span data-oid="gyftvtw">{article.readTime} min read</span>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow"
      data-oid="fqa5syn"
    >
      <div className="relative" data-oid="kz3yxwr">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-48 object-cover"
          data-oid="n64lane"
        />

        <div className="absolute top-3 left-3" data-oid="z7q7zgv">
          <Badge className={article.category.color} data-oid=":3r3xop">
            {article.category.name}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4" data-oid="5dne1-1">
        <h3
          className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary cursor-pointer"
          data-oid="nk4trt2"
        >
          <a href={`/news/${article.slug}`} data-oid="vr98hrm">
            {article.title}
          </a>
        </h3>
        <p
          className="text-muted-foreground text-sm mb-4 line-clamp-2"
          data-oid="h:6l3uy"
        >
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between" data-oid="j8riptk">
          <div className="flex items-center space-x-2" data-oid="om_a9fd">
            <Avatar className="h-6 w-6" data-oid="ofidfm7">
              <AvatarImage src={article.author.avatar} data-oid="w0l.:q0" />
              <AvatarFallback className="text-xs" data-oid="0:i6:9t">
                {article.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-xs" data-oid="q2i57qk">
              <p className="font-medium" data-oid="3vycw2b">
                {article.author.name}
              </p>
              <p className="text-muted-foreground" data-oid="qeypc6o">
                {formatDate(article.publishedAt)}
              </p>
            </div>
          </div>
          <div
            className="flex items-center space-x-3 text-xs text-muted-foreground"
            data-oid="wl08gh8"
          >
            <div className="flex items-center space-x-1" data-oid="n0.ji_h">
              <Clock className="h-3 w-3" data-oid="ema-qee" />
              <span data-oid="h4g_rjm">{article.readTime}m</span>
            </div>
            <div className="flex items-center space-x-1" data-oid="vv7d379">
              <Eye className="h-3 w-3" data-oid="5hvmic7" />
              <span data-oid="-7ue8ll">{formatViews(article.views)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
