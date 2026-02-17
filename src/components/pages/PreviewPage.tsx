import React, { useState, useEffect } from "react";
import { Clock, Eye, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewsCard } from "@/components/news/NewsCard";
import { getCategories, getUsers, getPosts, getPopularPosts } from "../../services/api";
import type { Article, Category, User } from "../../types";
import { Newsletter } from "@/components/news/Newsletter";

export function PreviewPage() {
  const [article, setArticle] = useState<Article | null>(null);
  const [relatedArticles, setRelatedArticles] = useState<Article[]>([]);
  const [popularArticles, setPopularArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const articleData = JSON.parse(localStorage.getItem("previewArticle") || "null");
    if (!articleData) {
      setError("No article preview data found.");
      setLoading(false);
      return;
    }

    Promise.all([
      getCategories(),
      getUsers(),
      getPopularPosts(3),
    ])
    .then(([categories, users, popular]) => {
      const category = categories.find((c) => c.id === articleData.categoryId);
      const author = users.find((a) => a.id === articleData.authorId);

      const fullArticle = {
        ...articleData,
        category,
        author,
        tags: articleData.tags || [],
      };
      setArticle(fullArticle);
      setPopularArticles(popular);

      if (category) {
        getPosts({ categorySlug: category.slug, limit: 4 }).then((related) => {
          setRelatedArticles(related.filter((a) => a.id !== fullArticle.id).slice(0, 3));
        });
      }
    })
    .catch(() => setError("Failed to load page data."))
    .finally(() => setLoading(false));

  }, []);

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

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p>Loading preview...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold text-red-500">{error || "Article not found"}</h1>
      </div>
    );
  }

  return (
    <main data-oid="1lo0u:k">
      <div className="container mx-auto px-4 py-8" data-oid="66.c7-o">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" data-oid="iy-y1u_">
          {/* Main Article */}
          <article className="lg:col-span-3" data-oid="gmbecjs">
            {/* Article Header */}
            <div className="mb-8" data-oid="alys3jp">
              {article.category && (
                <Badge className={article.category.color} variant="secondary" data-oid=":d7kuam">
                  {article.category.name}
                </Badge>
              )}
              <h1 className="text-4xl font-bold mt-4 mb-6 font-serif leading-tight" data-oid="icmm11m">
                {article.title}
              </h1>

              {/* Article Meta */}
              <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b" data-oid=":8y0zw2">
                {article.author && (
                  <div className="flex items-center space-x-4" data-oid="x5qlw8v">
                    <Avatar className="h-12 w-12" data-oid="vfqg6r9">
                      <AvatarImage src={article.author.avatar} data-oid="thcb7i1" />
                      <AvatarFallback data-oid="yojrq2q">
                        {article.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div data-oid="fr00b-k">
                      <p className="font-semibold" data-oid="0rm05pl">
                        {article.author.name}
                      </p>
                      <p className="text-sm text-muted-foreground" data-oid="nwrrbik">
                        {formatDate(article.publishedAt || new Date().toISOString())}
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center space-x-6 text-sm text-muted-foreground" data-oid="egjbivq">
                  <div className="flex items-center space-x-1" data-oid="i54lb.7">
                    <Clock className="h-4 w-4" data-oid="bf7m18:" />
                    <span data-oid="vafw94q">{article.readTime || 5} min read</span>
                  </div>
                  <div className="flex items-center space-x-1" data-oid="cnx6jdi">
                    <Eye className="h-4 w-4" data-oid="-377v42" />
                    <span data-oid="ynaifdh">{formatViews(article.views || 0)} views</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {article.featuredImage && (
              <div className="mb-8" data-oid="37gxb2p">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg"
                  data-oid="a47r6-8"
                />
              </div>
            )}

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none font-serif"
              dangerouslySetInnerHTML={{ __html: article.content }}
              data-oid="mp5-3tu"
            />

            {/* Article Actions */}
            <div className="flex items-center justify-between pt-8 mt-8 border-t" data-oid="w:f7b7s">
              <div className="flex items-center space-x-2" data-oid="i1kjle:">
                <Button variant="outline" size="sm" data-oid="j3r8e8l">
                  <Share2 className="h-4 w-4 mr-2" data-oid="4uj3nek" />
                  Share
                </Button>
                <Button variant="outline" size="sm" data-oid="qmdmgn9">
                  <Bookmark className="h-4 w-4 mr-2" data-oid="97e54kd" />
                  Save
                </Button>
              </div>
              <div className="flex items-center space-x-2" data-oid="d7lqgyi">
                {article.tags?.map((tag) => (
                  <Badge key={tag} variant="secondary" data-oid="1we.u_-">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            {article.author && (
              <Card className="mt-8" data-oid="3w4i869">
                <CardContent className="p-6" data-oid="t5nmlgn">
                  <div className="flex items-start space-x-4" data-oid="uym_5u7">
                    <Avatar className="h-16 w-16" data-oid="acy77l6">
                      <AvatarImage src={article.author.avatar} data-oid="noyyu6e" />
                      <AvatarFallback data-oid="t-eyofa">
                        {article.author.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div data-oid="0ju7:b3">
                      <h3 className="font-semibold text-lg" data-oid="1h-41_1">
                        {article.author.name}
                      </h3>
                      <p className="text-muted-foreground mt-1" data-oid="09f2k2x">
                        {article.author.bio}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </article>

          {/* Sidebar */}
          <aside className="space-y-6" data-oid="0blhn76">
            <Card data-oid="t1ftwr5">
              <CardHeader data-oid="jti2.2o">
                <CardTitle data-oid="mamcrm6">Related Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="k999pk9">
                {relatedArticles.map((relatedArticle) => (
                  <div key={relatedArticle.id} className="border-b last:border-b-0 pb-4 last:pb-0" data-oid="_875wrx">
                    <NewsCard article={relatedArticle} variant="compact" data-oid=":jclu68" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card data-oid="js-283g">
              <CardHeader data-oid=".55bf01">
                <CardTitle data-oid=":up3av5">Popular This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="bj1w.9o">
                {popularArticles.map((popularArticle, index) => (
                  <div key={popularArticle.id} className="flex items-start space-x-3" data-oid="6-a6whg">
                    <span className="text-2xl font-bold text-muted-foreground" data-oid="8jmxqcb">
                      {index + 1}
                    </span>
                    <div data-oid="1lps:.k">
                      <h4 className="font-semibold text-sm line-clamp-2 hover:text-primary cursor-pointer" data-oid="79o46ww">
                        <a href={`/news/${popularArticle.slug}`} data-oid="n-jt3gi">
                          {popularArticle.title}
                        </a>
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1" data-oid="0zlmjwi">
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
      <Newsletter data-oid="-tgwpms" />
    </main>
  );
}
