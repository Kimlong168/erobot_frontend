import { db, collection, getDocs } from "@/libs/firebase";

export const getDonors= async () => {
  const querySnapshot = await getDocs(collection(db, "donors"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};
