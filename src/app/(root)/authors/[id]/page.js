export const revalidate = 86400;
import Image from "next/image";
import { getArticlesByAuthorId } from "@/queries/article";
import { getAuthorById, getAuthors } from "@/queries/author";
import { getArticleCategories } from "@/queries/articleCategory";
import { notFound } from "next/navigation";
import GoToTop from "@/components/ui/GoToTop";
import ArticleCard from "@/components/ui/ArticleCard";
import assets from "@/assets/assets";
import LinkIcon from "@/components/ui/LinkIcon";
import Link from "next/link";
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function generateMetadata({ params }) {
  const { id } = await params;

  if (id === "default") {
    return {
      title: "ERobot | Admin",
      description: "Hi there! I am the admin of Erobot.",
    };
  } else {
    const author = await getAuthorById(id);
    return {
      title: `ERobot | ${author.fullName}`,
      description: author.bio,
      openGraph: {
        title: author.fullName,
        description: author.bio,
        url: `${baseUrl}/authors/${id}`,
        images: [{ url: author.profilePicture }],
      },
    };
  }
}

// SSG: ✅ Function to generate static paths
// export async function generateStaticParams() {
//   const authors = await getAuthors();

//   // Add 'default' as a static parameter
//   return [
//     { id: "default" },
//     ...authors.map((author) => ({
//       id: author.id.toString(),
//     })),
//   ];
// }

const page = async ({ params }) => {
  const id = (await params).id;

  let author;
  if (id === "default") {
    author = {
      fullName: "Admin",
      position: "Admin",
      profilePicture: assets.lightLogo,
      bio: "I am who I am",
      links: [],
    };
  } else {
    author = await getAuthorById(id);
  }

  const articles = await getArticlesByAuthorId(id);
  if (articles.length === 0) return notFound();
  const categories = await getArticleCategories();

  return (
    <main className="container py-8 md:py-12 overflow-x-hidden">
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {author?.fullName}
            </h3>
          </div>

          <Image
            src={author?.profilePicture}
            alt={author?.fullName}
            width={220}
            height={220}
            className="profile_image"
          />

          <p className="text-30-extrabold mt-7 text-center">
            @{author?.fullName}
          </p>
          <p className="mt-1 text-center text-14-normal italic text-xs text-[#eee]">
            {author?.bio}
          </p>

          <div>
            {author?.links.length > 0 &&
              author?.links.map((item, i) => (
                <Link
                  key={i}
                  href={item.url}
                  className="w-10 h-10 text-[26px] text-white hover:text-primary text-center mt-4 mr-2 opacity-90 p-0 relative z-[1] inline-flex justify-center items-center before:absolute before:w-full before:h-full before:opacity-0 before:translate-y-full before:bg-white before:-z-[1] hover:before:opacity-100 hover:before:translate-y-0 transition duration-300"
                >
                  <LinkIcon title={item.title} size={24} />
                </Link>
              ))}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className=" text-dark dark:text-white/90 font-primary text-xl lg:text-2xl">
            All Articles
          </p>
          <div className="card_grid-sm">
            {articles?.length === 0
              ? "No articles found!"
              : articles.map((article) => {
                  const category = categories.find(
                    (category) => category.id === article.categoryId
                  );
                  return (
                    <div key={article.id}>
                      <ArticleCard article={{ ...article, author, category }} />
                    </div>
                  );
                })}
          </div>
        </div>
      </section>
      <GoToTop />
    </main>
  );
};

export default page;
