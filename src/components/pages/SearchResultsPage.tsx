import React from "react";
import { useSearchParams } from "react-router-dom";
import { NewsCard } from "@/components/news/NewsCard";
import { articles } from "@/data/mockData";
import { Newsletter } from "@/components/news/Newsletter";

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");

  const filteredArticles = articles.filter(
    (article) =>
      article.title.toLowerCase().includes(query?.toLowerCase() || "") ||
      article.excerpt.toLowerCase().includes(query?.toLowerCase() || "") ||
      article.content.toLowerCase().includes(query?.toLowerCase() || ""),
  );

  return (
    <main>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">
          Search Results for "{query}"
        </h1>

        {filteredArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article, index) => (
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
            No articles found for your search query.
          </p>
        )}
      </div>
      <Newsletter />
    </main>
  );
}
