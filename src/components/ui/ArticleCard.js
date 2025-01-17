import Link from "next/link";
import Image from "next/image";
import assets from "@/assets/assets";
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
    <div className="startup-card group w-full">
      <div className="flex-between">
        <p className="startup_card_date">{publicationDate}</p>
        <div className="flex gap-1.5 text-[20px]">
          {/* <EyeIcon className="size-6 text-primary" /> */}
          {/* <span className="text-16-medium">{views}</span> */}❤️
        </div>
      </div>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${authorId}`}>
            <p className="text-16-medium line-clamp-1">
              {authorId == "default" ? "Admin" : author.fullName}
            </p>
          </Link>
          <Link href={`/articles/${id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>
        <Link href={`/user/${authorId}`}>
          <Image
            className="w-[48px] h-[48px] rounded-full border"
            src={
              authorId == "default" ? assets.lightLogo : author.profilePicture
            }
            alt={authorId}
            height={48}
            width={48}
          />
        </Link>
      </div>

      <Link href={`/articles/${id}`}>
        <p className="startup-card_desc">{description}</p>

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
          <p className="text-16-medium">{category.categoryName}</p>
        </Link>
        <button className="startup-card_btn">
          <Link href={`/articles/${id}`}>Details</Link>
        </button>
      </div>
    </div>
  );
};

export default ArticleCard;
