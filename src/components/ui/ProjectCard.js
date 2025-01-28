import Link from "next/link";
import Image from "next/image";
import { GrLocation } from "react-icons/gr";
import getFormatedDate from "@/utils/getFormatedDate";
const ProjectCard = ({ project }) => {
  const {
    id,
    name,
    coverImage,
    description,
    location,
    status,
    startDate,
    endDate,
    duration,
    fundingGoal,
    fundsRaised,
    targetGroup,
    budget,
    beneficiariesCount,
  } = project;

  return (
    <div className="startup-card group w-full h-full">
      <div className="flex-between">
        <p className="startup_card_date dark:text-white/80">
          {getFormatedDate(startDate)}
        </p>
        <div className="flex gap-1.5 text-[20px]">
          {status == "current" ? "❤️" : status == "upcoming" ? "💛" : "💙"}
        </div>
      </div>

      <div className="mt-3">
        <div>
          {/* <p className="text-16-medium capitalize">{status}</p> */}
          <Link href={`/projects/${id}`}>
            <h3 className="text-26-semibold line-clamp-2 dark:text-white/90">
              {name}
            </h3>
          </Link>
        </div>
      </div>

      <Link href={`/projects/${id}`}>
        <p className="startup-card_desc dark:text-white/80">{description}</p>

        <Image
          src={coverImage}
          width={500}
          height={500}
          alt="placeholder"
          className="startup-card_img"
        />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <p className="text-16-medium capitalize line-clamp-1 flex items-center gap-2 dark:text-white/80">
          <GrLocation size={20} />
          {location}
        </p>
        <button className="startup-card_btn">
          <Link href={`/projects/${id}`}>Details</Link>
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;
