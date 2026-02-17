import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { NewsCard } from "@/components/news/NewsCard";
import { Newsletter } from "@/components/news/Newsletter";
import { getPosts } from "@/services/api";
import type { Article } from "@/types";

export function SearchResultsPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q");
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) {
      setArticles([]);
      setLoading(false);
      return;
    }

    const fetchSearch = async () => {
      try {
        setLoading(true);
        const results = await getPosts({ search: query });
        setArticles(results);
      } catch (err) {
        setError("Failed to fetch search results.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearch();
  }, [query]);

  return (
    <main data-oid="tk2tzz8">
      <div className="container mx-auto px-4 py-8" data-oid="ejvn.ms">
        <h1 className="text-3xl font-bold mb-8" data-oid="t.0:fic">
          Search Results for "{query}"
        </h1>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {!loading && !error && articles.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="v3cvv-i"
          >
            {articles.map((article, index) => (
              <div
                key={article.id}
                className={index === 0 ? "lg:col-span-2" : ""}
                data-oid="8phn7zt"
              >
                <NewsCard
                  article={article}
                  variant={index === 0 ? "featured" : "default"}
                  data-oid="5.3osob"
                />
              </div>
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <p className="text-center text-muted-foreground" data-oid="k-6nq8_">
              No articles found for your search query.
            </p>
          )
        )}
      </div>
      <Newsletter data-oid="s_iy7t2" />
    </main>
  );
}
