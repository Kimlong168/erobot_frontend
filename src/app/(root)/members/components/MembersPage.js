"use client";
import { useQuery } from "react-query";
import { getMembers } from "@/queries/member";
import Team from "./Team";
import { useEffect, useState } from "react";
const MembersPage = ({ initialData = [] }) => {
  const { data, isLoading, isError } = useQuery(
    "members", // queryKey
    getMembers, // Custom hook used here
    {
      initialData, // Use the server-side fetched data as initial cache
      staleTime: 60000,
    }
  );

  const [leaders, setLeaders] = useState([]);
  const [members, setMembers] = useState([]);
  const [volunteers, setVolunteers] = useState([]);
  const [alumni, setAlumni] = useState([]);

  useEffect(() => {
    if (data) {
      const memberOnly = data.filter((member) => member.position === "Member");
      const volunteerOnly = data.filter(
        (volunteer) => volunteer.position === "Volunteer"
      );
      const alumniOnly = data.filter((alumni) => alumni.position === "Alumni");
      const leaderOnly = data.filter(
        (leader) =>
          leader.position === "Leader" ||
          leader.position === "Co-founder" ||
          leader.position === "Founder"
      );
      setAlumni(alumniOnly);
      setLeaders(leaderOnly);
      setMembers(memberOnly);
      setVolunteers(volunteerOnly);
    }
  }, [data]);

  return (
    <div>
      <Team
        teamMembers={leaders}
        title="Our Leaders"
        description="  Our team is made up of passionate individuals who are dedicated to
          helping you succeed. We are committed to providing you with the best
          possible service and support. Our team members are experts in their
          respective fields and are always ready to help you with any questions
          or concerns you may have."
      />
      <Team
        teamMembers={members}
        title="Our Team Members"
        description="  Our team is made up of passionate individuals who are dedicated to
          helping you succeed. We are committed to providing you with the best
          possible service and support. Our team members are experts in their
          respective fields and are always ready to help you with any questions
          or concerns you may have."
      />
      <Team
        teamMembers={volunteers}
        title="Our Volunteers"
        description="  Our team is made up of passionate individuals who are dedicated to
          helping you succeed. We are committed to providing you with the best
          possible service and support. Our team members are experts in their
          respective fields and are always ready to help you with any questions
          or concerns you may have."
      />
      <Team
        teamMembers={alumni}
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
