import ArticlesPage from "./components/ArticlesPage";
import { db, collection, getDocs } from "@/libs/firebase";

const ArticlesServerComponent = async () => {
  // const querySnapshot = await getDocs(collection(db, "blogs"));
  // const articles = querySnapshot.docs.map((doc) => ({
  //   id: doc.id,
  //   ...doc.data(),
  // }));

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
      />
 
  );
};

export default ArticlesServerComponent;
