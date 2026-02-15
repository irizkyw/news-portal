import React, { useState, useEffect } from "react";
import { NewsCard } from "./NewsCard";
import { Article } from "../../types"; // Assuming Article type is defined in types.d.ts

export function HeroSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHeroArticles = async () => {
      try {
        const response = await fetch("http://localhost:8080/posts?isFeatured=true&limit=3");
        if (!response.ok) {
          throw new Error("Failed to fetch hero articles");
        }
        const data: Article[] = await response.json();
        setArticles(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHeroArticles();
  }, []);

  if (loading) {
    return <section className="container mx-auto px-4 py-8 text-center">Loading hero articles...</section>;
  }

  if (error) {
    return <section className="container mx-auto px-4 py-8 text-center text-red-500">Error: {error}</section>;
  }

  // Ensure there's at least one article to display
  if (articles.length === 0) {
    return <section className="container mx-auto px-4 py-8 text-center">No featured articles available.</section>;
  }

  const featuredArticle = articles[0];
  const supportingArticles = articles.slice(1, 3); // Get the next two articles

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Featured Article */}
        <div className="lg:col-span-2">
          <NewsCard
            article={featuredArticle}
            variant="featured"
          />
        </div>

        {/* Supporting Articles */}
        <div className="space-y-6">
          {supportingArticles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              variant="compact"
            />
          ))}
        </div>
      </div>
    </section>
  );
}