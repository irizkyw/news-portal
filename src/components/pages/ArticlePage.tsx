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
        data-oid=".642gx8"
      >
        <h1 className="text-3xl font-bold" data-oid="xf0s2zq">
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
    <main data-oid="e4xntmf">
      <div className="container mx-auto px-4 py-8" data-oid="bx4tuti">
        <div
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
          data-oid="fbz.dnz"
        >
          {/* Main Article */}
          <article className="lg:col-span-3" data-oid="v7mwlak">
            {/* Article Header */}
            <div className="mb-8" data-oid="w8ag:go">
              <Badge
                className={article.category.color}
                variant="secondary"
                data-oid="o10l6yg"
              >
                {article.category.name}
              </Badge>
              <h1
                className="text-4xl font-bold mt-4 mb-6 font-serif leading-tight"
                data-oid="mzc1ep-"
              >
                {article.title}
              </h1>

              {/* Article Meta */}
              <div
                className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b"
                data-oid=".z37cg9"
              >
                <div className="flex items-center space-x-4" data-oid="xv0ko9x">
                  <Avatar className="h-12 w-12" data-oid="1twbmuw">
                    <AvatarImage
                      src={article.author.avatar}
                      data-oid="3mumjyv"
                    />

                    <AvatarFallback data-oid="w:-b54i">
                      {article.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div data-oid="kebvy_x">
                    <p className="font-semibold" data-oid="4oxl6ui">
                      {article.author.name}
                    </p>
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="3b40vwb"
                    >
                      {formatDate(article.publishedAt)}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center space-x-6 text-sm text-muted-foreground"
                  data-oid="fag1xzg"
                >
                  <div
                    className="flex items-center space-x-1"
                    data-oid="g92z_0z"
                  >
                    <Clock className="h-4 w-4" data-oid="oy-6vf." />
                    <span data-oid="radr2vf">{article.readTime} min read</span>
                  </div>
                  <div
                    className="flex items-center space-x-1"
                    data-oid="x27fe-p"
                  >
                    <Eye className="h-4 w-4" data-oid="juvzzgi" />
                    <span data-oid="9-lyhfp">
                      {formatViews(article.views)} views
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8" data-oid="j:r6twg">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
                data-oid="6mhob46"
              />
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none font-serif"
              data-oid="0fl_d_z"
            >
              <div
                dangerouslySetInnerHTML={{ __html: article.content }}
                data-oid="bhlyn1z"
              />
            </div>

            {/* Article Actions */}
            <div
              className="flex items-center justify-between pt-8 mt-8 border-t"
              data-oid="6bwjf_s"
            >
              <div className="flex items-center space-x-2" data-oid="q9ah9-p">
                <Button variant="outline" size="sm" data-oid="pf11lr.">
                  <Share2 className="h-4 w-4 mr-2" data-oid="z-5ec74" />
                  Share
                </Button>
                <Button variant="outline" size="sm" data-oid="icijag.">
                  <Bookmark className="h-4 w-4 mr-2" data-oid=".u1guxb" />
                  Save
                </Button>
              </div>
              <div className="flex items-center space-x-2" data-oid="imu-zzn">
                {article.tags.map((tag) => (
                  <Link to={`/tag/${tag}`} key={tag} data-oid="v8xc8b.">
                    <Badge variant="secondary" data-oid="ii0e85y">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
            {/* Author Bio */}
            <Card className="mt-8" data-oid="you:8p_">
              <CardContent className="p-6" data-oid="ejirbtn">
                <div className="flex items-start space-x-4" data-oid="ke45ln8">
                  <Avatar className="h-16 w-16" data-oid="-ip91vp">
                    <AvatarImage
                      src={article.author.avatar}
                      data-oid="3ib:u7j"
                    />

                    <AvatarFallback data-oid="ufz-q1p">
                      {article.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div data-oid="c-pj8in">
                    <h3 className="font-semibold text-lg" data-oid="x5shfqc">
                      {article.author.name}
                    </h3>
                    <p
                      className="text-muted-foreground mt-1"
                      data-oid="es9:qos"
                    >
                      {article.author.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6" data-oid="o.38::4">
            <Card data-oid="gwaavd5">
              <CardHeader data-oid="n5y:v2.">
                <CardTitle data-oid="qbj1:mu">Related Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="dp.:aen">
                {relatedArticles.map((relatedArticle) => (
                  <div
                    key={relatedArticle.id}
                    className="border-b last:border-b-0 pb-4 last:pb-0"
                    data-oid="zvxt:g_"
                  >
                    <NewsCard
                      article={relatedArticle}
                      variant="compact"
                      data-oid="_.ocb9_"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card data-oid="v.0ugn5">
              <CardHeader data-oid="3247buj">
                <CardTitle data-oid="37ra-nv">Popular This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="-.m7gq5">
                {articles
                  .filter((a) => a.isPopular)
                  .slice(0, 3)
                  .map((popularArticle, index) => (
                    <div
                      key={popularArticle.id}
                      className="flex items-start space-x-3"
                      data-oid="ydn0sn3"
                    >
                      <span
                        className="text-2xl font-bold text-muted-foreground"
                        data-oid="1o_x5pa"
                      >
                        {index + 1}
                      </span>
                      <div data-oid="3wdha20">
                        <h4
                          className="font-semibold text-sm line-clamp-2 hover:text-primary cursor-pointer"
                          data-oid="ca6x8oa"
                        >
                          <a
                            href={`/news/${popularArticle.slug}`}
                            data-oid=".q4s2v0"
                          >
                            {popularArticle.title}
                          </a>
                        </h4>
                        <p
                          className="text-xs text-muted-foreground mt-1"
                          data-oid="ab9mn9-"
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
      <Newsletter data-oid="bcgoj4y" />
    </main>
  );
}
