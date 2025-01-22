import LinkIcon from "@/components/ui/LinkIcon";
import Image from "next/image";
import Link from "next/link";

const TeamMemberItem = ({ member }) => (
  <div className="group relative w-full ">
    <div className="h-[400px] w-full  mx-auto overflow-hidden relative rounded-lg ">
      <Image
        src={member.profilePicture}
        alt={member.fullName}
        className="h-full w-full object-contain"
        width={400}
        height={500}
      />
    </div>
    <div className="absolute -bottom-12 left-[10%] p-5 w-[80%] bg-white border shadow-xl rounded-lg text-center overflow-hidden z-[1] group-hover:bg-blue-600 group-hover:pt-7 group-hover:px-5 group-hover:pb-20 duration-300 group-hover:text-white">
      <h3 className="text-xl font-semibold leading-normal  mb-1 font-primary text-dark group-hover:text-white">
        {member.fullName}
      </h3>
      <p className="text-[17px] leading-normal  mb-2 text-primary group-hover:text-white italic">
        {member.position}
      </p>
      <small className="text-sm italic line-clamp-3 group-hover:line-clamp-none">
        &quot;{member.bio}&quot;
      </small>
      <div className="absolute w-full left-0 top-auto opacity-0 translate-y-7 group-hover:opacity-100 group-hover:translate-y-0 mt-1">
        <ul className="flex justify-center items-center">
          {member?.links.map((item, i) => (
            <li key={i}>
              <Link
                href={item.url}
                className="w-10 h-10 text-[26px] text-center hover:text-blue-600 mt-2 mr-2 opacity-90 p-0 relative z-[1] inline-flex justify-center items-center before:absolute before:w-full before:h-full before:opacity-0 before:translate-y-full before:bg-slate-800 before:-z-[1] hover:before:opacity-100 hover:before:translate-y-0 transition duration-300"
              >
                {/* <FontAwesomeIcon icon={item.icon} /> */}
                {/* <FaFacebook /> */}
                <LinkIcon title={item.title} size={24} />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const Team = ({ teamMembers, title, description }) => {
  if (teamMembers.length == 0) return null;
  return (
    <section className="py-8 md:py-12 overflow-hidden ">
      <div>
        {/* <h2 className="text-2xl font-primary hover:bg-secondary bg-primary text-center py-1 text-white mb-12">
          Our Team
        </h2> */}
        <h3 className="text-center font-primary text-3xl md:text-4xl text-dark mb-2">
          {title}
        </h3>
        <p className="container text-center text-sm text-dark mb-12 italic">
          {description}
        </p>
        <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4  gap-14 gap-y-24  pb-12">
          {teamMembers?.map((member, i) => (
            <div key={i}>
              <TeamMemberItem member={member} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
