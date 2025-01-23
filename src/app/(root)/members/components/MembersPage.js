import Team from "./Team";
const MembersPage = ({ initialData = [] }) => {
  const memberOnly = initialData.filter(
    (member) => member.position === "Member"
  );
  const volunteerOnly = initialData.filter(
    (volunteer) => volunteer.position === "Volunteer"
  );
  const alumniOnly = initialData.filter(
    (alumni) => alumni.position === "Alumni"
  );
  const leaderOnly = initialData.filter(
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
        description="  Our team is made up of passionate individuals who are dedicated to
          helping you succeed. We are committed to providing you with the best
          possible service and support. Our team members are experts in their
          respective fields and are always ready to help you with any questions
          or concerns you may have."
        bg="group-hover:bg-[#004aad]"
        color="hover:text-[#004aad]"
      />
      <Team
        teamMembers={memberOnly}
        title="Our Team Members"
        description="  Our team is made up of passionate individuals who are dedicated to
          helping you succeed. We are committed to providing you with the best
          possible service and support. Our team members are experts in their
          respective fields and are always ready to help you with any questions
          or concerns you may have."
        bg="group-hover:bg-[#cd2f34]"
        color="hover:text-[#cd2f34]"
      />
      <Team
        teamMembers={volunteerOnly}
        title="Our Volunteers"
        description="  Our team is made up of passionate individuals who are dedicated to
          helping you succeed. We are committed to providing you with the best
          possible service and support. Our team members are experts in their
          respective fields and are always ready to help you with any questions
          or concerns you may have."
        bg="group-hover:bg-[#fbb80f]"
        color="hover:text-[#fbb80f]"
      />
      <Team
        teamMembers={alumniOnly}
        title="Our Alumni"
        description="  Our team is made up of passionate individuals who are dedicated to
          helping you succeed. We are committed to providing you with the best
          possible service and support. Our team members are experts in their
          respective fields and are always ready to help you with any questions
          or concerns you may have."
        bg="group-hover:bg-[#0097b2]"
        color="hover:text-[#0097b2]"
      />
    </div>
  );
};

export default MembersPage;
