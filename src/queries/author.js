import { db, collection, getDocs } from "@/libs/firebase";

export const getAuthors = async () => {
  const querySnapshot = await getDocs(collection(db, "authors"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
