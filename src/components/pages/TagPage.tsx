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
    <main data-oid="nrkyh5:">
      <div className="container mx-auto px-4 py-8" data-oid="kw9.5ln">
        <h1 className="text-3xl font-bold mb-8" data-oid="bk3befh">
          Tag: {tag}
        </h1>

        {filteredArticles.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="0s8h2qk"
          >
            {filteredArticles.map((article) => (
              <NewsCard key={article.id} article={article} data-oid="o8p_c6z" />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground" data-oid="x8nvbo7">
            No articles found for this tag.
          </p>
        )}
      </div>
      <Newsletter data-oid="8dt97_0" />
    </main>
  );
}
