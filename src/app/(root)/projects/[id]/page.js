import { notFound } from "next/navigation";
import { getProjectById } from "@/queries/project";
import ProjectDetailPage from "./ProjectDetailPage";
import { getProducts } from "@/queries/product";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
// ✅ Function to generate dynamic metadata
export async function generateMetadata({ params }) {
  const { id } = await params;

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

// // SSG: ✅ Function to generate static paths
// export async function generateStaticParams() {
//   const projects = await getProducts();

//   return projects.map((project) => ({
//     id: project.id.toString(),
//   }));
// }

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
