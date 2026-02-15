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
      <Card className="overflow-hidden border-0 shadow-lg" data-oid="xdjn.tl">
        <div className="relative" data-oid="42z.tfx">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-64 md:h-80 object-cover"
            data-oid="5yv4jfq"
          />

          <div className="absolute top-4 left-4" data-oid="wqfolie">
            <Badge className={article.category.color} data-oid=".x.oq7-">
              {article.category.name}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6" data-oid="hlamyq-">
          <h2
            className="text-2xl font-bold mb-3 line-clamp-2 hover:text-primary cursor-pointer"
            data-oid="53_a0ou"
          >
            <a href={`/news/${article.slug}`} data-oid="ym6an2h">
              {article.title}
            </a>
          </h2>
          <p
            className="text-muted-foreground mb-4 line-clamp-3"
            data-oid="esuar7_"
          >
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between" data-oid="ec_36v3">
            <div className="flex items-center space-x-3" data-oid="cvi-.2b">
              <Avatar className="h-8 w-8" data-oid="6d1uydw">
                <AvatarImage src={article.author.avatar} data-oid="47h1871" />
                <AvatarFallback data-oid="f1utw6a">
                  {article.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm" data-oid="aodvorw">
                <p className="font-medium" data-oid="ci9rjgh">
                  {article.author.name}
                </p>
                <p className="text-muted-foreground" data-oid="4ajni0j">
                  {formatDate(article.publishedAt)}
                </p>
              </div>
            </div>
            <div
              className="flex items-center space-x-4 text-sm text-muted-foreground"
              data-oid=":2ba0dr"
            >
              <div className="flex items-center space-x-1" data-oid="5krmvr7">
                <Clock className="h-4 w-4" data-oid="7jkc-_q" />
                <span data-oid="o0ce0h8">{article.readTime} min</span>
              </div>
              <div className="flex items-center space-x-1" data-oid="w__98jq">
                <Eye className="h-4 w-4" data-oid="90-vti5" />
                <span data-oid="3u6mxhh">{formatViews(article.views)}</span>
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
        data-oid="v8nf0lx"
      >
        <div className="flex" data-oid="rd7kw.k">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-24 h-24 object-cover flex-shrink-0"
            data-oid="qrf.h_2"
          />

          <CardContent className="p-4 flex-1" data-oid="pjtj_xd">
            <Badge
              className={`${article.category.color} mb-2`}
              variant="secondary"
              data-oid="f7z4mln"
            >
              {article.category.name}
            </Badge>
            <h3
              className="font-semibold text-sm line-clamp-2 mb-2 hover:text-primary cursor-pointer"
              data-oid="3nvtvqf"
            >
              <a href={`/news/${article.slug}`} data-oid="i.49md4">
                {article.title}
              </a>
            </h3>
            <div
              className="flex items-center justify-between text-xs text-muted-foreground"
              data-oid="ismlhlp"
            >
              <span data-oid="atajqbv">{formatDate(article.publishedAt)}</span>
              <span data-oid="57fjmp:">{article.readTime} min read</span>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow"
      data-oid="aiahklu"
    >
      <div className="relative" data-oid="btslf92">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-48 object-cover"
          data-oid="bbigi9q"
        />

        <div className="absolute top-3 left-3" data-oid="2iu8s9p">
          <Badge className={article.category.color} data-oid="_eqg6t1">
            {article.category.name}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4" data-oid="qkeh1aq">
        <h3
          className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary cursor-pointer"
          data-oid="a_osi00"
        >
          <a href={`/news/${article.slug}`} data-oid="c_far1e">
            {article.title}
          </a>
        </h3>
        <p
          className="text-muted-foreground text-sm mb-4 line-clamp-2"
          data-oid="_r4z0-b"
        >
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between" data-oid="gb:j_wx">
          <div className="flex items-center space-x-2" data-oid="eqoahxp">
            <Avatar className="h-6 w-6" data-oid="lvb8i6b">
              <AvatarImage src={article.author.avatar} data-oid="dgtcfva" />
              <AvatarFallback className="text-xs" data-oid="l8sy8ps">
                {article.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-xs" data-oid="p05t7gc">
              <p className="font-medium" data-oid="ga3jl_b">
                {article.author.name}
              </p>
              <p className="text-muted-foreground" data-oid="1kx1gy6">
                {formatDate(article.publishedAt)}
              </p>
            </div>
          </div>
          <div
            className="flex items-center space-x-3 text-xs text-muted-foreground"
            data-oid="thv_0m4"
          >
            <div className="flex items-center space-x-1" data-oid="p4_vrh1">
              <Clock className="h-3 w-3" data-oid="4esgkwt" />
              <span data-oid="5:5hcnq">{article.readTime}m</span>
            </div>
            <div className="flex items-center space-x-1" data-oid="56sofwm">
              <Eye className="h-3 w-3" data-oid="3apoi0:" />
              <span data-oid="g646btt">{formatViews(article.views)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
