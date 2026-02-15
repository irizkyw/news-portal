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
    <section className="container mx-auto px-4 py-8" data-oid=":29dcq7">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
        data-oid="y5bkim_"
      >
        <div
          className="flex items-center justify-between mb-6"
          data-oid="2gnu58e"
        >
          <h2 className="text-2xl font-bold" data-oid="nwnsea7">
            Latest News
          </h2>
          <TabsList data-oid="0tmnjqh">
            <TabsTrigger value="latest" data-oid="xyx.gbb">
              Latest
            </TabsTrigger>
            <TabsTrigger value="popular" data-oid="surmqkz">
              Popular
            </TabsTrigger>
            <TabsTrigger value="trending" data-oid="96a23:r">
              Trending
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="latest" data-oid="z5jp685">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="8c0vryc"
          >
            {getFilteredArticles("latest").map((article) => (
              <NewsCard key={article.id} article={article} data-oid="_jkhz4n" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" data-oid="hfqy8bb">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="k:06sw7"
          >
            {getFilteredArticles("popular").map((article) => (
              <NewsCard key={article.id} article={article} data-oid="wtumksj" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" data-oid="5k8vrt7">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="k3kqgrc"
          >
            {getFilteredArticles("trending").map((article) => (
              <NewsCard key={article.id} article={article} data-oid="b595mn0" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
