import React from "react";
import { useParams, Link } from "react-router-dom";
import { Clock, Eye, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewsCard } from "@/components/news/NewsCard";
import { articles } from "@/data/mockData";
import { Newsletter } from "@/components/news/Newsletter";

export function ArticlePage() {
  const { slug } = useParams();

  // In a real app, this would fetch the article by slug
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div
        className="container mx-auto px-4 py-8 text-center"
        data-oid="sssxn7h"
      >
        <h1 className="text-3xl font-bold" data-oid="3upwxuj">
          Article not found
        </h1>
      </div>
    );
  }

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
    <main data-oid="9otq.bd">
      <div className="container mx-auto px-4 py-8" data-oid="4qs6hjt">
        <div
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
          data-oid="6v5ouue"
        >
          {/* Main Article */}
          <article className="lg:col-span-3" data-oid="-ru0l:s">
            {/* Article Header */}
            <div className="mb-8" data-oid="18prr:v">
              <Badge
                className={article.category.color}
                variant="secondary"
                data-oid="-i3haqd"
              >
                {article.category.name}
              </Badge>
              <h1
                className="text-4xl font-bold mt-4 mb-6 font-serif leading-tight"
                data-oid="7qfjd2w"
              >
                {article.title}
              </h1>

              {/* Article Meta */}
              <div
                className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b"
                data-oid="mbq92i8"
              >
                <div className="flex items-center space-x-4" data-oid="c9.z_k3">
                  <Avatar className="h-12 w-12" data-oid="89oal:u">
                    <AvatarImage
                      src={article.author.avatar}
                      data-oid="yek7k2l"
                    />
                    <AvatarFallback data-oid="4cngbfd">
                      {article.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div data-oid="0w0rl46">
                    <p className="font-semibold" data-oid="m4zzs_5">
                      {article.author.name}
                    </p>
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="_rna894"
                    >
                      {formatDate(article.publishedAt)}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center space-x-6 text-sm text-muted-foreground"
                  data-oid="b8iujt-"
                >
                  <div
                    className="flex items-center space-x-1"
                    data-oid="nslyny2"
                  >
                    <Clock className="h-4 w-4" data-oid="i3q26t6" />
                    <span data-oid="s44.iyo">{article.readTime} min read</span>
                  </div>
                  <div
                    className="flex items-center space-x-1"
                    data-oid="49uw:5f"
                  >
                    <Eye className="h-4 w-4" data-oid=":35x85j" />
                    <span data-oid="8q366h9">
                      {formatViews(article.views)} views
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8" data-oid="5uolfi_">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
                data-oid="wbw6mj4"
              />
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none font-serif"
              data-oid="om069b."
            >
              <div
                dangerouslySetInnerHTML={{ __html: article.content }}
                data-oid="4ldmnha"
              />
            </div>

            {/* Article Actions */}
            <div
              className="flex items-center justify-between pt-8 mt-8 border-t"
              data-oid="z51zm2-"
            >
              <div className="flex items-center space-x-2" data-oid="fl-51v7">
                <Button variant="outline" size="sm" data-oid="4myjp47">
                  <Share2 className="h-4 w-4 mr-2" data-oid="m.h15en" />
                  Share
                </Button>
                <Button variant="outline" size="sm" data-oid="vkoyqbj">
                  <Bookmark className="h-4 w-4 mr-2" data-oid="ed4rh9q" />
                  Save
                </Button>
              </div>
              <div className="flex items-center space-x-2" data-oid="fn87z-a">
                {article.tags.map((tag) => (
                  <Link to={`/tag/${tag}`} key={tag} data-oid="ujd06jx">
                    <Badge variant="secondary" data-oid="meeu3st">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
            {/* Author Bio */}
            <Card className="mt-8" data-oid="ag54owm">
              <CardContent className="p-6" data-oid="lt3p69p">
                <div className="flex items-start space-x-4" data-oid="9co4qv-">
                  <Avatar className="h-16 w-16" data-oid="4skzc2r">
                    <AvatarImage
                      src={article.author.avatar}
                      data-oid="e5fag1d"
                    />
                    <AvatarFallback data-oid="wygjn23">
                      {article.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div data-oid="k6bhdwp">
                    <h3 className="font-semibold text-lg" data-oid="crm77:o">
                      {article.author.name}
                    </h3>
                    <p
                      className="text-muted-foreground mt-1"
                      data-oid="9fmc5ed"
                    >
                      {article.author.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6" data-oid="0mne_6-">
            <Card data-oid="w5d2bw-">
              <CardHeader data-oid="x1sikln">
                <CardTitle data-oid="5ta2hx0">Related Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="p5j:.qd">
                {relatedArticles.map((relatedArticle) => (
                  <div
                    key={relatedArticle.id}
                    className="border-b last:border-b-0 pb-4 last:pb-0"
                    data-oid="bdjmo2-"
                  >
                    <NewsCard
                      article={relatedArticle}
                      variant="compact"
                      data-oid="8w384r-"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card data-oid="u-xrqaa">
              <CardHeader data-oid="vjm.yt3">
                <CardTitle data-oid="djc_ntz">Popular This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="8ybsu77">
                {articles
                  .filter((a) => a.isPopular)
                  .slice(0, 3)
                  .map((popularArticle, index) => (
                    <div
                      key={popularArticle.id}
                      className="flex items-start space-x-3"
                      data-oid="3i6o4ac"
                    >
                      <span
                        className="text-2xl font-bold text-muted-foreground"
                        data-oid="l3ysyzf"
                      >
                        {index + 1}
                      </span>
                      <div data-oid="wg3kv0j">
                        <h4
                          className="font-semibold text-sm line-clamp-2 hover:text-primary cursor-pointer"
                          data-oid="4sf9w1l"
                        >
                          <a
                            href={`/news/${popularArticle.slug}`}
                            data-oid="0m5qf8t"
                          >
                            {popularArticle.title}
                          </a>
                        </h4>
                        <p
                          className="text-xs text-muted-foreground mt-1"
                          data-oid=":01ovn7"
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
      <Newsletter data-oid="-tecsxs" />
    </main>
  );
}
