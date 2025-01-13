import Image from "next/image";
// import Safe from "react-safe";
import { BiCategory } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa6";
import ContentDisplay from "@/components/ui/ContentDisplay";
import SharingBtn from "@/components/ui/SharingBtn";
import BackToPrevBtn from "@/components/ui/BackToPrevBtn";
import { getArticleById } from "@/queries/article";
import { notFound } from "next/navigation";
import Comment from "@/components/ui/Comment";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

const ArticleDetail = async ({ params }) => {
  const id = (await params).id;

  const article = await getArticleById(id);

  if (!article) return notFound();

  return (
    <section className="container mt-6 overflow-x-hidden">
      {/* title */}
      <div className="pb-4 border-b-2 border-gray-5 mt-6">
        <h2 className="text-3xl md:text-4xl font-bold leading-normal">
          {article.title}
        </h2>
      </div>

      {/* category, author, views */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 my-6">
        <div className="flex items-center gap-3">
          <BiCategory />
          <span className="font-semibold">Category:</span>
          <span className="text-primary">{article.categoryId}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaRegUser />
          <span className="font-semibold">By:</span>
          <span>{article.authorId}</span>
        </div>
        <div className="flex items-center gap-2">
          <FaRegCalendarCheck />
          <span className="font-semibold">Date:</span>
          <span>{article.publicationDate}</span>
        </div>
      </div>

      {/* image */}

      <div>
        <Image
          width={500}
          height={500}
          className="w-full h-[260px] md:h-[350px] lg:h-[500px] object-cover rounded-lg overflow-hidden"
          src={article.coverImage}
          alt="Article title"
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
    </section>
  );
};

export default ArticleDetail;
