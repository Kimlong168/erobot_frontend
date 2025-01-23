// export const revalidate = 0;
import { db, collection, getDocs } from "@/libs/firebase";
import MembersPage from "./components/MembersPage";

const MembersServerComponent = async () => {
  const querySnapshot = await getDocs(collection(db, "members"));
  const members = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return <MembersPage initialData={members} />;
};

export default MembersServerComponent;
