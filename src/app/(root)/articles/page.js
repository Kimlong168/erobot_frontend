export const revalidate = 86400;
export const dynamic = "force-static";

import { getArticles } from "@/queries/article";
import { getAuthors } from "@/queries/author";
import { getArticleCategories } from "@/queries/articleCategory";
import ArticlesPage from "./components/ArticlesPage";

export const metadata = {
  title: "ERobot | Articles",
};

const Page = async ({ searchParams }) => {
  const query = searchParams?.query ?? "";

  const [articles, authors, articleCategories] = await Promise.all([
    getArticles(),
    getAuthors(),
    getArticleCategories(),
  ]);

  return (
    <ArticlesPage
      initialData={articles}
      authors={authors}
      articleCategories={articleCategories}
      query={query}
    />
  );
};

export default Page;
