import Link from "next/link";
import Image from "next/image";
import assets from "@/assets/assets";
import { getLongMonth } from "@/utils/getFormatedDate";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";

const ArticleCard = ({ article }) => {
  const {
    id,
    authorId,
    author,
    categoryId,
    category,
    coverImage,
    description,
    publicationDate,
    title,
  } = article;

  return (
    <div className="startup-card group w-full h-full">
      <div className="flex-between">
        <p className="startup_card_date dark:text-white/70">
          {getLongMonth(publicationDate)}
        </p>
        <div className="flex gap-1.5 text-[20px]">
          {/* <EyeIcon className="size-6 text-primary" /> */}
          {/* <span className="text-16-medium">{views}</span> */}❤️
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/authors/${authorId}`}>
            <p className="text-16-medium line-clamp-1 dark:text-white/70">
              {authorId == "default"
                ? "Admin"
                : author?.fullName
                ? author?.fullName
                : "No Author"}
            </p>
          </Link>
          <Link href={`/articles/${id}`}>
            <h3 className="text-26-semibold line-clamp-1 dark:text-white/80">
              {title}
            </h3>
          </Link>
        </div>
        <Link href={`/authors/${authorId}`}>
          <Image
            className="w-[48px] h-[48px] rounded-full border"
            src={
              authorId !== "default" && author?.profilePicture
                ? author?.profilePicture
                : assets.lightLogo
            }
            alt={authorId}
            height={48}
            width={48}
          />
        </Link>
      </div>

      <Link href={`/articles/${id}`}>
        <p className="startup-card_desc dark:text-white/70">{description}</p>

        <Image
          src={coverImage}
          width={500}
          height={500}
          alt="placeholder"
          className="startup-card_img"
        />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/articles?query=filter${categoryId?.toLowerCase()}`}>
          <p className="text-16-medium dark:text-white/80">
            {category.categoryName ? category.categoryName : "No Category"}
          </p>
        </Link>
        <button className="startup-card_btn">
          <Link href={`/articles/${id}`}>Details</Link>
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
