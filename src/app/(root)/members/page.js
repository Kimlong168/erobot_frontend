import { db, collection, getDocs } from "@/libs/firebase";
import MembersPage from "./components/MembersPage";
import { getMembers } from "@/queries/member";

const MembersServerComponent = async () => {
  const members = await getMembers();



  return (
    <MembersPage
      initialData={members}
     
    />
  );
};

export default MembersServerComponent;
