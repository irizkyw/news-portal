import React from "react";
import { Clock, Eye, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewsCard } from "@/components/news/NewsCard";
import { articles } from "@/data/mockData";

interface ArticlePageProps {
  slug: string;
}

export function ArticlePage({ slug }: ArticlePageProps) {
  // In a real app, this would fetch the article by slug
  const article = articles.find((a) => a.slug === slug) || articles[0];
  const relatedArticles = articles
    .filter((a) => a.id !== article.id && a.category.id === article.category.id)
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
    <div className="container mx-auto px-4 py-8" data-oid="je20fz7">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" data-oid="bm7e-4c">
        {/* Main Article */}
        <article className="lg:col-span-3" data-oid="4x1meth">
          {/* Article Header */}
          <div className="mb-8" data-oid="9xe:.fs">
            <Badge
              className={article.category.color}
              variant="secondary"
              data-oid="lx-fq40"
            >
              {article.category.name}
            </Badge>
            <h1
              className="text-4xl font-bold mt-4 mb-6 font-serif leading-tight"
              data-oid="1pe0oq9"
            >
              {article.title}
            </h1>

            {/* Article Meta */}
            <div
              className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b"
              data-oid="dmed4do"
            >
              <div className="flex items-center space-x-4" data-oid="r3.p2pw">
                <Avatar className="h-12 w-12" data-oid="5f009ut">
                  <AvatarImage src={article.author.avatar} data-oid="5yqwnr1" />
                  <AvatarFallback data-oid="77uqyw_">
                    {article.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div data-oid="_2:2ily">
                  <p className="font-semibold" data-oid="j.anfb.">
                    {article.author.name}
                  </p>
                  <p
                    className="text-sm text-muted-foreground"
                    data-oid="_:gydlz"
                  >
                    {formatDate(article.publishedAt)}
                  </p>
                </div>
              </div>

              <div
                className="flex items-center space-x-6 text-sm text-muted-foreground"
                data-oid="3_9kwtl"
              >
                <div className="flex items-center space-x-1" data-oid="0yofkid">
                  <Clock className="h-4 w-4" data-oid="c7fpqt2" />
                  <span data-oid="l9g9b:w">{article.readTime} min read</span>
                </div>
                <div className="flex items-center space-x-1" data-oid="u_9.9wj">
                  <Eye className="h-4 w-4" data-oid="jxlwjur" />
                  <span data-oid="p00l48e">
                    {formatViews(article.views)} views
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8" data-oid="3j.wgwi">
            <img
              src={article.featuredImage}
              alt={article.title}
              className="w-full h-64 md:h-96 object-cover rounded-lg"
              data-oid="vn3rwje"
            />
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none font-serif"
            data-oid="-bwzkr8"
          >
            <div
              dangerouslySetInnerHTML={{ __html: article.content }}
              data-oid="n5-6s_s"
            />
          </div>

          {/* Article Actions */}
          <div
            className="flex items-center justify-between pt-8 mt-8 border-t"
            data-oid="4ng89id"
          >
            <div className="flex items-center space-x-2" data-oid="v.2f.fy">
              <Button variant="outline" size="sm" data-oid="-:ljyc:">
                <Share2 className="h-4 w-4 mr-2" data-oid="3lfze41" />
                Share
              </Button>
              <Button variant="outline" size="sm" data-oid="za-sue6">
                <Bookmark className="h-4 w-4 mr-2" data-oid="2cdbpo." />
                Save
              </Button>
            </div>
          </div>

          {/* Author Bio */}
          <Card className="mt-8" data-oid="cql2w0.">
            <CardContent className="p-6" data-oid="yuqs9mb">
              <div className="flex items-start space-x-4" data-oid="udv.q-e">
                <Avatar className="h-16 w-16" data-oid="7.ecbbu">
                  <AvatarImage src={article.author.avatar} data-oid="p0j.y.7" />
                  <AvatarFallback data-oid="bblpeij">
                    {article.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div data-oid="ka7m7e6">
                  <h3 className="font-semibold text-lg" data-oid="d37o0m_">
                    {article.author.name}
                  </h3>
                  <p className="text-muted-foreground mt-1" data-oid="a6g0zko">
                    {article.author.bio}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </article>

        {/* Sidebar */}
        <aside className="space-y-6" data-oid="jr:iq76">
          <Card data-oid="dxl3.38">
            <CardHeader data-oid="m1m1n_s">
              <CardTitle data-oid="9ymqxc_">Related Articles</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="z_b41sj">
              {relatedArticles.map((relatedArticle) => (
                <div
                  key={relatedArticle.id}
                  className="border-b last:border-b-0 pb-4 last:pb-0"
                  data-oid="bsqvg39"
                >
                  <NewsCard
                    article={relatedArticle}
                    variant="compact"
                    data-oid="_.:oi1n"
                  />
                </div>
              ))}
            </CardContent>
          </Card>

          <Card data-oid="i:xywxa">
            <CardHeader data-oid="jnqj9zk">
              <CardTitle data-oid="wml5q.4">Popular This Week</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4" data-oid="bw9j84q">
              {articles
                .filter((a) => a.isPopular)
                .slice(0, 3)
                .map((popularArticle, index) => (
                  <div
                    key={popularArticle.id}
                    className="flex items-start space-x-3"
                    data-oid="tr0za2:"
                  >
                    <span
                      className="text-2xl font-bold text-muted-foreground"
                      data-oid="6_d.1.3"
                    >
                      {index + 1}
                    </span>
                    <div data-oid="-uke8cb">
                      <h4
                        className="font-semibold text-sm line-clamp-2 hover:text-primary cursor-pointer"
                        data-oid="x5j..ml"
                      >
                        <a
                          href={`/news/${popularArticle.slug}`}
                          data-oid="6g5ki87"
                        >
                          {popularArticle.title}
                        </a>
                      </h4>
                      <p
                        className="text-xs text-muted-foreground mt-1"
                        data-oid="2yvrwmt"
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
  );
}
