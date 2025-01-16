import { db, collection, getDocs } from "@/libs/firebase";

export const getImpactsInfo = async () => {
  const querySnapshotDonor = await getDocs(collection(db, "donors"));
  const querySnapshotProject = await getDocs(collection(db, "projects"));
  const querySnapshotMember = await getDocs(collection(db, "members"));

  const numberOfMembers = querySnapshotMember.docs.length;
  const numberOfProjects = querySnapshotProject.docs.length;
  const amountOfDonations = querySnapshotDonor.docs.reduce((acc, doc) => {
    return acc + parseFloat(doc.data().amount);
  }, 0);
  const numberOfParticipants = querySnapshotProject.docs.reduce((acc, doc) => {
    return acc + parseInt(doc.data().beneficiariesCount);
  }, 0);

  return {
    numberOfMembers,
    numberOfProjects,
    numberOfParticipants,
    amountOfDonations,
  };
};
