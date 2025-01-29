import { notFound } from "next/navigation";
import { getProjectById } from "@/queries/project";
import ProjectDetailPage from "./ProjectDetailPage";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// ✅ Function to generate dynamic metadata
export async function generateMetadata({ params }) {
  const { id } = params;

  const project = await getProjectById(id);

  return {
    title: `ERobot | ${project.name}`,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      url: `${baseUrl}/projects/${id}`,
      images: [{ url: project.coverImage }],
    },
  };
}
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
