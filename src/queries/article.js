import { db, collection, getDocs, getDoc, doc } from "@/libs/firebase";

export const getArticles = async () => {
  const querySnapshot = await getDocs(collection(db, "blogs"));
  const articles = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  const activeArticles = articles.filter((article) => article.isActive);

  return activeArticles;
};

export const getArticleById = async (id) => {
  try {
    const docRef = doc(db, "blogs", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Blog data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
  }
};

export const getLatestArticles = async () => {
  const querySnapshot = await getDocs(collection(db, "blogs"));
  const articles = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return articles.slice(0, 3);
};
