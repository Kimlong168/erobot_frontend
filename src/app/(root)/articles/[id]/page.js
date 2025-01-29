import Image from "next/image";
import { BiCategory } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa6";
import ContentDisplay from "@/components/ui/ContentDisplay";
import SharingBtn from "@/components/ui/SharingBtn";
import BackToPrevBtn from "@/components/ui/BackToPrevBtn";
import { getArticleById } from "@/queries/article";
import { notFound } from "next/navigation";
import Comment from "@/components/ui/Comment";
import { getAuthors } from "@/queries/author";
import { getArticleCategories } from "@/queries/articleCategory";
import { getLongMonth } from "@/utils/getFormatedDate";
import GoToTop from "@/components/ui/GoToTop";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// ✅ Function to generate dynamic metadata
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
  const id = (await params).id;

  const article = await getArticleById(id);
  const authors = await getAuthors();
  const categories = await getArticleCategories();

  if (!article) return notFound();

  const author = authors.find((author) => author.id === article?.authorId);
  const category = categories.find(
    (category) => category.id === article?.categoryId
  );

  return (
    <>
      <main className="container mt-6 overflow-x-hidden">
        {/* title */}
        <div className="pb-4 border-b-2 border-gray-5 mt-6">
          <h2 className="text-3xl md:text-4xl font-bold leading-normal">
            {article.title}
          </h2>
        </div>

        {/* category, author, date */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 my-6">
          <div className="flex items-center gap-3">
            <BiCategory />
            <span className="font-semibold">Category:</span>
            <span>{category.categoryName}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaRegUser />
            <span className="font-semibold">Author:</span>
            <span>
              {article.authorId == "default" ? "Admin" : author.fullName}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaRegCalendarCheck />
            <span className="font-semibold">Date:</span>
            <span>{getLongMonth(article.publicationDate)}</span>
          </div>
        </div>

        {/* image */}

        <div>
          <Image
            width={1000}
            height={500}
            className="w-full h-[260px] md:h-[350px] lg:h-[500px] object-cover rounded-lg overflow-hidden"
            src={article.coverImage}
            alt="Article image"
          />
        </div>

        {/* article content */}

        <div className="mt-6">
          <ContentDisplay htmlString={article.content} />
        </div>

        {/* share button */}

        <div className="flex items-center justify-between py-3 border-y-2 border-gray-5 my-6">
          <span className="font-semibold">Share</span>
          <SharingBtn url={`${baseUrl}/articles/${id}`} title={article.title} />
        </div>

        {/* comment section */}
        <div className="mt-12">
          <div id="disqus_thread"></div>
        </div>

        {/* back button */}
        <div className="lg:hidden mt-6 mb-12 ">
          <BackToPrevBtn link="/articles" />
        </div>

        <Comment />
        <GoToTop />
      </main>
    </>
  );
};

export default ArticleDetail;
