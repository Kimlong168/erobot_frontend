import { db, collection, getDocs, orderBy, query } from "@/libs/firebase";

export const getStickers = async () => {
  const q = query(collection(db, "stickers"), orderBy("version", "asc"));
  const querySnapshot = await getDocs(q);
  const stickers = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return stickers;
};
