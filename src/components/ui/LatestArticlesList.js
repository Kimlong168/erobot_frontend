"use client";
import { getLatestArticles } from "@/queries/article";
import ArticleCard from "./ArticleCard";
import { getAuthors } from "@/queries/author";
import { getArticleCategories } from "@/queries/articleCategory";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeart } from "react-icons/fa";

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
    <>
      <h2 className="text-2xl font-primary hover:bg-secondary bg-primary text-center py-1 text-white">
        Read Our Articles
      </h2>

      <div className="container mt-8 mb-14">
        <div className="flex flex-col lg:flex-row gap-5">
          {latestArticles?.map((article, index) => {
            const author = authors.find(
              (author) => author.id === article.authorId
            );
            const category = articleCategories.find(
              (category) => category.id === article.categoryId
            );

            return (
              <motion.div
                variants={fadeIn(
                  {
                    default: "left",
                  },
                  0.1 * (index + 1),
                  "all"
                )}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.3 }}
                key={article?.id}
                className="min-h-full w-full"
              >
                <ArticleCard article={{ ...article, author, category }} />
              </motion.div>
            );
          })}
        </div>

        <div className="flex justify-center mt-4">
          <Link href="/articles">
            <button className="flex items-center gap-2  text-secondary border border-secondary dark:text-white/80 dark:border-white font-bold py-3.5 px-4  rounded-full mt-4 hover:shadow-lg">
              <span>
                <FaHeart />
              </span>{" "}
              View More
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default LatestArticlesList;
