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
    <section className="container mx-auto px-4 py-8" data-oid="1.jp_tq">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-oid="q17jx.0">
        {/* Main Featured Article */}
        <div className="lg:col-span-2" data-oid="wlgr2jj">
          <NewsCard
            article={featuredArticle}
            variant="featured"
            data-oid="p4v8d86"
          />
        </div>

        {/* Supporting Articles */}
        <div className="space-y-6" data-oid="6qaiq1v">
          {supportingArticles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              variant="compact"
              data-oid="tkur-pg"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
