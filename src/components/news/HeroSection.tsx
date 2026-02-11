import React from "react";
import { NewsCard } from "./NewsCard";
import { articles } from "@/data/mockData";

export function HeroSection() {
  const featuredArticle =
    articles.find((article) => article.isFeatured) || articles[0];
  const supportingArticles = articles
    .filter((article) => article.id !== featuredArticle.id)
    .slice(0, 2);

  return (
    <section className="container mx-auto px-4 py-8" data-oid="u6sgup8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6" data-oid="h0ye9si">
        {/* Main Featured Article */}
        <div className="lg:col-span-2" data-oid="9gkpn_1">
          <NewsCard
            article={featuredArticle}
            variant="featured"
            data-oid="rxtufl."
          />
        </div>

        {/* Supporting Articles */}
        <div className="space-y-6" data-oid="eu4ipie">
          {supportingArticles.map((article) => (
            <NewsCard
              key={article.id}
              article={article}
              variant="compact"
              data-oid="q0ihpco"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
