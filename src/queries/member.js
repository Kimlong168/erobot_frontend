import {
  db,
  collection,
  getDocs,
  getDoc,
  query,
  orderBy,
} from "@/libs/firebase";

export const getMembers = async () => {
  const q = query(collection(db, "members"), orderBy("position", "asc"));
  const querySnapshot = await getDocs(q);
  const members = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return members;
};


export const getMemberById = async (id) => {
  try {
    const docRef = doc(db, "members", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("member data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
  }
};
