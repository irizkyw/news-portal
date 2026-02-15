import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewsCard } from "./NewsCard";

interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featuredImage: string;
  category: Category;
  author: Author;
  publishedAt: string;
  readTime: number;
  views: number;
  status: "published" | "draft";
  isFeatured: boolean;
  isPopular: boolean;
  tags: string[];
}

interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
}

interface Author {
  id: string;
  name: string;
  avatar: string;
  bio: string;
}

export function LatestNews() {
  const [activeTab, setActiveTab] = useState("latest");
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/posts");
        const data = await res.json();
        setArticles(data);
      } catch (error) {
        console.error("Failed to fetch articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const getFilteredArticles = (filter: string) => {
    switch (filter) {
      case "popular":
        return articles.filter((article) => article.isPopular).slice(0, 6);
      case "trending":
        return articles.filter((article) => article.views > 15000).slice(0, 6);
      default:
        return articles.slice(0, 6);
    }
  };

  return (
    <section className="container mx-auto px-4 py-8" data-oid="g49n7nq">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
        data-oid="bg-2dy."
      >
        <div
          className="flex items-center justify-between mb-6"
          data-oid="au7u6vf"
        >
          <h2 className="text-2xl font-bold" data-oid="_rd1o.m">
            Latest News
          </h2>
          <TabsList data-oid=":w6ezkq">
            <TabsTrigger value="latest" data-oid="gz:pa6:">
              Latest
            </TabsTrigger>
            <TabsTrigger value="popular" data-oid="7y5cffo">
              Popular
            </TabsTrigger>
            <TabsTrigger value="trending" data-oid="wr0-hwb">
              Trending
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="latest" data-oid="9i0mx.4">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="0lx6azn"
          >
            {getFilteredArticles("latest").map((article) => (
              <NewsCard key={article.id} article={article} data-oid="o3th1cc" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" data-oid="w2u2zpe">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="5vzg7kr"
          >
            {getFilteredArticles("popular").map((article) => (
              <NewsCard key={article.id} article={article} data-oid="y9vo.ha" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" data-oid="qfkom_p">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid=".rwc72z"
          >
            {getFilteredArticles("trending").map((article) => (
              <NewsCard key={article.id} article={article} data-oid="x88-pnq" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
