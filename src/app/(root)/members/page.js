export const revalidate = 0;
import { getMembers } from "@/queries/member";
import Team from "./components/Team";

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
    <div>
      <Team
        isLeader={true}
        teamMembers={leaderOnly}
        title="Our Team Leaders"
        description="Our leader is deeply passionate about creating positive change through charity work in Cambodia. With unwavering dedication, they guide our mission to support communities and inspire meaningful impact."
        bg="group-hover:bg-[#004aad]"
        color="text-[#004aad]"
        hcolor="hover:text-[#004aad]"
      />
      <Team
        teamMembers={memberOnly}
        title="Our Team Members"
        description="Our team is passionate about making a positive impact through charity work in Cambodia. United by our dedication, we strive to support communities and create lasting change."
        bg="group-hover:bg-[#cd2f34]"
        color="text-[#cd2f34]"
        hcolor="hover:text-[#cd2f34]"
      />
      <Team
        teamMembers={volunteerOnly}
        title="Our Volunteers"
        description="Our volunteers are driven by compassion and a commitment to making a difference. Through their dedication, they play a vital role in supporting communities and bringing positive change to Cambodia."
        bg="group-hover:bg-[#fbb80f]"
        color="text-[#fbb80f]"
        hcolor="hover:text-[#fbb80f]"
      />
      <Team
        teamMembers={alumniOnly}
        title="Our Alumni"
        description="Our alumni are a testament to the lasting impact of our mission. With their continued support and dedication, they inspire and contribute to meaningful change in communities across Cambodia."
        bg="group-hover:bg-[#0097b2]"
        color="text-[#0097b2]"
        hcolor="hover:text-[#0097b2]"
      />
    </div>
  );
};

export default MembersServerComponent;
