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
    <section className="container mx-auto px-4 py-8" data-oid="d01m:_g">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
        data-oid="mehpap6"
      >
        <div
          className="flex items-center justify-between mb-6"
          data-oid="9734epy"
        >
          <h2 className="text-2xl font-bold" data-oid=":3_if5f">
            Latest News
          </h2>
          <TabsList data-oid="3nj836g">
            <TabsTrigger value="latest" data-oid="fwl_yzc">
              Latest
            </TabsTrigger>
            <TabsTrigger value="popular" data-oid="ozxf8y.">
              Popular
            </TabsTrigger>
            <TabsTrigger value="trending" data-oid="z2-gjyd">
              Trending
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="latest" data-oid="_kfkmwf">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid=".::65tw"
          >
            {getFilteredArticles("latest").map((article) => (
              <NewsCard key={article.id} article={article} data-oid="-4gikgf" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" data-oid="73aogjw">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="h:vn7p8"
          >
            {getFilteredArticles("popular").map((article) => (
              <NewsCard key={article.id} article={article} data-oid="99sp-qy" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" data-oid="a93p610">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="5zphxl6"
          >
            {getFilteredArticles("trending").map((article) => (
              <NewsCard key={article.id} article={article} data-oid="0f1yuev" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
