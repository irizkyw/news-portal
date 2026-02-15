import React from "react";
import { useParams } from "react-router-dom";
import { NewsCard } from "@/components/news/NewsCard";
import { articles } from "@/data/mockData";
import { Newsletter } from "@/components/news/Newsletter";

export function TagPage() {
  const { tag } = useParams();
  const filteredArticles = articles.filter((article) =>
    article.tags.includes(tag || ""),
  );

  return (
    <main data-oid="h84w4h7">
      <div className="container mx-auto px-4 py-8" data-oid="k2vn_oj">
        <h1 className="text-3xl font-bold mb-8" data-oid="v9b5jf1">
          Tag: {tag}
        </h1>

        {filteredArticles.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="bqqun91"
          >
            {filteredArticles.map((article) => (
              <NewsCard key={article.id} article={article} data-oid="_nj:dpz" />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground" data-oid="1-1cutv">
            No articles found for this tag.
          </p>
        )}
      </div>
      <Newsletter data-oid="6erpy90" />
    </main>
  );
}
