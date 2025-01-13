import { db, collection, getDocs } from "@/libs/firebase";

export const getArticleCategories = async () => {
  const querySnapshot = await getDocs(collection(db, "blog_category"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
