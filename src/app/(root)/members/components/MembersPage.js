import Team from "./Team";
const MembersPage = ({
  initialData = [],
  memberOnly = [],
  leaderOnly = [],
  alumniOnly = [],
  volunteerOnly = [],
}) => {
  return (
    <div>
      <Team
        teamMembers={leaderOnly}
        title="Our Leaders"
        description="  Our team is made up of passionate individuals who are dedicated to
          helping you succeed. We are committed to providing you with the best
          possible service and support. Our team members are experts in their
          respective fields and are always ready to help you with any questions
          or concerns you may have."
      />
      <Team
        teamMembers={memberOnly}
        title="Our Team Members"
        description="  Our team is made up of passionate individuals who are dedicated to
          helping you succeed. We are committed to providing you with the best
          possible service and support. Our team members are experts in their
          respective fields and are always ready to help you with any questions
          or concerns you may have."
      />
      <Team
        teamMembers={volunteerOnly}
        title="Our Volunteers"
        description="  Our team is made up of passionate individuals who are dedicated to
          helping you succeed. We are committed to providing you with the best
          possible service and support. Our team members are experts in their
          respective fields and are always ready to help you with any questions
          or concerns you may have."
      />
      <Team
        teamMembers={alumniOnly}
        title="Our Alumni"
        description="  Our team is made up of passionate individuals who are dedicated to
          helping you succeed. We are committed to providing you with the best
          possible service and support. Our team members are experts in their
          respective fields and are always ready to help you with any questions
          or concerns you may have."
      />
    </div>
  );
};

export default MembersPage;
