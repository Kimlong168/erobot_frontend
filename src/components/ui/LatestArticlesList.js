"use client";
import { getLatestArticles } from "@/queries/article";
import ArticleCard from "./ArticleCard";
import { getAuthors } from "@/queries/author";
import { getArticleCategories } from "@/queries/articleCategory";

import { useEffect, useState } from "react";

const LatestArticlesList = () => {
  const [latestArticles, setLatestArticles] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [articleCategories, setArticleCategories] = useState([]);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      const articles = await getLatestArticles();
      const articleCategories = await getArticleCategories();
      const authors = await getAuthors();
      setLatestArticles(articles);
      setArticleCategories(articleCategories);
      setAuthors(authors);
    };
    fetchLatestArticles();
  }, []);

  if (latestArticles.length === 0) return null; //skeleton loader

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      {latestArticles?.map((article) => {
        const author = authors.find((author) => author.id === article.authorId);
        const category = articleCategories.find(
          (category) => category.id === article.categoryId
        );

        return (
          <ArticleCard
            key={article?.id}
            article={{ ...article, author, category }}
          />
        );
      })}
    </div>
  );
};

export default LatestArticlesList;
