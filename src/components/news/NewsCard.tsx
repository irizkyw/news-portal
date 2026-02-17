import React from "react";
import { Clock, Eye } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { Article } from "../../types";

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
      <Card className="overflow-hidden border-0 shadow-lg" data-oid="cuk20zz">
        <div className="relative" data-oid="jw2t0.4">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-64 md:h-80 object-cover"
            data-oid="icfnhl5"
          />

          <div className="absolute top-4 left-4" data-oid="zpe8gzu">
            <Badge className={article.category.color} data-oid="lr8..l9">
              {article.category.name}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6" data-oid="8x.uxp.">
          <h2
            className="text-2xl font-bold mb-3 line-clamp-2 hover:text-primary cursor-pointer"
            data-oid="zencz_f"
          >
            <a href={`/news/${article.slug}`} data-oid="kvyun:y">
              {article.title}
            </a>
          </h2>
          <p
            className="text-muted-foreground mb-4 line-clamp-3"
            data-oid="mo14c6g"
          >
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between" data-oid="hras7o.">
            <div className="flex items-center space-x-3" data-oid="kycza62">
              <Avatar className="h-8 w-8" data-oid="962.end">
                <AvatarImage src={article.author.avatar} data-oid="yo9pppc" />
                <AvatarFallback data-oid="r5-tnzy">
                  {article.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm" data-oid="rxqnjx9">
                <p className="font-medium" data-oid="mfg_k7y">
                  {article.author.name}
                </p>
                <p className="text-muted-foreground" data-oid="_uu9tsj">
                  {formatDate(article.publishedAt)}
                </p>
              </div>
            </div>
            <div
              className="flex items-center space-x-4 text-sm text-muted-foreground"
              data-oid="cqnu73y"
            >
              <div className="flex items-center space-x-1" data-oid="_63s.::">
                <Clock className="h-4 w-4" data-oid="9mrpwr:" />
                <span data-oid="zwah1o6">{article.readTime} min</span>
              </div>
              <div className="flex items-center space-x-1" data-oid="0mbiqja">
                <Eye className="h-4 w-4" data-oid="j.memh_" />
                <span data-oid="47r.ga1">{formatViews(article.views)}</span>
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
        data-oid="ymjmj4z"
      >
        <div className="flex" data-oid="_ovw1aa">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-24 h-24 object-cover flex-shrink-0"
            data-oid="c83z6hd"
          />

          <CardContent className="p-4 flex-1" data-oid="2s6vkjk">
            <Badge
              className={`${article.category.color} mb-2`}
              variant="secondary"
              data-oid="ybqh7hr"
            >
              {article.category.name}
            </Badge>
            <h3
              className="font-semibold text-sm line-clamp-2 mb-2 hover:text-primary cursor-pointer"
              data-oid="03xailv"
            >
              <a href={`/news/${article.slug}`} data-oid="f9yjio0">
                {article.title}
              </a>
            </h3>
            <div
              className="flex items-center justify-between text-xs text-muted-foreground"
              data-oid="88t530g"
            >
              <span data-oid="ol0456.">{formatDate(article.publishedAt)}</span>
              <span data-oid="dt5h_m:">{article.readTime} min read</span>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow"
      data-oid="66sgr0s"
    >
      <div className="relative" data-oid="cn0g0gc">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-48 object-cover"
          data-oid="isgjuax"
        />

        <div className="absolute top-3 left-3" data-oid="a2okznw">
          <Badge className={article.category.color} data-oid="eiuer_x">
            {article.category.name}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4" data-oid="seirbfb">
        <h3
          className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary cursor-pointer"
          data-oid="j.4-v:z"
        >
          <a href={`/news/${article.slug}`} data-oid="lu28nvi">
            {article.title}
          </a>
        </h3>
        <p
          className="text-muted-foreground text-sm mb-4 line-clamp-2"
          data-oid="z.s3msp"
        >
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between" data-oid="zgy92t8">
          <div className="flex items-center space-x-2" data-oid="yow5t:b">
            <Avatar className="h-6 w-6" data-oid="400p-m4">
              <AvatarImage src={article.author.avatar} data-oid="1_.4xaq" />
              <AvatarFallback className="text-xs" data-oid="scpx4ev">
                {article.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-xs" data-oid=".6ob8fl">
              <p className="font-medium" data-oid="3butzkj">
                {article.author.name}
              </p>
              <p className="text-muted-foreground" data-oid="ynor79m">
                {formatDate(article.publishedAt)}
              </p>
            </div>
          </div>
          <div
            className="flex items-center space-x-3 text-xs text-muted-foreground"
            data-oid="vk1p.za"
          >
            <div className="flex items-center space-x-1" data-oid="ydc0u5q">
              <Clock className="h-3 w-3" data-oid="wz6426-" />
              <span data-oid="1bgsr8.">{article.readTime}m</span>
            </div>
            <div className="flex items-center space-x-1" data-oid="k62bz74">
              <Eye className="h-3 w-3" data-oid="m0pz_yh" />
              <span data-oid="9liur0e">{formatViews(article.views)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
