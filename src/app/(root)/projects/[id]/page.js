import Image from "next/image";
import { notFound } from "next/navigation";
import GoToTop from "@/components/ui/GoToTop";
import assets from "@/assets/assets";
import LinkIcon from "@/components/ui/LinkIcon";
import Link from "next/link";
import { getProjectById } from "@/queries/project";

const ProjectDetail = async ({ params }) => {
  const id = (await params).id;

  const project = await getProjectById(id);
  if (!project) return notFound();

  return (
    <main className="container py-8 md:py-12 overflow-x-hidden">
      {project.name}
      <GoToTop />
    </main>
  );
};

export default ProjectDetail;
