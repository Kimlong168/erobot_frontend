import { db, collection, getDocs } from "@/libs/firebase";

export const getProductCategories = async () => {
  const querySnapshot = await getDocs(collection(db, "product_category"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
