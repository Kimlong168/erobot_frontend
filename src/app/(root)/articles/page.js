import ArticlesPage from "./components/ArticlesPage";
import { db, collection, getDocs } from "@/libs/firebase";

const ArticlesServerComponent = async ({ searchParams }) => {
  const query = (await searchParams).query;

  // const params = { search: query || null };

  const [articlesSnapshot, authorsSnapshot, artsSnapshot] = await Promise.all([
    getDocs(collection(db, "blogs")),
    getDocs(collection(db, "authors")),
    getDocs(collection(db, "blog_category")),
  ]);

  // Map through the snapshots to get the documents
  const articles = articlesSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const authors = authorsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const articleCategories = artsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return (
    <ArticlesPage
      initialData={articles}
      authors={authors}
      articleCategories={articleCategories}
      query={query}
    />
  );
};

export default ArticlesServerComponent;
