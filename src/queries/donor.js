import { db, collection, getDocs, addDoc } from "@/libs/firebase";

export const getDonors = async () => {
  const querySnapshot = await getDocs(collection(db, "donors"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createDonor = async (donor) => {
  await addDoc(collection(db, "donors"), donor);

  return donor;
};
