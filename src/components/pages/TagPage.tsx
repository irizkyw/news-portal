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
    <main data-oid="lepuo-2">
      <div className="container mx-auto px-4 py-8" data-oid="xic0imd">
        <h1 className="text-3xl font-bold mb-8" data-oid="2wqjk5:">
          Tag: {tag}
        </h1>

        {filteredArticles.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="ak4lb-t"
          >
            {filteredArticles.map((article) => (
              <NewsCard key={article.id} article={article} data-oid="um-k1vs" />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground" data-oid="lvxlv4v">
            No articles found for this tag.
          </p>
        )}
      </div>
      <Newsletter data-oid="14nbyfi" />
    </main>
  );
}
