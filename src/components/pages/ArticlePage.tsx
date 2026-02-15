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
        data-oid="i-n.gsz"
      >
        <h1 className="text-3xl font-bold" data-oid="eyae8t_">
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
    <main data-oid="xs:9q44">
      <div className="container mx-auto px-4 py-8" data-oid="7pb_._0">
        <div
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
          data-oid="iltrkzl"
        >
          {/* Main Article */}
          <article className="lg:col-span-3" data-oid=".dt-rjt">
            {/* Article Header */}
            <div className="mb-8" data-oid="ztyw1jm">
              <Badge
                className={article.category.color}
                variant="secondary"
                data-oid="_r047cw"
              >
                {article.category.name}
              </Badge>
              <h1
                className="text-4xl font-bold mt-4 mb-6 font-serif leading-tight"
                data-oid="9_o881c"
              >
                {article.title}
              </h1>

              {/* Article Meta */}
              <div
                className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b"
                data-oid="kxps01d"
              >
                <div className="flex items-center space-x-4" data-oid="g4lonsg">
                  <Avatar className="h-12 w-12" data-oid=".:mxl_k">
                    <AvatarImage
                      src={article.author.avatar}
                      data-oid="hb0a84w"
                    />

                    <AvatarFallback data-oid="m:7o5ad">
                      {article.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div data-oid="j14__2x">
                    <p className="font-semibold" data-oid="6:8-y9i">
                      {article.author.name}
                    </p>
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="yb0u:x."
                    >
                      {formatDate(article.publishedAt)}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center space-x-6 text-sm text-muted-foreground"
                  data-oid="gu4z:uo"
                >
                  <div
                    className="flex items-center space-x-1"
                    data-oid="9twu3h7"
                  >
                    <Clock className="h-4 w-4" data-oid="m13i2n6" />
                    <span data-oid="hoejc_j">{article.readTime} min read</span>
                  </div>
                  <div
                    className="flex items-center space-x-1"
                    data-oid="v:egqaa"
                  >
                    <Eye className="h-4 w-4" data-oid="-l__ozo" />
                    <span data-oid="llluz24">
                      {formatViews(article.views)} views
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8" data-oid="o99kb-t">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
                data-oid="q-wp1nr"
              />
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none font-serif"
              data-oid="l4ts94n"
            >
              <div
                dangerouslySetInnerHTML={{ __html: article.content }}
                data-oid="w4ddh6q"
              />
            </div>

            {/* Article Actions */}
            <div
              className="flex items-center justify-between pt-8 mt-8 border-t"
              data-oid="o96onjq"
            >
              <div className="flex items-center space-x-2" data-oid="8bvypj0">
                <Button variant="outline" size="sm" data-oid="tfu0imm">
                  <Share2 className="h-4 w-4 mr-2" data-oid="vdv.e.s" />
                  Share
                </Button>
                <Button variant="outline" size="sm" data-oid="uhi.u.f">
                  <Bookmark className="h-4 w-4 mr-2" data-oid="9x1uv6c" />
                  Save
                </Button>
              </div>
              <div className="flex items-center space-x-2" data-oid="4xjknp0">
                {article.tags.map((tag) => (
                  <Link to={`/tag/${tag}`} key={tag} data-oid="q.-ij5.">
                    <Badge variant="secondary" data-oid="sq0lyvw">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
            {/* Author Bio */}
            <Card className="mt-8" data-oid="ll5xwyu">
              <CardContent className="p-6" data-oid="-r1w6px">
                <div className="flex items-start space-x-4" data-oid="36ojp3e">
                  <Avatar className="h-16 w-16" data-oid="d0-vc4v">
                    <AvatarImage
                      src={article.author.avatar}
                      data-oid="6p7oqfl"
                    />

                    <AvatarFallback data-oid="s-qkah8">
                      {article.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div data-oid=":6v3-fw">
                    <h3 className="font-semibold text-lg" data-oid="8jcys.m">
                      {article.author.name}
                    </h3>
                    <p
                      className="text-muted-foreground mt-1"
                      data-oid="7bux9qh"
                    >
                      {article.author.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6" data-oid="eb7m8s4">
            <Card data-oid="g92tm2u">
              <CardHeader data-oid="rx_vw.t">
                <CardTitle data-oid="3k3mf2y">Related Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="k-xnd--">
                {relatedArticles.map((relatedArticle) => (
                  <div
                    key={relatedArticle.id}
                    className="border-b last:border-b-0 pb-4 last:pb-0"
                    data-oid="55yr_y_"
                  >
                    <NewsCard
                      article={relatedArticle}
                      variant="compact"
                      data-oid="zq5edvw"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card data-oid="z260im-">
              <CardHeader data-oid="3b2wtww">
                <CardTitle data-oid="ebvelyy">Popular This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="wu00x_v">
                {articles
                  .filter((a) => a.isPopular)
                  .slice(0, 3)
                  .map((popularArticle, index) => (
                    <div
                      key={popularArticle.id}
                      className="flex items-start space-x-3"
                      data-oid="w7k6yal"
                    >
                      <span
                        className="text-2xl font-bold text-muted-foreground"
                        data-oid="8suk1kj"
                      >
                        {index + 1}
                      </span>
                      <div data-oid="6w.9fal">
                        <h4
                          className="font-semibold text-sm line-clamp-2 hover:text-primary cursor-pointer"
                          data-oid="6se12ip"
                        >
                          <a
                            href={`/news/${popularArticle.slug}`}
                            data-oid="h3_hkv:"
                          >
                            {popularArticle.title}
                          </a>
                        </h4>
                        <p
                          className="text-xs text-muted-foreground mt-1"
                          data-oid="yj47rs6"
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
      <Newsletter data-oid=":bnl0sn" />
    </main>
  );
}
