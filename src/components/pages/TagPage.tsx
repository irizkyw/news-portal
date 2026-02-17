import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { NewsCard } from "@/components/news/NewsCard";
import { getPosts } from "../../services/api";
import type { Article } from "../../types";
import { Newsletter } from "@/components/news/Newsletter";

export function TagPage() {
  const { tag } = useParams();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (tag) {
      setLoading(true);
      getPosts({ tagName: tag })
        .then(setArticles)
        .catch(() => setError("Failed to fetch articles for this tag."))
        .finally(() => setLoading(false));
    }
  }, [tag]);

  return (
    <main data-oid="nrkyh5:">
      <div className="container mx-auto px-4 py-8" data-oid="kw9.5ln">
        <h1 className="text-3xl font-bold mb-8" data-oid="bk3befh">
          Tag: {tag}
        </h1>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading articles...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : articles.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="0s8h2qk"
          >
            {articles.map((article) => (
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
