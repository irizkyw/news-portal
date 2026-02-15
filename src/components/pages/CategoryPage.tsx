import React from "react";
import { useParams } from "react-router-dom";
import { NewsCard } from "@/components/news/NewsCard";
import { articles, categories } from "@/data/mockData";
import { Newsletter } from "@/components/news/Newsletter";

export function CategoryPage() {
  const { slug } = useParams();
  const category = categories.find((c) => c.slug === slug);
  const filteredArticles = articles.filter(
    (article) => article.category.slug === slug,
  );

  return (
    <main data-oid="fse28l:">
      <div className="container mx-auto px-4 py-8" data-oid="gtuk5d4">
        <h1 className="text-3xl font-bold mb-8" data-oid="gshbri.">
          Category: {category?.name || "Unknown"}
        </h1>

        {filteredArticles.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="9e4otsf"
          >
            {filteredArticles.map((article, index) => (
              <div
                key={article.id}
                className={index === 0 ? "lg:col-span-2" : ""}
                data-oid="dyp5a35"
              >
                <NewsCard
                  article={article}
                  variant={index === 0 ? "featured" : "default"}
                  data-oid="ud:3xl8"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground" data-oid="30yakg2">
            No articles found for this category.
          </p>
        )}
      </div>
      <Newsletter data-oid="ocd74yr" />
    </main>
  );
}
