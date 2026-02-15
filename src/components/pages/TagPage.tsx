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
    <main data-oid="atly_ex">
      <div className="container mx-auto px-4 py-8" data-oid="5fah.md">
        <h1 className="text-3xl font-bold mb-8" data-oid="2pq1:oj">
          Tag: {tag}
        </h1>

        {filteredArticles.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="hluya2n"
          >
            {filteredArticles.map((article) => (
              <NewsCard key={article.id} article={article} data-oid="2qa9gfu" />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground" data-oid="e3f-mm9">
            No articles found for this tag.
          </p>
        )}
      </div>
      <Newsletter data-oid="rh.07vw" />
    </main>
  );
}
