"use client";
import {
  TelegramShareButton,
  TelegramIcon,
  FacebookShareButton,
  FacebookIcon,
  LineShareButton,
  LineIcon,
  TwitterShareButton,
  XIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";

const SharingBtn = ({ url, title }) => {
  return (
    <div>
      <div className="flex gap-2.5 sm:gap-3 md:gap-4 justify-center p-2">
        <FacebookShareButton
          url={url}
          hashtag="#erobot"
          quote={`${title}`}
        >
          <FacebookIcon
            bgStyle={{
              fill: "#494E58",
            }}
            size={32}
            round={true}
          />
        </FacebookShareButton>
        <TelegramShareButton url={url} title={`**${title}**`}>
          <TelegramIcon
            bgStyle={{
              fill: "#494E58",
            }}
            size={32}
            round={true}
          />
        </TelegramShareButton>

        <WhatsappShareButton url={url} title={`${title}`}>
          <WhatsappIcon
            bgStyle={{
              fill: "#494E58",
            }}
            size={32}
            round={true}
          />
        </WhatsappShareButton>

        <LinkedinShareButton
          url={url}
          title={`${title}`}
          source="erobotkh.org"
        >
          <LinkedinIcon
            bgStyle={{
              fill: "#494E58",
            }}
            size={32}
            round={true}
          />
        </LinkedinShareButton>

        <TwitterShareButton url={url} title={`${title}`}>
          <XIcon
            bgStyle={{
              fill: "#494E58",
            }}
            size={32}
            round={true}
          />
        </TwitterShareButton>

        <LineShareButton url={url} title={`${title}`}>
          <LineIcon
            bgStyle={{
              fill: "#494E58",
            }}
            size={32}
            round={true}
          />
        </LineShareButton>
      </div>
    </div>
  );
};

export default SharingBtn;
