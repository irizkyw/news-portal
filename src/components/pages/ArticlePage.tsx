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
        data-oid="o.__emk"
      >
        <h1 className="text-3xl font-bold" data-oid="0rybfxe">
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
    <main data-oid="zi0f.:e">
      <div className="container mx-auto px-4 py-8" data-oid="r.ceu1h">
        <div
          className="grid grid-cols-1 lg:grid-cols-4 gap-8"
          data-oid="_1e:eln"
        >
          {/* Main Article */}
          <article className="lg:col-span-3" data-oid="t8tpkm:">
            {/* Article Header */}
            <div className="mb-8" data-oid="zsqf2.a">
              <Badge
                className={article.category.color}
                variant="secondary"
                data-oid="54qjpvd"
              >
                {article.category.name}
              </Badge>
              <h1
                className="text-4xl font-bold mt-4 mb-6 font-serif leading-tight"
                data-oid="ii.ieq5"
              >
                {article.title}
              </h1>

              {/* Article Meta */}
              <div
                className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b"
                data-oid="eeouc9p"
              >
                <div className="flex items-center space-x-4" data-oid="t0o49ty">
                  <Avatar className="h-12 w-12" data-oid="4atfxe6">
                    <AvatarImage
                      src={article.author.avatar}
                      data-oid="._1mgmt"
                    />

                    <AvatarFallback data-oid="x.795tg">
                      {article.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div data-oid="rvpe.7c">
                    <p className="font-semibold" data-oid="0mek:ot">
                      {article.author.name}
                    </p>
                    <p
                      className="text-sm text-muted-foreground"
                      data-oid="kgwsexx"
                    >
                      {formatDate(article.publishedAt)}
                    </p>
                  </div>
                </div>

                <div
                  className="flex items-center space-x-6 text-sm text-muted-foreground"
                  data-oid=":hw6:sg"
                >
                  <div
                    className="flex items-center space-x-1"
                    data-oid="79eiw7w"
                  >
                    <Clock className="h-4 w-4" data-oid="-9vhx.i" />
                    <span data-oid="s-7ft9p">{article.readTime} min read</span>
                  </div>
                  <div
                    className="flex items-center space-x-1"
                    data-oid="pq80wjt"
                  >
                    <Eye className="h-4 w-4" data-oid="70r7p71" />
                    <span data-oid=":.edp_x">
                      {formatViews(article.views)} views
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8" data-oid="ra25:-d">
              <img
                src={article.featuredImage}
                alt={article.title}
                className="w-full h-64 md:h-96 object-cover rounded-lg"
                data-oid="2qepvt4"
              />
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg max-w-none font-serif"
              data-oid="1dplnrq"
            >
              <div
                dangerouslySetInnerHTML={{ __html: article.content }}
                data-oid="ma-ert_"
              />
            </div>

            {/* Article Actions */}
            <div
              className="flex items-center justify-between pt-8 mt-8 border-t"
              data-oid="arkt09r"
            >
              <div className="flex items-center space-x-2" data-oid="otv0tqb">
                <Button variant="outline" size="sm" data-oid="u4yq1n.">
                  <Share2 className="h-4 w-4 mr-2" data-oid="0319kc0" />
                  Share
                </Button>
                <Button variant="outline" size="sm" data-oid="q3wa6b.">
                  <Bookmark className="h-4 w-4 mr-2" data-oid="wmayku6" />
                  Save
                </Button>
              </div>
              <div className="flex items-center space-x-2" data-oid="g.s7dlz">
                {article.tags.map((tag) => (
                  <Link to={`/tag/${tag}`} key={tag} data-oid="x0s2y3m">
                    <Badge variant="secondary" data-oid="9769:bc">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            </div>
            {/* Author Bio */}
            <Card className="mt-8" data-oid="anz393j">
              <CardContent className="p-6" data-oid="tyo4ofe">
                <div className="flex items-start space-x-4" data-oid="_pa24ma">
                  <Avatar className="h-16 w-16" data-oid="4ithlri">
                    <AvatarImage
                      src={article.author.avatar}
                      data-oid="6yo7irn"
                    />

                    <AvatarFallback data-oid="465w3od">
                      {article.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div data-oid="xmr4lre">
                    <h3 className="font-semibold text-lg" data-oid="145-p1:">
                      {article.author.name}
                    </h3>
                    <p
                      className="text-muted-foreground mt-1"
                      data-oid="gkzh012"
                    >
                      {article.author.bio}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6" data-oid=".du3ro3">
            <Card data-oid="2phnt3n">
              <CardHeader data-oid="r.65y53">
                <CardTitle data-oid="m4dp8y5">Related Articles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="_m.t--c">
                {relatedArticles.map((relatedArticle) => (
                  <div
                    key={relatedArticle.id}
                    className="border-b last:border-b-0 pb-4 last:pb-0"
                    data-oid="z4w9v0a"
                  >
                    <NewsCard
                      article={relatedArticle}
                      variant="compact"
                      data-oid="i5v:40_"
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card data-oid="zful7l2">
              <CardHeader data-oid="sk4yms-">
                <CardTitle data-oid="xir8-g.">Popular This Week</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4" data-oid="sr-vrcr">
                {articles
                  .filter((a) => a.isPopular)
                  .slice(0, 3)
                  .map((popularArticle, index) => (
                    <div
                      key={popularArticle.id}
                      className="flex items-start space-x-3"
                      data-oid="d8w9tss"
                    >
                      <span
                        className="text-2xl font-bold text-muted-foreground"
                        data-oid="28892gv"
                      >
                        {index + 1}
                      </span>
                      <div data-oid="g-v4ljk">
                        <h4
                          className="font-semibold text-sm line-clamp-2 hover:text-primary cursor-pointer"
                          data-oid="u_9bhsn"
                        >
                          <a
                            href={`/news/${popularArticle.slug}`}
                            data-oid="f3dr6.r"
                          >
                            {popularArticle.title}
                          </a>
                        </h4>
                        <p
                          className="text-xs text-muted-foreground mt-1"
                          data-oid="0lp7o73"
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
      <Newsletter data-oid="bn4_g4b" />
    </main>
  );
}
