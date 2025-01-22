"use client";
import { useQuery } from "react-query";
import { getArticles } from "@/queries/article";
import ArticleCard from "@/components/ui/ArticleCard";
import { BsSearch } from "react-icons/bs";
import { useArticleContext } from "@/contexts/ArticleContext";
import { useEffect, useState } from "react";
import SearchForm from "@/components/form/SearchForm";
import { FaHeart } from "react-icons/fa";
import GoToTop from "@/components/ui/GoToTop";

const ArticlesPage = ({ initialData, authors, articleCategories, query }) => {
  const { state: articles, setState } = useArticleContext();
  const { data, isLoading, isError } = useQuery(
    "blogs", // queryKey
    getArticles, // Custom hook used here
    {
      initialData, // Use the server-side fetched data as initial cache
      staleTime: 60000,
    }
  );
  const [visibleArticles, setVisibleArticles] = useState(articles);
  const [visibleCount, setVisibleCount] = useState(6); // Initial number of articles to display

  const handleSeeMore = () => {
    setVisibleCount((prevCount) => prevCount + 3); // Increase visible articles by 3
  };

  // Update the visible articles in the context state
  useEffect(() => {
    const visibleArticles = articles.slice(0, visibleCount);
    setVisibleArticles(visibleArticles);
  }, [visibleCount, setState, articles]);

  // Filter articles and update the state based on the search query
  useEffect(() => {
    if (data) {
      const filteredArticles = query
        ? data.filter(
            (article) =>
              article.title.toLowerCase().includes(query.toLowerCase()) ||
              article.content.toLowerCase().includes(query.toLowerCase()) ||
              article.categoryId
                .toLowerCase()
                .includes(
                  query.includes("filter")
                    ? query.replace("filter", "").toLowerCase()
                    : query.toLowerCase()
                )
          )
        : data;

      setState(filteredArticles);

      // set only visibleCount to show
      const visibleArticles = filteredArticles.slice(0, visibleCount);
      setVisibleArticles(visibleArticles);
    }
  }, [query, data, setState]);

  const getCategoryName = (id) => {
    console.log(articleCategories);
    const category = articleCategories.find(
      (category) => category.id.toLowerCase() === id.toLowerCase()
    );
    console.log(category);
    return category?.categoryName ? category.categoryName : "Category";
  };

  if (isLoading) return <p>Loading articles...</p>;
  if (isError) return <p>Error loading articles.</p>;

  return (
    <main className="container py-8 md:py-12">
      <div className="flex flex-col items-start lg:flex-row justify-between lg:items-center gap-2 lg:gap-8">
        <div className="text-30-semibold w-full">
          {query && !query.includes("filter") ? (
            `Search results for "${query}"`
          ) : (
            <h3 className="font-bold text-3xl md:text-4xl hidden lg:block truncate text-dark font-primary">
              Our Articles
            </h3>
          )}
        </div>{" "}
        <div>
          <SearchForm
            actionPath="/articles"
            query={
              query?.includes("filter")
                ? getCategoryName(query?.replace("filter", ""))
                : query
            }
          />
        </div>
      </div>

      <ul className="mt-7 card_grid">
        {articles?.length > 0 ? (
          visibleArticles?.map((article) => {
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

      <div className="flex justify-center mt-4">
        {visibleCount < articles.length && ( // Show "See More" button only if there are more articles
          <button
            onClick={handleSeeMore}
            className="flex items-center gap-2 bg-white text-secondary border border-secondary font-bold py-3.5 px-4  rounded-full mt-4 hover:shadow-lg"
          >
            <span>
              <FaHeart fill="#E1232E" />
            </span>{" "}
            View More
          </button>
        )}
      </div>
      <GoToTop />
    </main>
  );
};

export default ArticlesPage;
