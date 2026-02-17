import React, { useState, useEffect, useCallback } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { NewsCard } from "./NewsCard";
import { getLatestPosts, getPopularPosts, getTrendingPosts } from "../../services/api";
import type { Article } from "../../types";

export function LatestNews() {
  const [activeTab, setActiveTab] = useState("latest");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArticles = useCallback(async (tab: string) => {
    setLoading(true);
    setError(null);
    try {
      let data;
      const limit = 6;
      switch (tab) {
        case "popular":
          data = await getPopularPosts(limit);
          break;
        case "trending":
          data = await getTrendingPosts(limit);
          break;
        case "latest":
        default:
          data = await getLatestPosts(limit);
          break;
      }
      setArticles(data);
    } catch (err) {
      console.error(`Failed to fetch ${tab} articles:`, err);
      setError(`Could not load ${tab} articles.`);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchArticles(activeTab);
  }, [activeTab, fetchArticles]);
  
  const renderContent = () => {
    if (loading) {
      return <p>Loading articles...</p>;
    }
    if (error) {
      return <p className="text-red-500">{error}</p>;
    }
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    );
  };

  return (
    <section className="container mx-auto px-4 py-8">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">Latest News</h2>
          <TabsList>
            <TabsTrigger value="latest">Latest</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="trending">Trending</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="latest">{renderContent()}</TabsContent>
        <TabsContent value="popular">{renderContent()}</TabsContent>
        <TabsContent value="trending">{renderContent()}</TabsContent>
      </Tabs>
    </section>
  );
}
