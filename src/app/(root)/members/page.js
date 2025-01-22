import { db, collection, getDocs } from "@/libs/firebase";
import MembersPage from "./components/MembersPage";
import { getMembers } from "@/queries/member";

const MembersServerComponent = async () => {
  const members = await getMembers();

  const memberOnly = members.filter((member) => member.position === "Member");
  const volunteerOnly = members.filter(
    (volunteer) => volunteer.position === "Volunteer"
  );
  const alumniOnly = members.filter((alumni) => alumni.position === "Alumni");
  const leaderOnly = members.filter(
    (leader) =>
      leader.position === "Leader" ||
      leader.position === "Co-founder" ||
      leader.position === "Founder"
  );

  return (
    <MembersPage
      initialData={members}
      memberOnly={memberOnly}
      volunteerOnly={volunteerOnly}
      alumniOnly={alumniOnly}
      leaderOnly={leaderOnly}
    />
  );
};

export default MembersServerComponent;
