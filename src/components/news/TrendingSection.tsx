import React from "react";
import { TrendingUp } from "lucide-react";
import { NewsCard } from "./NewsCard";
import { articles } from "@/data/mockData";

export function TrendingSection() {
  const trendingArticles = articles
    .filter((article) => article.isPopular)
    .slice(0, 4);

  return (
    <section className="container mx-auto px-4 py-8" data-oid="59c8i5w">
      <div className="flex items-center space-x-2 mb-6" data-oid="1zfhhib">
        <TrendingUp className="h-6 w-6 text-primary" data-oid="6na6vhw" />
        <h2 className="text-2xl font-bold" data-oid="h4f1263">
          Trending Now
        </h2>
      </div>

      <div className="flex overflow-x-auto space-x-6 pb-4" data-oid="7znuzlh">
        {trendingArticles.map((article) => (
          <div
            key={article.id}
            className="flex-shrink-0 w-80"
            data-oid="wp6rg89"
          >
            <NewsCard article={article} data-oid=".7c.3gj" />
          </div>
        ))}
      </div>
    </section>
  );
}
