import { notFound } from "next/navigation";
import { getProjectById } from "@/queries/project";
import ProjectDetailPage from "./ProjectDetailPage";

const ProjectDetailServerComponent = async ({ params }) => {
  const id = (await params).id;

  const project = await getProjectById(id);
  if (!project) return notFound();

  return (
    <>
      <ProjectDetailPage project={{ ...project, id }} />
    </>
  );
};

export default ProjectDetailServerComponent;
