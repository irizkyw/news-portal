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
      <Card className="overflow-hidden border-0 shadow-lg" data-oid="8ygvce2">
        <div className="relative" data-oid="86ix7xn">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-full h-64 md:h-80 object-cover"
            data-oid="eq7yf7f"
          />

          <div className="absolute top-4 left-4" data-oid="gh0xfaa">
            <Badge className={article.category.color} data-oid="nxe7._p">
              {article.category.name}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6" data-oid="hv81lx3">
          <h2
            className="text-2xl font-bold mb-3 line-clamp-2 hover:text-primary cursor-pointer"
            data-oid="a09.yut"
          >
            <a href={`/news/${article.slug}`} data-oid="wnq7xog">
              {article.title}
            </a>
          </h2>
          <p
            className="text-muted-foreground mb-4 line-clamp-3"
            data-oid="k-n4g_s"
          >
            {article.excerpt}
          </p>
          <div className="flex items-center justify-between" data-oid=":85yp2i">
            <div className="flex items-center space-x-3" data-oid="g9iag8r">
              <Avatar className="h-8 w-8" data-oid="vb75wi.">
                <AvatarImage src={article.author.avatar} data-oid="3to.2vu" />
                <AvatarFallback data-oid="5gsr99g">
                  {article.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm" data-oid="a-x4lmq">
                <p className="font-medium" data-oid="9jpvqv6">
                  {article.author.name}
                </p>
                <p className="text-muted-foreground" data-oid="-k9n2ho">
                  {formatDate(article.publishedAt)}
                </p>
              </div>
            </div>
            <div
              className="flex items-center space-x-4 text-sm text-muted-foreground"
              data-oid="wljf97g"
            >
              <div className="flex items-center space-x-1" data-oid="qri72fk">
                <Clock className="h-4 w-4" data-oid="miqq18l" />
                <span data-oid="r-i0ajd">{article.readTime} min</span>
              </div>
              <div className="flex items-center space-x-1" data-oid="3t4g72y">
                <Eye className="h-4 w-4" data-oid="5c-250e" />
                <span data-oid="yf5u1xd">{formatViews(article.views)}</span>
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
        data-oid="ge::r.c"
      >
        <div className="flex" data-oid=":2ody_5">
          <img
            src={article.featuredImage}
            alt={article.title}
            className="w-24 h-24 object-cover flex-shrink-0"
            data-oid="t-4gbs7"
          />

          <CardContent className="p-4 flex-1" data-oid="8ye79hd">
            <Badge
              className={`${article.category.color} mb-2`}
              variant="secondary"
              data-oid="h8_sld6"
            >
              {article.category.name}
            </Badge>
            <h3
              className="font-semibold text-sm line-clamp-2 mb-2 hover:text-primary cursor-pointer"
              data-oid="zwunq6j"
            >
              <a href={`/news/${article.slug}`} data-oid="mukij7z">
                {article.title}
              </a>
            </h3>
            <div
              className="flex items-center justify-between text-xs text-muted-foreground"
              data-oid="9y:fsuh"
            >
              <span data-oid="t2_ba_f">{formatDate(article.publishedAt)}</span>
              <span data-oid="_v_enfa">{article.readTime} min read</span>
            </div>
          </CardContent>
        </div>
      </Card>
    );
  }

  return (
    <Card
      className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow"
      data-oid="0hl94aa"
    >
      <div className="relative" data-oid="i.qw0un">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-48 object-cover"
          data-oid="_9thnoy"
        />

        <div className="absolute top-3 left-3" data-oid="n1tmz.m">
          <Badge className={article.category.color} data-oid=":6ba763">
            {article.category.name}
          </Badge>
        </div>
      </div>
      <CardContent className="p-4" data-oid="rfh9_7h">
        <h3
          className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary cursor-pointer"
          data-oid="u.3c:ai"
        >
          <a href={`/news/${article.slug}`} data-oid="n3f300:">
            {article.title}
          </a>
        </h3>
        <p
          className="text-muted-foreground text-sm mb-4 line-clamp-2"
          data-oid="3-87qhg"
        >
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between" data-oid="c5u_kr6">
          <div className="flex items-center space-x-2" data-oid="kttx6qd">
            <Avatar className="h-6 w-6" data-oid="t2hdqsg">
              <AvatarImage src={article.author.avatar} data-oid="gpdo.39" />
              <AvatarFallback className="text-xs" data-oid="r5pa0ip">
                {article.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-xs" data-oid="a9wqat6">
              <p className="font-medium" data-oid="ts9hjxe">
                {article.author.name}
              </p>
              <p className="text-muted-foreground" data-oid="12pi23f">
                {formatDate(article.publishedAt)}
              </p>
            </div>
          </div>
          <div
            className="flex items-center space-x-3 text-xs text-muted-foreground"
            data-oid="kzvsy4b"
          >
            <div className="flex items-center space-x-1" data-oid=".ixj5ch">
              <Clock className="h-3 w-3" data-oid="vuzl0i-" />
              <span data-oid="r1._g:9">{article.readTime}m</span>
            </div>
            <div className="flex items-center space-x-1" data-oid="a18xq3p">
              <Eye className="h-3 w-3" data-oid="3xmnvsj" />
              <span data-oid="himayqp">{formatViews(article.views)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
