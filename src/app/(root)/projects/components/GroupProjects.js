"use client";
import ProjectCard from "@/components/ui/ProjectCard";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/variants";
const GroupProjects = ({ projects, title, description }) => {
  if (projects.length == 0) return null;
  return (
    <section>
      <div className="pt-8 md:pt-12">
        <div>
          <h3 className="text-center font-primary text-3xl md:text-4xl text-dark dark:text-white/90 mb-2">
            {title}
          </h3>
          <p className="text-center text-sm text-dark dark:text-white/70 mb-12 italic">
            {description}
          </p>
          <div
            className={` grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 pb-12`}
          >
            {projects?.map((project, i) => (
              <motion.div
                variants={fadeIn(
                  {
                    default: "up",
                  },
                  0.3,
                  "all"
                )}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.3 }}
                key={i}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GroupProjects;
