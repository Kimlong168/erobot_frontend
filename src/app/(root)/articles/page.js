import { getArticles } from "@/queries/article";
import ArticlesPage from "./components/ArticlesPage";
import { getAuthors } from "@/queries/author";
import { getArticleCategories } from "@/queries/articleCategory";

export const metadata = {
  title: "ERobot | Articles",
};

const page = async ({ searchParams }) => {
  const query = (await searchParams).query;

  const articles = await getArticles();
  const authors = await getAuthors();
  const articleCategories = await getArticleCategories();

  return (
    <ArticlesPage
      initialData={articles}
      authors={authors}
      articleCategories={articleCategories}
      query={query}
    />
  );
};

export default page;
