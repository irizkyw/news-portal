import React, { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
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

export function TrendingSection() {
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

  const trendingArticles = articles
    .filter((article) => article.isPopular)
    .slice(0, 4);

  return (
    <section className="container mx-auto px-4 py-8" data-oid="abysuy1">
      <div className="flex items-center space-x-2 mb-6" data-oid="7fb4fhj">
        <TrendingUp className="h-6 w-6 text-primary" data-oid="k_todg:" />
        <h2 className="text-2xl font-bold" data-oid="qgoefzk">
          Trending Now
        </h2>
      </div>

      <div className="flex overflow-x-auto space-x-6 pb-4" data-oid="mrj3krq">
        {trendingArticles.map((article) => (
          <div
            key={article.id}
            className="flex-shrink-0 w-80"
            data-oid="hjpc_aa"
          >
            <NewsCard article={article} data-oid="o0w23ez" />
          </div>
        ))}
      </div>
    </section>
  );
}
