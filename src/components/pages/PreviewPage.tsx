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
      <div
        className="container mx-auto px-4 py-8 text-center"
        data-oid="._vvp79"
      >
        <h1 className="text-3xl font-bold" data-oid="v6xdvry">
          Article not found
        </h1>
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
    <main data-oid="lax0ryq">
      <div className="container mx-auto px-4 py-8" data-oid="zb7kdan">
        <div
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
          data-oid="nfws45y"
        >
          {/* Main Article */}
          <article className="lg:col-span-3" data-oid="vl_mlxa">
            {/* Article Header */}
            <div className="mb-8" data-oid="xm..md2">
              <Badge
                className={article.category?.color}
                variant="secondary"
                data-oid="625fe19"
              >
                {article.category?.name}
              </Badge>
              <h1
                className="text-4xl font-bold mt-4 mb-6 font-serif leading-tight"
                data-oid="1cbvox6"
              >
                {article.title}
              </h1>

              {/* Article Meta */}
              <div
                className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b"
                data-oid="mjij77g"
              >
                <div className="flex items-center space-x-4" data-oid="10a2cyc">
                  <Avatar className="h-12 w-12" data-oid=".az11iu">
                    <AvatarImage
                      src={article.author?.avatar}
                      data-oid="4_xm6n2"
                    />
                    <AvatarFallback data-oid="x9tvor7">
                      {article.author?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div data-oid="4jfqgg-">
                    <p className="font-semibold" data-oid="3::arhd">
                      {article.author?.name}
                    </p>
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="e04v..h"
                    >
                      {formatDate(new Date().toISOString())}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center space-x-6 text-sm text-muted-foreground"
                  data-oid="1i4ndmg"
                >
                  <div
                    className="flex items-center space-x-1"
                    data-oid="ejv6yn:"
                  >
                    <Clock className="h-4 w-4" data-oid="86dyjca" />
                    <span data-oid="2w2v4b_">
                      {article.readTime || 5} min read
                    </span>
                  </div>
                  <div
                    className="flex items-center space-x-1"
                    data-oid="448kt8v"
                  >
                    <Eye className="h-4 w-4" data-oid=".k_3vbv" />
                    <span data-oid="gxp_44w">
                      {formatViews(article.views || 0)} views
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {article.featuredImage && (
              <div className="mb-8" data-oid="p2sjyig">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                  data-oid="0z-8fko"
                />
              </div>
            )}

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none font-serif"
              dangerouslySetInnerHTML={{ __html: article.content }}
              data-oid="1tnbiwj"
            />

            {/* Article Actions */}
            <div
              className="flex items-center justify-between pt-8 mt-8 border-t"
              data-oid="60bi-4_"
            >
              <div className="flex items-center space-x-2" data-oid="7x2ary3">
                <Button variant="outline" size="sm" data-oid="x3nhj4r">
                  <Share2 className="h-4 w-4 mr-2" data-oid="nl0d:v." />
                  Share
                </Button>
                <Button variant="outline" size="sm" data-oid="124.p.-">
                  <Bookmark className="h-4 w-4 mr-2" data-oid="6-0_1yh" />
                  Save
                </Button>
              </div>
              <div className="flex items-center space-x-2" data-oid="-a3_o15">
                {article.tags?.split(",").map((tag) => (
                  <Badge key={tag} variant="secondary" data-oid="qi-n58j">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <Card className="mt-8" data-oid="1zr9c48">
              <CardContent className="p-6" data-oid="9wh2dup">
                <div className="flex items-start space-x-4" data-oid="..hpqwz">
                  <Avatar className="h-16 w-16" data-oid="_56qr.l">
                    <AvatarImage
                      src={article.author?.avatar}
                      data-oid="fzbbr31"
                    />
                    <AvatarFallback data-oid="32l-i84">
                      {article.author?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div data-oid="o19ae0u">
                    <h3 className="font-semibold text-lg" data-oid="8ialqb9">
                      {article.author?.name}
                    </h3>
                    <p
                      className="text-muted-foreground mt-1"
                      data-oid="tuhxpg6"
                    >
                      {article.author?.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6" data-oid="y4zhwpx">
            <Card data-oid="myr-0oh">
              <CardHeader data-oid="rkhy6uu">
                <CardTitle data-oid="zq8gnk2">Related Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="prvmqls">
                {relatedArticles.map((relatedArticle) => (
                  <div
                    key={relatedArticle.id}
                    className="border-b last:border-b-0 pb-4 last:pb-0"
                    data-oid="cktarvy"
                  >
                    <NewsCard
                      article={relatedArticle}
                      variant="compact"
                      data-oid="aip.j5k"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card data-oid="8pgfppw">
              <CardHeader data-oid="mn..vr8">
                <CardTitle data-oid="1j8wq26">Popular This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="77a-9kl">
                {articles
                  .filter((a) => a.isPopular)
                  .slice(0, 3)
                  .map((popularArticle, index) => (
                    <div
                      key={popularArticle.id}
                      className="flex items-start space-x-3"
                      data-oid=":mjrrmq"
                    >
                      <span
                        className="text-2xl font-bold text-muted-foreground"
                        data-oid=".5vr48-"
                      >
                        {index + 1}
                      </span>
                      <div data-oid="a.kx2xz">
                        <h4
                          className="font-semibold text-sm line-clamp-2 hover:text-primary cursor-pointer"
                          data-oid="lcfq5zm"
                        >
                          <a
                            href={`/news/${popularArticle.slug}`}
                            data-oid="2tl_s04"
                          >
                            {popularArticle.title}
                          </a>
                        </h4>
                        <p
                          className="text-xs text-muted-foreground mt-1"
                          data-oid="-xzk:6z"
                        >
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
      <Newsletter data-oid="t49_4:m" />
    </main>
  );
}
