"use client";
import { useQuery } from "react-query";
import { getArticles } from "@/queries/article";
import ArticleCard from "@/components/ui/ArticleCard";
import { BsSearch } from "react-icons/bs";
import { useArticleContext } from "@/contexts/ArticleContext";
import { useEffect } from "react";

const ArticlesPage = ({ initialData, authors, articleCategories }) => {
  const { state: articles, setState } = useArticleContext();
  const { data, isLoading, isError } = useQuery(
    "blogs", // queryKey
    getArticles, // Custom hook used here
    {
      initialData, // Use the server-side fetched data as initial cache
      staleTime: 60000,
    }
  );

  // Update the state with the fetched articles
  useEffect(() => {
    console.log(data);
    if (data) {
      setState(data);
    }
  }, [data, setState]);

  if (isLoading) return <p>Loading articles...</p>;
  if (isError) return <p>Error loading articles.</p>;

  return (
    <section className="container p-8 md:py-12">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-3xl md:text-4xl text-secondary mb-4 ">
          All Articles
        </h3>

        <div>
          <BsSearch fill="#de0025" size={28} />
        </div>
      </div>
      <ul className="mt-7 card_grid">
        {data?.length > 0 ? (
          articles?.map((article) => {
            const author = authors.find(
              (author) => author.id === article.authorId
            );
            const category = articleCategories.find(
              (category) => category.id === article.categoryId
            );

            return (
              <ArticleCard
                key={article?.id}
                article={{ ...article, author, category }}
              />
            );
          })
        ) : (
          <p className="no-results">No articles found</p>
        )}
      </ul>
    </section>
  );
};

export default ArticlesPage;
