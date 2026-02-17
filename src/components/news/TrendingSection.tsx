import React, { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { NewsCard } from "./NewsCard";
import { getTrendingPosts } from "../../services/api";
import type { Article } from "../../types";

export function TrendingSection() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingArticles = async () => {
      try {
        setLoading(true);
        // We can specify a limit, e.g., 10, for trending posts
        const data = await getTrendingPosts(10);
        // The backend doesn't have an isPopular field, so we just take the data as is.
        // Or we can assume the API returns pre-sorted trending articles.
        setArticles(data.slice(0, 4)); // Take the top 4 as before
      } catch (err) {
        console.error("Failed to fetch trending articles:", err);
        setError("Could not load trending articles.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingArticles();
  }, []);

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="flex items-center space-x-2 mb-6">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Trending Now</h2>
      </div>

      {loading && <p>Loading trending articles...</p>}
      {error && <p className="text-red-500">{error}</p>}
      
      {!loading && !error && (
        <div className="flex overflow-x-auto space-x-6 pb-4">
          {articles.map((article) => (
            <div
              key={article.id}
              className="flex-shrink-0 w-80"
            >
              <NewsCard article={article} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
