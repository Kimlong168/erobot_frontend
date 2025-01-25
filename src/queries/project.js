import { db, collection, getDocs, getDoc, doc } from "@/libs/firebase";

export const getProjects = async () => {
  const querySnapshot = await getDocs(collection(db, "projects"));
  const projects = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return projects;
};

export const getProjectById = async (id) => {
  try {
    const docRef = doc(db, "projects", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Project data:", docSnap.data());
      return docSnap.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
  }
};
