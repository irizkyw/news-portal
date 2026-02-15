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
        data-oid=":4j6j3u"
      >
        <h1 className="text-3xl font-bold" data-oid="6_jf.1d">
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
    <main data-oid="x01olgt">
      <div className="container mx-auto px-4 py-8" data-oid="cf.:978">
        <div
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
          data-oid="nxbfc69"
        >
          {/* Main Article */}
          <article className="lg:col-span-3" data-oid="3cwef-a">
            {/* Article Header */}
            <div className="mb-8" data-oid="7l0.5f1">
              <Badge
                className={article.category?.color}
                variant="secondary"
                data-oid="z9u_pmp"
              >
                {article.category?.name}
              </Badge>
              <h1
                className="text-4xl font-bold mt-4 mb-6 font-serif leading-tight"
                data-oid="mpq57_o"
              >
                {article.title}
              </h1>

              {/* Article Meta */}
              <div
                className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b"
                data-oid="ynpvf5m"
              >
                <div className="flex items-center space-x-4" data-oid="gsa7r9:">
                  <Avatar className="h-12 w-12" data-oid="mv08o:0">
                    <AvatarImage
                      src={article.author?.avatar}
                      data-oid="cd9197e"
                    />

                    <AvatarFallback data-oid="-rz:5qa">
                      {article.author?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div data-oid=":_mpffu">
                    <p className="font-semibold" data-oid="9q8a9i.">
                      {article.author?.name}
                    </p>
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="2mm1h1x"
                    >
                      {formatDate(new Date().toISOString())}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center space-x-6 text-sm text-muted-foreground"
                  data-oid="038lnvu"
                >
                  <div
                    className="flex items-center space-x-1"
                    data-oid="w54t_05"
                  >
                    <Clock className="h-4 w-4" data-oid="g4552vh" />
                    <span data-oid="u665ypj">
                      {article.readTime || 5} min read
                    </span>
                  </div>
                  <div
                    className="flex items-center space-x-1"
                    data-oid="wc:e69:"
                  >
                    <Eye className="h-4 w-4" data-oid="2f43d63" />
                    <span data-oid="-slqeq4">
                      {formatViews(article.views || 0)} views
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {article.featuredImage && (
              <div className="mb-8" data-oid="59dmo:7">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                  data-oid="al7vk6e"
                />
              </div>
            )}

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none font-serif"
              dangerouslySetInnerHTML={{ __html: article.content }}
              data-oid="dew5:_a"
            />

            {/* Article Actions */}
            <div
              className="flex items-center justify-between pt-8 mt-8 border-t"
              data-oid="_zljdme"
            >
              <div className="flex items-center space-x-2" data-oid="n02_2t-">
                <Button variant="outline" size="sm" data-oid="-uxw7xp">
                  <Share2 className="h-4 w-4 mr-2" data-oid="xmrzdaw" />
                  Share
                </Button>
                <Button variant="outline" size="sm" data-oid="142ki:c">
                  <Bookmark className="h-4 w-4 mr-2" data-oid="iibzztz" />
                  Save
                </Button>
              </div>
              <div className="flex items-center space-x-2" data-oid="qxfwnys">
                {article.tags?.split(",").map((tag) => (
                  <Badge key={tag} variant="secondary" data-oid="edccakj">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <Card className="mt-8" data-oid="0nwf78y">
              <CardContent className="p-6" data-oid="nmsydbc">
                <div className="flex items-start space-x-4" data-oid="d098-on">
                  <Avatar className="h-16 w-16" data-oid="i15tmk-">
                    <AvatarImage
                      src={article.author?.avatar}
                      data-oid="0bwftdg"
                    />

                    <AvatarFallback data-oid="wi8k0kc">
                      {article.author?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div data-oid="79g--00">
                    <h3 className="font-semibold text-lg" data-oid="bae0g6p">
                      {article.author?.name}
                    </h3>
                    <p
                      className="text-muted-foreground mt-1"
                      data-oid="3kukitl"
                    >
                      {article.author?.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6" data-oid="5bx:h8v">
            <Card data-oid="3-nc-ym">
              <CardHeader data-oid="wesxlr0">
                <CardTitle data-oid="ifcgb6-">Related Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="q3u7ye1">
                {relatedArticles.map((relatedArticle) => (
                  <div
                    key={relatedArticle.id}
                    className="border-b last:border-b-0 pb-4 last:pb-0"
                    data-oid="t70no.h"
                  >
                    <NewsCard
                      article={relatedArticle}
                      variant="compact"
                      data-oid="e78eymt"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card data-oid="yuynj2w">
              <CardHeader data-oid="0zdwhkd">
                <CardTitle data-oid="mi1a1bl">Popular This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="xigap.h">
                {articles
                  .filter((a) => a.isPopular)
                  .slice(0, 3)
                  .map((popularArticle, index) => (
                    <div
                      key={popularArticle.id}
                      className="flex items-start space-x-3"
                      data-oid="kq7:6on"
                    >
                      <span
                        className="text-2xl font-bold text-muted-foreground"
                        data-oid="sj:4zmj"
                      >
                        {index + 1}
                      </span>
                      <div data-oid="lqdx5w4">
                        <h4
                          className="font-semibold text-sm line-clamp-2 hover:text-primary cursor-pointer"
                          data-oid="mt-_vf:"
                        >
                          <a
                            href={`/news/${popularArticle.slug}`}
                            data-oid="4th54:6"
                          >
                            {popularArticle.title}
                          </a>
                        </h4>
                        <p
                          className="text-xs text-muted-foreground mt-1"
                          data-oid="uy6q:_8"
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
      <Newsletter data-oid="cow7ael" />
    </main>
  );
}
