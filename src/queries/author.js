import { db, collection, getDocs, getDoc ,doc} from "@/libs/firebase";

export const getAuthors = async () => {
  const querySnapshot = await getDocs(collection(db, "authors"));
  return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getAuthorById = async (id) => {
  try {
    const docRef = doc(db, "authors", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Author data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching author:", error);
  }
};
