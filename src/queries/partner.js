import { db, collection, getDocs } from "@/libs/firebase";

export const getPartners = async () => {
  const querySnapshot = await getDocs(collection(db, "partners"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
