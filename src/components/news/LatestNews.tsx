import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NewsCard } from "./NewsCard";
import { articles } from "@/data/mockData";

export function LatestNews() {
  const [activeTab, setActiveTab] = useState("latest");

  const getFilteredArticles = (filter: string) => {
    switch (filter) {
      case "popular":
        return articles.filter((article) => article.isPopular).slice(0, 6);
      case "trending":
        return articles.filter((article) => article.views > 15000).slice(0, 6);
      default:
        return articles.slice(0, 6);
    }
  };

  return (
    <section className="container mx-auto px-4 py-8" data-oid="t:18p0x">
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
        data-oid="5v0_qq8"
      >
        <div
          className="flex items-center justify-between mb-6"
          data-oid="hcoqtul"
        >
          <h2 className="text-2xl font-bold" data-oid="z8q1yyb">
            Latest News
          </h2>
          <TabsList data-oid=":ma8z8o">
            <TabsTrigger value="latest" data-oid=":qxmjxd">
              Latest
            </TabsTrigger>
            <TabsTrigger value="popular" data-oid="xyz.mn6">
              Popular
            </TabsTrigger>
            <TabsTrigger value="trending" data-oid="t3c9p.q">
              Trending
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="latest" data-oid="ac_1hhh">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="3oskl2:"
          >
            {getFilteredArticles("latest").map((article) => (
              <NewsCard key={article.id} article={article} data-oid="4-tervh" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" data-oid="t4kg429">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="x3e24lg"
          >
            {getFilteredArticles("popular").map((article) => (
              <NewsCard key={article.id} article={article} data-oid="l8c-jd4" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="trending" data-oid="22mm1ny">
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-oid="ntek-dy"
          >
            {getFilteredArticles("trending").map((article) => (
              <NewsCard key={article.id} article={article} data-oid="so2wizc" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}
