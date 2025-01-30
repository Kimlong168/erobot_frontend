import DownloadPage from "./components/DownloadPage";
import { getStickers } from "@/queries/sticker";

export const metadata = {
  title: "ERobot | Download",
};

const page = async () => {
  const stickers = await getStickers();

  return <DownloadPage stickers={stickers} />;
};

export default page;
