import { db, collection, getDocs } from "@/libs/firebase";

export const getContactInfo = async () => {
  const querySnapshot = await getDocs(collection(db, "contact"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0];
};
