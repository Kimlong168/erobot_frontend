import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="text-blue-500 mt-5 container text-4xl">
      Welcome to erobotcambodia.org <br />
      <Link
        href="/donation"
        className="bg-secondary px-5 py-3 text-sm shadow-sm font-medium tracking-wider text-gray-50 rounded-full hover:shadow-lg btn btn-sm "
      >
        Donate Now
      </Link>
    </div>
  );
}
