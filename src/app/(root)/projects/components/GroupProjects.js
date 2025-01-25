import ProjectCard from "@/components/ui/ProjectCard";
const GroupProjects = ({ projects, title, description }) => {
  if (projects.length == 0) return null;
  return (
    <section className="pt-8 md:pt-12 overflow-hidden">
      <div>
        <h3 className="text-center font-primary text-3xl md:text-4xl text-dark mb-2">
          {title}
        </h3>
        <p className="container text-center text-sm text-dark mb-12 italic">
          {description}
        </p>
        <div
          className={`container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-5 pb-12`}
        >
          {projects?.map((project, i) => (
            <div key={i}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GroupProjects;
