export const revalidate = 86400;
export const dynamic = "force-static";

import { BiCategory } from "react-icons/bi";
import { FaRegUser, FaRegCalendarCheck } from "react-icons/fa6";
import ContentDisplay from "@/components/ui/ContentDisplay";
import SharingBtn from "@/components/ui/SharingBtn";
import BackToPrevBtn from "@/components/ui/BackToPrevBtn";
import { getArticleById } from "@/queries/article";
import { getAuthors } from "@/queries/author";
import { getArticleCategories } from "@/queries/articleCategory";
import { notFound } from "next/navigation";
import { getLongMonth } from "@/utils/getFormatedDate";
import Comment from "@/components/ui/Comment";
import GoToTop from "@/components/ui/GoToTop";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function generateMetadata({ params }) {
  const { id } = params;
  const article = await getArticleById(id);

  return {
    title: `ERobot | ${article.title}`,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      url: `${baseUrl}/articles/${id}`,
      images: [{ url: article.coverImage }],
    },
  };
}

const ArticleDetail = async ({ params }) => {
  const id = params.id;

  const [article, authors, categories] = await Promise.all([
    getArticleById(id),
    getAuthors(),
    getArticleCategories(),
  ]);

  if (!article) return notFound();

  const author = authors.find((a) => a.id === article.authorId);
  const category = categories.find((c) => c.id === article.categoryId);

  return (
    <main className="container mt-6 overflow-x-hidden">
      {/* Title */}
      <div className="pb-4 border-b-2 border-gray-5 mt-6">
        <h2 className="text-3xl md:text-4xl font-bold leading-normal">
          {article.title}
        </h2>
      </div>

      {/* Category, author, date */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 my-6">
        <div className="flex items-center gap-3">
          <BiCategory />
          <span className="font-semibold">Category:</span>
          <span>{category?.categoryName}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaRegUser />
          <span className="font-semibold">Author:</span>
          <span>
            {article.authorId === "default" ? "Admin" : author?.fullName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <FaRegCalendarCheck />
          <span className="font-semibold">Date:</span>
          <span>{getLongMonth(article.publicationDate)}</span>
        </div>
      </div>

      {/* Cover Image */}
      <div
        className="bg-center bg-cover w-full h-[260px] md:h-[350px] lg:h-[500px] object-cover rounded-lg overflow-hidden"
        style={{ backgroundImage: `url(${article.coverImage})` }}
        alt="Article image"
      />

      {/* Content */}
      <div className="mt-6">
        <ContentDisplay htmlString={article.content} />
      </div>

      {/* Share Button */}
      <div className="flex items-center justify-between py-3 border-y-2 border-gray-5 my-6">
        <span className="font-semibold">Share</span>
        <SharingBtn url={`${baseUrl}/articles/${id}`} title={article.title} />
      </div>

      {/* Comment Section */}
      <div className="mt-12">
        <div id="disqus_thread"></div>
      </div>

      {/* Back Button */}
      <div className="lg:hidden mt-6 mb-12 ">
        <BackToPrevBtn link="/articles" />
      </div>

      <Comment />
      <GoToTop />
    </main>
  );
};

export default ArticleDetail;
