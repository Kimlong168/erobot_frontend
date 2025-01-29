export const revalidate = 0;
import { getProjects } from "@/queries/project";
import GroupProjects from "./components/GroupProjects";
export const metadata = {
  title: "ERobot | Projects",
};
const ProjectsPage = async () => {
  const projects = await getProjects();

  const currentProject = projects?.filter(
    (project) => project.status === "current"
  );

  const previousProject = projects?.filter(
    (project) => project.status === "previous"
  );

  const upcomingProject = projects?.filter(
    (project) => project.status === "upcoming"
  );

  return (
    <main className="container">
      <GroupProjects
        projects={previousProject}
        title="Our Previous Projects"
        description="Our previous projects have made a lasting impact on communities in Cambodia. Through our continued dedication, we strive to support those in need and create positive"
      />
      <GroupProjects
        projects={currentProject}
        title="Our Current Projects"
        description="Our current projects are focused on creating positive change in Cambodia. Through our dedicated efforts, we strive to support communities and inspire meaningful impact."
      />
      <GroupProjects
        projects={upcomingProject}
        title="Our Upcomming Projects"
        description="Our upcoming projects are designed to make a lasting impact on communities in Cambodia. Through our continued dedication, we strive to support those in need and create positive change."
      />
    </main>
  );
};

export default ProjectsPage;
