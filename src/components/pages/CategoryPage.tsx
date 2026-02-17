import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NewsCard } from "@/components/news/NewsCard";
import { Newsletter } from "@/components/news/Newsletter";
import { getPosts, getCategory } from "@/services/api";
import type { Article, Category } from "@/types";

export function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [articlesData, categoryData] = await Promise.all([
          getPosts({ categorySlug: slug }),
          getCategory(slug),
        ]);
        setArticles(articlesData);
        setCategory(categoryData);
      } catch (err) {
        console.error("Failed to fetch category data:", err);
        setError("Could not load data for this category.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Loading Category...</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Skeleton loaders can be placed here */}
          <p>Loading articles...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-3xl font-bold mb-8 text-red-500">Error</h1>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Category: {category?.name || "Unknown"}
        </h1>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <div
                key={article.id}
                className={index === 0 ? "lg:col-span-2" : ""}
              >
                <NewsCard
                  article={article}
                  variant={index === 0 ? "featured" : "default"}
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground">
            No articles found for this category.
          </p>
        )}
      </div>
      <Newsletter />
    </main>
  );
}
