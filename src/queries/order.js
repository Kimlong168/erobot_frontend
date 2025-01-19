import { db, collection, getDocs, addDoc } from "@/libs/firebase";

export const getOrders = async () => {
  const querySnapshot = await getDocs(collection(db, "orders"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const createOrder = async (order) => {
  await addDoc(collection(db, "orders"), order);

  return order;
};
