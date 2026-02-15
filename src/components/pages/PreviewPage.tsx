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
        data-oid="ad8s_6k"
      >
        <h1 className="text-3xl font-bold" data-oid=":xryxvt">
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
    <main data-oid="08musvc">
      <div className="container mx-auto px-4 py-8" data-oid="055j0xy">
        <div
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
          data-oid="7d9eqn9"
        >
          {/* Main Article */}
          <article className="lg:col-span-3" data-oid="hdpq4u_">
            {/* Article Header */}
            <div className="mb-8" data-oid="ju5.o_c">
              <Badge
                className={article.category?.color}
                variant="secondary"
                data-oid="m0ggl4n"
              >
                {article.category?.name}
              </Badge>
              <h1
                className="text-4xl font-bold mt-4 mb-6 font-serif leading-tight"
                data-oid="fc.nb37"
              >
                {article.title}
              </h1>

              {/* Article Meta */}
              <div
                className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b"
                data-oid="0z.hzo."
              >
                <div className="flex items-center space-x-4" data-oid="1o:2ok1">
                  <Avatar className="h-12 w-12" data-oid="-vzjgu1">
                    <AvatarImage
                      src={article.author?.avatar}
                      data-oid="m_zvhv."
                    />

                    <AvatarFallback data-oid="d3kfy2q">
                      {article.author?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div data-oid="57qklat">
                    <p className="font-semibold" data-oid="d6sal3s">
                      {article.author?.name}
                    </p>
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="t9bw45h"
                    >
                      {formatDate(new Date().toISOString())}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center space-x-6 text-sm text-muted-foreground"
                  data-oid="ed22obz"
                >
                  <div
                    className="flex items-center space-x-1"
                    data-oid="cy16js-"
                  >
                    <Clock className="h-4 w-4" data-oid="ehiy3._" />
                    <span data-oid="6_ew2d-">
                      {article.readTime || 5} min read
                    </span>
                  </div>
                  <div
                    className="flex items-center space-x-1"
                    data-oid="5hj1z0-"
                  >
                    <Eye className="h-4 w-4" data-oid="bwhb34n" />
                    <span data-oid="q4bkfyq">
                      {formatViews(article.views || 0)} views
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {article.featuredImage && (
              <div className="mb-8" data-oid="z67fzu3">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                  data-oid="vs4e.as"
                />
              </div>
            )}

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none font-serif"
              dangerouslySetInnerHTML={{ __html: article.content }}
              data-oid="6ysnjor"
            />

            {/* Article Actions */}
            <div
              className="flex items-center justify-between pt-8 mt-8 border-t"
              data-oid="e3.eng6"
            >
              <div className="flex items-center space-x-2" data-oid="6md2osz">
                <Button variant="outline" size="sm" data-oid="psa8:.z">
                  <Share2 className="h-4 w-4 mr-2" data-oid="34g2alv" />
                  Share
                </Button>
                <Button variant="outline" size="sm" data-oid="ce:4sy.">
                  <Bookmark className="h-4 w-4 mr-2" data-oid="hyt6b9x" />
                  Save
                </Button>
              </div>
              <div className="flex items-center space-x-2" data-oid="fc9le_9">
                {article.tags?.split(",").map((tag) => (
                  <Badge key={tag} variant="secondary" data-oid="_e7axhw">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <Card className="mt-8" data-oid="1u1olak">
              <CardContent className="p-6" data-oid="sl-h:y3">
                <div className="flex items-start space-x-4" data-oid="nhjvek6">
                  <Avatar className="h-16 w-16" data-oid="tcx6:kf">
                    <AvatarImage
                      src={article.author?.avatar}
                      data-oid="z12zq0t"
                    />

                    <AvatarFallback data-oid="kphf2zj">
                      {article.author?.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div data-oid="hfy_xck">
                    <h3 className="font-semibold text-lg" data-oid="dkm6.wc">
                      {article.author?.name}
                    </h3>
                    <p
                      className="text-muted-foreground mt-1"
                      data-oid="0w_voht"
                    >
                      {article.author?.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6" data-oid="gwp2ev_">
            <Card data-oid="_i9h:xf">
              <CardHeader data-oid="7hzbwv8">
                <CardTitle data-oid="37k9cvj">Related Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="k-do_ft">
                {relatedArticles.map((relatedArticle) => (
                  <div
                    key={relatedArticle.id}
                    className="border-b last:border-b-0 pb-4 last:pb-0"
                    data-oid="ls7w4-m"
                  >
                    <NewsCard
                      article={relatedArticle}
                      variant="compact"
                      data-oid="9z6ip1-"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card data-oid=":ft343k">
              <CardHeader data-oid="42ifvru">
                <CardTitle data-oid="metqksk">Popular This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="8z_3m88">
                {articles
                  .filter((a) => a.isPopular)
                  .slice(0, 3)
                  .map((popularArticle, index) => (
                    <div
                      key={popularArticle.id}
                      className="flex items-start space-x-3"
                      data-oid="rktelb8"
                    >
                      <span
                        className="text-2xl font-bold text-muted-foreground"
                        data-oid="zxxbyh7"
                      >
                        {index + 1}
                      </span>
                      <div data-oid="6:m6d-a">
                        <h4
                          className="font-semibold text-sm line-clamp-2 hover:text-primary cursor-pointer"
                          data-oid="r5gwh7c"
                        >
                          <a
                            href={`/news/${popularArticle.slug}`}
                            data-oid="x1blhlt"
                          >
                            {popularArticle.title}
                          </a>
                        </h4>
                        <p
                          className="text-xs text-muted-foreground mt-1"
                          data-oid="v0suwqh"
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
      <Newsletter data-oid=":jne4jo" />
    </main>
  );
}
