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
      <Card className="overflow-hidden border-0 shadow-lg" data-oid="8_6-g0s">
        <div className="relative" data-oid="_:wu0ws">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-64 md:h-80 object-cover"
            data-oid="ss7blb3"
          />

          <div className="absolute top-4 left-4" data-oid=".vfr:we">
            <Badge className={article.category.color} data-oid="-bcu5h5">
              {article.category.name}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6" data-oid="v7ry3s2">
          <h2
            className="text-2xl font-bold mb-3 line-clamp-2 hover:text-primary cursor-pointer"
            data-oid="4y-r6ol"
          >
            <a href={`/news/${article.slug}`} data-oid="k9nfrel">
              {article.title}
            </a>
          </h2>
          <p
            className="text-muted-foreground mb-4 line-clamp-3"
            data-oid="ykdwqbk"
          >
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between" data-oid="mulmwf6">
            <div className="flex items-center space-x-3" data-oid="wevh6cv">
              <Avatar className="h-8 w-8" data-oid="y::nni:">
                <AvatarImage src={article.author.avatar} data-oid="a-qe6q8" />
                <AvatarFallback data-oid="m3hhxkh">
                  {article.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm" data-oid="znw-5i.">
                <p className="font-medium" data-oid="7-sdghh">
                  {article.author.name}
                </p>
                <p className="text-muted-foreground" data-oid="x3qw1_y">
                  {formatDate(article.publishedAt)}
                </p>
              </div>
            </div>
            <div
              className="flex items-center space-x-4 text-sm text-muted-foreground"
              data-oid="bv30g24"
            >
              <div className="flex items-center space-x-1" data-oid="ntznh:z">
                <Clock className="h-4 w-4" data-oid="oynqngx" />
                <span data-oid="dkk1osy">{article.readTime} min</span>
              </div>
              <div className="flex items-center space-x-1" data-oid="6avg6ai">
                <Eye className="h-4 w-4" data-oid=":465qb:" />
                <span data-oid="1ccw7do">{formatViews(article.views)}</span>
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
        data-oid="_.4ahia"
      >
        <div className="flex" data-oid="9rhtz_j">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-24 h-24 object-cover flex-shrink-0"
            data-oid="6m2ic00"
          />

          <CardContent className="p-4 flex-1" data-oid="b031_x0">
            <Badge
              className={`${article.category.color} mb-2`}
              variant="secondary"
              data-oid="15af1fr"
            >
              {article.category.name}
            </Badge>
            <h3
              className="font-semibold text-sm line-clamp-2 mb-2 hover:text-primary cursor-pointer"
              data-oid="lppk--m"
            >
              <a href={`/news/${article.slug}`} data-oid="xesax15">
                {article.title}
              </a>
            </h3>
            <div
              className="flex items-center justify-between text-xs text-muted-foreground"
              data-oid="2vjhzec"
            >
              <span data-oid="fmgggvg">{formatDate(article.publishedAt)}</span>
              <span data-oid="b7ibw2d">{article.readTime} min read</span>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow"
      data-oid="2xcgboe"
    >
      <div className="relative" data-oid="dxu0cxc">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-48 object-cover"
          data-oid="yy70r0s"
        />

        <div className="absolute top-3 left-3" data-oid="w71h58w">
          <Badge className={article.category.color} data-oid="ymm131a">
            {article.category.name}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4" data-oid="37e8vrk">
        <h3
          className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary cursor-pointer"
          data-oid="414sfb-"
        >
          <a href={`/news/${article.slug}`} data-oid="9g5easw">
            {article.title}
          </a>
        </h3>
        <p
          className="text-muted-foreground text-sm mb-4 line-clamp-2"
          data-oid="aec3dul"
        >
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between" data-oid=":bnc-vs">
          <div className="flex items-center space-x-2" data-oid="zo7bwcv">
            <Avatar className="h-6 w-6" data-oid="2qybr_6">
              <AvatarImage src={article.author.avatar} data-oid="xvmu2-u" />
              <AvatarFallback className="text-xs" data-oid="4gdtgr-">
                {article.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-xs" data-oid="ozo4an:">
              <p className="font-medium" data-oid="34y-eee">
                {article.author.name}
              </p>
              <p className="text-muted-foreground" data-oid="ko57r25">
                {formatDate(article.publishedAt)}
              </p>
            </div>
          </div>
          <div
            className="flex items-center space-x-3 text-xs text-muted-foreground"
            data-oid="mpqx823"
          >
            <div className="flex items-center space-x-1" data-oid="lhz-g3u">
              <Clock className="h-3 w-3" data-oid="q069_wj" />
              <span data-oid="q3itvoc">{article.readTime}m</span>
            </div>
            <div className="flex items-center space-x-1" data-oid="b95sjn.">
              <Eye className="h-3 w-3" data-oid="-tkfpg8" />
              <span data-oid="u4flt0m">{formatViews(article.views)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
