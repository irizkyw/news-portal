import React, { useState, useEffect } from "react";
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

export function HeroSection() {
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

  const featuredArticle =
    articles.find((article) => article.isFeatured) || articles[0];
  const supportingArticles = articles
    .filter((article) => article.id !== featuredArticle.id)
    .slice(0, 2);

  if (!featuredArticle) {
    return null;
  }

  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Featured Article */}
        <div className="lg:col-span-2">
          <NewsCard article={featuredArticle} variant="featured" />
        </div>

        {/* Supporting Articles */}
        <div className="space-y-6">
          {supportingArticles.map((article) => (
            <NewsCard key={article.id} article={article} variant="compact" />
          ))}
        </div>
      </div>
    </section>
  );
}
